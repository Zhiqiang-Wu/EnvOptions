// @author 吴志强
// @date 2021/9/21

import React from 'react';
import {Space, Tooltip, Popconfirm, Typography} from 'antd';
import {DeleteOutlined, EditOutlined} from '@ant-design/icons';

const ActionView = ({onEdit, onDelete}: any) => {
    return (
        <Space>
            <Tooltip title='编辑'>
                <Typography.Link>
                    <EditOutlined onClick={onEdit}/>
                </Typography.Link>
            </Tooltip>
            <Popconfirm
                title='确认删除？'
                onConfirm={onDelete}
            >
                <Tooltip title='删除'>
                    <Typography.Link>
                        <DeleteOutlined/>
                    </Typography.Link>
                </Tooltip>
            </Popconfirm>
        </Space>
    );
};

export default ActionView;
