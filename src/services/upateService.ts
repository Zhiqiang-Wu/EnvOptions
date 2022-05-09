// @author 吴志强
// @date 2021/10/6

export const checkForUpdates = (): Promise<Result> => {
    return window.localServices.checkForUpdates();
};

export const downloadUpdate = (): Promise<Result> => {
    return window.localServices.downloadUpdate();
};

export const quitAndInstall = (): void => {
    window.localServices.quitAndInstall();
};
