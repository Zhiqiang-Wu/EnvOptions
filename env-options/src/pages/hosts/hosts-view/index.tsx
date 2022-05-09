// @author 吴志强
// @date 2021/1/14

import React, {useEffect} from 'react';
import {Table, Tooltip, Button, Popconfirm, Typography, Space, Tabs, Input, Modal, Form} from 'antd';
import styles from './index.scss';
import {DeleteOutlined, ReloadOutlined} from '@ant-design/icons';

const {Item, useForm} = Form;

const HostsView = ({
                       hosts,
                       tableLoading,
                       reloadButtonDisabled,
                       onReload,
                       onReload2,
                       selectedRowKeys,
                       onSelectedChange,
                       showDeleteAction,
                       onDelete,
                       onOpenHost,
                       onTabChange,
                       hostsStr,
                       onHostsStrChange,
                       tabPane1Disabled,
                       tabPane2Disabled,
                       reloadButton2Disabled,
                       pageSize,
                       onInsert,
                       visible,
                       onCancel,
                       onOk,
                       okButtonLoading,
                   }: any) => {
    const [form] = useForm();
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
    useEffect(() => {
        if (!visible) {
            form.resetFields();
        }
    }, [visible]);
    return (
        <>
            <Tabs defaultActiveKey='1' onChange={onTabChange}>
                <Tabs.TabPane key='1' tab='hosts' disabled={tabPane1Disabled}>
                    <div className={styles.action}>
                        <Space size={'large'}>
                            <Tooltip title='刷新'>
                                <Button
                                    icon={<ReloadOutlined/>}
                                    disabled={reloadButtonDisabled}
                                    onClick={onReload}
                                />
                            </Tooltip>
                            <Button onClick={onOpenHost} type={'primary'}>打开host文件</Button>
                        </Space>
                        <Button type='primary' className={styles.insert} onClick={onInsert}>添加</Button>
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
                        pagination={{pageSize}}
                    />
                </Tabs.TabPane>
                <Tabs.TabPane key='2' tab='hosts文件' disabled={tabPane2Disabled}>
                    <div className={styles.action}>
                        <Tooltip title='刷新'>
                            <Button
                                icon={<ReloadOutlined/>}
                                disabled={reloadButton2Disabled}
                                onClick={onReload2}
                            />
                        </Tooltip>
                    </div>
                    <Input.TextArea onChange={onHostsStrChange} value={hostsStr} autoSize={{minRows: 15}}/>
                </Tabs.TabPane>
            </Tabs>
            <Modal
                forceRender={true}
                visible={visible}
                title={'添加'}
                centered={true}
                onCancel={onCancel}
                onOk={form.submit}
                okButtonProps={{loading: okButtonLoading}}
            >
                <Form form={form} labelCol={{span: 3}} onFinish={onOk}>
                    <Item
                        name='ip'
                        label='ip'
                        required={true}
                        rules={[{required: true, message: '请输入ip'}]}
                    >
                        <Input/>
                    </Item>
                    <Item
                        name='domain'
                        label='域名'
                        required={true}
                        rules={[{required: true, message: '请输入域名'}]}
                    >
                        <Input/>
                    </Item>
                </Form>
            </Modal>
        </>
    );
};

export default HostsView;
