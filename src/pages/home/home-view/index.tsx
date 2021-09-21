// @author 吴志强
// @date 2021/9/11

import React, {useEffect} from 'react';
import {
    Tooltip,
    Table,
    Popconfirm,
    Typography,
    Space,
    Switch,
    Button,
    Modal,
    Form,
    Input,
} from 'antd';
import {DeleteOutlined, EditOutlined, ReloadOutlined} from '@ant-design/icons';
import styles from './index.scss';

const {Item, useForm} = Form;

const Index = ({
                   dataSource,
                   onDelete,
                   tableLoading,
                   selectedRowKeys,
                   onSelectedChange,
                   visible,
                   onCancel,
                   onOk,
                   onInsert,
                   onButtonLoading,
                   onReload,
                   onEdit,
                   onSwitchChange,
               }: any) => {
    const columns = [
        {
            key: 'key',
            title: '变量',
            dataIndex: 'key',
        },
        {
            key: 'type',
            title: '类型',
            dataIndex: 'type',
        },
        {
            key: 'value',
            title: '值',
            dataIndex: 'value',
            ellipsis: true,
        },
        {
            key: 'action',
            title: '操作',
            width: 80,
            render: (record: EnvironmentVariable) => {
                if (record.selected) {
                    return null;
                }
                return (
                    <Space>
                        <Tooltip title='编辑'>
                            <Typography.Link>
                                <EditOutlined onClick={() => onEdit(record)}/>
                            </Typography.Link>
                        </Tooltip>
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
                    </Space>
                );
            },
        },
    ];
    const [form] = useForm();
    useEffect(() => {
        if (!visible) {
            form.resetFields();
        }
    }, [visible]);
    return (
        <>
            <div className={styles.actions}>
                <Tooltip title='刷新'>
                    <Button
                        icon={<ReloadOutlined/>}
                        disabled={tableLoading}
                        onClick={onReload}
                    />
                </Tooltip>
                <Switch checkedChildren='类型' unCheckedChildren='类型' onChange={onSwitchChange}/>
                <Button type='primary' className={styles.insert} onClick={onInsert}>添加</Button>
            </div>
            <Table
                rowKey={(record) => record.id}
                loading={tableLoading}
                columns={columns}
                dataSource={dataSource || []}
                rowSelection={{
                    selectedRowKeys,
                    onChange: onSelectedChange,
                    hideSelectAll: true,
                }}
            />
            <Modal
                visible={visible}
                onCancel={onCancel}
                onOk={form.submit}
                centered={true}
                title='添加'
                okButtonProps={{loading: onButtonLoading}}
                // 预渲染
                // 不执行预渲染的话第一次执行form.resetFields()的时候from找不到Model里的Form，因为还没被渲染
                forceRender={true}
            >
                <Form form={form} labelCol={{span: 4}} onFinish={onOk}>
                    <Item name='id' hidden={true}>
                        <Input/>
                    </Item>
                    <Item
                        name='key'
                        label='变量名'
                        required={true}
                        rules={[{required: true, message: '请输入变量名'}]}
                    >
                        <Input/>
                    </Item>
                    <Item
                        name='value'
                        label='值'
                        required={true}
                        rules={[{required: true, message: '请输入值'}]}
                    >
                        <Input/>
                    </Item>
                </Form>
            </Modal>
        </>
    );
};

export default Index;
