// @author 吴志强
// @date 2021/1/14

import React from 'react';
import {Table, Tooltip, Button} from 'antd';
import styles from './index.scss';
import {ReloadOutlined} from '@ant-design/icons';

const HostsView = ({hosts, tableLoading, reloadButtonDisabled, onReload, selectedRowKeys, onSelectedChange}: any) => {
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
    ];
    return (
        <>
            <div className={styles.action}>
                <Tooltip title='刷新'>
                    <Button
                        icon={<ReloadOutlined/>}
                        disabled={reloadButtonDisabled}
                        onClick={onReload}
                    />
                </Tooltip>
            </div>
            <Table
                loading={tableLoading}
                columns={columns}
                dataSource={hosts}
                rowKey={(record) => record.id}
                rowSelection={{
                    hideSelectAll: true,
                    selectedRowKeys,
                    onChange: onSelectedChange,
                }}
            />
        </>
    );
};

export default HostsView;
