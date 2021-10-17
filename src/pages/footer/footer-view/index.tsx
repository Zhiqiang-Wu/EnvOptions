// @author 吴志强
// @date 2021/10/17

import React from 'react';
import styles from './index.scss';
import {CopyrightCircleOutlined} from '@ant-design/icons';

const FooterView = () => {
    return (
        <div className={styles.footer}>
            Copyright <CopyrightCircleOutlined/> 2021-2021 Wuzhiqiang
        </div>
    );
};

export default FooterView;
