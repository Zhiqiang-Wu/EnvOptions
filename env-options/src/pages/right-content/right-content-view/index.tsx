// @author 吴志强
// @date 2021/10/6

import React from 'react';
import {Progress, Button, Space} from 'antd';
import styles from './index.scss';

const RightContentView = ({
                              progressWidth = 35,
                              progressPercent = 0,
                              progressVisible = false,
                              progressStatus = 'normal',
                              onUpdate,
                              updateButtonVisible = false,
                          }: any) => {
    return (
        <Space>
            {updateButtonVisible ? (
                <Button type='link' onClick={onUpdate}>重启更新</Button>
            ) : null}
            {progressVisible ? (
                <Progress
                    className={styles.progress}
                    width={progressWidth}
                    strokeWidth={8}
                    type='circle'
                    percent={progressPercent}
                    status={progressStatus}
                />
            ) : null}
        </Space>
    );
};

export default RightContentView;
