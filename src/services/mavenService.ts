// @author 吴志强
// @date 2021/12/2

export const listDependencies = (pomPath: string): Promise<Result> => {
    return window.localServices.listDependencies(pomPath);
};

export const exportDependency = (data: {sourcePath: string, targetPath: string, dependencies: Array<Dependency>}): Promise<Result> => {
    return window.localServices.exportDependency(data);
};

export const listSourcePaths = (): Promise<Result> => {
    return window.localServices.listSourcePaths();
};

export const insertSourcePath = (sourcePath:string): Promise<Result> => {
    return window.localServices.insertSourcePath(sourcePath);
};

export const deleteSourcePath = (sourcePath:string): Promise<Result> => {
    return window.localServices.deleteSourcePath(sourcePath);
};
