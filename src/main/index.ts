// @author 吴志强
// @date 2021/9/11

import {app, BrowserWindow, Menu, protocol, Tray} from 'electron';
import createProtocol from 'umi-plugin-electron-builder/lib/createProtocol';
import path from 'path';
// import installExtension, {REACT_DEVELOPER_TOOLS, REDUX_DEVTOOLS} from 'electron-devtools-installer';

const isDevelopment = process.env.NODE_ENV === 'development';

let mainWindow: BrowserWindow;
let tray: Tray;

protocol.registerSchemesAsPrivileged([
    {scheme: 'app', privileges: {secure: true, standard: true}},
]);

const createWindow = () => {
    mainWindow = new BrowserWindow({
        icon: path.join(__dirname, '../../assets/favicon.ico'),
        width: 800,
        height: 600,
        show: false,
        title: 'environment',
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

    tray = new Tray(path.join(__dirname, '../../assets/favicon.ico'));
    const menu = Menu.buildFromTemplate([
        {label: '退出', click: app.quit}
    ]);
    tray.setContextMenu(menu);
    tray.setToolTip('environment');

    mainWindow.once('ready-to-show', () => {
        mainWindow.show();
    });
};

app.on('ready', async () => {
    /*if (isDevelopment) {
        await installExtension(REACT_DEVELOPER_TOOLS);
        await installExtension(REDUX_DEVTOOLS);
    }*/
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
