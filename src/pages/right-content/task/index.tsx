// @author 吴志强
// @date 2021/12/6

import React from 'react';
import {Typography, Badge} from 'antd';
import {SyncOutlined} from '@ant-design/icons';
import task1 from '@/assets/tasks1.svg';
import task2 from '@/assets/tasks2.svg';
import task3 from '@/assets/tasks3.svg';

interface IProps {
    status: 'success' | 'error' | 'run';
    onClick?: Function;
}

const getTask = (status: string, onClick) => {
    switch (status) {
        case 'success':
            return <img onClick={onClick} alt='' src={task2}/>;
        case 'error':
            return (
                <Badge dot>
                    <img onClick={onClick} alt='' src={task3}/>
                </Badge>
            );
        case 'run':
            return (
                <Badge count={<SyncOutlined style={{color: '#1890FF'}} spin={true}/>}>
                    <img onClick={onClick} src={task1} alt=''/>
                </Badge>
            );
        default:
            return null;
    }
};

const Task = ({status, onClick}: IProps) => {
    return (
        <Typography.Link>
            {getTask(status, onClick)}
        </Typography.Link>
    );
};

export default Task;
