// @author 吴志强
// @date 2021/1/14

export const listHosts = (): Promise<Result> => {
    return window.localServices.listHosts();
};
