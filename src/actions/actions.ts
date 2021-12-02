// @author 吴志强
// @date 2021/9/11

import {createAction} from 'redux-actions';
import {
    LIST_ENVIRONMENT_VARIABLES,
    DELETE_ENVIRONMENT_VARIABLE,
    SET_ENVIRONMENT_VARIABLE,
    INSERT_ENVIRONMENT_VARIABLE,
    GET_ENVIRONMENT_VARIABLE,
    UPDATE_ENVIRONMENT_VARIABLE,
    UNLOCK_ENVIRONMENT_VARIABLE,
    LOCK_ENVIRONMENT_VARIABLE,
    UPDATE_SETTING,
    GET_SETTING,
    CHECK_FOR_UPDATES,
    DOWNLOAD_UPDATE,
    UPDATE_UPDATE_MODEL,
    QUID_AND_INSTALL,
    LIST_DEPENDENCIES,
    EXPORT_DEPENDENCY,
} from '@/actions/actionTypes';

export const listEnvironmentVariables = createAction(LIST_ENVIRONMENT_VARIABLES);
export const deleteEnvironmentVariable = createAction(DELETE_ENVIRONMENT_VARIABLE);
export const setEnvironmentVariable = createAction(SET_ENVIRONMENT_VARIABLE);
export const insertEnvironmentVariable = createAction(INSERT_ENVIRONMENT_VARIABLE);
export const getEnvironmentVariable = createAction(GET_ENVIRONMENT_VARIABLE);
export const updateEnvironmentVariable = createAction(UPDATE_ENVIRONMENT_VARIABLE);
export const unlockEnvironmentVariable = createAction(UNLOCK_ENVIRONMENT_VARIABLE);
export const lockEnvironmentVariable = createAction(LOCK_ENVIRONMENT_VARIABLE);

export const updateSetting = createAction(UPDATE_SETTING);
export const getSetting = createAction(GET_SETTING);

export const checkForUpdates = createAction(CHECK_FOR_UPDATES);
export const downloadUpdate = createAction(DOWNLOAD_UPDATE);
export const quitAndInstall = createAction(QUID_AND_INSTALL);
export const updateUpdateModel = createAction(UPDATE_UPDATE_MODEL);

export const listDependencies = createAction(LIST_DEPENDENCIES);
export const exportDependency = createAction(EXPORT_DEPENDENCY);
