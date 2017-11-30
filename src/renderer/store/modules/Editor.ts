import FileSys from '../../../libs/FileSys'

import { ipcRenderer } from 'electron'

const state = {
  artData: {}
}

const mutations = {
  LOADPOST: (state, payload) => {
    state.artData = payload
    state.artData.data = ipcRenderer.sendSync('LoadPost', payload.path)
  },

  SAVEPOST: (state, payload) => {
    if (state.artData.hidden === payload.hidden) {
      ipcRenderer.sendSync('SavePost', payload)
      return
    }
    if (payload.hidden) {
      let newPath = (state.artData.path).replace(payload.title, '_' + payload.title)
      FileSys.rename(state.artData.path, newPath).then(() => {
        ipcRenderer.sendSync('SavePost', {path: newPath, data: payload.data})
      })
      state.artData = {
        path: newPath,
        title: newPath.split('/')[newPath.split('/').length - 1],
        hidden: payload.hidden
      }
      // FileSys.deleteFile(payload.path).then(() => {
        // })
      } else {
        let newPath = (state.artData.path).replace(payload.title, (payload.title).substr(1))
        FileSys.rename(state.artData.path, newPath).then(() => {
          ipcRenderer.sendSync('SavePost', {path: newPath, data: payload.data})
        })
        state.artData = {
          path: newPath,
          title: newPath.split('/')[newPath.split('/').length - 1],
          hidden: payload.hidden
        }
      // FileSys.deleteFile(payload.path).then(() => {
      // })
    }
  }
}

const actions = {

}

export default {
  state,
  mutations,
  actions
}
