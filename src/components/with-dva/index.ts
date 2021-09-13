// @author 吴志强
// @date 2021/9/12

import {connect} from 'umi';

const withDva = (mapStateToProps?) => (BaseComponent) => {
    return connect(mapStateToProps)(BaseComponent);
};

export default withDva;
