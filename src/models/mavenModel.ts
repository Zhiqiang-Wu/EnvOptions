// @author 吴志强
// @date 2021/12/2

import {listDependencies} from '@/services/mavenService';

export default {
    namespace: 'mavenModel',
    state: {},
    effects: {
        * listDependencies({payload}, {call}) {
            return yield call(listDependencies, payload);
        },
    },
};
