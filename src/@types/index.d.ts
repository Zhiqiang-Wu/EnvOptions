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
}

interface Window {
    electron: {
        setEnvironmentVariable: (key: string, value: string) => Promise<Result>;
        listEnvironmentVariables: () => Promise<Result>;
        deleteEnvironmentVariable: (environmentVariable: EnvironmentVariable) => Promise<Result>;
    };
}
