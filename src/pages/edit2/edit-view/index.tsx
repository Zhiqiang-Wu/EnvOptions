// @author 吴志强
// @date 2021/10/28

import React, {useEffect, useState} from 'react';
import {Form, Input, Button, Select, Spin, Radio} from 'antd';
import {FileOutlined, FolderOpenOutlined} from '@ant-design/icons';

const {Item, useForm} = Form;

const EditView = ({getLoading, updateLoading, value, onOk}: any) => {
    const [form] = useForm();
    const [valueType, setValueType] = useState<'directory' | 'file'>('directory');
    const onBrowse = () => {
        const options: OpenDialogOptions1 = {
            properties: [valueType === 'directory' ? 'openDirectory' : 'openFile'],
            modal: true,
        };
        window.localFunctions.showOpenDialog(options).then((result) => {
            if (!result.canceled && result.filePaths[0]) {
                form.setFieldsValue({
                    value: result.filePaths[0],
                });
            }
        });
    };
    useEffect(() => {
        if (value) {
            form.setFieldsValue({
                id: value.id,
                key: value.key,
                value: value.value,
                type: value.type,
            });
        }
    }, [value]);
    return (
        <Spin spinning={getLoading}>
            <Form layout='vertical' form={form} onFinish={onOk}>
                <Item
                    name='id'
                    required={true}
                    hidden={true}
                    rules={[{required: true, message: '请输入id'}]}
                >
                    <Input disabled={updateLoading}/>
                </Item>
                <Item
                    name='key'
                    label='变量名'
                    required={true}
                    rules={[{required: true, message: '请输入变量名'}]}
                >
                    <Input disabled={updateLoading}/>
                </Item>
                <Item
                    name='type'
                    label='类型'
                    required={true}
                    rules={[{required: true, message: '请选择类型'}]}
                    initialValue='REG_SZ'
                >
                    <Select>
                        <Select.Option value='REG_SZ'>REG_SZ</Select.Option>
                        <Select.Option value='REG_EXPAND_SZ'>REG_EXPAND_SZ</Select.Option>
                    </Select>
                </Item>
                <Item
                    name='value'
                    label='值'
                    required={true}
                    rules={[{required: true, message: '请输入值'}]}
                >
                    <Input disabled={updateLoading}/>
                </Item>
                <Item>
                    <Radio.Group
                        value={valueType}
                        onChange={(event) => setValueType(event.target.value)}
                    >
                        <Radio value='directory'>文件夹</Radio>
                        <Radio value='file'>文件</Radio>
                    </Radio.Group>
                    <Button
                        disabled={updateLoading}
                        onClick={onBrowse}
                        icon={
                            valueType === 'directory' ?
                                <FolderOpenOutlined disabled={updateLoading}/> :
                                <FileOutlined disabled={updateLoading}/>
                        }
                    >
                        选择
                    </Button>
                </Item>
                <Item>
                    <Button htmlType='submit' type='primary' loading={updateLoading}>确认</Button>
                </Item>
            </Form>
        </Spin>
    );
};

export default EditView;
