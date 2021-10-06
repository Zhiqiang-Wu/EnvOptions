// @author 吴志强
// @date 2021/10/6

export const checkForUpdates = (): Promise<Result> => {
    return window.localServices.checkForUpdates();
};
