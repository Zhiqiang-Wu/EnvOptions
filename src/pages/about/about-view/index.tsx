// @author 吴志强
// @date 2021/9/27

import {Typography} from 'antd';
import styles from './index.scss';

const AboutView = () => {
    return (
        <div className={styles.about}>
            <div className={styles.header}>
                <Typography.Title>Env Options</Typography.Title>
                <Typography.Title level={4} type='secondary'>环境变量管理工具</Typography.Title>
            </div>
            <div>
                version 1.0.0-alpha
            </div>
        </div>
    );
};

export default AboutView;
