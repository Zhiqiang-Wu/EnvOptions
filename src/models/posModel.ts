// @author 吴志强
// @date 2021/12/30

import {Map} from 'immutable';
import {passwordCracking} from '@/services/posService';

export default {
    namespace: 'posModel',
    state: Map({}),
    effects: {
        * passwordCracking({payload}, {call}) {
            return yield call(passwordCracking, payload);
        },
    },
};
