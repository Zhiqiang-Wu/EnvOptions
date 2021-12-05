// @author 吴志强
// @date 2021/9/19

import React from 'react';
import {Space, InputNumber, Typography} from 'antd';

const SettingView = ({onPageSizeChange, pageSize}: any) => {
    return (
        <Space size={2}>
            <Typography.Text>每页展示数量:</Typography.Text>
            <InputNumber
                value={pageSize}
                min={1}
                max={20}
                onChange={onPageSizeChange}
            />
        </Space>
    );
}

export default SettingView;
