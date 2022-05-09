// @author 吴志强
// @date 2021/9/21

export const getSetting = (key: string): Promise<Result> => {
    return window.localServices.getSetting(key);
};

export const updateSetting = (settings: Array<Setting>): Promise<Result> => {
    return window.localServices.updateSetting(settings);
}
