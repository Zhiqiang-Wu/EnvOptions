// @author 吴志强
// @date 2021/10/28

import React, {useEffect, useState} from 'react';
import {Form, Input, Button, Select, Spin, Menu, Dropdown} from 'antd';
import {FileTwoTone, FolderOpenTwoTone, DeleteTwoTone, PlusOutlined} from '@ant-design/icons';
import styles from './index.scss';
import {FormListFieldData} from 'antd/lib/form/FormList';

const {Item, useForm} = Form;

const EditView = ({getLoading, updateLoading, value, onOk}: any) => {
    const [form] = useForm();
    let removeFunc;
    const menu = (
        <Menu>
            <Menu.Item
                onClick={() => onBrowse('openDirectory')}
                icon={<FolderOpenTwoTone/>}
                key='1'
            >
                文件夹
            </Menu.Item>
            <Menu.Item
                onClick={() => onBrowse('openFile')}
                icon={<FileTwoTone/>}
                key='2'
            >
                文件
            </Menu.Item>
            <Menu.Item
                onClick={() => removeFunc(field?.name)}
                icon={<DeleteTwoTone twoToneColor='red'/>}
                key='3'
            >
                删除
            </Menu.Item>
        </Menu>
    );
    const [field, setField] = useState<FormListFieldData | null>(null);
    const onBrowse = (type) => {
        const options: OpenDialogOptions1 = {
            properties: [type],
            modal: true,
        };
        window.localFunctions.showOpenDialog(options).then((result) => {
            if (!result.canceled && result.filePaths[0]) {
                const values: Array<any> = form.getFieldValue('value');
                const newValues = values.map((value, index) => {
                    if (index === field?.name) {
                        return result.filePaths[0];
                    } else {
                        return value;
                    }
                });
                form.setFieldsValue({
                    value: newValues,
                });
            }
        });
    };
    useEffect(() => {
        if (value) {
            const values: Array<string> = value.value.split(';').filter((value) => value);
            form.setFieldsValue({
                id: value.id,
                key: value.key,
                value: values,
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
                <Form.List name='value'>
                    {(fields, {add, remove}, {errors}) => {
                        removeFunc = remove;
                        return (
                            <>
                                {
                                    fields.map((field, index) => {
                                        return (
                                            <Dropdown
                                                destroyPopupOnHide={true}
                                                key={field.key}
                                                overlay={menu}
                                                trigger={['contextMenu']}
                                            >
                                                <Item
                                                    className={styles.valueItem}
                                                    required={true}
                                                    label={index === 0 ? '值' : ''}
                                                    {...field}
                                                >
                                                    <Input onFocus={() => setField(field)}/>
                                                </Item>
                                            </Dropdown>
                                        );
                                    })
                                }
                                <Item>
                                    <Button icon={<PlusOutlined/>} type='dashed' onClick={() => add()}>添加</Button>
                                </Item>
                            </>
                        );
                    }}
                </Form.List>
                <Item>
                    <Button htmlType='submit' type='primary' loading={updateLoading}>确认</Button>
                </Item>
            </Form>
        </Spin>
    );
};

export default EditView;
