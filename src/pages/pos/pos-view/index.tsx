// @author 吴志强
// @date 2021/12/30

import React from 'react';
import {Typography, Input, Button, Space} from 'antd';

const PosView = ({passwordCracking, password, onCiphertextChange, ciphertext, loading}: any) => {
    return (
        <div>
            <Typography.Title level={3}>JavaPOS密码破解</Typography.Title>
            <Space align='center'>
                <Input
                    disabled={loading}
                    placeholder='请输入密文'
                    onChange={onCiphertextChange}
                    value={ciphertext}
                />
                <Button
                    loading={loading}
                    type='primary'
                    onClick={passwordCracking}
                >
                    破解
                </Button>
                {
                    password ? (
                        <Typography.Text strong copyable>{password}</Typography.Text>
                    ) : null
                }
            </Space>
        </div>
    );
};

export default PosView;
