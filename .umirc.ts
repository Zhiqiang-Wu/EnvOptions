import {defineConfig} from 'umi';

export default defineConfig({
    nodeModulesTransform: {
        type: 'none',
    },
    electronBuilder: {
        externals: ['ffi-napi', 'ref-napi'],
    },
    routes: [
        {path: '/', component: '@/pages/home'},
    ],
    fastRefresh: {},
});
