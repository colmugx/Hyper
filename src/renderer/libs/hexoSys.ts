import fs from 'fs'
import path from 'path'
import os from 'os'
import jsyaml from 'js-yaml'

import FileSys from './FileSys'

export default {
  readConfig(_path) {
    return jsyaml.safeLoad(fs.readFileSync(path.join(_path, '_config.yml'), 'utf8'))
  }
}