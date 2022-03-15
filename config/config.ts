export default {
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
  mountElementId: 'tf-magic-component',
  publicPath: process.env.DEPLOY_ROOT_DIR ? '/' : '/tf-magic-component/',
  qiankun: {
    slave: {},
  },
  title: "Magic"
}
