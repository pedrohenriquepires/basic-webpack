const fs = require('fs')
const path = require('path')

const appDirectory = fs.realpathSync(process.cwd())
const resolveApp = relativePath => path.resolve(appDirectory, relativePath)

module.exports = {
  appRoot: resolveApp('.'),
  build: resolveApp('./build'),
  appSrc: resolveApp('./src'),
  appTemplate: resolveApp('./src/index.html'),
  appEntry: resolveApp('./src/srcipts/index.js')
}