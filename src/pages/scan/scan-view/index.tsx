// @author 吴志强
// @date 2021/12/24

import React from 'react';
import {Switch, Table} from 'antd';

const ScanView = ({
                      onSelectedChange,
                      enable,
                      onSwitchChange,
                      videoInputDevices,
                      loading,
                      selectedRowKeys,
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
        <div>
            <Switch
                disabled={selectedRowKeys.length <= 0}
                onChange={onSwitchChange}
                checked={enable}
                checkedChildren='开启'
                unCheckedChildren='关闭'
            />
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
        </div>
    );
};

export default ScanView;
