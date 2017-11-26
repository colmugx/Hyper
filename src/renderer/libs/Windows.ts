import { ipcMain, remote, BrowserWindow } from 'electron'

const serveWin = new BrowserWindow({
  width: 300,
  height: 300,
  show: false
})

ipcMain.on('serve', (e, d) => {
  serveWin.show()
})
