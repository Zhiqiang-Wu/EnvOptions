// @author 吴志强
// @date 2021/10/6

import {checkForUpdates, downloadUpdate, quitAndInstall} from '@/services/upateService';

export default {
    namespace: 'updateModel',
    state: {
        progressVisible: false,
        progressPercent: 0,
        progressStatus: 'normal',
        updateButtonVisible: false,
    },
    reducers: {
        updateUpdateModel(state, action) {
            return {
                ...state,
                ...action.payload,
            };
        },
    },
    effects: {
        * checkForUpdates({payload}, {call}) {
            return yield call(checkForUpdates, payload);
        },
        * downloadUpdate({payload}, {call}) {
            return yield call(downloadUpdate, payload);
        },
        * quitAndInstall({payload}, {call}) {
            return yield call(quitAndInstall, payload);
        },
    },
};
