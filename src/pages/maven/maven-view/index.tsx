// @author 吴志强
// @date 2021/12/2

import React, {useMemo} from 'react';
import {Table, Button, Space, Typography, Badge} from 'antd';
import styles from './index.scss';

const MavenView = ({
                       dependencies,
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
                key: 'status',
                title: '状态',
                render: (record) => {
                    switch (record.status) {
                        case 'success':
                            return <Badge status='success' text='成功'/>;
                        case 'fail':
                            return <Badge status='error' text='失败'/>;
                        case 'run':
                            return <Badge status='processing' text='正在导出'/>;
                        case 'wait':
                            return <Badge status='warning' text='等待'/>
                        default:
                            return null;
                    }
                }
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
                dataSource={dependencies}
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
