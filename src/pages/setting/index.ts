// @author 吴志强
// @date 2021/9/19

import {compose, lifecycle, withState, withHandlers} from 'recompose';
import SettingView from '@/pages/setting/setting-view';
import {getSetting, updateSetting} from '@/actions/actions';
import withDva from '@/components/with-dva';

interface IProps {
    setPageSize: Function;
    dispatch: Function;
}

let timer;

const onPageSizeChange = (props: IProps) => (pageSize) => {
    if (!pageSize) {
        return;
    }
    const {dispatch, setPageSize} = props;
    setPageSize(pageSize);
    // 限流
    clearTimeout(timer);
    timer = setTimeout(() => {
        dispatch(updateSetting([{key: 'pageSize', value: pageSize}]));
    }, 500);
};

const withLifecycle = lifecycle({
    componentDidMount() {
        const {dispatch, setPageSize}: any = this.props;
        dispatch(getSetting('pageSize')).then((result: Result) => {
            if (result.code === 200) {
                const pageSize = result.data.pageSize;
                if (pageSize && pageSize >= 1 && pageSize <= 20) {
                    setPageSize(pageSize);
                }
            }
        });
    }
});

export default compose(
    withDva(),
    withState('pageSize', 'setPageSize', 10),
    withHandlers({
        onPageSizeChange,
    }),
    withLifecycle,
)(SettingView);
