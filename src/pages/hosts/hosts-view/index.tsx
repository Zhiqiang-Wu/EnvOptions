// @author 吴志强
// @date 2021/1/14

import React from 'react';
import {Table} from 'antd';

const HostsView = ({hosts, loading}: any) => {
    const columns = [
        {
            key: 'ip',
            title: 'ip',
            dataIndex: 'ip',
        },
        {
            key: 'domain',
            title: '域名',
            dataIndex: 'domain',
        },
        {
            key: 'description',
            title: '描述',
            dataIndex: 'description'
        }
    ];
    return (
        <Table
            loading={loading}
            columns={columns}
            dataSource={hosts}
            rowKey={(record) => record.id}
            rowSelection={{
                hideSelectAll: true,
            }}
        />
    );
};

export default HostsView;
