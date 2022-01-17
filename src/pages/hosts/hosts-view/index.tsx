// @author 吴志强
// @date 2021/1/14

import React from 'react';
import {Table, Tooltip, Button, Popconfirm, Typography, Space} from 'antd';
import styles from './index.scss';
import {DeleteOutlined, ReloadOutlined} from '@ant-design/icons';

const HostsView = ({
                       hosts,
                       tableLoading,
                       reloadButtonDisabled,
                       onReload,
                       selectedRowKeys,
                       onSelectedChange,
                       showDeleteAction,
                       onDelete,
                   }: any) => {
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
            key: 'action',
            title: '操作',
            width: 70,
            render: (record) => {
                const deleteAction = showDeleteAction && showDeleteAction(record) ? (
                    <Popconfirm
                        title='确认删除？'
                        onConfirm={() => onDelete(record)}
                    >
                        <Tooltip title='删除'>
                            <Typography.Link>
                                <DeleteOutlined/>
                            </Typography.Link>
                        </Tooltip>
                    </Popconfirm>
                ) : null;
                return (
                    <Space>
                        {deleteAction}
                    </Space>
                );
            },
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
