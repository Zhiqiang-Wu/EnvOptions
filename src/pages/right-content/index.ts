// @author 吴志强
// @date 2021/10/6

import {compose, withState, pure} from 'recompose';
import RightContentView from '@/pages/right-content/right-content-view';
import toFunction from '@/components/to-function';
import withMain from '@/components/with-main';
import {ProgressInfo} from 'electron-updater';
import {message} from 'antd';

interface IProps {
    setPercent: Function;
}

const updateDownloadProgress = ({setPercent}: IProps) => (progress: ProgressInfo) => {
    window.localFunctions.log.info('%j', progress);
};

const updateError = ({setPercent}: IProps) => (err: Error) => {
    message.warn(err.message);
};

const updateDownloaded = ({setPercent}: IProps) => () => {
    setPercent(100);
};

const mapPropsToComponent = (props) => {
    return {
        progressWidth: props.headerHeight - 13,
    };
};

export default toFunction(compose(
    withState('percent', 'setPercent', 0),
    withMain('updateDownloadProgress', updateDownloadProgress),
    withMain('updateError', updateError),
    withMain('updateDownloaded', updateDownloaded),
    pure,
)(RightContentView), mapPropsToComponent);
