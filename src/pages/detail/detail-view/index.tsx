// @author 吴志强
// @date 2021/10/27

import React from 'react';
import {Descriptions, Spin, List} from 'antd';

const Item = Descriptions.Item;

const getValue = (value: EnvironmentVariable | null) => {
    if (value) {
        if (value.key.toUpperCase() === 'PATH') {
            const dataSource = value.value.split(';').filter((value) => value);
            return (
                <List
                    dataSource={dataSource}
                    renderItem={(item) => (
                        <List.Item>{item}</List.Item>
                    )}
                />
            );
        } else {
            return value.value;
        }
    }
    return '';
};

const DetailView = ({value, loading}: any) => {
    return (
        <Spin spinning={loading}>
            <Descriptions
                column={1}
                bordered={true}
                labelStyle={{width: 120}}
                contentStyle={{backgroundColor: 'white'}}
            >
                <Item label='变量名'>{value ? value.key : ''}</Item>
                <Item label='变量类型'>{value ? value.type : ''}</Item>
                <Item label='值'>{getValue(value)}</Item>
            </Descriptions>
        </Spin>
    );
};

export default DetailView;
