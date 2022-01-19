// @author 吴志强
// @date 2022/1/17

import lodash from 'lodash';

const reg = /^((2(5[0-5]|[0-4]\d))|[0-1]?\d{1,2})(\.((2(5[0-5]|[0-4]\d))|[0-1]?\d{1,2})){3}( +)([^ \n\r]+)$/;
const reg2 = /^((2(5[0-5]|[0-4]\d))|[0-1]?\d{1,2})(\.((2(5[0-5]|[0-4]\d))|[0-1]?\d{1,2})){3}$/;

export const isHost = (str: string): boolean => {
    if (!str) {
        return false;
    }
    return reg.test(lodash.trimEnd(str));
};

export const isIpv4 = (str: string) => {
    if (!str) {
        return false;
    }
    return reg2.test(str);
};
