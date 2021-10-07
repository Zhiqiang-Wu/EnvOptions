// @author 吴志强
// @date 2021/10/5

import {createFactory, Component} from 'react';

const withMain = (channel: string, mainHandler: MainHandler) => (BaseComponent) => {
    const factory = createFactory(BaseComponent);

    const key = Symbol();

    class WithMain extends Component {

        componentDidMount() {
            window.localFunctions.addMainListener(channel, {key, listener: mainHandler(this.props)})
        }

        componentWillUnmount() {
            window.localFunctions.removeMainListener(channel, key);
        }

        render() {
            const {props}: any = this;
            return factory({...props});
        }
    }

    return WithMain;
};

export default withMain;
