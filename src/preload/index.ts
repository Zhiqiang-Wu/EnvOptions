import {contextBridge, ipcRenderer} from 'electron';

const apiKey = 'electron';

const api: any = {
    // versions: process.versions,
    setEnvironmentVariable: (key: string, value: string): Promise<Result> => {
        return ipcRenderer.invoke('setEnvironmentVariable', key, value);
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
};

contextBridge.exposeInMainWorld(apiKey, api);
