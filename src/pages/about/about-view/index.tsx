// @author 吴志强
// @date 2021/9/27

import {Typography, Button, Space, Descriptions} from 'antd';
import styles from './index.scss';
import packageJson from '@/../package.json';

const AboutView = ({onCheck, checkLoading, updateLoading, onUpdate, updateInfo}: any) => {
    return (
        <div className={styles.about}>
            <div className={styles.header}>
                <Typography.Title>Env Options</Typography.Title>
                <Typography.Title level={4} type='secondary'>一个工具</Typography.Title>
            </div>
            <Space direction='vertical' size={'large'}>
                <div>
                    <Typography.Paragraph>version {packageJson.version}</Typography.Paragraph>
                    <Button
                        onClick={onCheck}
                        loading={checkLoading}
                        disabled={updateLoading}
                    >
                        检查更新
                    </Button>
                </div>
                {updateInfo ? (
                    <Space direction='vertical'>
                        <Descriptions title='新版本' bordered column={1} contentStyle={{backgroundColor: 'white'}}>
                            <Descriptions.Item label='version'>{updateInfo.version}</Descriptions.Item>
                            <Descriptions.Item label='更新内容'>
                                <Space direction='vertical'>
                                    {
                                        updateInfo.releaseNotes ? updateInfo.releaseNotes.map((releaseNote, index) => (
                                            <span key={String(index)}>{releaseNote.note}</span>
                                        )) : null
                                    }
                                </Space>
                            </Descriptions.Item>
                        </Descriptions>
                        <Button
                            type='primary'
                            onClick={onUpdate}
                            loading={updateLoading}
                            disabled={checkLoading}
                        >
                            更新
                        </Button>
                    </Space>
                ) : null}
            </Space>
        </div>
    );
};

export default AboutView;
