// @author 吴志强
// @date 2021/10/6

import {compose, withState, pure} from 'recompose';
import RightContentView from '@/pages/right-content/right-content-view';
import toFunction from '@/components/to-function';
import withMain from '@/components/with-main';

interface IProps {
    setPercent: Function;
}

const updateDownloadProgress = ({setPercent}: IProps) => () => {

};

const mapPropsToComponent = (props) => {
    return {
        progressWidth: props.headerHeight - 13,
    };
};

export default toFunction(compose(
    withState('percent', 'setPercent', 0),
    withMain('updateDownloadProgress', updateDownloadProgress),
    pure,
)(RightContentView), mapPropsToComponent);
