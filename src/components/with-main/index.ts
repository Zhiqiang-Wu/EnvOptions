// @author 吴志强
// @date 2021/10/5

import {createFactory, Component} from 'react';

const withMain = (channel: string, listener: MainListener) => (BaseComponent) => {
    const factory = createFactory(BaseComponent);

    class WithMain extends Component {

        componentDidMount() {
            window.localFunctions.onMain(channel, (args) => {
                listener(this.props)(...args);
            });
        }

        componentWillUnmount() {
            window.localFunctions.offMain(channel);
        }

        render() {
            const {props}: any = this;
            return factory({...props});
        }
    }

    return WithMain;
};

export default withMain;
