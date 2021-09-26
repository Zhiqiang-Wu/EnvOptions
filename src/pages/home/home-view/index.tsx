// @author 吴志强
// @date 2021/9/11

import React, {useEffect, useState} from 'react';
import {
    Tooltip,
    Table,
    Switch,
    Button,
    Modal,
    Form,
    Input,
    Space,
    InputNumber,
    Typography,
    Radio,
} from 'antd';
import {ReloadOutlined, FolderOpenOutlined, FileOutlined} from '@ant-design/icons';
import styles from './index.scss';
import ActionView from '@/pages/home/action-view';

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
                   typeChecked,
                   pageSize,
                   onPageSizeChange,
               }: any) => {
    const columns = [
        {
            key: 'key',
            title: '变量',
            dataIndex: 'key',
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
                    <ActionView
                        record={record}
                        onEdit={() => onEdit(record)}
                        onDelete={() => onDelete(record)}
                    />
                );
            },
        },
    ];
    const [form] = useForm();
    const [valueType, setValueType] = useState<'directory' | 'file'>('directory');
    const onBrowse = () => {
        const result: Array<string> | undefined = window.localFunctions.showOpenDialogSync({
            properties: [valueType === 'directory' ? 'openDirectory' : 'openFile'],
        });
        if (result) {
            form.setFieldsValue({
                value: result[0],
            });
        }
    };
    useEffect(() => {
        if (!visible) {
            form.resetFields();
            setValueType('directory');
        }
    }, [visible]);
    return (
        <>
            <div className={styles.actions}>
                <Space size={'large'}>
                    <Tooltip title='刷新'>
                        <Button
                            icon={<ReloadOutlined/>}
                            disabled={tableLoading}
                            onClick={onReload}
                        />
                    </Tooltip>
                    <Switch
                        checked={typeChecked}
                        checkedChildren='类型'
                        unCheckedChildren='类型'
                        onChange={onSwitchChange}
                    />
                    <Space size={2}>
                        <Typography.Text>每页展示数量:</Typography.Text>
                        <InputNumber
                            value={pageSize}
                            min={1}
                            max={20}
                            onChange={onPageSizeChange}
                        />
                    </Space>
                </Space>
                <Button type='primary' className={styles.insert} onClick={onInsert}>添加</Button>
            </div>
            <Table
                rowKey={(record) => record.id}
                loading={tableLoading}
                columns={typeChecked ?
                    [columns[0], {
                        key: 'type',
                        title: '类型',
                        dataIndex: 'type',
                    }, columns[1], columns[2]] :
                    columns}
                dataSource={dataSource || []}
                rowSelection={{
                    selectedRowKeys,
                    onChange: onSelectedChange,
                    hideSelectAll: true,
                }}
                pagination={{pageSize}}
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
                        <Input
                            addonAfter={valueType === 'directory' ?
                                <FolderOpenOutlined onClick={onBrowse}/> :
                                <FileOutlined onClick={onBrowse}/>}
                        />
                    </Item>
                    <Item wrapperCol={{offset: 4}}>
                        <Radio.Group
                            value={valueType}
                            onChange={(event) => setValueType(event.target.value)}
                        >
                            <Radio value='directory'>文件夹</Radio>
                            <Radio value='file'>文件</Radio>
                        </Radio.Group>
                    </Item>
                </Form>
            </Modal>
        </>
    );
};

export default Index;
