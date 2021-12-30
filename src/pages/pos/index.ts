// @author 吴志强
// @date 2021/12/30

import {compose, withHandlers, withState} from 'recompose';
import PosView from '@/pages/pos/pos-view';
import withDva from '@/components/with-dva';
import {PASSWORD_CRACKING} from '@/actions/actionTypes';
import {passwordCracking as passwordCrackingAction} from '@/actions/actions';
import {message} from 'antd';
import {createSelector} from 'reselect';

interface IProps {
    setCiphertext: Function;
    ciphertext: string;
    dispatch: Function;
    setPassword: Function;
}

const passwordCracking = ({ciphertext, dispatch, setPassword}: IProps) => () => {
    if (!ciphertext) {
        return;
    }
    setPassword('');
    dispatch(passwordCrackingAction(ciphertext)).then((result: Result) => {
        if (result.code === 200) {
            setPassword(result.data.password);
        } else {
            message.warn(result.message);
        }
    });
};

const onCiphertextChange = ({setCiphertext}: IProps) => (event) => {
    setCiphertext(event.target.value.trim());
};

const mapStateToProps = (state) => ({
    loading: createSelector((state: any) => {
        return state.loading.effects[PASSWORD_CRACKING];
    }, (loading) => {
        return loading === true;
    })(state),
});

export default compose(
    withDva(mapStateToProps),
    withState('password', 'setPassword', ''),
    withState('ciphertext', 'setCiphertext', ''),
    withHandlers({
        passwordCracking,
        onCiphertextChange,
    }),
)(PosView)
