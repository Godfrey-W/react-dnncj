const path = require('path')
const { override, fixBabelImports, addPostcssPlugins, addWebpackAlias } = require('customize-cra')

module.exports = override(
  fixBabelImports('import', {
    libraryName: 'antd-mobile',
    style: 'css',
  }),
  addPostcssPlugins([require('postcss-pxtorem')({
    rootValue: 37.5,
    propList: ['*']
  })]),
  addWebpackAlias({
    '@': path.resolve(__dirname, 'src'),
    'pages': path.resolve(__dirname, 'src/pages'),
    'common': path.resolve(__dirname, 'src/common'),
    'assets': path.resolve(__dirname, 'src/assets'),
    'service': path.resolve(__dirname, 'src/service'),
    'store': path.resolve(__dirname, 'src/store'),
    'util': path.resolve(__dirname, 'src/util')
  })
)