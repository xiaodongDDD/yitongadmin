<template>
  <div class="menu-wrapper">
    <template v-for="item in routes" v-if="!item.hidden&&item.children">

      <div v-if="item.children.length===1 && !item.children[0].children"  @click="saveData(item)" :key="item.children[0].name">
        <el-menu-item :index="item.path+'/'+item.children[0].path" class='submenu-title-noDropdown'>
          <svg-icon v-if="item.children[0].meta&&item.children[0].meta.icon" :icon-class="item.children[0].meta.icon"></svg-icon>
          <span v-if="item.children[0].meta&&item.children[0].meta.title">{{item.children[0].meta.title}}</span>
        </el-menu-item>
      </div>

      <el-submenu v-else :index="item.name||item.path" :key="item.name">
        <template slot="title">
          <svg-icon v-if="item.meta&&item.meta.icon" :icon-class="item.meta.icon"></svg-icon>
          <span v-if="item.meta&&item.meta.title">{{item.meta.title}}</span>
        </template>

        <template v-for="child in item.children" v-if="!child.hidden">
          <sidebar-item class="nest-menu" v-if="child.children&&child.children.length>0" :routes="[child]" :key="child.path"></sidebar-item>

          <div v-else @click="saveDataSp(item,child)" :key="child.name">
            <el-menu-item :index="item.path+'/'+child.path">
              <svg-icon v-if="child.meta&&child.meta.icon" :icon-class="child.meta.icon"></svg-icon>
              <span v-if="child.meta&&child.meta.title">{{child.meta.title}}</span>
            </el-menu-item>
          </div>
        </template>
      </el-submenu>

    </template>
  </div>
</template>

<script>
  import store from '@/store'
  export default {
    name: 'SidebarItem',
    props: {
      routes: {
        type: Array
      }
    },
    data() {
      return {
      }
    },
    methods: {
      saveData(item) {
        console.log(item)
        const url = item.path + '/' + item.children[0].path
        this.$router.push({ path: url })
      },
      saveDataSp(item, child) {
        const url = item.path + '/' + child.path
        this.$router.push({ path: url })
        localStorage.module_id = child.yt_m_id
        localStorage.function = child.function
        store.commit('SET_ROLES', child)
        console.log('============')
        console.log(item)
        console.log(child)
      }
    }
  }
</script>
