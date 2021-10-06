// @author 吴志强
// @date 2021/10/6

import {checkForUpdates, downloadUpdate} from '@/services/upateService';

export default {
    namespace: 'updateModel',
    state: {},
    effects: {
        * checkForUpdates({payload}, {call}) {
            return yield call(checkForUpdates, payload);
        },
        * downloadUpdate({payload}, {call}) {
            return yield call(downloadUpdate, payload);
        },
    },
};
