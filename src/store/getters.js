const getters = {
  sidebar: state => state.app.sidebar,
  token: state => state.user.token,
  xhbtoken: state => state.user.xhbtoken,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  roles: state => state.user.roles
}
export default getters
