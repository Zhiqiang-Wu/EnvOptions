// @author 吴志强
// @date 2021/10/8

import React from 'react';
import {Input, Space, Button} from 'antd';
import styles from './index.scss';
import {SearchOutlined} from '@ant-design/icons';

const FilterDropdown = ({setSelectedKeys, selectedKeys, confirm, clearFilters, onSearch, onReset}: any) => {
    const onChange = (event) => {
        setSelectedKeys(event.target.value ? [event.target.value] : []);
    };
    return (
        <div className={styles.filterDropdown}>
            <Input
                value={selectedKeys[0] ? selectedKeys[0] : ''}
                onChange={onChange}
                className={styles.input}
                onPressEnter={() => onSearch(selectedKeys, confirm)}
            />
            <Space>
                <Button
                    type='primary'
                    icon={<SearchOutlined/>}
                    onClick={() => onSearch(selectedKeys, confirm)}
                >
                    确认
                </Button>
                <Button onClick={() => onReset(clearFilters)}>重置</Button>
            </Space>
        </div>
    );
};

export default FilterDropdown;
