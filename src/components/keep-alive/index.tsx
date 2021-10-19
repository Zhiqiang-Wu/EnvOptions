// @author 吴志强
// @date 2021/10/19

import {KeepAlive} from 'umi';
import {createFactory, Component} from 'react';

const keepAlive = () => (BaseComponent) => {
    const factory = createFactory(BaseComponent);

    class KeepAliveComponent extends Component {

        render() {
            const {props}: any = this;
            return (
                <KeepAlive>
                    {factory({...props})}
                </KeepAlive>
            );
        }
    }

    return KeepAliveComponent;
};

export default keepAlive;
