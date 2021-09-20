// @author 吴志强
// @date 2021/9/21

import {compose, lifecycle, pure, withState, withHandlers} from 'recompose';
import EditView from '@/pages/edit/edit-view';
import withDva from '@/components/with-dva';
import {createSelector} from 'reselect';
import {GET_ENVIRONMENT_VARIABLE} from '@/actions/actionTypes';
import {getEnvironmentVariable} from '@/actions/actions';
import {message} from 'antd';

interface IProps {

}

const onOk = () => (environmentVariable: EnvironmentVariable) => {
    console.log(environmentVariable);
};

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
    withDva(mapStateToProps),
    withState('value', 'setValue', null),
    withHandlers({onOk}),
    withLifecycle,
    pure,
)(EditView);
