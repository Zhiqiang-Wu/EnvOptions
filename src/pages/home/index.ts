// @author 吴志强
// @date 2021/9/11

import {InputNumber, message} from 'antd';
import {createSelector} from 'reselect';
import {
    LIST_ENVIRONMENT_VARIABLES,
    SET_ENVIRONMENT_VARIABLE,
    DELETE_ENVIRONMENT_VARIABLE,
    INSERT_ENVIRONMENT_VARIABLE,
    UNLOCK_ENVIRONMENT_VARIABLE,
    LOCK_ENVIRONMENT_VARIABLE,
} from '@/actions/actionTypes';
import lodash from 'lodash';
import {compose, lifecycle, withState, pure, withHandlers, withProps} from 'recompose';
import HomeView from '@/pages/home/home-view';
import withDva from '@/components/with-dva';
import {
    listEnvironmentVariables,
    setEnvironmentVariable,
    deleteEnvironmentVariable,
    insertEnvironmentVariable,
    updateSetting,
    getSetting,
    unlockEnvironmentVariable,
    lockEnvironmentVariable,
} from '@/actions/actions';

interface IProps {
    dispatch: Function;
    setDataSource: Function;
    dataSource: Array<EnvironmentVariable>;
    setSelectedRowKeys: Function;
    selectedRowKeys: Array<number>;
    visible: boolean;
    setVisible: Function;
    setTypeChecked: Function;
    history: any;
    setPageSize: Function;
    setSearchText: Function;
}

const onInsert = (props: IProps) => () => {
    const {setVisible} = props;
    setVisible(true);
};

const onOk = (props: IProps) => (value: {key: string, value: string, type: string}) => {
    if (value.key.toUpperCase().trim() === 'PATH') {
        message.warn('不能添加Path变量');
        return;
    }
    if (value.key.toUpperCase().trim() === 'PATHEXT') {
        message.warn('不能添加PATHEXT变量');
        return;
    }
    const {dispatch, dataSource, setDataSource, setSelectedRowKeys, setVisible} = props;
    const exists = dataSource.some((environmentVariable) => {
        return environmentVariable.key.toUpperCase() === value.key.trim().toUpperCase() && environmentVariable.value === value.value.trim();
    });
    if (exists) {
        message.warn('已存在');
        return;
    }
    dispatch(insertEnvironmentVariable(value)).then((result: Result) => {
        if (result.code === 200) {
            setVisible(false);
            message.success('添加成功');
            return dispatch(listEnvironmentVariables());
        } else {
            return result;
        }
    }).then((result: Result) => {
        if (result.code === 200) {
            const environmentVariables: Array<EnvironmentVariable> = result.data.environmentVariables;
            setDataSource(environmentVariables);
            setSelectedRowKeys(environmentVariables.filter((value => value.selected)).map((value) => value.id));
        } else {
            message.warn(result.message);
        }
    });
};

const onCancel = (props: IProps) => () => {
    const {setVisible} = props;
    setVisible(false);
};

const onDelete = (props: IProps) => (environmentVariable: EnvironmentVariable) => {
    const {dispatch, setDataSource, setSelectedRowKeys} = props;
    dispatch(deleteEnvironmentVariable(environmentVariable)).then((result: Result) => {
        if (result.code === 200) {
            message.success('删除成功');
            return dispatch(listEnvironmentVariables());
        } else {
            return result;
        }
    }).then((result: Result) => {
        if (result.code === 200) {
            const environmentVariables: Array<EnvironmentVariable> = result.data.environmentVariables;
            setDataSource(environmentVariables);
            setSelectedRowKeys(environmentVariables.filter((value => value.selected)).map((value) => value.id));
        } else {
            message.warn(result.message);
        }
    });
};

const onEdit = (props: IProps) => (environmentVariable: EnvironmentVariable) => {
    const {history} = props;
    let pathname = '/edit';
    if (environmentVariable.key.toUpperCase() === 'PATH') {
        pathname = '/edit2';
    }
    history.push({
        pathname,
        params: {
            id: environmentVariable.id,
        },
    });
};

const onCopy = ({
                    dataSource,
                    dispatch,
                    setVisible,
                    setDataSource,
                    setSelectedRowKeys,
                }: IProps) => (environmentVariable: EnvironmentVariable) => {
    const value = {
        key: `${environmentVariable.key}_bak`,
        type: environmentVariable.type,
        value: environmentVariable.value,
    };
    for (let i = 1; ; i++) {
        let newKey;
        if (i === 1) {
            newKey = value.key;
        } else {
            newKey = `${value.key}${i}`;
        }
        const exists = dataSource.some((environmentVariable) => {
            return newKey.toUpperCase() === environmentVariable.key.toUpperCase();
        });
        if (!exists) {
            value.key = newKey;
            break;
        }
    }
    dispatch(insertEnvironmentVariable(value)).then((result: Result) => {
        if (result.code === 200) {
            setVisible(false);
            message.success('备份成功');
            return dispatch(listEnvironmentVariables());
        } else {
            return result;
        }
    }).then((result: Result) => {
        if (result.code === 200) {
            const environmentVariables: Array<EnvironmentVariable> = result.data.environmentVariables;
            setDataSource(environmentVariables);
            setSelectedRowKeys(environmentVariables.filter((value => value.selected)).map((value) => value.id));
        } else {
            message.warn(result.message);
        }
    });
};

const onLock = (props: IProps) => (environmentVariable: EnvironmentVariable) => {
    const {dispatch, setDataSource, setSelectedRowKeys} = props;
    dispatch(lockEnvironmentVariable(environmentVariable.id)).then((result: Result) => {
        if (result.code === 200) {
            message.success('锁定成功');
            return dispatch(listEnvironmentVariables());
        } else {
            return result;
        }
    }).then((result: Result) => {
        if (result.code === 200) {
            const environmentVariables: Array<EnvironmentVariable> = result.data.environmentVariables;
            setDataSource(environmentVariables);
            setSelectedRowKeys(environmentVariables.filter((value => value.selected)).map((value) => value.id));
        } else {
            message.warn(result.message);
        }
    });
};

const onUnlock = (props: IProps) => (environmentVariable: EnvironmentVariable) => {
    const {dispatch, setDataSource, setSelectedRowKeys} = props;
    dispatch(unlockEnvironmentVariable(environmentVariable.id)).then((result: Result) => {
        if (result.code === 200) {
            message.success('解锁成功');
            return dispatch(listEnvironmentVariables());
        } else {
            return result;
        }
    }).then((result: Result) => {
        if (result.code === 200) {
            const environmentVariables: Array<EnvironmentVariable> = result.data.environmentVariables;
            setDataSource(environmentVariables);
            setSelectedRowKeys(environmentVariables.filter((value => value.selected)).map((value) => value.id));
        } else {
            message.warn(result.message);
        }
    });
};

const onReload = (props: IProps) => () => {
    const {dispatch, setDataSource, setSelectedRowKeys} = props;
    dispatch(listEnvironmentVariables()).then((result: Result) => {
        if (result.code === 200) {
            const environmentVariables: Array<EnvironmentVariable> = result.data.environmentVariables;
            setDataSource(environmentVariables);
            setSelectedRowKeys(environmentVariables.filter((value => value.selected)).map((value) => value.id));
        } else {
            message.warn(result.message);
        }
    });
};

const onSelectedChange = (props: IProps) => (keys: Array<number>, selectedRows: Array<EnvironmentVariable>) => {
    const {setSelectedRowKeys, selectedRowKeys, dataSource, dispatch, setDataSource} = props;
    let environmentVariable;
    let selected;
    if (keys.length < selectedRowKeys.length) {
        // 取消选中的id
        const id = lodash.difference(selectedRowKeys, keys)[0];
        environmentVariable = dataSource.find((value) => value.id === id);
        selected = false;
    } else {
        // 新选中的id
        const id = lodash.difference(keys, selectedRowKeys)[0];
        environmentVariable = selectedRows.find((value) => value.id === id);
        const index = dataSource.findIndex((value: EnvironmentVariable) => {
            return value.key.toUpperCase() === environmentVariable.key.toUpperCase() && value.selected && value.locked === 1;
        });
        if (index >= 0) {
            message.warn(`存在锁定的 ${environmentVariable.key}`);
            return;
        }
        selected = true;
    }
    dispatch(setEnvironmentVariable({...environmentVariable, selected})).then((result: Result) => {
        if (result.code === 200) {
            message.success('设置成功');
            return dispatch(listEnvironmentVariables());
        } else {
            return result;
        }
    }).then((result: Result) => {
        if (result.code === 200) {
            const environmentVariables: Array<EnvironmentVariable> = result.data.environmentVariables;
            setDataSource(environmentVariables);
            setSelectedRowKeys(environmentVariables.filter((value => value.selected)).map((value) => value.id));
        } else {
            message.warn(result.message);
        }
    });
};

const onSwitchChange = (props: IProps) => (selected) => {
    const {dispatch, setTypeChecked} = props;
    setTypeChecked(selected);
    dispatch(updateSetting([{key: 'type', value: selected}]));
};

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

const showEditAction = () => (environmentVariable: EnvironmentVariable): boolean => {
    if (environmentVariable.key.toUpperCase() === 'PATH' || environmentVariable.key.toUpperCase() === 'PATHEXT') {
        return false;
    }
    return !environmentVariable.locked && !environmentVariable.selected;
};

const showDeleteAction = () => (environmentVariable: EnvironmentVariable): boolean => {
    if (environmentVariable.key.toUpperCase() === 'PATH' || environmentVariable.key.toUpperCase() === 'PATHEXT') {
        return false;
    }
    return !environmentVariable.locked && !environmentVariable.selected;
};

const showLockAction = () => (environmentVariable: EnvironmentVariable): boolean => {
    if (environmentVariable.key.toUpperCase() === 'PATH' || environmentVariable.key.toUpperCase() === 'PATHEXT') {
        return false;
    }
    return environmentVariable.locked === 0;
};

const showUnlockAction = () => (environmentVariable: EnvironmentVariable): boolean => {
    if (environmentVariable.key.toUpperCase() === 'PATH' || environmentVariable.key.toUpperCase() === 'PATHEXT') {
        return false;
    }
    return environmentVariable.locked === 1;
};

const showCopyAction = () => (environmentVariable: EnvironmentVariable) => {
    return environmentVariable.key.toUpperCase() !== 'PATH' && environmentVariable.key.toUpperCase() !== 'PATHEXT';
};

const disabledCheckbox = () => (environmentVariable: EnvironmentVariable) => {
    return environmentVariable.locked === 1 || environmentVariable.key.toUpperCase() === 'PATH' || environmentVariable.key.toUpperCase() === 'PATHEXT';
};

const onFilter = (value: string, record: EnvironmentVariable): boolean => {
    return record.key.toUpperCase().includes(value.toUpperCase());
};

const withLifecycle = lifecycle({
    componentDidMount() {
        const {dispatch, setDataSource, setSelectedRowKeys, setTypeChecked, setPageSize}: any = this.props;
        dispatch(getSetting('type')).then((result: Result) => {
            if (result.code === 200) {
                setTypeChecked(result.data.type);
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
        dispatch(listEnvironmentVariables()).then((result: Result) => {
            if (result.code === 200) {
                const environmentVariables: Array<EnvironmentVariable> = result.data.environmentVariables;
                setDataSource(environmentVariables);
                setSelectedRowKeys(environmentVariables.filter((value => value.selected)).map((value) => value.id));
            } else {
                message.warn(result.message);
            }
        });
    },
});

const sorter = (record1, record2): number => {
    return record1.key.localeCompare(record2.key);
};

const onSearch = ({setSearchText}: IProps) => (selectedKeys, confirm) => {
    confirm();
    setSearchText(selectedKeys[0]);
};

const onDetail = (props: IProps) => (environmentVariable: EnvironmentVariable) => {
    const {history} = props;
    history.push({
        pathname: '/detail',
        params: {
            id: environmentVariable.id,
        },
    });
};

const onReset = ({setSearchText}: IProps) => (clearFilters) => {
    clearFilters();
    setSearchText('');
};

const mapStateToProps = (state) => ({
    tableLoading: createSelector([
        (state: any) => state.loading.effects[LIST_ENVIRONMENT_VARIABLES],
        (state: any) => state.loading.effects[DELETE_ENVIRONMENT_VARIABLE],
        (state: any) => state.loading.effects[SET_ENVIRONMENT_VARIABLE],
        (state: any) => state.loading.effects[UNLOCK_ENVIRONMENT_VARIABLE],
        (state: any) => state.loading.effects[LOCK_ENVIRONMENT_VARIABLE],
    ], (loading1, loading2, loading3, loading4, loading5) => {
        return loading1 === true || loading2 === true || loading3 === true || loading4 === true || loading5 === true;
    })(state),
    okButtonLoading: createSelector([
        (state) => state.loading.effects[INSERT_ENVIRONMENT_VARIABLE],
    ], (loading1) => {
        return loading1 === true;
    }),
});

export default compose(
    pure,
    withDva(mapStateToProps),
    withState('dataSource', 'setDataSource', []),
    withState('selectedRowKeys', 'setSelectedRowKeys', []),
    withState('typeChecked', 'setTypeChecked', false),
    withState('visible', 'setVisible', false),
    withState('pageSize', 'setPageSize', 10),
    withState('searchText', 'setSearchText', ''),
    withHandlers({
        onInsert,
        onSelectedChange,
        onDelete,
        onOk,
        onCancel,
        onReload,
        onEdit,
        onLock,
        onUnlock,
        onSwitchChange,
        onPageSizeChange,
        showEditAction,
        showDeleteAction,
        showLockAction,
        showUnlockAction,
        showCopyAction,
        disabledCheckbox,
        onSearch,
        onReset,
        onDetail,
        onCopy,
    }),
    withProps(() => ({sorter, onFilter})),
    withLifecycle,
)(HomeView);
