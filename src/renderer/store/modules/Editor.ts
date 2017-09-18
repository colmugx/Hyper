import HexoSys from '../../libs/HexoSys'
import FileSys from '../../libs/FileSys'

const state = {
  artData: {}
}

const mutations = {
  LOADPOST: (state, payload) => {
    state.artData = payload
    state.artData.data = FileSys.readFile(payload.path)
  },

  SAVEPOST: (state, payload) => {
    if (state.artData.hidden === payload.hidden) {
      return FileSys.writeFile(payload.path, payload.data)
    }
    if (payload.hidden) {
      let newPath = (state.artData.path).replace(payload.title, '_' + payload.title)
      FileSys.rename(state.artData.path, newPath).then(() => {
        FileSys.writeFile(newPath, payload.data)
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
          FileSys.writeFile(newPath, payload.data)
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
