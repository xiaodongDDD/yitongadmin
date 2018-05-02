import request from '@/utils/request'

export default function getData(username, password) {
  return request({
    url: '/user/login',
    method: 'post',
    data: {
      username,
      password
    }
  })
}

// import axios from 'axios'

// const HOST = 'http://quan-dev.xiaoheiban.cn/api/?method='

// export default {
//   baseUrl: 'http://quan-dev.xiaoheiban.cn/api/?method=',

//   getData(url, params = {}) {
//     return new Promise((resolve, reject) => {
//       axios.get(HOST + url, { params })
//         .then((res) => {
//           resolve(res)
//         }).catch((err) => {
//           resolve(err)
//         })
//     })
//   },
//   postData(url, params) {
//     return new Promise((resolve, reject) => {
//       axios.post(HOST + url, params)
//         .then((res) => {
//           resolve(res)
//         }).catch((err) => {
//           resolve(err)
//         })
//     })
//   }
// }
