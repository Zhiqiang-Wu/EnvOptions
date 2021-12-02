// @author 吴志强
// @date 2021/12/2

export const listDependencies = (pomPath: string): Promise<Result> => {
    return window.localServices.listDependencies(pomPath);
};
