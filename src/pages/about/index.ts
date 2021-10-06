// @author 吴志强
// @date 2021/9/27

import {compose, withHandlers, pure, withState} from 'recompose';
import AboutView from '@/pages/about/about-view';
import withDva from '@/components/with-dva';
import {createSelector} from 'reselect';
import {CHECK_FOR_UPDATES, DOWNLOAD_UPDATE} from '@/actions/actionTypes';
import {checkForUpdates} from '@/actions/actions';
import {message} from 'antd';
import withMain from '@/components/with-main';
import {UpdateInfo} from 'electron-updater';
import {downloadUpdate} from '@/actions/actions';

interface IProps {
    dispatch: Function;
    setUpdateInfo: Function;
}

const onCheck = ({dispatch}: IProps) => () => {
    dispatch(checkForUpdates());
};

const onUpdate = ({dispatch}: IProps) => () => {
    dispatch(downloadUpdate()).then((result) => {

    });
};

const updateAvailable = ({setUpdateInfo}: IProps) => (updateInfo: UpdateInfo) => {
    message.info('有新版本');
    setUpdateInfo(updateInfo);
};

const updateNotAvailable = ({setUpdateInfo}: IProps) => () => {
    message.info('当前已经是最新版本');
    setUpdateInfo(null);
};

const selector = createSelector((state: any) => ({
    loadings: state.loading.effects,
}), ({loadings}) => ({
    checkLoading: loadings[CHECK_FOR_UPDATES] === true,
    updateLoading: loadings[DOWNLOAD_UPDATE] === true,
}));

const mapStateToProps = (state) => selector(state);

export default compose(
    withDva(mapStateToProps),
    withHandlers({
        onCheck,
        onUpdate,
    }),
    withState('updateInfo', 'setUpdateInfo', null),
    withMain('updateAvailable', updateAvailable),
    withMain('updateNotAvailable', updateNotAvailable),
    pure
)(AboutView);
