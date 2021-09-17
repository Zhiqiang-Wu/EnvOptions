// @author 吴志强
// @date 2021/9/12

import {
    deleteEnvironmentVariable, listEnvironmentVariables, setEnvironmentVariable,
} from '@/services/environmentService';

export default {
    namespace: 'environmentModel',
    state: {},
    effects: {
        * listEnvironmentVariables({payload}, {call, put}) {
            return yield call(listEnvironmentVariables, payload);
        },
        * setEnvironmentVariable({payload}, {call}) {
            return yield call(setEnvironmentVariable, payload);
        },
        * deleteEnvironmentVariable({payload}, {call}) {
            return yield call(deleteEnvironmentVariable, payload);
        },
    },
};
