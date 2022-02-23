export default {
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
  publicPath: '/tf-magic-component/',
  qiankun: {
    slave: {},
  },
  title: "Magic"
}
