// @author 吴志强
// @date 2021/1/14

import HostsView from '@/pages/hosts/hosts-view';
import {compose, withState, withHandlers, lifecycle} from 'recompose';
import {LIST_HOSTS, SET_HOST, DELETE_HOST, READ_HOSTS_FILE, WRITE_HOSTS_FILE, INSERT_HOST} from '@/actions/actionTypes';
import {
    listHosts,
    setHost,
    deleteHost,
    openHostsFile,
    readHostsFile,
    writeHostsFile,
    getSetting,
    insertHost,
} from '@/actions/actions';
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
    setHostsStr: Function;
    setVisible: Function;
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

const onReload2 = ({dispatch, setHostsStr}: IProps) => () => {
    dispatch(readHostsFile()).then((result: Result) => {
        if (result.code === 200) {
            setHostsStr(result.data.hostsStr);
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

const onDelete = ({dispatch, setHosts, setSelectedRowKeys}: IProps) => (host: Host) => {
    dispatch(deleteHost(host)).then((result: Result) => {
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

const showDeleteAction = () => (host: Host) => {
    return !host.selected;
};

const onOpenHost = ({dispatch}: IProps) => () => {
    dispatch(openHostsFile());
};

const onTabChange = ({dispatch, setHosts, setSelectedRowKeys, setHostsStr}: IProps) => (key) => {
    if (key === '1') {
        dispatch(listHosts()).then((result: Result) => {
            if (result.code === 200) {
                const hosts: Array<Host> = result.data.hosts;
                setHosts(hosts);
                setSelectedRowKeys(hosts.filter((host) => host.selected).map((host) => host.id));
            } else {
                message.warn(result.message);
            }
        });
    } else {
        dispatch(readHostsFile()).then((result: Result) => {
            if (result.code === 200) {
                setHostsStr(result.data.hostsStr);
            } else {
                message.warn(result.message);
            }
        });
    }
};

let timer;

const onHostsStrChange = ({setHostsStr, dispatch}: IProps) => (e) => {
    setHostsStr(e.target.value);
    clearTimeout(timer);
    timer = setTimeout(() => {
        dispatch(writeHostsFile(e.target.value));
    }, 500);
};

const withLifecycle = lifecycle({
    componentDidMount() {
        const {dispatch, setHosts, setSelectedRowKeys, setPageSize}: any = this.props;
        dispatch(listHosts()).then((result: Result) => {
            if (result.code === 200) {
                const hosts: Array<Host> = result.data.hosts;
                setHosts(hosts);
                setSelectedRowKeys(hosts.filter((host) => host.selected).map((host) => host.id));
            } else {
                message.warn(result.message);
            }
        });
        dispatch(getSetting('pageSize')).then((result: Result) => {
            if (result.code === 200) {
                const pageSize = result.data.pageSize;
                if (pageSize && pageSize >= 1 && pageSize <= 20) {
                    setPageSize(pageSize);
                }
            }
        });
    },
});

const onInsert = ({setVisible}: IProps) => () => {
    setVisible(true);
};

const onCancel = ({setVisible}: IProps) => () => {
    setVisible(false);
};

const onOk = ({dispatch, setHosts, setSelectedRowKeys, setVisible}: IProps) => (value) => {
    dispatch(insertHost(value)).then((result: Result) => {
        if (result.code !== 200) {
            return result;
        }
        return dispatch(listHosts());
    }).then((result: Result) => {
        if (result.code !== 200) {
            message.warn(result.message);
            return;
        }
        setVisible(false);
        const hosts: Array<Host> = result.data.hosts;
        setHosts(hosts);
        setSelectedRowKeys(hosts.filter((host) => host.selected).map((host) => host.id));
    });
};

const mapStateToProps = (state) => ({
    tableLoading: createSelector([
        (state: any) => state.loading.effects[LIST_HOSTS],
        (state: any) => state.loading.effects[SET_HOST],
        (state: any) => state.loading.effects[DELETE_HOST],
    ], (loading1, loading2, loading3) => {
        return loading1 === true || loading2 === true || loading3 === true;
    })(state),
    reloadButtonDisabled: createSelector([
        (state: any) => state.loading.effects[LIST_HOSTS],
        (state: any) => state.loading.effects[SET_HOST],
        (state: any) => state.loading.effects[DELETE_HOST],
    ], (loading1, loading2, loading3) => {
        return loading1 === true || loading2 === true || loading3 === true;
    })(state),
    reloadButton2Disabled: createSelector([
        (state: any) => state.loading.effects[READ_HOSTS_FILE],
        (state: any) => state.loading.effects[WRITE_HOSTS_FILE],
    ], (loading1, loading2) => {
        return loading1 === true || loading2 === true;
    })(state),
    tabPane1Disabled: createSelector([
        (state: any) => state.loading.effects[READ_HOSTS_FILE],
        (state: any) => state.loading.effects[WRITE_HOSTS_FILE],
        (state: any) => state.loading.effects[LIST_HOSTS],
        (state: any) => state.loading.effects[SET_HOST],
        (state: any) => state.loading.effects[DELETE_HOST],
    ], (loading1, loading2, loading3, loading4, loading5) => {
        return loading1 === true || loading2 === true || loading3 === true || loading4 === true || loading5 === true;
    })(state),
    tabPane2Disabled: createSelector([
        (state: any) => state.loading.effects[READ_HOSTS_FILE],
        (state: any) => state.loading.effects[WRITE_HOSTS_FILE],
        (state: any) => state.loading.effects[LIST_HOSTS],
        (state: any) => state.loading.effects[SET_HOST],
        (state: any) => state.loading.effects[DELETE_HOST],
    ], (loading1, loading2, loading3, loading4, loading5) => {
        return loading1 === true || loading2 === true || loading3 === true || loading4 === true || loading5 === true;
    })(state),
    okButtonLoading: createSelector([
        (state: any) => state.loading.effects[INSERT_HOST],
    ], (loading1) => {
        return loading1 === true;
    })(state),
});

export default compose(
    withDva(mapStateToProps),
    withState('visible', 'setVisible', false),
    withState('selectedRowKeys', 'setSelectedRowKeys', []),
    withState('hosts', 'setHosts', []),
    withState('hostsStr', 'setHostsStr', ''),
    withState('pageSize', 'setPageSize', 10),
    withHandlers({
        onOk,
        onInsert,
        onCancel,
        onReload,
        onReload2,
        onSelectedChange,
        showDeleteAction,
        onDelete,
        onOpenHost,
        onTabChange,
        onHostsStrChange,
    }),
    withLifecycle,
)(HostsView);
