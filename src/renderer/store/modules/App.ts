const state = {
  blogPath: ''
}

const mutations = {
  SETPATH: (state, data) => {
    state.blogPath = data
    localStorage.blogPath = data
  }
}

const actions = {

}

export default {
  state,
  mutations,
  actions
}
