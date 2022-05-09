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
    LIST_SOURCE_PATHS,
    INSERT_SOURCE_PATH,
    DELETE_SOURCE_PATH,
    UPDATE_SCAN_MODEL,
    LIST_VIDEO_INPUT_DEVICES,
    OPEN_SCAN,
    CLOSE_SCAN,
    LIST_HOSTS,
    SET_HOST,
    DELETE_HOST,
    OPEN_HOSTS_FILE,
    READ_HOSTS_FILE,
    WRITE_HOSTS_FILE,
    INSERT_HOST,
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
export const listSourcePaths = createAction(LIST_SOURCE_PATHS);
export const insertSourcePath = createAction(INSERT_SOURCE_PATH);
export const deleteSourcePath = createAction(DELETE_SOURCE_PATH);

export const updateScanModel = createAction(UPDATE_SCAN_MODEL);
export const listVideoInputDevices = createAction(LIST_VIDEO_INPUT_DEVICES);
export const openScan = createAction(OPEN_SCAN);
export const closeScan = createAction(CLOSE_SCAN);

export const listHosts = createAction(LIST_HOSTS);
export const setHost = createAction(SET_HOST);
export const deleteHost = createAction(DELETE_HOST);
export const openHostsFile = createAction(OPEN_HOSTS_FILE);
export const readHostsFile = createAction(READ_HOSTS_FILE);
export const writeHostsFile = createAction(WRITE_HOSTS_FILE);
export const insertHost = createAction(INSERT_HOST);
