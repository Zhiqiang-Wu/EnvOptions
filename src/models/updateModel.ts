// @author 吴志强
// @date 2021/10/6

import {checkForUpdates, downloadUpdate, quitAndInstall} from '@/services/upateService';
import {fromJS, Map} from 'immutable';

export default {
    namespace: 'updateModel',
    state: Map({
        progressVisible: false,
        progressPercent: 0,
        progressStatus: 'normal',
        updateButtonVisible: false,
    }),
    reducers: {
        updateUpdateModel(state, action) {
            let newState = state;
            action.payload.forEach((value) => {
                newState = newState.setIn(value.keyPath, fromJS(value.value));
            });
            return newState;
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
