// @author 吴志强
// @date 2021/9/11

export const setEnvironmentVariable = (key: string, value: string): Promise<number> => {
    return window.electron.setEnvironmentVariable(key, value);
};

export const listEnvironmentVariables = (): Promise<any> => {
    return window.electron.listEnvironmentVariables();
};

export const deleteEnvironmentVariable = (key: string): Promise<number> => {
    return window.electron.deleteEnvironmentVariable(key);
};
