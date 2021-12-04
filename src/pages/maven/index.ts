// @author 吴志强
// @date 2021/12/2

import MavenView from '@/pages/maven/maven-view';
import withDva from '@/components/with-dva';
import {compose, withState, withHandlers, lifecycle} from 'recompose';
import {listDependencies, exportDependency, listSourcePaths} from '@/actions/actions';
import {message} from 'antd';
import lodash from 'lodash';
import withMain from '@/components/with-main';

interface IProps {
    setDependencies: Function;
    dispatch: Function;
    setSourcePath: Function;
    setSelectedRowKeys: Function;
    dependencies: Array<any>;
    sourcePath: string;
}

const onPomClick = ({setDependencies, dispatch}: IProps) => () => {
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
        setDependencies(dependencies);
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

const export1 = ({dispatch, dependencies, sourcePath}: IProps) => (keys: Array<string>) => {
    const options: OpenDialogOptions1 = {
        modal: true,
        properties: ['openDirectory'],
    };
    window.localFunctions.showOpenDialog(options).then((result) => {
        if (result.canceled || !result.filePaths[0]) {
            return;
        }
        const dependencies1 = keys.map((key) => {
            return dependencies.find((value) => value.id === key);
        });
        dispatch(exportDependency({
            targetPath: result.filePaths[0],
            dependencies: dependencies1,
            sourcePath,
        }));
    });
};

const exportProgress = ({dependencies, setDependencies}: IProps) => (event, exportInfo: ExportInfo) => {
    setDependencies(dependencies.map((dependency) => {
        if (dependency.id === exportInfo.id) {
            dependency.status = exportInfo.status;
            return dependency;
        } else {
            return dependency;
        }
    }));
};

const onGroupIdSave = ({dependencies, setDependencies}: IProps) => (values) => {
    if(!lodash.trim(values.groupId)) {
        return;
    }
    setDependencies(dependencies.map((dependency) => {
        if (dependency.id === values.id) {
            dependency.groupId = values.groupId;
        }
        return dependency;
    }));
};

const onArtifactIdSave = ({dependencies, setDependencies}: IProps) => (values) => {
    if (!lodash.trim(values.artifactId)) {
        return;
    }
    setDependencies(dependencies.map((dependency) => {
        if (dependency.id === values.id) {
            dependency.artifactId = values.artifactId;
        }
        return dependency;
    }));
};

const onVersionSave = ({dependencies, setDependencies}: IProps) => (values) => {
    if (!lodash.trim(values.version)) {
        return;
    }
    setDependencies(dependencies.map((dependency) => {
        if (dependency.id === values.id) {
            dependency.version = values.version;
        }
        return dependency;
    }));
};

const withLifecycle = lifecycle({
    componentDidMount() {
        const {dispatch, setSourcePaths}: any = this.props;
        dispatch(listSourcePaths()).then((result: Result) => {
            if (result.code !== 200) {
                message.warn(result.message);
                return;
            }
            setSourcePaths(result.data.sourcePaths);
        });
    }
});

export default compose(
    withDva(),
    withState('dependencies', 'setDependencies', []),
    withMain('exportProgress', exportProgress),
    withState('sourcePath', 'setSourcePath', undefined),
    withState('sourcePaths', 'setSourcePaths', []),
    withState('selectedRowKeys', 'setSelectedRowKeys', []),
    withHandlers({
        onPomClick,
        onSourceClick,
        disabledCheckbox,
        export1,
        onGroupIdSave,
        onArtifactIdSave,
        onSelectedChange,
        onVersionSave,
    }),
    withLifecycle,
)(MavenView);
