<template>
  <div class="center-content item-edit">
    <my-header :msg='msg'></my-header>
    <div class="content-detail">
      <p class="position">编辑评价项目</p>
        <div class="edit-form">
        <el-form ref="form" :model="form" label-width="100px">
          <el-form-item label="项目名称：">
            <el-input v-model="form.project_name"></el-input>
          </el-form-item>
          <el-form-item label="项目说明：">
            <el-input type="textarea" :rows="10" style='max-width:700px;' v-model="form.project_remark"></el-input>
          </el-form-item>
          <el-form-item label="项目状态：">
            <el-dropdown @command="handleCommand" v-if="form.project_status === '1'" trigger="click">
              <el-button>
                启用<i class="el-icon-caret-bottom el-icon--right"></i>
              </el-button>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command='a'>停用</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
            <el-dropdown v-else trigger="click" @command="handleCommand">
              <el-button>
                停用<i class="el-icon-caret-bottom el-icon--right"></i>
              </el-button>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command='b'>启用</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </el-form-item>
          <el-form-item>
            <router-link to="/itemList"><el-button>取消</el-button></router-link>
            <el-button @click="saveUser()">保存</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>
<script>
import myHeader from '../../myHeader/myHeader'
import { getProjectInfo, saveProject } from '@/api/eduAdmin'
export default {
  name: 'itemEdit',
  data() {
    return {
      form: {
        project_name: '石选晓',
        schoolName: '武宁路小学',
        semester_id: 'shixiuan',
        project_id: '',
        school_id: '',
        create_time: '',
        project_remark: '134752398@348.cn',
        project_status: '0'
      },
      msg: {
        title1: '评价项目管理',
        title2: '编辑评价项目',
        flag: 1,
        path: '/itemList'
      }
    }
  },
  mounted() {
    this.getData()
  },
  components: {
    myHeader
  },
  methods: {
    getData() {
      const obj = {
        project_id: this.$route.query.project_id,
        token: localStorage.getItem('TOKEN')
      }
      getProjectInfo(obj)
        .then(res => {
          console.log(res)
          if (res.hasOwnProperty('response')) {
            this.form = res.response.info
          } else {
            this.$alert('系统出错！', '提示', {
              confirmButtonText: '确定'
            })
          }
        })
    },
    handleCommand(command) {
      if (command === 'b') {
        this.form.project_status = '1'
      } else if (command === 'a') {
        this.form.project_status = '0'
      }
    },
    saveUser() {
      const obj = {
        project_id: this.$route.query.project_id,
        project_name: this.form.project_name,
        project_remark: this.form.project_remark,
        school_id: this.$route.query.school_id,
        project_status: this.form.project_status
      }
      if (obj.project_name.length > 50) {
        this.$message.error('项目名称不超过50字')
        return false
      }
      if (obj.project_remark.length > 200) {
        this.$message.error('项目说明不超过200字')
        return false
      }
      saveProject(obj)
        .then(res => {
          console.log(res)
          if (res.hasOwnProperty('response')) {
            this.$message.success('保存成功')
            this.$router.push({ path: '/itemList' })
          } else {
            this.$message.error(res.error_response.msg)
          }
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
}
</script>

<style scoped>

</style>
