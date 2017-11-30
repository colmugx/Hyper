import fs from 'fs'
import path from 'path'
import jsyaml from 'js-yaml'

const renderDir = path.join(__dirname, '..', 'renderer')

export default {
  exists (_path) {
    return fs.existsSync(path.join(renderDir, _path))
  },

  readDir (_path) {
    return fs.readdirSync(path.join(renderDir, _path))
  },

  readConf (_path) {
    return fs.readFileSync(path.join(renderDir, _path), 'utf8')
  },

  readFile (_path) {
    return fs.readFileSync(_path, 'utf8')
  },

  deleteFile (_file) {
    return Promise.resolve(fs.unlinkSync(_file))
  },

  writeFile (_file, _data) {
    return fs.writeFileSync(_file, _data, 'utf8')
  },

  rename (_old, _new) {
    return Promise.resolve(fs.renameSync(_old, _new))
  },

  readYml (_path) {
    return jsyaml.safeLoad(this.readConf(_path))
  }
}
