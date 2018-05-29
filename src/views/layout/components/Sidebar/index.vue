<template>
  <scroll-bar>
    <el-menu mode="vertical" unique-opened :default-active="$route.path" :collapse="isCollapse" background-color="#304156" text-color="#fff" active-text-color="#409EFF">
      <sidebar-item :routes="routesSp"></sidebar-item>
    </el-menu>
  </scroll-bar>
</template>

<script>
import { mapGetters } from 'vuex'
import SidebarItem from './SidebarItem'
import ScrollBar from '@/components/ScrollBar'
import { menuAuthList } from '@/api/organizationManagement'
import { getToken } from '@/utils/auth'
/* 角色管理 role
* 员工管理 work
* 我的资料 myself
* 权限管理 auth
* */
export default {
  data() {
    return {
      routesSp: []
    }
  },
  components: { SidebarItem, ScrollBar },
  computed: {
    ...mapGetters([
      'sidebar'
    ]),
    routes() {
      return this.$router.options.routes
    },
    isCollapse() {
      return !this.sidebar.opened
    }
  },
  created() {
    this.routesSp = this.$router.options.routes
    // this.routes.splice(3, 2)
    const token = getToken()
    const obj = {
      'token': token
    }
    menuAuthList(obj).then(response => {
      const list = response.response.info
      const data = []
      let flag = 0
      for (var i = 0; i < list.length; i++) {
        let az = ''
        for (var j = 0; j < data.length; j++) {
          if (data[j].id === list[i].yt_m_id) {
            flag = 1
            az = j
            break
          }
        }
        if (flag === 1) {
          if (list[i].hasOwnProperty('children')) {
            data[az].children.push(list[i].children)
          }
          flag = 0
        } else if (flag === 0) {
          const wdy = {
            'id': list[i].yt_m_id,
            'menu_name': list[i].menu_name,
            'menu_url': list[i].menu_url,
            'children': []
          }
          if (list[i].hasOwnProperty('children')) {
            wdy.children.push(list[i].children)
          }
          data.push(wdy)
        }
      }
      console.log(data)
      for (let i = 0; i < data.length; i++) {
        for (let j = 0; j < this.routesSp.length; j++) {
          if (data[i].menu_url === this.routesSp[j].name) {
            this.routesSp[j].meta.title = data[i].menu_name
            this.routesSp[j].yt_m_id = data[i].yt_m_id
            this.routesSp[j].hidden = false
            for (let k = 0; k < data[i].children.length; k++) {
              for (let m = 0; m < this.routesSp[j].children.length; m++) {
                if (data[i].children[k].menu_url === this.routesSp[j].children[m].name) {
                  this.routesSp[j].children[m].meta.title = data[i].children[k].menu_name
                  this.routesSp[j].children[m].hidden = false
                  this.routesSp[j].children[m].function = data[i].children[k].function
                  this.routesSp[j].children[m].yt_m_id = data[i].children[k].yt_m_id
                }
              }
            }
          }
        }
      }
      console.log(this.routesSp)
    })
  }
}
</script>
