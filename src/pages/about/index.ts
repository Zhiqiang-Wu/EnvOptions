// @author 吴志强
// @date 2021/9/27

import {compose, withHandlers, pure} from 'recompose';
import AboutView from '@/pages/about/about-view';
import withDva from '@/components/with-dva';
import {createSelector} from 'reselect';
import {CHECK_FOR_UPDATES} from '@/actions/actionTypes';
import {checkForUpdates} from '@/actions/actions';
import {message} from 'antd';
import withMain from '@/components/with-main';

interface IProps {
    dispatch: Function;
}

const onCheck = ({dispatch}: IProps) => () => {
    dispatch(checkForUpdates());
};

const updateAvailable = () => () => {
    message.info('有新版本');
};

const updateNotAvailable = () => () => {
    message.info('当前已经是最新版本');
};

const selector = createSelector((state: any) => ({
    loadings: state.loading.effects,
}), ({loadings}) => ({
    loading: loadings[CHECK_FOR_UPDATES] === true,
}));

const mapStateToProps = (state) => selector(state);

export default compose(
    withDva(mapStateToProps),
    withHandlers({
        onCheck,
    }),
    withMain('updateAvailable', updateAvailable),
    withMain('updateNotAvailable', updateNotAvailable),
    pure
)(AboutView);
