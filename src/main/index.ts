// @author 吴志强
// @date 2021/9/11

import {app, BrowserWindow, Menu, protocol, Tray, ipcMain} from 'electron';
import createProtocol from 'umi-plugin-electron-builder/lib/createProtocol';
import path from 'path';
import loadsh from 'loadsh';
import regedit from 'regedit';
import sqlite3 from 'sqlite3';
// import installExtension, {REACT_DEVELOPER_TOOLS, REDUX_DEVTOOLS} from 'electron-devtools-installer';

const isDevelopment = process.env.NODE_ENV === 'development';
let mainWindow: BrowserWindow;
let tray: Tray;
let baseDB: sqlite3.Database;
const envPath = 'HKLM\\SYSTEM\\CurrentControlSet\\Control\\Session Manager\\Environment';

const createWindow = (): void => {
    mainWindow = new BrowserWindow({
        icon: path.join(__dirname, '../../assets/favicon.ico'),
        width: 800,
        height: 600,
        show: false,
        title: 'Env Options',
        webPreferences: {
            contextIsolation: true,
            preload: path.join(__dirname, 'preload.js'),
        },
    });

    if (isDevelopment) {
        mainWindow.loadURL('http://localhost:8000');
    } else {
        createProtocol('app');
        mainWindow.loadURL('app://./index.html');
    }

    mainWindow.once('ready-to-show', () => {
        mainWindow.show();
    });
};

const createTray = (): void => {
    tray = new Tray(path.join(__dirname, '../../assets/favicon.ico'));
    const menu = Menu.buildFromTemplate([
        {label: '退出', click: appQuit},
    ]);
    tray.setContextMenu(menu);
    tray.setToolTip('Env Options');
};

const connectBaseDB = (): Promise<Result> => {
    return new Promise((resolve) => {
        const baseDBPath = path.join(__dirname, '../../../db/base.db3');
        baseDB = new sqlite3.Database(baseDBPath, (err) => {
            if (err) {
                resolve({code: 1, message: err.message});
            } else {
                resolve({code: 200});
            }
        });
    });
};

const listDatabaseEnvironmentVariables = (): Promise<Result> => {
    return new Promise<Result>((resolve) => {
        baseDB.all('SELECT * FROM variable', (err, result) => {
            if (err) {
                resolve({code: 1, message: err.message});
            } else {
                resolve({code: 200, data: {environmentVariables: result}});
            }
        });
    });
};

const listSystemEnvironmentVariables = (): Promise<Result> => {
    return new Promise<Result>((resolve) => {
        regedit.list(envPath, (err, result) => {
            if (err) {
                resolve({code: 1, message: err.message});
            } else {
                const environmentVariableObject = result[envPath].values;
                const environmentVariables: Array<EnvironmentVariable> = loadsh.keys(environmentVariableObject).map((key) => ({
                    key,
                    type: environmentVariableObject[key].type,
                    value: environmentVariableObject[key].value,
                    selected: true,
                }));
                resolve({code: 200, data: {environmentVariables}});
            }
        });
    });
};

const deleteSystemEnvironmentVariable = async (key: string): Promise<Result> => {
    return new Promise<Result>((resolve) => {
        regedit.deleteValue([`${envPath}\\${key}`], (err) => {
            if (err) {
                resolve({code: 1, message: err.message});
            } else {
                resolve({code: 200});
            }
        });
    });
};

const deleteDatabaseEnvironmentVariable = (id: number): Promise<Result> => {
    return new Promise<Result>((resolve) => {
        baseDB.exec(`DELETE
                     FROM variable
                     WHERE id = ${id}`, (err) => {
            if (err) {
                resolve({code: 1, message: err.message});
            } else {
                resolve({code: 200});
            }
        });
    });
};

const existsSystemEnvironmentVariable = async (key: string): Promise<Result> => {
    const result: Result = await listSystemEnvironmentVariables();
    if (result.code !== 200) {
        return result;
    }
    const index = loadsh.findIndex(result.data.environmentVariables, (systemEnvironmentVariable: EnvironmentVariable) => {
        return systemEnvironmentVariable.key === key;
    });
    return {code: 200, data: {exists: index >= 0}};
};

const insertDatabaseEnvironmentVariable = (environmentVariable: EnvironmentVariable): Promise<Result> => {
    console.log(environmentVariable);
    return new Promise<Result>((resolve) => {
        const sql = `INSERT INTO variable (key, type, value)
                     VALUES (${'\''}${environmentVariable.key}${'\''}, ${'\''}${environmentVariable.type}${'\''},
                             ${'\''}${environmentVariable.value}${'\''})`;
        baseDB.exec(sql, (err) => {
            if (err) {
                resolve({code: 1, message: err.message});
            } else {
                resolve({code: 200});
            }
        });
    });
};

const appQuit = (): void => {
    baseDB.close(() => {
        app.quit();
    });
};

protocol.registerSchemesAsPrivileged([
    {scheme: 'app', privileges: {secure: true, standard: true}},
]);

app.on('ready', async () => {
    /*if (isDevelopment) {
        await installExtension(REACT_DEVELOPER_TOOLS);
        await installExtension(REDUX_DEVTOOLS);
    }*/
    await connectBaseDB();
    createWindow();
    createTray();
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        appQuit();
    }
});

ipcMain.handle('listEnvironmentVariables', async () => {
    return Promise.all([listSystemEnvironmentVariables(), listDatabaseEnvironmentVariables()]).then((resultArray: Array<Result>) => {
        const result1 = resultArray[0];
        if (result1.code !== 200) {
            return result1;
        }
        const result2 = resultArray[1];
        if (result2.code !== 200) {
            return result2;
        }
        const systemEnvironmentVariables: Array<EnvironmentVariable> = result1.data.environmentVariables;
        const databaseEnvironmentVariables: Array<EnvironmentVariable> = result2.data.environmentVariables;
        const newDatabaseEnvironmentVariables: Array<EnvironmentVariable> = loadsh.differenceWith(systemEnvironmentVariables, databaseEnvironmentVariables, (systemEnvironmentVariable: EnvironmentVariable, databaseEnvironmentVariable: EnvironmentVariable) => {
            return systemEnvironmentVariable.key === databaseEnvironmentVariable.key && systemEnvironmentVariable.value === databaseEnvironmentVariable.value;
        });
        if (newDatabaseEnvironmentVariables.length > 0) {
            const statement: sqlite3.Statement = baseDB.prepare('INSERT INTO variable (key, type, value) VALUES (?, ?, ?)');
            newDatabaseEnvironmentVariables.forEach((environmentVariable: EnvironmentVariable) => {
                statement.run([environmentVariable.key, environmentVariable.type, environmentVariable.value]);
            });
            return new Promise<Result>(() => {
                statement.finalize(async (err) => {
                    if (err) {
                        return {code: 1, message: err.message};
                    } else {
                        const result = await listDatabaseEnvironmentVariables();
                        const environmentVariables: Array<EnvironmentVariable> = result.data.environmentVariables.map((databaseEnvironmentVariable: EnvironmentVariable) => {
                            const index = loadsh.findIndex(systemEnvironmentVariables, (systemEnvironmentVariable) => {
                                return systemEnvironmentVariable.key === databaseEnvironmentVariable.key && systemEnvironmentVariable.value === databaseEnvironmentVariable.value;
                            });
                            return {
                                ...databaseEnvironmentVariable,
                                selected: index >= 0,
                            };
                        });
                        return {code: 200, data: {environmentVariables}};
                    }
                });
            });
        } else {
            const environmentVariables: Array<EnvironmentVariable> = databaseEnvironmentVariables.map((databaseEnvironmentVariable: EnvironmentVariable) => {
                const index = loadsh.findIndex(systemEnvironmentVariables, (systemEnvironmentVariable) => {
                    return systemEnvironmentVariable.key === databaseEnvironmentVariable.key && systemEnvironmentVariable.value === databaseEnvironmentVariable.value;
                });
                return {
                    ...databaseEnvironmentVariable,
                    selected: index >= 0,
                };
            });
            return {code: 200, data: {environmentVariables}};
        }
    });
});

ipcMain.handle('setEnvironmentVariable', (event, environmentVariable: EnvironmentVariable) => {
    console.log(environmentVariable);
    return {code: 200};
    /*if (environmentVariable.selected) {

    } else {
        return deleteSystemEnvironmentVariable(environmentVariable.key);
    }*/
});

ipcMain.handle('deleteEnvironmentVariable', async (event, environmentVariable: EnvironmentVariable): Promise<Result> => {
    if (environmentVariable.selected) {
        let result = await deleteSystemEnvironmentVariable(environmentVariable.key);
        if (result.code !== 200) {
            return result;
        }
        return deleteDatabaseEnvironmentVariable(environmentVariable.id);
    } else {
        return deleteDatabaseEnvironmentVariable(environmentVariable.id);
    }
});

ipcMain.handle('insertEnvironmentVariable', (event, environmentVariable: EnvironmentVariable) => {
    return insertDatabaseEnvironmentVariable(environmentVariable);
});
