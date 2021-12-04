// @author 吴志强
// @date 2021/9/12

import {
    deleteEnvironmentVariable,
    listEnvironmentVariables,
    setEnvironmentVariable,
    insertEnvironmentVariable,
    getEnvironmentVariable,
    updateEnvironmentVariable,
    unlockEnvironmentVariable,
    lockEnvironmentVariable,
} from '@/services/environmentService';
import {Map} from 'immutable';

export default {
    namespace: 'environmentModel',
    state: Map({}),
    effects: {
        * listEnvironmentVariables({payload}, {call}) {
            return yield call(listEnvironmentVariables, payload);
        },
        * setEnvironmentVariable({payload}, {call}) {
            return yield call(setEnvironmentVariable, payload);
        },
        * deleteEnvironmentVariable({payload}, {call}) {
            return yield call(deleteEnvironmentVariable, payload);
        },
        * insertEnvironmentVariable({payload}, {call}) {
            return yield call(insertEnvironmentVariable, payload);
        },
        * getEnvironmentVariable({payload}, {call}) {
            return yield call(getEnvironmentVariable, payload);
        },
        * updateEnvironmentVariable({payload}, {call}) {
            return yield call(updateEnvironmentVariable, payload);
        },
        * unlockEnvironmentVariable({payload}, {call}) {
            return yield call(unlockEnvironmentVariable, payload);
        },
        * lockEnvironmentVariable({payload}, {call}) {
            return yield call(lockEnvironmentVariable, payload);
        },
    },
};
