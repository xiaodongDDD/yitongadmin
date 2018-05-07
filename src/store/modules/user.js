// import { logout } from '@/api/login'
import { getToken, getXhbToken, setToken, removeToken, setXhbToken, removeXhbToken } from '@/utils/auth'
// import { login } from '@/api/login'
import axios from 'axios'

const user = {
  state: {
    token: getToken(),
    xhbtoken: getXhbToken(),
    name: '',
    avatar: '',
    roles: []
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_XHBTOKEN: (state, xhbtoken) => {
      state.xhbtoken = xhbtoken
    },
    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    }
  },

  actions: {
    // 登录
    Login({ commit }, userInfo) {
      return new Promise((resolve, reject) => {
        axios.post(process.env.BASE_API + '/?v=0.1&method=Yi.backgroundLogin', userInfo)
          .then((response) => {
            console.log(response)
            if (!response.hasOwnProperty('error_response')) {
              setToken(response.data.response.token)
              setXhbToken(response.data.response.xhb_user_token)
              commit('SET_TOKEN', response.data.response.token)
              commit('SET_XHBTOKEN', response.data.response.xhb_user_token)
            }
            resolve(response)
          }).catch((err) => {
            reject(err)
          })
        // login(userInfo).then(response => {
        //   console.log(response)
        //   if (!response.hasOwnProperty('error_response')) {
        //     setToken(response.response.token)
        //     setXhbToken(response.response.xhb_user_token)
        //     commit('SET_TOKEN', response.response.token)
        //     commit('SET_XHBTOKEN', response.response.xhb_user_token)
        //   }
        //   resolve(response)
        // }).catch(error => {
        //   reject(error)
        // })
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
        commit('SET_XHBTOKEN', '')
        commit('SET_ROLES', [])
        removeToken()
        removeXhbToken()
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
        removeXhbToken()
        resolve()
      })
    }
  }
}

export default user
