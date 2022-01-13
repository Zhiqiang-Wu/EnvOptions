// @author 吴志强
// @date 2022/1/14

import {Map} from 'immutable';
import {listHosts} from '@/services/hostsService';

export default {
    namespace: 'hostModel',
    state: Map({}),
    effects: {
        * listHosts({payload}, {call}) {
            return yield call(listHosts, payload);
        },
    },
};
