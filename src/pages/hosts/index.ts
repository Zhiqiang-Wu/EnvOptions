// @author 吴志强
// @date 2021/1/14

import HostsView from '@/pages/hosts/hosts-view';
import {compose, withState, withHandlers, lifecycle} from 'recompose';
import {LIST_HOSTS, SET_HOST} from '@/actions/actionTypes';
import {listHosts, setHost} from '@/actions/actions';
import withDva from '@/components/with-dva';
import {message} from 'antd';
import {createSelector} from 'reselect';
import lodash from 'lodash';

interface IProps {
    dispatch: Function;
    setHosts: Function;
    setSelectedRowKeys: Function;
    selectedRowKeys: Array<number>;
    hosts: Array<Host>;
}

const onReload = ({dispatch, setHosts, setSelectedRowKeys}: IProps) => () => {
    dispatch(listHosts()).then((result: Result) => {
        if (result.code === 200) {
            const hosts: Array<Host> = result.data.hosts;
            setHosts(hosts);
            setSelectedRowKeys(hosts.filter((host) => host.selected).map((host) => host.id));
        } else {
            message.warn(result.message);
        }
    });
};

const onSelectedChange = ({
                              dispatch,
                              selectedRowKeys,
                              hosts,
                              setHosts,
                              setSelectedRowKeys,
                          }: IProps) => (keys: Array<number>, selectedRows: Array<Host>) => {
    let host;
    let selected;
    if (keys.length < selectedRowKeys.length) {
        // 取消选中的id
        const id = lodash.difference(selectedRowKeys, keys)[0];
        host = hosts.find((value) => value.id === id);
        selected = false;
    } else {
        // 新选中的id
        const id = lodash.difference(keys, selectedRowKeys)[0];
        host = selectedRows.find((value) => value.id === id);
        selected = true;
    }
    dispatch(setHost({...host, selected})).then((result: Result) => {
        if (result.code !== 200) {
            return result;
        }
        return dispatch(listHosts());
    }).then((result: Result) => {
        if (result.code !== 200) {
            message.warn(result.message);
            return;
        }
        const hosts: Array<Host> = result.data.hosts;
        setHosts(hosts);
        setSelectedRowKeys(hosts.filter((host) => host.selected).map((host) => host.id));
    });
};

const withLifecycle = lifecycle({
    componentDidMount() {
        const {dispatch, setHosts, setSelectedRowKeys}: any = this.props;
        dispatch(listHosts()).then((result: Result) => {
            if (result.code === 200) {
                const hosts: Array<Host> = result.data.hosts;
                setHosts(hosts);
                setSelectedRowKeys(hosts.filter((host) => host.selected).map((host) => host.id));
            } else {
                message.warn(result.message);
            }
        });
    },
});

const mapStateToProps = (state) => ({
    tableLoading: createSelector([
        (state: any) => state.loading.effects[LIST_HOSTS],
        (state: any) => state.loading.effects[SET_HOST],
    ], (loading1, loading2) => {
        return loading1 === true || loading2 === true;
    })(state),
    reloadButtonDisabled: createSelector([
        (state: any) => state.loading.effects[LIST_HOSTS],
        (state: any) => state.loading.effects[SET_HOST],
    ], (loading1, loading2) => {
        return loading1 === true || loading2 === true;
    })(state),
});

export default compose(
    withDva(mapStateToProps),
    withState('selectedRowKeys', 'setSelectedRowKeys', []),
    withState('hosts', 'setHosts', []),
    withHandlers({
        onReload,
        onSelectedChange,
    }),
    withLifecycle,
)(HostsView);
