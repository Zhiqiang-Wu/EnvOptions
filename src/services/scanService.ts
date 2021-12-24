// @author 吴志强
// @date 2021/12/24

import {BrowserMultiFormatReader} from '@zxing/library';

let reader;

export const listVideoInputDevices = (): Promise<Result> => {
    if (!reader) {
        reader = new BrowserMultiFormatReader();
    }
    return reader.listVideoInputDevices().then((videoInputDevices) => {
        return {
            code: 200,
            data: {
                videoInputDevices
            }
        };
    }).catch((e) => {
        return {
            code: 1,
            message: e.message
        };
    });
};
