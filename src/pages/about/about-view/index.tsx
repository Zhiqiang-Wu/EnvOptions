// @author 吴志强
// @date 2021/9/27

import {Typography, Button} from 'antd';
import styles from './index.scss';
import packageJson from '@/../package.json';

const AboutView = ({onCheck, loading}: any) => {
    return (
        <div className={styles.about}>
            <div className={styles.header}>
                <Typography.Title>Env Options</Typography.Title>
                <Typography.Title level={4} type='secondary'>环境变量管理工具</Typography.Title>
            </div>
            <Typography.Paragraph>version {packageJson.version}</Typography.Paragraph>
            <Button onClick={onCheck} loading={loading}>检查更新</Button>
        </div>
    );
};

export default AboutView;
