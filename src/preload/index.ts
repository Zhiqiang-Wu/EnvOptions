import {contextBridge, ipcRenderer, OpenDialogSyncOptions} from 'electron';

const localServices: any = {
    // versions: process.versions,
    setEnvironmentVariable: (environmentVariable: EnvironmentVariable): Promise<Result> => {
        return ipcRenderer.invoke('setEnvironmentVariable', environmentVariable);
    },
    deleteEnvironmentVariable: (environmentVariable: EnvironmentVariable): Promise<Result> => {
        return ipcRenderer.invoke('deleteEnvironmentVariable', environmentVariable);
    },
    listEnvironmentVariables: (): Promise<Result> => {
        return ipcRenderer.invoke('listEnvironmentVariables');
    },
    insertEnvironmentVariable: (environmentVariable: EnvironmentVariable): Promise<Result> => {
        return ipcRenderer.invoke('insertEnvironmentVariable', environmentVariable);
    },
    getEnvironmentVariable: (id: number): Promise<Result> => {
        return ipcRenderer.invoke('getEnvironmentVariable', id);
    },
    updateEnvironmentVariable: (environmentVariable: EnvironmentVariable): Promise<Result> => {
        return ipcRenderer.invoke('updateEnvironmentVariable', environmentVariable);
    },
    unlockDatabaseEnvironmentVariable: (id: number): Promise<Result> => {
        return ipcRenderer.invoke('unlockDatabaseEnvironmentVariable', id);
    },
    lockDatabaseEnvironmentVariable: (id: number): Promise<Result> => {
        return ipcRenderer.invoke('lockDatabaseEnvironmentVariable', id);
    },
    getSetting: (key: string): Promise<Result> => {
        return ipcRenderer.invoke('getSetting', key);
    },
    updateSetting: (settings: Array<Setting>): Promise<Result> => {
        return ipcRenderer.invoke('updateSetting', settings);
    },
    checkForUpdates: (): Promise<Result> => {
        return ipcRenderer.invoke('checkForUpdates');
    },
    downloadUpdate: (): Promise<Result> => {
        return ipcRenderer.invoke('downloadUpdate');
    },
    quitAndInstall: (): void => {
        ipcRenderer.send('quitAndInstall');
    },
};

const localFunctions: any = {
    showOpenDialogSync: (options: OpenDialogSyncOptions): Array<string> | undefined => {
        return ipcRenderer.sendSync('showOpenDialogSync', options);
    },
    onMain: (channel: string, listener: Function): void => {
        ipcRenderer.on(channel, (event, ...args) => {
            listener(args);
        });
    },
    offMain: (channel: string) => {
        ipcRenderer.removeAllListeners(channel);
    },
    log: {
        info: (message: any, ...meta: any[]): void => {
            ipcRenderer.send('log', {level: 'info', message, meta});
        },
        debug: (message: any, ...meta: any[]): void => {
            ipcRenderer.send('log', {level: 'debug', message, meta});
        },
    },
};

contextBridge.exposeInMainWorld('localServices', localServices);

contextBridge.exposeInMainWorld('localFunctions', localFunctions);
