// @author 吴志强
// @date 2021/9/11

export const setEnvironmentVariable = (environmentVariable: EnvironmentVariable): Promise<Result> => {
    return window.localServices.setEnvironmentVariable(environmentVariable);
};

export const listEnvironmentVariables = (): Promise<Result> => {
    return window.localServices.listEnvironmentVariables();
};

export const deleteEnvironmentVariable = (environmentVariable: EnvironmentVariable): Promise<Result> => {
    return window.localServices.deleteEnvironmentVariable(environmentVariable);
};

export const insertEnvironmentVariable = (environmentVariable: EnvironmentVariable): Promise<Result> => {
    return window.localServices.insertEnvironmentVariable(environmentVariable);
};

export const getEnvironmentVariable = (id: number): Promise<Result> => {
    return window.localServices.getEnvironmentVariable(id);
};

export const updateEnvironmentVariable = (environmentVariable: EnvironmentVariable): Promise<Result> => {
    return window.localServices.updateEnvironmentVariable(environmentVariable);
};
