import {contextBridge, ipcRenderer, OpenDialogReturnValue} from 'electron';
import adapter from 'webrtc-adapter';

console.log(adapter);

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
    listDependencies: (pomPath: string): Promise<Result> => {
        return ipcRenderer.invoke('listDependencies', pomPath);
    },
    exportDependency: (data: {sourcePath: string, targetPath: string, dependencies: Array<Dependency>}): Promise<Result> => {
        return ipcRenderer.invoke('exportDependency', data);
    },
    listSourcePaths: (): Promise<Result> => {
        return ipcRenderer.invoke('listSourcePaths');
    },
    insertSourcePath: (sourcePath: string): Promise<Result> => {
        return ipcRenderer.invoke('insertSourcePath', sourcePath);
    },
    deleteSourcePath: (sourcePath: string): Promise<Result> => {
        return ipcRenderer.invoke('deleteSourcePath', sourcePath);
    },
};

const localFunctions: any = {
    showOpenDialog: (options: OpenDialogOptions1): Promise<OpenDialogReturnValue> => {
        return ipcRenderer.invoke('showOpenDialog', options);
    },
    addMainListener: (channel: string, mainListener: MainListener): void => {
        const listener: any = mainListener.listener;
        listener.key = mainListener.key;
        ipcRenderer.on(channel, listener);
    },
    removeMainListener: (channel: string, key: symbol): void => {
        const listener: any = ipcRenderer.listeners(channel).find((value: any) => value.key === key);
        ipcRenderer.removeListener(channel, listener);
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
