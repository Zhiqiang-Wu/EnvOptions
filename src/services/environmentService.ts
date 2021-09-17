// @author 吴志强
// @date 2021/9/11

export const setEnvironmentVariable = (key: string, value: string): Promise<Result> => {
    return window.electron.setEnvironmentVariable(key, value);
};

export const listEnvironmentVariables = (): Promise<Result> => {
    return window.electron.listEnvironmentVariables();
};

export const deleteEnvironmentVariable = (key: string): Promise<Result> => {
    return window.electron.deleteEnvironmentVariable(key);
};
