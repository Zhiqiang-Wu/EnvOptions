import {OpenDialogSyncOptions, IpcRendererEvent} from 'electron';

interface LeveledLogMethod {
    (message: string, ...meta: any[]): void;

    (message: any): void;
}

declare global {
    type Result = {
        code: number;
        message?: string;
        data?: any;
    }

    type EnvironmentVariable = {
        id: number;
        key: string;
        value: string;
        type: 'REG_EXPAND_SZ' | 'REG_SZ',
        selected: boolean;
        locked: 0 | 1;
    }

    type Setting = {
        key: string;
        value: any;
    }

    type MainListener = {
        key: symbol;
        listener: (event: IpcRendererEvent, ...arg: any[]) => void;
    }

    type MainHandler = (props: any) => (event: IpcRendererEvent, ...arg: any[]) => void;

    interface Window {
        localServices: {
            setEnvironmentVariable: (environmentVariable: EnvironmentVariable) => Promise<Result>;
            listEnvironmentVariables: () => Promise<Result>;
            deleteEnvironmentVariable: (environmentVariable: EnvironmentVariable) => Promise<Result>;
            insertEnvironmentVariable: (environmentVariable: EnvironmentVariable) => Promise<Result>;
            getEnvironmentVariable: (id: number) => Promise<Result>;
            updateEnvironmentVariable: (environmentVariable: EnvironmentVariable) => Promise<Result>;
            getSetting: (key: string) => Promise<Result>;
            updateSetting: (settings: Array<Setting>) => Promise<Result>;
            unlockDatabaseEnvironmentVariable: (id: number) => Promise<Result>;
            lockDatabaseEnvironmentVariable: (id: number) => Promise<Result>;
            checkForUpdates: () => Promise<Result>;
            downloadUpdate: () => Promise<Result>;
            quitAndInstall: () => void;
        };
        localFunctions: {
            showOpenDialogSync: (options: OpenDialogSyncOptions) => Array<string> | undefined;
            log: {
                info: LeveledLogMethod,
                debug: LeveledLogMethod,
            },
            addMainListener: (channel: string, mainListener: MainListener) => void,
            removeMainListener: (channel: string, key: symbol) => void,
        };
    }
}
