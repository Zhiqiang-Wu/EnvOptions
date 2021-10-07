// @author 吴志强
// @date 2021/10/6

import React from 'react';
import {Progress} from 'antd';

const RightContentView = ({
                              progressWidth = 35,
                              progressPercent = 0,
                              progressVisible = false,
                              progressStatus = 'normal',
                          }: any) => {
    return (
        <div>
            {progressVisible ? (
                <Progress
                    width={progressWidth}
                    strokeWidth={8}
                    type='circle'
                    percent={progressPercent}
                    status={progressStatus}
                />
            ) : null}
        </div>
    );
};

export default RightContentView;
