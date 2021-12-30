// @author 吴志强
// @date 2021/12/30

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
            k = ((2 * k) % 256) + (k / 128);
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
    return ciphertext.substring(0, ciphertext.length - 1);
};

export const passwordCracking = (ciphertext: string): Promise<Result> => {
    return new Promise((resolve) => {
        const length = ciphertext.split(',').length;

        let str = '1';
        for (let i = 0; i < length - 1; i++) {
            str += '0';
        }
        const begin = Number(str);
        const end = Number(str + '0') - 1;

        let password;
        for (let i = begin; i <= end; i++) {
            const ciphertextTemp = encrypt(String(i));
            if (ciphertextTemp === ciphertext) {
                password = String(i);
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
