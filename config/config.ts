import { defineConfig } from 'dumi'

export default defineConfig({
    base: process.env.DEPLOY_ROOT_DIR ? '/' : '/tf-magic-component',
    apiParser: {
      propFilter: {
        // 是否忽略从 node_modules 继承的属性，默认值为 false
        skipNodeModules: true,
      }
    },
    dynamicImport: {},
    resolve: {
      includes: [
        'docs',
        'packages'
      ]
    },
    extraBabelPlugins: [
      [
        'babel-plugin-import',
        {
          libraryName: 'antd',
          libraryDirectory: 'es',
          style: true
        },
        'antd'
      ]
    ],
    // forkTSChecker: {},
    locales: [['zh-CN', '中文']],
    mode: 'doc',
    publicPath: process.env.DEPLOY_ROOT_DIR ? '/' : '/tf-magic-component/',
    title: "Magic"
  }
)
