// @author 吴志强
// @date 2021/12/24

import React from 'react';
import {Switch, Table, Space, InputNumber, Typography, Input, Checkbox} from 'antd';
import styles from './index.scss';

const ScanView = ({
                      delay,
                      onSelectedChange,
                      enable,
                      onSwitchChange,
                      videoInputDevices,
                      loading,
                      selectedRowKeys,
                      onDelayChange,
                      suffix,
                      onSuffixChange,
                      enter,
                      onEnterChange,
                  }: any) => {
    const columns = [
        {
            key: 'deviceId',
            title: 'deviceId',
            dataIndex: 'deviceId',
            ellipsis: true,
        },
        {
            key: 'groupId',
            title: 'groupId',
            dataIndex: 'groupId',
            ellipsis: true,
        },
        {
            key: 'label',
            title: 'label',
            dataIndex: 'label',
            ellipsis: true,
        },
    ];
    return (
        <>
            <div className={styles.actions}>
                <Space size={'large'}>
                    <Switch
                        disabled={selectedRowKeys.length <= 0}
                        onChange={onSwitchChange}
                        checked={enable}
                        checkedChildren='开启'
                        unCheckedChildren='关闭'
                    />
                    <Space size={2}>
                        <Typography.Text>延迟:</Typography.Text>
                        <InputNumber
                            disabled={enable}
                            value={delay}
                            min={1000}
                            max={10000}
                            onChange={onDelayChange}
                        />
                    </Space>
                    <Space size={2}>
                        <Typography.Text>后缀:</Typography.Text>
                        <Input
                            disabled={enable}
                            value={suffix}
                            onChange={onSuffixChange}
                        />
                    </Space>
                    {/*<Checkbox
                        disabled={enable}
                        checked={enter}
                        onChange={onEnterChange}
                    >
                        追加回车
                    </Checkbox>*/}
                </Space>
            </div>
            <Table
                loading={loading}
                columns={columns}
                dataSource={videoInputDevices}
                rowKey={(record) => record.deviceId}
                rowSelection={{
                    hideSelectAll: true,
                    selectedRowKeys,
                    onChange: onSelectedChange,
                }}
            />
        </>
    );
};

export default ScanView;
