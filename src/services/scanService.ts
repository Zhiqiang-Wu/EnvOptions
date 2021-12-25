// @author 吴志强
// @date 2021/12/24

import {BrowserMultiFormatReader} from '@zxing/library';

let reader: BrowserMultiFormatReader;

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

let timer;

const decode = (deviceId, delay) => {
    reader.decodeOnceFromVideoDevice(deviceId).then((r) => {
        window.localServices.sendChar(r.getText());
        timer = setTimeout(() => {
            decode(deviceId, delay);
        }, delay);
    }).catch((err) => {

    });
}

export const openScan = ({deviceId, delay}): void => {
    decode(deviceId, delay);
};

export const closeScan = (): void => {
    clearTimeout(timer);
    reader.reset();
};
