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

const connectBaseDB = (): Promise<boolean> => {
    return new Promise((resolve) => {
        const baseDBPath = path.join(__dirname, '../../../db/base.db3');
        baseDB = new sqlite3.Database(baseDBPath, (err) => {
            resolve(!err);
        });
    });
};

const listDatabaseEnvironmentVariables = (): Promise<Array<EnvironmentVariable>> => {
    return new Promise<Array<EnvironmentVariable>>((resolve) => {
        baseDB.all('SELECT * FROM variable', (err, result) => {
            resolve(result);
        });
    });
};

const listSystemEnvironmentVariables = (): Promise<Array<EnvironmentVariable>> => {
    return new Promise<Array<EnvironmentVariable>>((resolve) => {
        regedit.list(envPath, (err, result) => {
            const environmentVariableObject = result[envPath].values;
            const environmentVariables: Array<EnvironmentVariable> = loadsh.keys(environmentVariableObject).map((key) => ({
                key,
                type: environmentVariableObject[key].type,
                value: environmentVariableObject[key].value,
                selected: true,
            }));
            resolve(environmentVariables);
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
    return Promise.all([listSystemEnvironmentVariables(), listDatabaseEnvironmentVariables()]).then((environmentVariablesArray: Array<Array<EnvironmentVariable>>) => {
        const systemEnvironmentVariables: Array<EnvironmentVariable> = environmentVariablesArray[0];
        let databaseEnvironmentVariables: Array<EnvironmentVariable> = environmentVariablesArray[1];
        const newDatabaseEnvironmentVariables: Array<EnvironmentVariable> = loadsh.differenceWith(systemEnvironmentVariables, databaseEnvironmentVariables, (systemEnvironmentVariable: EnvironmentVariable, databaseEnvironmentVariable: EnvironmentVariable) => {
            return systemEnvironmentVariable.key === databaseEnvironmentVariable.key && systemEnvironmentVariable.value === databaseEnvironmentVariable.value;
        });
        if (newDatabaseEnvironmentVariables.length > 0) {
            const statement: sqlite3.Statement = baseDB.prepare('INSERT INTO variable (key, type, value, selected) VALUES (?, ?, ? , 1)');
            newDatabaseEnvironmentVariables.forEach((environmentVariable: EnvironmentVariable) => {
                statement.run([environmentVariable.key, environmentVariable.type, environmentVariable.value]);
            });
            return new Promise<Result>(() => {
                statement.finalize(async (err) => {
                    if (err) {
                        return {code: 1, message: err.message};
                    } else {
                        databaseEnvironmentVariables = await listDatabaseEnvironmentVariables();
                        const environmentVariables: Array<EnvironmentVariable> = databaseEnvironmentVariables.map((databaseEnvironmentVariable: EnvironmentVariable) => {
                            const index = loadsh.findIndex(systemEnvironmentVariables, (systemEnvironmentVariable) => {
                                return systemEnvironmentVariable.key === databaseEnvironmentVariable.key && systemEnvironmentVariable.value === databaseEnvironmentVariable.value;
                            });
                            return {
                                ...databaseEnvironmentVariable,
                                selected: index >= 0
                            };
                        });
                        return {code: 0, data: {environmentVariables}};
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
                    selected: index >= 0
                };
            });
            return {code: 0, data: {environmentVariables}};
        }
    });
});

ipcMain.handle('setEnvironmentVariable', (event, key: string, value: string) => {
    const i = 0;
    if (i !== 0) {
        return {code: 1, message: '设置环境变量失败'};
    } else {
        return {code: 0};
    }
});

ipcMain.handle('deleteEnvironmentVariable', (event, environmentVariable: EnvironmentVariable) => {
    if (environmentVariable.selected) {
        return new Promise<Result>((resolve) => {
            regedit.deleteValue([`${envPath}\\${environmentVariable.key}`], (err) => {
                if (err) {
                    resolve({code: 1, message: err.message});
                } else {
                    resolve({code: 0});
                }
            });
        }).then((result: Result) => {
            if (result.code !== 0) {
                return result;
            } else {
                return new Promise<Result>((resolve) => {
                    baseDB.exec(`DELETE
                                 FROM variable
                                 WHERE id = ${environmentVariable.id}`, (err) => {
                        if (err) {
                            resolve({code: 1, message: err.message});
                        } else {
                            resolve({code: 0});
                        }
                    });
                });
            }
        });
    } else {
        return new Promise<Result>((resolve) => {
            baseDB.exec(`DELETE
                         FROM variable
                         WHERE id = ${environmentVariable.id}`, (err) => {
                if (err) {
                    resolve({code: 1, message: err.message});
                } else {
                    resolve({code: 0});
                }
            });
        });
    }
});

ipcMain.handle('insertEnvironmentVariable', (event, environmentVariable: EnvironmentVariable) => {

});
