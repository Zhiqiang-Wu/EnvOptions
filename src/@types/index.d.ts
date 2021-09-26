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
    locked: boolean;
}

type Setting = {
    key: string;
    value: any;
}

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
    };
    localFunctions: {
        showOpenDialogSync: (options: OpenDialogSyncOptions) => Array<string> | undefined;
    };
}

interface FileFilter {
    extensions: string[];
    name: string;
}

interface OpenDialogSyncOptions {
    title?: string;
    defaultPath?: string;
    buttonLabel?: string;
    filters?: FileFilter[];
    properties?: Array<'openFile' | 'openDirectory' | 'multiSelections' | 'showHiddenFiles' | 'createDirectory' | 'promptToCreate' | 'noResolveAliases' | 'treatPackageAsDirectory' | 'dontAddToRecent'>;
    message?: string;
    securityScopedBookmarks?: boolean;
}
