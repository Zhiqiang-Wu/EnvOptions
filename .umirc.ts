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
        externals: ['regedit', 'sqlite3', 'winston', 'winston-daily-rotate-file', 'electron-updater'],
        builderOptions: {
            appId: 'wzq.env.options',
            productName: 'Env Options',
            asar: true,
            extraFiles: [
                {
                    from: 'node_modules/regedit/vbs',
                    to: 'vbs',
                },
                'data',
            ],
            win: {
                icon: 'public/favicon256.ico',
                requestedExecutionLevel: 'requireAdministrator',
            },
            nsis: {
                perMachine: true,
                oneClick: false,
                allowToChangeInstallationDirectory: true,
            },
            publish: [
                {
                    provider: 'generic',
                    url: 'https://env-options.oss-cn-hangzhou.aliyuncs.com/update/release/',
                },
            ],
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
        {
            path: '/about',
            name: '关于',
            icon: 'info',
            exact: true,
            component: '@/pages/about',
        },
        {path: '/', redirect: '/home'},
    ],
    sass: {
        implementation: require('node-sass'),
    },
    // 开启mfsu功能后会自动开启webpack5和dynamicImport
    mfsu: {},
    mock: false,
    fastRefresh: {},
});
