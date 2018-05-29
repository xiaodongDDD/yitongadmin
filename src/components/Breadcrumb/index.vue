<template>
  <el-breadcrumb class="app-breadcrumb" separator="/">
    <transition-group name="breadcrumb">
      <el-breadcrumb-item v-for="(item,index)  in levelList" :key="item.path" v-if="item.meta.title">
        <span v-if="item.redirect==='noredirect'||index==levelList.length-1" class="no-redirect">{{item.meta.title}}</span>
        <router-link v-else :to="item.redirect||item.path" @click.native="saveData(item)">{{item.meta.title}}</router-link>
      </el-breadcrumb-item>
    </transition-group>
  </el-breadcrumb>
</template>

<script>
import { menuAuthList } from '@/api/organizationManagement'
import { getToken } from '@/utils/auth'
export default {
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
      this.getBreadcrumb()
    })
  },
  data() {
    return {
      levelList: null,
      routesSp: []
    }
  },
  watch: {
    $route() {
      this.getBreadcrumb()
    }
  },
  methods: {
    getBreadcrumb() {
      let matched = this.$route.matched.filter(item => item.name)
      const first = matched[0]
      if (first && first.name !== 'home') {
        matched = [{ path: '/dashboard', meta: { title: '首页' }}].concat(matched)
      }
      this.levelList = matched
    },
    saveData(item) {
      for (let i = 0; i < this.routesSp.length; i++) {
        if (this.routesSp[i].name === item.name) {
          localStorage.module_id = this.routesSp[i].children[0].yt_m_id
          localStorage.function = this.routesSp[i].children[0].function
          return
        }
      }
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .app-breadcrumb.el-breadcrumb {
    display: inline-block;
    font-size: 14px;
    line-height: 50px;
    margin-left: 10px;
    .no-redirect {
      color: #97a8be;
      cursor: text;
    }
  }
</style>
