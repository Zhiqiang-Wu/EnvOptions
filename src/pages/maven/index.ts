// @author 吴志强
// @date 2021/12/2

import MavenView from '@/pages/maven/maven-view';
import withDva from '@/components/with-dva';
import {compose, withState, withHandlers} from 'recompose';
import {listDependencies, exportDependency} from '@/actions/actions';
import {message} from 'antd';
import lodash from 'lodash';

interface IProps {
    setDataSource,
    dispatch,
    setSourcePath,
    setSelectedRowKeys,
    dataSource,
    sourcePath
}

const onPomClick = ({setDataSource, dispatch}: IProps) => () => {
    const options: OpenDialogOptions1 = {
        modal: true,
        properties: ['openFile'],
        filters: [{extensions: ['xml'], name: 'pom文件'}],
    };
    window.localFunctions.showOpenDialog(options).then((result) => {
        if (result.canceled || !result.filePaths[0]) {
            return;
        }
        return dispatch(listDependencies(result.filePaths[0]));
    }).then((result: Result | undefined) => {
        if (!result) {
            return;
        }
        if (result.code != 200) {
            message.warn(result.message);
            return;
        }
        const dependencies: Array<Dependency> = result.data.dependencies;
        if (dependencies.length == 0) {
            message.warn('没有依赖信息');
            return;
        }
        setDataSource(dependencies);
    });
};

const onSourceClick = ({setSourcePath}: IProps) => () => {
    const options: OpenDialogOptions1 = {
        modal: true,
        properties: ['openDirectory'],
    };
    window.localFunctions.showOpenDialog(options).then((result) => {
        if (result.canceled || !result.filePaths[0]) {
            return;
        }
        setSourcePath(result.filePaths[0]);
    });
};

const disabledCheckbox = () => (dependency: Dependency) => {
    return !lodash.trim(dependency.version) || !lodash.trim(dependency.groupId) || !lodash.trim(dependency.artifactId);
};

const onSelectedChange = ({setSelectedRowKeys}: IProps) => (keys) => {
    setSelectedRowKeys(keys);
};

const export1 = ({dispatch, dataSource, sourcePath}: IProps) => (keys: Array<string>) => {
    const options: OpenDialogOptions1 = {
        modal: true,
        properties: ['openDirectory'],
    };
    window.localFunctions.showOpenDialog(options).then((result) => {
        if (result.canceled || !result.filePaths[0]) {
            return;
        }
        const dependencies = keys.map((key) => {
            return dataSource.find((value) => value.id === key);
        });
        return dispatch(exportDependency({
            targetPath: result.filePaths[0],
            dependencies,
            sourcePath
        }));
    });
};

export default compose(
    withDva(),
    withState('dataSource', 'setDataSource', []),
    withState('sourcePath', 'setSourcePath', ''),
    withState('selectedRowKeys', 'setSelectedRowKeys', []),
    withHandlers({
        onPomClick,
        onSourceClick,
        disabledCheckbox,
        export1,
        onSelectedChange
    }),
)(MavenView);
