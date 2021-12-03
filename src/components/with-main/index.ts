// @author 吴志强
// @date 2021/10/5

import {createFactory, Component} from 'react';
import mapValues from '@/utils/mapValues';

const withMain = (channel: string, mainHandler: MainHandler) => (BaseComponent) => {
    const factory = createFactory(BaseComponent);

    const key = Symbol();

    class WithMain extends Component {

        componentDidMount() {
            window.localFunctions.addMainListener(channel, {key, listener: this.handlers[channel]})
        }

        componentWillUnmount() {
            window.localFunctions.removeMainListener(channel, key);
        }

        handlers = mapValues({[channel]: mainHandler}, (createHandler) => (...args) => {
            const handler = createHandler(this.props);
            return handler(...args);
        });

        render() {
            const {props, handlers}: any = this;
            return factory({...props, ...handlers});
        }
    }

    return WithMain;
};

export default withMain;
