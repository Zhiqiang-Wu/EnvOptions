// @author 吴志强
// @date 2021/12/2

import {
    listDependencies,
    exportDependency,
    listSourcePaths,
    insertSourcePath,
    deleteSourcePath,
} from '@/services/mavenService';
import {Map} from 'immutable';

export default {
    namespace: 'mavenModel',
    state: Map({}),
    effects: {
        * listDependencies({payload}, {call}) {
            return yield call(listDependencies, payload);
        },
        * exportDependency({payload}, {call}) {
            return yield call(exportDependency, payload);
        },
        * listSourcePaths({payload}, {call}) {
            return yield call(listSourcePaths, payload);
        },
        * insertSourcePath({payload}, {call}) {
            return yield call(insertSourcePath, payload);
        },
        * deleteSourcePath({payload}, {call}) {
            return yield call(deleteSourcePath, payload);
        },
    },
};
