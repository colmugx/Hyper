import fs from 'fs'
import path from 'path'
import jsyaml from 'js-yaml'

const renderDir = path.join(__dirname, '..')

export default {
  exists (_path) {
    return fs.existsSync(path.join(renderDir, _path))
  },

  readDir (_path) {
    return fs.readdirSync(path.join(renderDir, _path))
  },

  readFile (_path) {
    return fs.readFileSync(path.join(renderDir, _path), 'utf8')
  },

  readYml (_path) {
    return jsyaml.safeLoad(this.readFile(_path))
  }
}
