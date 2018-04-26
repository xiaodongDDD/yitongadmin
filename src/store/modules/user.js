  // import { logout } from '@/api/login'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { getList } from '@/api/table'

const user = {
  state: {
    token: getToken(),
    name: '',
    avatar: '',
    roles: [],
    title1: '',
    title2: '',
    paths: ''
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    },
    SET_TITLE1: (state,title1) => {
      state.title1 = title1
    },
    SET_TITLE2: (state,title2) => {
      state.title2 = title2
    },
    SET_PATH: (state,paths) => {
      state.paths = paths
    }
  },

  actions: {
    // 登录
    Login({ commit }, userInfo) {
      // setToken('admin')
      // commit('SET_TOKEN', 'admin')
      // const username = userInfo.username.trim()
      return new Promise((resolve, reject) => {
        getList().then(response => {
          setToken('admin')
          commit('SET_TOKEN', 'admin')
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 获取用户信息
    GetInfo({ commit, state }) {
      return new Promise((resolve, reject) => {
        commit('SET_ROLES', 'admin')
        commit('SET_NAME', 'admin')
        commit('SET_AVATAR', '----------------')
        resolve()
        // getInfo(state.token).then(response => {
        //   const data = response.data
        //   commit('SET_ROLES', data.role)
        //   commit('SET_NAME', data.name)
        //   commit('SET_AVATAR', data.avatar)
        //   resolve(response)
        // }).catch(error => {
        //   reject(error)
        // })
      })
    },

    // 登出
    LogOut({ commit, state }) {
      return new Promise((resolve, reject) => {
        commit('SET_TOKEN', '')
        commit('SET_ROLES', [])
        removeToken()
        resolve()
        // logout(state.token).then(() => {
        //   commit('SET_TOKEN', '')
        //   commit('SET_ROLES', [])
        //   removeToken()
        //   resolve()
        // }).catch(error => {
        //   reject(error)
        // })
      })
    },

    // 前端 登出
    FedLogOut({ commit }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        removeToken()
        resolve()
      })
    }
  }
}

export default user
