// @author 吴志强
// @date 2021/12/2

export const listDependencies = (pomPath: string): Promise<Result> => {
    return window.localServices.listDependencies(pomPath);
};

export const exportDependency = (data: {targetPath: string, dependencies: Array<Dependency>}): Promise<Result> => {
    return window.localServices.exportDependency(data);
};
