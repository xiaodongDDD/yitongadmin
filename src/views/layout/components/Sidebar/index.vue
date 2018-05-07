<template>
  <scroll-bar>
    <el-menu mode="vertical" unique-opened :default-active="$route.path" :collapse="isCollapse" background-color="#304156" text-color="#fff" active-text-color="#409EFF">
      <sidebar-item :routes="routes"></sidebar-item>
    </el-menu>
  </scroll-bar>
</template>

<script>
import { mapGetters } from 'vuex'
import SidebarItem from './SidebarItem'
import ScrollBar from '@/components/ScrollBar'
import { menuAuthList } from '@/api/organizationManagement'
import { getToken } from '@/utils/auth'

export default {
  data() {
    return {}
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
    const token = getToken()
    const obj = {
      'token': token
    }
    menuAuthList(obj).then(response => {
      if (!response.hasOwnProperty('error_response')) {
        console.log(response)
      } else {
        this.$message({
          message: response.error_response.msg,
          type: 'error'
        })
      }
    })
  }
}
</script>
