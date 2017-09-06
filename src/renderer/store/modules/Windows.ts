const state = {
  appTitle: 'Hexo'
}

const mutations = {
  TITLE: (state, data) => {
    state.appTitle = data
  }
}

const actions = {

}

export default {
  state,
  mutations,
  actions
}
