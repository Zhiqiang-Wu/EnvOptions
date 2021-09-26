import {contextBridge, ipcRenderer} from 'electron';

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
    getSetting: (key: string): Promise<Result> => {
        return ipcRenderer.invoke('getSetting', key);
    },
    updateSetting: (settings: Array<Setting>): Promise<Result> => {
        return ipcRenderer.invoke('updateSetting', settings);
    },
};

const localFunctions: any = {
    showOpenDialogSync: (options: OpenDialogSyncOptions) => {
        return ipcRenderer.sendSync('showOpenDialogSync', options);
    },
};

contextBridge.exposeInMainWorld('localServices', localServices);

contextBridge.exposeInMainWorld('localFunctions', localFunctions);
