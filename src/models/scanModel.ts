// @author 吴志强
// @date 2021/12/24

import {fromJS, Map, List} from 'immutable';
import {listVideoInputDevices, openScan, closeScan} from '@/services/scanService';

export default {
    namespace: 'scanModel',
    state: Map({
        enable: false,
        selectedRowKeys: List([]),
        delay: 2000,
        suffix: '',
        enter: false,
    }),
    reducers: {
        updateScanModel(state, action) {
            let newState = state;
            action.payload.forEach((value) => {
                newState = newState.setIn(value.keyPath, fromJS(value.value));
            });
            return newState;
        },
    },
    effects: {
        * listVideoInputDevices({payload}, {call}) {
            return yield call(listVideoInputDevices, payload);
        },
        * openScan({payload}, {call}) {
            return yield call(openScan, payload);
        },
        * closeScan({payload}, {call}) {
            return yield call(closeScan, payload);
        },
    },
};
