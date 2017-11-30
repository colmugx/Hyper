import fs from 'fs'
import path from 'path'
// import os from 'os'
import jsyaml from 'js-yaml'

export default {

  readConfig(_path) {
    return jsyaml.safeLoad(fs.readFileSync(path.join(_path, '_config.yml'), 'utf8'))
  },

  readPosts (_path) {
    return fs.readdirSync(path.join(_path, 'source', '_posts'))
  },

  postLinks (_path, name) {
    return path.join(_path, 'source', '_posts', name)
  }
}
