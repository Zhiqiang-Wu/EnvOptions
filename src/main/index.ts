import {app, BrowserWindow, protocol} from 'electron';
import createProtocol from 'umi-plugin-electron-builder/lib/createProtocol';
import path from 'path';
// import installExtension, {
//   REACT_DEVELOPER_TOOLS,
// } from 'electron-devtools-installer';

const isDevelopment = process.env.NODE_ENV === 'development';
let mainWindow: BrowserWindow;

protocol.registerSchemesAsPrivileged([
    {scheme: 'app', privileges: {secure: true, standard: true}},
]);

const createWindow = () => {
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        show: false,
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

app.on('ready', async () => {
    // if (isDevelopment) {
    //   await installExtension(REACT_DEVELOPER_TOOLS);
    // }
    createWindow();
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (mainWindow === null) {
        createWindow();
    }
});
