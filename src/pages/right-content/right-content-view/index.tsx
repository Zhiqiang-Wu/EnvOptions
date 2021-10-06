// @author 吴志强
// @date 2021/10/6

import React from 'react';
import {Progress} from 'antd';

const RightContentView = ({progressWidth = 35, percent = 0}: any) => {
    return (
        <div>
            <Progress
                width={progressWidth}
                strokeWidth={8}
                type='circle'
                percent={percent}
            />
        </div>
    );
};

export default RightContentView;
