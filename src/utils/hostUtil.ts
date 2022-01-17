// @author 吴志强
// @date 2022/1/17

import lodash from 'lodash';

const reg = /^((2(5[0-5]|[0-4]\d))|[0-1]?\d{1,2})(\.((2(5[0-5]|[0-4]\d))|[0-1]?\d{1,2})){3}( +)([^ \n\r]+)$/;

export const isHost = (str: string): boolean => {
    if (!str) {
        return false;
    }
    return reg.test(lodash.trimEnd(str));
};
