// @author 吴志强
// @date 2021/12/2

import React, {useCallback, useContext, useEffect, useMemo, useRef, useState} from 'react';
import {Table, Button, Space, Badge, Form, FormInstance, Input, Select} from 'antd';
import styles from './index.scss';

const EditableContext = React.createContext<FormInstance | null>(null);

const EditableRow = ({index, ...props}) => {
    const [form] = Form.useForm();
    return (
        <Form form={form} component={false}>
            <EditableContext.Provider value={form}>
                <tr {...props}/>
            </EditableContext.Provider>
        </Form>
    );
};

const EditableCell = ({editable, children, dataIndex, title, onSave, record, ...restProps}) => {
    const [editing, setEditing] = useState<boolean>(false);
    const inputRef = useRef<Input>(null);
    const form = useContext(EditableContext);
    const toggleEdit = useCallback(() => {
        if (!editing) {
            form?.setFieldsValue({[dataIndex]: record[dataIndex]});
        }
        setEditing(!editing);
    }, [editing, dataIndex, record]);
    const save = useCallback(async () => {
        try {
            const values = await form?.validateFields();
            toggleEdit();
            onSave({
                ...values,
                id: record.id,
            });
        } catch (e) {

        }
    }, [onSave, toggleEdit, record]);
    const childNode = useMemo(() => {
        if (editable) {
            if (editing) {
                return (
                    <Form.Item
                        style={{margin: 0}}
                        name={dataIndex}
                        rules={[{required: true, message: `请输入${title}`}]}
                    >
                        <Input ref={inputRef} onBlur={save} onPressEnter={save}/>
                    </Form.Item>
                );
            } else {
                return (
                    <div onClick={toggleEdit}>{children}</div>
                );
            }
        } else {
            return children;
        }
    }, [editing, editable, toggleEdit, title, children, save, dataIndex]);
    useEffect(() => {
        if (editing) {
            inputRef.current!.focus();
        }
    }, [editing]);
    return (
        <td {...restProps}>{childNode}</td>
    );
};

const MavenView = ({
                       dependencies,
                       onPomClick,
                       onSourceClick,
                       disabledCheckbox,
                       sourcePath,
                       export1,
                       selectedRowKeys,
                       onSelectedChange,
                       onGroupIdSave,
                       onArtifactIdSave,
                       onVersionSave,
                       sourcePaths,
                       pageSize,
                   }: any) => {
    const columns = useMemo(() => {
        return [
            {
                key: 'groupId',
                title: 'groupId',
                dataIndex: 'groupId',
                onCell: (record) => ({
                    record,
                    editable: true,
                    dataIndex: 'groupId',
                    title: 'groupId',
                    onSave: onGroupIdSave,
                }),
            },
            {
                key: 'artifactId',
                title: 'artifactId',
                dataIndex: 'artifactId',
                onCell: (record) => ({
                    record,
                    editable: true,
                    dataIndex: 'artifactId',
                    title: 'artifactId',
                    onSave: onArtifactIdSave,
                }),
            },
            {
                key: 'version',
                title: 'version',
                dataIndex: 'version',
                onCell: (record) => ({
                    record,
                    editable: true,
                    dataIndex: 'version',
                    title: 'version',
                    onSave: onVersionSave,
                }),
            },
            {
                key: 'status',
                title: '状态',
                width: 120,
                render: (record) => {
                    switch (record.status) {
                        case 'success':
                            return <Badge status='success' text='成功'/>;
                        case 'fail':
                            return <Badge status='error' text='失败'/>;
                        case 'run':
                            return <Badge status='processing' text='正在导出'/>;
                        default:
                            return null;
                    }
                },
            },
        ];
    }, []);
    const components = useMemo(() => ({
        body: {
            row: EditableRow,
            cell: EditableCell,
        },
    }), []);
    return (
        <Space direction='vertical' style={{width: '100%'}}>
            <Select
                value={sourcePath}
                placeholder='选择源'
                style={{width: '100%'}}
                dropdownRender={(menu) => {
                    return (
                        <div>
                            {menu}
                            <Button onClick={onSourceClick} type='link'>选择文件夹</Button>
                        </div>
                    );
                }}
            >
                {
                    sourcePaths.map((sourcePath) => (
                        <Select.Option key={sourcePath} value={sourcePath}>{sourcePath}</Select.Option>
                    ))
                }
            </Select>
            {/*<Space>
                <Button type='primary' onClick={onSourceClick}>选择源</Button>
                <Typography.Text>{sourcePath || ''}</Typography.Text>
            </Space>*/}
            <div className={styles.actions}>
                <Button type='primary' onClick={onPomClick}>选择pom文件</Button>
                <Button
                    disabled={selectedRowKeys.length === 0 || !sourcePath}
                    className={styles.insert}
                    onClick={() => {
                        export1(selectedRowKeys);
                    }}
                >
                    导出
                </Button>
            </div>
            <Table
                components={components}
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
                pagination={{pageSize}}
            />
        </Space>
    );
};

export default React.memo(MavenView);
