// @author 吴志强
// @date 2021/12/24

import {BrowserMultiFormatReader} from '@zxing/library';

let reader: BrowserMultiFormatReader;
const audio = new Audio('https://env-options.oss-cn-hangzhou.aliyuncs.com/resources/sound.wav');

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
let suffix = '';
let enter;

const decode = (deviceId, delay) => {
    reader.decodeOnceFromVideoDevice(deviceId).then((r) => {
        if (audio.networkState === 1) {
            audio.play();
        }
        if (enter) {
            window.localServices.sendChar(r.getText() + suffix + '\r');
        } else {
            window.localServices.sendChar(r.getText() + suffix);
        }
        timer = setTimeout(() => {
            decode(deviceId, delay);
        }, delay);
    }).catch((err) => {

    });
}

export const openScan = (data: {deviceId, delay, suffix, enter}): void => {
    suffix = data.suffix;
    enter = data.enter;
    decode(data.deviceId, data.delay);
};

export const closeScan = (): void => {
    clearTimeout(timer);
    reader.reset();
};
