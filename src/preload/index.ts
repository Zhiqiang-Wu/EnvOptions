import {contextBridge, ipcRenderer} from 'electron';

const apiKey = 'electron';

const api: any = {
    versions: process.versions,
    setEnvironmentVariable: (key: string, value: string): Promise<number> => {
        return ipcRenderer.invoke('setEnvironmentVariable', key, value);
    },
    deleteEnvironmentVariable: (key: string): Promise<number> => {
        return ipcRenderer.invoke('deleteEnvironmentVariable', key);
    },
    listEnvironmentVariables: (): Promise<any> => {
        return ipcRenderer.invoke('listEnvironmentVariables');
    },
};

contextBridge.exposeInMainWorld(apiKey, api);
