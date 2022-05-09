// @author 吴志强
// @date 2021/12/7

import {Badge, Modal, Table, Space} from 'antd';
import React, {useCallback, useMemo, useState} from 'react';
import {render, unmountComponentAtNode} from 'react-dom';
import {MinusOutlined, CloseOutlined} from '@ant-design/icons';

const View = ({dataSource, afterClose}) => {
    const [visible, setVisible] = useState<boolean>(true);
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
    const onCancel = useCallback(() => {
        setVisible(false);
    }, []);
    return (
        <Modal
            afterClose={afterClose}
            visible={visible}
            title='导出'
            width='auto'
            getContainer={false}
            onCancel={onCancel}
            /*  closeIcon={<Space onMouseUp={(e) =>{
                  e.stopPropagation();
              }}>
                  <MinusOutlined onMouseUp={(e) =>{
                      e.stopPropagation();
                  }}/>
                  <CloseOutlined onMouseUp={(e) =>{
                      e.stopPropagation();
                  }}/>
              </Space>}*/
        >
            <Table
                size='small'
                dataSource={dataSource}
                columns={columns}
                rowKey={(record) => record.id}
                pagination={{
                    pageSize: 5,
                }}
            />
        </Modal>
    );
};

const open = ({dataSource}) => {
    const container = document.createElement('div');
    container.className = 'task-dialog';
    render(
        <View
            dataSource={dataSource}
            afterClose={() => {
                unmountComponentAtNode(container);
                document.body.removeChild(container);
            }}
        />,
        container,
        () => {
            document.body.appendChild(container);
        },
    );
};

export default {open};
