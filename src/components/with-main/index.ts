// @author 吴志强
// @date 2021/10/5

import {createFactory, Component} from 'react';

const withMain = (channel: string, mainHandler: MainHandler) => (BaseComponent) => {
    const factory = createFactory(BaseComponent);

    const key = Symbol();

    class WithMain extends Component {

        componentDidMount() {
            const mainListener = {
                key,
                // 错误的，每次调用必须重新把this.props传递进去
                // listener: mainHandler(this.props),
                listener: (...args) => {
                    // 重新把this.props传递进去
                    const func: Function = mainHandler(this.props);
                    func(...args);
                }
            }
            window.localFunctions.addMainListener(channel, mainListener);
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
