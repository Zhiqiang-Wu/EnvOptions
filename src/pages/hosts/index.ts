// @author 吴志强
// @date 2021/1/14

import HostsView from '@/pages/hosts/hosts-view';
import {compose, withState, withHandlers, lifecycle} from 'recompose';
import {LIST_HOSTS} from '@/actions/actionTypes';
import {listHosts} from '@/actions/actions';
import withDva from '@/components/with-dva';
import {message} from 'antd';
import {createSelector} from 'reselect';

const withLifecycle = lifecycle({
    componentDidMount() {
        const {dispatch, setHosts}: any = this.props;
        dispatch(listHosts()).then((result: Result) => {
            if (result.code === 200) {
                setHosts(result.data.hosts);
            } else {
                message.warn(result.message);
            }
        });
    },
});

const mapStateToProps = (state) => ({
    loading: createSelector((state: any) => {
        return state.loading.effects[LIST_HOSTS];
    }, (loading) => {
        return loading === true;
    })(state),
});

export default compose(
    withDva(mapStateToProps),
    withState('hosts', 'setHosts', []),
    withLifecycle,
)(HostsView);
