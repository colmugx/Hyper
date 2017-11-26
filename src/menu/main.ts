import i18n from './i18n'

export const osx = app => [{
  label: app.getName(),
  submenu: [{
    // label: `关于 ${app.getName()}`,
    label: i18n.t('main.about', {appname: app.getName()}) ,
    role: 'about'
  }, {
    type: 'separator'
  }, {
    label: i18n.t('main.services'),
    role: 'services',
    submenu: []
  }, {
    type: 'separator'
  }, {
    label: i18n.t('main.hide', {appname: app.getName()}),
    accelerator: 'Command+H',
    role: 'hide'
  }, {
    label: i18n.t('main.hideothers'),
    accelerator: 'Command+Alt+H',
    role: 'hideothers'
  }, {
    label: i18n.t('main.unhide'),
    role: 'unhide'
  }, {
    type: 'separator'
  }, {
    label: i18n.t('main.quit', {appname: app.getName()}),
    accelerator: 'Command+Q',
    click: function () {
      app.quit()
    }
  }]
}, {
  label: i18n.t('edit.name'),
  submenu: [{
    label: i18n.t('edit.undo'),
    accelerator: 'CmdOrCtrl+Z',
    role: 'undo'
  }, {
    label: i18n.t('edit.redo'),
    accelerator: 'Shift+CmdOrCtrl+Z',
    role: 'redo'
  }, {
    type: 'separator'
  }, {
    label: i18n.t('edit.cut'),
    accelerator: 'CmdOrCtrl+X',
    role: 'cut'
  }, {
    label: i18n.t('edit.copy'),
    accelerator: 'CmdOrCtrl+C',
    role: 'copy'
  }, {
    label: i18n.t('edit.paste'),
    accelerator: 'CmdOrCtrl+V',
    role: 'paste'
  }, {
    label: i18n.t('edit.selectall'),
    accelerator: 'CmdOrCtrl+A',
    role: 'selectall'
  }]
}, {
  label: i18n.t('watch.name'),
  submenu: [{
    label: i18n.t('watch.full'),
    accelerator: (function () {
      if (process.platform === 'darwin') {
        return 'Ctrl+Command+F'
      } else {
        return 'F11'
      }
    })(),
    click: function (item, focusedWindow) {
      if (focusedWindow) {
        focusedWindow.setFullScreen(!focusedWindow.isFullScreen())
      }
    }
  }, {
    label: i18n.t('watch.toggleDevTools'),
    accelerator: (function () {
      if (process.platform === 'darwin') {
        return 'Alt+Command+I'
      } else {
        return 'Ctrl+Shift+I'
      }
    })(),
    click: function (item, focusedWindow) {
      if (focusedWindow) {
        focusedWindow.toggleDevTools()
      }
    }
  }]
}, {
  label: i18n.t('window.name'),
  role: 'window',
  submenu: [{
    label: i18n.t('window.minimize'),
    accelerator: 'CmdOrCtrl+M',
    role: 'minimize'
  }, {
    label: i18n.t('window.close'),
    accelerator: 'CmdOrCtrl+W',
    role: 'close'
  }, {
    type: 'separator'
  }]
}]
