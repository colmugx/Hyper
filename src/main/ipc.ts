import { ipcMain } from 'electron'

import { FileSys } from '../libs'

ipcMain.on('LoadPost', (event, path) => event.returnValue = FileSys.readFile(path))

ipcMain.on('SavePost', (e, d) => {
  FileSys.writeFile(d.path, d.data)
  e.returnValue = 'save complete'
})

ipcMain.on('ReadConf', (e) => {
  e.returnValue = FileSys.readYml('config/default.yml')
})

