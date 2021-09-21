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
    localServices: {
        setEnvironmentVariable: (environmentVariable: EnvironmentVariable) => Promise<Result>;
        listEnvironmentVariables: () => Promise<Result>;
        deleteEnvironmentVariable: (environmentVariable: EnvironmentVariable) => Promise<Result>;
        insertEnvironmentVariable: (environmentVariable: EnvironmentVariable) => Promise<Result>;
        getEnvironmentVariable: (id: number) => Promise<Result>;
        updateEnvironmentVariable: (environmentVariable: EnvironmentVariable) => Promise<Result>;
    };
}
