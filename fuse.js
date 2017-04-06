const fsbx = require('fuse-box')
const proxy = require('http-proxy-middleware')

process.env.NODE_ENV = 'development'

const fuseBox = fsbx.FuseBox.init({
  homeDir: 'src/',
  sourcemaps: {
    bundleReference: 'app.js.map',
    outFile: './dist/app.js.map'
  },
  outFile: './dist/app.js',
  plugins: [
    [
      fsbx.SassPlugin({
        outputStyle: 'compressed'
      }),
      fsbx.CSSPlugin({})
    ],
    fsbx.EnvPlugin({ NODE_ENV: process.env.NODE_ENV }),
    fsbx.TypeScriptHelpers(),
    // fsbx.BabelPlugin({
    //   test: /\.js$/,
    //   config: {
    //     sourceMaps: true,
    //     presets: ['env'],
    //     plugins: [
    //       ['transform-runtime']
    //     ]
    //   }
    // }),
    fsbx.JSONPlugin(),
    fsbx.HTMLPlugin({
      useDefault: false
    })
  ]
})

const devServer = fuseBox.devServer('>main.ts **/*.html', {
  port: 3000
})

devServer.httpServer.app.use('/rest', proxy({
  target: process.env.npm_package_config_target,
  changeOrigin: true
}))
