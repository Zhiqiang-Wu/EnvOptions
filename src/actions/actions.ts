// @author 吴志强
// @date 2021/9/11

import {createAction} from 'redux-actions';
import {
    LIST_ENVIRONMENT_VARIABLES, DELETE_ENVIRONMENT_VARIABLE, SET_ENVIRONMENT_VARIABLE,
} from '@/actions/actionTypes';

export const listEnvironmentVariables = createAction(LIST_ENVIRONMENT_VARIABLES);
export const deleteEnvironmentVariable = createAction(DELETE_ENVIRONMENT_VARIABLE);
export const setEnvironmentVariable = createAction(SET_ENVIRONMENT_VARIABLE);
