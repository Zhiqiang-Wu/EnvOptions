// @author 吴志强
// @date 2022/1/14

import {Map} from 'immutable';
import {listHosts, setHost, deleteHost, openHost} from '@/services/hostsService';

export default {
    namespace: 'hostModel',
    state: Map({}),
    effects: {
        * listHosts({payload}, {call}) {
            return yield call(listHosts, payload);
        },
        * setHost({payload}, {call}) {
            return yield call(setHost, payload);
        },
        * deleteHost({payload}, {call}) {
            return yield call(deleteHost, payload);
        },
        * openHost({payload}, {call}) {
            return yield call(openHost, payload);
        },
    },
};
