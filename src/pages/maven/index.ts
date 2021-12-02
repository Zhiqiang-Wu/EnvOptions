// @author 吴志强
// @date 2021/12/2

import MavenView from '@/pages/maven/maven-view';
import withDva from '@/components/with-dva';
import {compose, lifecycle, withState, pure, withHandlers, withProps} from 'recompose';
import {LIST_DEPENDENCIES} from '@/actions/actionTypes';
import {listDependencies} from '@/actions/actions';

interface IProps {
    dataSource,
    setDataSource,
    dispatch,
}

const onSelect = ({dataSource, setDataSource, dispatch}: IProps) => () => {
    const options: OpenDialogOptions1 = {
        modal: true,
        properties: ['openFile'],
        filters: [{extensions: ['xml'], name: 'pom文件'}]
    };
    window.localFunctions.showOpenDialog(options).then((result) => {
        if (result.canceled || !result.filePaths[0]) {
            return;
        }
        return dispatch(listDependencies(result.filePaths[0]));
    }).then((result) => {
        if (!result) {
            return;
        }
        console.log(result);
    });
};

export default compose(
    withDva(),
    withState('dataSource', 'setDataSource', []),
    withHandlers({
        onSelect,
    }),
)(MavenView);
