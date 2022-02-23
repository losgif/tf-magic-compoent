export default {
  base: process.env.DEPLOY_ROOT_DIR ? '/' : '/tf-magic-component',
  dynamicImport: {},
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
  mode: 'doc',
  mountElementId: 'tf-magic-component',
  publicPath: process.env.DEPLOY_ROOT_DIR ? '/' : '/tf-magic-component/',
  qiankun: {
    slave: {},
  },
  title: "Magic"
}
