import {defineConfig} from 'umi';

export default defineConfig({
    nodeModulesTransform: {
        type: 'none',
    },
    layout: {
        name: 'Env Options',
        local: false,
        logo: 'favicon.png',
    },
    electronBuilder: {
        externals: ['regedit', 'sqlite3'],
        builderOptions: {
            appId: 'wzq.env.options',
            productName: 'Env Options',
            win: {
                icon: 'src/assets/favicon256.ico'
            },
            nsis: {
                oneClick: false,
                allowToChangeInstallationDirectory: true
            },
        },
    },
    routes: [
        {
            path: '/home',
            name: '首页',
            icon: 'home',
            exact: true,
            component: '@/pages/home',
        },
        {
            path: '/edit',
            name: '编辑',
            exact: true,
            component: '@/pages/edit',
            hideInMenu: true,
        },
        {
            path: '/setting',
            name: '设置',
            icon: 'setting',
            exact: true,
            component: '@/pages/setting',
        },
        {path: '/', redirect: '/home'},
    ],
    sass: {
        implementation: require('node-sass'),
    },
    mock: false,
    fastRefresh: {},
});
