// @author 吴志强
// @date 2021/10/27

import {compose, lifecycle, pure, withState, withHandlers} from 'recompose';
import DetailView from '@/pages/detail/detail-view';
import {GET_ENVIRONMENT_VARIABLE} from '@/actions/actionTypes';
import {getEnvironmentVariable} from '@/actions/actions';
import {message} from 'antd';
import {createSelector} from 'reselect';
import withDva from '@/components/with-dva';

const withLifecycle = lifecycle({
    componentDidMount() {
        const {dispatch, location, setValue}: any = this.props;
        dispatch(getEnvironmentVariable(location.params.id)).then((result: Result) => {
            if (result.code === 200) {
                setValue(result.data.environmentVariable);
            } else {
                message.warn(result.message);
            }
        });
    },
});

const selector = createSelector((state: any) => ({
    loadings: state.loading.effects,
}), ({loadings}) => ({
    loading: loadings[GET_ENVIRONMENT_VARIABLE] === true,
}));

const mapStateToProps = (state) => selector(state);

export default compose(
    pure,
    withDva(mapStateToProps),
    withState('value', 'setValue', null),
    withLifecycle,
)(DetailView);
