// @author 吴志强
// @date 2021/12/2

import React, {useMemo} from 'react';
import {Table, Button, Space, Typography, Tooltip} from 'antd';
import styles from './index.scss';
import {ExportOutlined} from '@ant-design/icons';

const MavenView = ({
                       dataSource,
                       onPomClick,
                       onSourceClick,
                       disabledCheckbox,
                       sourcePath,
                       export1,
                       selectedRowKeys,
                       onSelectedChange,
                   }: any) => {
    const columns = useMemo(() => {
        return [
            {
                key: 'groupId',
                title: 'groupId',
                dataIndex: 'groupId',
            },
            {
                key: 'artifactId',
                title: 'artifactId',
                dataIndex: 'artifactId',
            },
            {
                key: 'version',
                title: 'version',
                dataIndex: 'version',
            },
            {
                key: 'action',
                title: '操作',
                width: 70,
                render: () => {
                    return (
                        <Tooltip title='导出'>
                            <Typography.Link>
                                <ExportOutlined/>
                            </Typography.Link>
                        </Tooltip>
                    );
                },
            },
        ];
    }, []);
    return (
        <Space direction='vertical' style={{width: '100%'}}>
            <Space>
                <Button type='primary' onClick={onSourceClick}>选择源</Button>
                <Typography.Text>{sourcePath || ''}</Typography.Text>
            </Space>
            <div className={styles.actions}>
                <Button type='primary' onClick={onPomClick}>选择pom文件</Button>
                <Button
                    disabled={selectedRowKeys.length === 0}
                    className={styles.insert}
                    onClick={() => {
                        export1(selectedRowKeys)
                    }}
                >
                    导出
                </Button>
            </div>
            <Table
                dataSource={dataSource}
                columns={columns}
                rowSelection={{
                    selectedRowKeys,
                    onChange: onSelectedChange,
                    getCheckboxProps: (record) => {
                        return {
                            disabled: disabledCheckbox ? disabledCheckbox(record) : false,
                        };
                    },
                }}
                rowKey={(record) => record.id}
            />
        </Space>
    );
};

export default React.memo(MavenView);
