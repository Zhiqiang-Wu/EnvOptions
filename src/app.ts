// @author 吴志强
// @date 2021/9/19

import {BasicLayoutProps, Settings as ProSettings} from '@ant-design/pro-layout';

export const layout = ({initialState}: {initialState: {settings?: ProSettings}}): BasicLayoutProps => ({
    disableContentMargin: false,
    ...initialState?.settings,
});
