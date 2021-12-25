// @author 吴志强
// @date 2021/12/24

import ScanView from '@/pages/scan/scan-view';
import {compose, withHandlers, lifecycle, withState} from 'recompose';
import withDva from '@/components/with-dva';
import {createSelector} from 'reselect';
import {updateScanModel, listVideoInputDevices, openScan, closeScan} from '@/actions/actions';
import {message} from 'antd';
import {LIST_VIDEO_INPUT_DEVICES} from '@/actions/actionTypes';
import lodash from 'lodash';

interface IProps {
    dispatch: Function;
    enable: boolean;
    selectedRowKeys: Array<string>;
    setSelectedRowKeys: Function;
    delay: number;
}

const onSwitchChange = ({dispatch, selectedRowKeys, delay}: IProps) => (enable) => {
    dispatch(updateScanModel([
        {keyPath: ['enable'], value: enable}
    ]));
    if (enable) {
        dispatch(openScan({deviceId: selectedRowKeys[0], delay}));
    } else {
        dispatch(closeScan());
    }
};

const onSelectedChange = ({selectedRowKeys, enable, dispatch}: IProps) => (keys: Array<string>) => {
    if (enable) {
        return;
    }
    dispatch(updateScanModel([
        {keyPath: ['selectedRowKeys'], value: lodash.xor(selectedRowKeys, keys)}
    ]));
};

const onDelayChange = ({dispatch}: IProps) => (delay) => {
    if (!delay) {
        return;
    }
    dispatch(updateScanModel([{
        keyPath: ['delay'], value: delay
    }]));
};

const withLifecycle = lifecycle({
    componentDidMount() {
        const {dispatch, setVideoInputDevices, selectedRowKeys}: any = this.props;
        dispatch(listVideoInputDevices()).then((result: Result) => {
            if (result.code != 200) {
                message.warn(result.message);
                return;
            }
            const videoInputDevices: Array<VideoInputDevice> = result.data.videoInputDevices;
            if (videoInputDevices.length > 0) {
                if (selectedRowKeys.length <= 0) {
                    dispatch(updateScanModel([
                        {keyPath: ['selectedRowKeys'], value: [videoInputDevices[0].deviceId]}
                    ]));
                }
                setVideoInputDevices(result.data.videoInputDevices);
            }
        });
    }
});

const mapStateToProps = (state) => ({
    enable: createSelector((state: any) => {
        return state.scanModel.get('enable');
    }, (enable) => {
        return enable;
    })(state),
    delay: createSelector(() => {
        return state.scanModel.get('delay');
    }, (delay) => {
        return delay;
    })(state),
    loading: createSelector(() => {
        return state.loading.effects[LIST_VIDEO_INPUT_DEVICES]
    }, (loading) => {
        return loading === true;
    })(state),
    selectedRowKeys: createSelector(() => {
        return state.scanModel.get('selectedRowKeys');
    }, (selectedRowKeys) => {
        return selectedRowKeys.toJS();
    })(state),
});

export default compose(
    withDva(mapStateToProps),
    withState('videoInputDevices', 'setVideoInputDevices', []),
    withHandlers({
        onSwitchChange,
        onSelectedChange,
        onDelayChange,
    }),
    withLifecycle,
)(ScanView);
