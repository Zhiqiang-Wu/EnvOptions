// @author 吴志强
// @date 2021/10/6

import {compose} from 'recompose';
import RightContentView from '@/pages/right-content/right-content-view';
import toFunction from '@/components/to-function';

const mapPropsToComponent = (props) => {
    return {
        progressWidth: props.headerHeight - 13
    };
};

export default toFunction(compose()(RightContentView), mapPropsToComponent);
