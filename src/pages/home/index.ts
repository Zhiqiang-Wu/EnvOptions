// @author 吴志强
// @date 2021/9/11

import {message} from 'antd';
import {createSelector} from 'reselect';
import {
    LIST_ENVIRONMENT_VARIABLES, SET_ENVIRONMENT_VARIABLE, DELETE_ENVIRONMENT_VARIABLE,
    INSERT_ENVIRONMENT_VARIABLE,
} from '@/actions/actionTypes';
import loadsh from 'loadsh';
import {compose, lifecycle, withState, pure, withHandlers} from 'recompose';
import HomeView from '@/pages/home/home-view';
import withDva from '@/components/with-dva';
import {
    listEnvironmentVariables, setEnvironmentVariable, deleteEnvironmentVariable,
    insertEnvironmentVariable,
} from '@/actions/actions';

interface IProps {
    dispatch: Function;
    setDataSource: Function;
    dataSource: Array<EnvironmentVariable>;
    setSelectedRowKeys: Function;
    selectedRowKeys: Array<number>;
    visible: boolean;
    setVisible: Function;
    history: any;
}

const onInsert = (props: IProps) => () => {
    const {setVisible} = props;
    setVisible(true);
};

const onOk = (props: IProps) => (value: {key: string, value: string}) => {
    const {dispatch, dataSource, setDataSource, setSelectedRowKeys, setVisible} = props;
    const exists = dataSource.some((environmentVariable) => {
        return environmentVariable.key === value.key && environmentVariable.value === value.value;
    });
    if (exists) {
        message.warn('已存在');
        return;
    }
    const environmentVariable = {
        ...value,
        type: 'REG_SZ',
    };
    dispatch(insertEnvironmentVariable(environmentVariable)).then(async (result: Result) => {
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
    history.push({
        pathname: '/edit',
        params: {
            id: environmentVariable.id
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

const selectedOnChange = (props: IProps) => (keys: Array<number>, selectedRows: Array<EnvironmentVariable>) => {
    const {setSelectedRowKeys, selectedRowKeys, dataSource, dispatch} = props;
    let environmentVariable;
    let selected;
    if (keys.length < selectedRowKeys.length) {
        // 取消选中的id
        const id = loadsh.difference(selectedRowKeys, keys)[0];
        environmentVariable = dataSource.find((value) => value.id === id);
        selected = false;
    } else {
        // 新选中的id
        const id = loadsh.difference(keys, selectedRowKeys)[0];
        environmentVariable = selectedRows.find((value) => value.id === id);
        selected = true;
    }
    dispatch(setEnvironmentVariable({...environmentVariable, selected})).then((result: Result) => {
        if (result.code === 200) {
            setSelectedRowKeys(keys);
        } else {
            message.warn(result.message);
        }
    });
};

const withLifecycle = lifecycle({
    componentDidMount() {
        const {dispatch, setDataSource, setSelectedRowKeys}: any = this.props;
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

const selector = createSelector((state: any) => ({
    loadings: state.loading.effects,
}), ({loadings}) => ({
    tableLoading: loadings[LIST_ENVIRONMENT_VARIABLES] === true
        || loadings[DELETE_ENVIRONMENT_VARIABLE] === true
        || loadings[SET_ENVIRONMENT_VARIABLE] === true,
    onButtonLoading: loadings[INSERT_ENVIRONMENT_VARIABLE] === true,
}));

const mapStateToProps = (state) => selector(state);

export default compose(
    withDva(mapStateToProps),
    withState('dataSource', 'setDataSource', []),
    withState('selectedRowKeys', 'setSelectedRowKeys', []),
    withState('visible', 'setVisible', false),
    withHandlers({
        onInsert, selectedOnChange, onDelete, onOk, onCancel, onReload, onEdit,
    }),
    withLifecycle,
    pure,
)(HomeView);
