// @author 吴志强
// @date 2021/9/12

import {getSetting, updateSetting} from '@/services/settingService';
import {Map} from 'immutable';

export default {
    namespace: 'settingModel',
    state: Map({}),
    effects: {
        * getSetting({payload}, {call}) {
            return yield call(getSetting, payload);
        },
        * updateSetting({payload}, {call}) {
            return yield call(updateSetting, payload);
        }
    },
};
