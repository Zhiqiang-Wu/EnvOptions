// @author 吴志强
// @date 2021/9/21

import React, {useEffect} from 'react';
import {Form, Input, Button, Select, Spin} from 'antd';

const {Item, useForm} = Form;

const EditView = ({getLoading, updateLoading, value, onOk}: any) => {
    const [form] = useForm();
    useEffect(() => {
        if (value) {
            form.setFieldsValue({
                id: value.id,
                key: value.key,
                value: value.value,
                type: value.type
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
                    <Select disabled={true}>
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
                    <Button htmlType='submit' type='primary' loading={updateLoading}>确认</Button>
                </Item>
            </Form>
        </Spin>
    );
}

export default EditView;
