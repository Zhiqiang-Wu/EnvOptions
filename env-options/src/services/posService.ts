// @author 吴志强
// @date 2021/12/30

import lodash from 'lodash';

/**
 * 加密
 */
const encrypt = (plaintext: string) => {
    const length = plaintext.length;
    let signal = false;
    let ciphertext = '';
    for (let i = 0; i < length; i++) {
        let k = 255 - plaintext.charCodeAt(i);
        for (let j = 0; j < (length - i); j++) {
            k = lodash.floor(((2 * k) % 256) + (k / 128), 0);
        }
        ciphertext += ',';
        ciphertext += k;
        if (signal) {
            signal = false;
        } else {
            if (k > 277) {
                signal = true;
            }
        }
    }
    return ciphertext.substring(1);
};

const leftPad = (str: string, size: number, padChar: string): string => {
    const n = size - str.length;
    if (n <= 0) {
        return str;
    }
    let left = '';
    for (let i = 0; i < n; i++) {
        left += padChar;
    }
    return left + str;
};

export const passwordCracking = (ciphertext: string): Promise<Result> => {
    return new Promise((resolve) => {
        const length = ciphertext.split(',').length;

        let str = '1';
        for (let i = 0; i < length; i++) {
            str += '0';
        }
        const begin = 0;
        const end = Number(str) - 1;

        let password;
        for (let i = begin; i <= end; i++) {
            const str = leftPad(String(i), length, '0');
            const ciphertextTemp = encrypt(str);
            if (ciphertextTemp === ciphertext) {
                password = str;
                break;
            }
        }

        if (password) {
            resolve({
                code: 200,
                data: {
                    password,
                },
            });
        } else {
            resolve({
                code: 1,
                message: '破解失败',
            });
        }
    });
};
