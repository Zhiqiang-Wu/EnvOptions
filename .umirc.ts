import {defineConfig} from 'umi';

export default defineConfig({
    nodeModulesTransform: {
        type: 'none',
    },
    layout: {
        name: 'Env Options',
        local: false,
        // 必需要放在public目录
        logo: 'favicon.png',
    },
    electronBuilder: {
        externals: [
            'regedit',
            'sqlite3',
            'ffi-napi',
            'ref-napi',
            'winston',
            'winston-daily-rotate-file',
            'electron-updater',
            'uuid'
        ],
        builderOptions: {
            appId: 'wzq.env.options',
            productName: 'Env Options',
            asar: true,
            extraFiles: [
                {
                    from: 'node_modules/regedit/vbs',
                    to: 'vbs',
                },
            ],
            extraResources: [
                {
                    from: 'extra/data.zip',
                    to: 'data.zip',
                },
                {
                    from: 'extra/env_options.dll',
                    to: 'env_options.dll'
                }
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
            name: '环境变量',
            icon: 'windows',
            exact: true,
            component: '@/pages/home',
            footerRender: false,
        },
        {
            path: '/maven',
            name: 'maven',
            icon: 'export',
            exact: true,
            component: '@/pages/maven',
            footerRender: false,
        },
        {
            path: '/scan',
            name: '扫码',
            icon: 'scan',
            exact: true,
            component: '@/pages/scan',
            footerRender: false,
        },
        {
            path: '/edit',
            name: '编辑',
            exact: true,
            component: '@/pages/edit',
            hideInMenu: true,
            footerRender: false,
        },
        /*{
            path: '/edit2',
            name: '编辑',
            exact: true,
            component: '@/pages/edit2',
            hideInMenu: true,
            footerRender: false,
        },*/
        {
            path: '/detail',
            name: '详情',
            exact: true,
            component: '@/pages/detail',
            hideInMenu: true,
            footerRender: false,
        },
        {
            path: '/setting',
            name: '设置',
            icon: 'setting',
            exact: true,
            component: '@/pages/setting',
            footerRender: false,
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
