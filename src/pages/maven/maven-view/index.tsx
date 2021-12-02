// @author 吴志强
// @date 2021/12/2

import React, {useMemo} from 'react';
import {Table, Button} from 'antd';
import styles from './index.scss';

const MavenView = ({dataSource, onSelect}: any) => {
    const columns = useMemo(() => {
        return [
            {
                key: 'groupId',
                title: 'groupId'
            },
            {
                key: 'artifactId',
                title: 'artifactId'
            },
            {
                key: 'version',
                title: 'version'
            }
        ];
    }, []);
    return (
        <>
            <div className={styles.actions}>
                <Button type='primary' onClick={onSelect}>选择pom文件</Button>
            </div>
            <Table dataSource={dataSource} columns={columns} rowSelection={{}}/>
        </>
    );
};

export default React.memo(MavenView);
