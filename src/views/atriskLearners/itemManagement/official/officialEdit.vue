<template>
  <div class="center-content official-Edit">
      <my-header :msg='msg'></my-header>
      <div class="content-detail">
        <p class="position">编辑负责人</p>
        <div class="edit-form">
        <el-form ref="form" :model="form" label-width="100px">
          <el-form-item label="负责人姓名：">
            <el-col >
              <el-form-item>
                <span>{{ teacher_name }}</span>
              </el-form-item>
            </el-col>
          </el-form-item>
          <el-form-item label="负责学科：" id='official'>
            <el-select
              v-model="value1"
              multiple
              collapse-tags
              placeholder="请选择">
              <span id="checkAll" @click='checkAll'>全选</span>
              <el-option
                v-for="item in options1"
                :key="item.subject_id"
                :label="item.subject_name"
                :value="item.subject_id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="负责年级：" id='official2'>
            <el-select
              v-model="value2"
              multiple
              collapse-tags
              placeholder="请选择">
              <span id="checkAll2" @click='checkAll2'>全选</span>
              <el-option
                v-for="item in options2"
                :key="item.grade_id"
                :label="item.grade_name"
                :value="item.grade_id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <router-link to="/officialList"><el-button>取消</el-button></router-link>
            <el-button @click="saveUser()">保存</el-button>
          </el-form-item>
        </el-form>
      </div>
     </div>
  </div>
</template>
<script>
  import myHeader from '../../myHeader/myHeader'
  import { getLeader, saveLeader } from '@/api/eduAdmin'
  export default {
    name: 'officialEdit',
    data() {
      return {
        form: {
          name: '石选晓',
          schoolName: '武宁路小学',
          userName: 'shixiuan',
          type: '0',
          telephone: '13535790897',
          email: '134752398@348.cn',
          status: 0
        },
        msg: {
          title1: '评价项目管理',
          title2: '负责人管理',
          title3: '编辑负责人',
          flag: 2,
          path1: '/itemList',
          path2: '/officialList'
        },
        options1: [],
        options2: [],
        value1: [],
        value2: [],
        allValues1: [],
        allValues2: [],
        school_id: '',
        project_id: '',
        subject_id: [],
        grade_id: [],
        teacher_name: ''
      }
    },
    components: {
      myHeader
    },
    mounted() {
      this.school_id = this.$route.query.school_id
      this.project_id = this.$route.query.project_id
      this.teacher_name = this.$route.query.teacher_name
      this.teacher_id = this.$route.query.teacher_id
      this.subject_id = this.$route.query.subject_id
      this.grade_id = this.$route.query.grade_id
      this.getData()
      this.value2 = this.grade_id
      this.value1 = this.$route.query.subject_id
      if (typeof (this.value2) === 'string') {
        this.value2 = [this.value2]
      }
      if (typeof (this.value1) === 'string') {
        this.value1 = [this.value2]
      }
      console.log(this.grade_id)
    },
    methods: {
      getData() {
        const obj = {
          project_id: this.project_id,
          token: localStorage.getItem('TOKEN')
        }
        console.log(obj)
        getLeader(obj)
          .then(res => {
            if (res.hasOwnProperty('response')) {
              console.log(res)
              this.options1 = res.response.subject_list.list
              this.options2 = res.response.grade_list.list
              this.allValues1 = res.response.subject_list.ids
              this.allValues2 = res.response.grade_list.ids
            } else {
              this.$message.error(res.error_response.msg)
            }
          })
          .catch(err => {
            console.log(err)
          })
      },
      saveUser() {
        console.log(this.value1)
        console.log(this.value2)
        console.log(this.$router)
        const obj = {
          project_id: this.project_id,
          add_flag: 0,
          teacher_id: this.teacher_id,
          school_id: this.school_id,
          grade_select: this.value2,
          subject_select: this.value1,
          token: localStorage.getItem('TOKEN')
        }
        saveLeader(obj)
          .then(res => {
            if (res.hasOwnProperty('response')) {
              this.$message.success('保存成功')
              this.$router.push({ path: '/officialList', qurey:{ project_id: this.project_id } })
              console.log(res)
            } else {
              this.$message.error(res.error_response.msg)
            }
          })
          .catch(err => {
            console.log(err)
          })
      },
      checkAll() {
        this.value1 = this.allValues1
      },
      checkAll2() {
        this.value2 = this.allValues2
      }
    },
    watch: {
      value2: function(news, olds) {
        console.log(news)
        console.log(olds)
        if (news.length === this.allValues2.length) {
          document.getElementById('checkAll2').style.color = '#409EFF'
        } else {
          document.getElementById('checkAll2').style.color = '#606266'
        }
      },
      value1: function(news, olds) {
        console.log(news)
        console.log(olds)
        if (news.length === this.allValues1.length) {
          document.getElementById('checkAll').style.color = '#409EFF'
        } else {
          document.getElementById('checkAll').style.color = '#606266'
        }
      }
    }
  }
</script>

<style scoped>
.title {
  margin-bottom: 30px;
}
</style>
<style type="text/css">
#official .el-select__tags {
  max-width: 163px;
}
.main-content .edit-form #official .el-input {
  width: 195px;
}
.main-content .edit-form #official2 .el-input {
  width: 195px;
}
#checkAll {
  display: inline-block;
  text-indent: 140px;
  font-size: 14px;
  padding-bottom: 5px;
  padding-left: 5px;
  cursor: pointer;
  color: #606266;
}
#checkAll2 {
  display: inline-block;
  text-indent: 140px;
  font-size: 14px;
  padding-bottom: 5px;
  padding-left: 5px;
  cursor: pointer;
  color: #606266;
}
.el-form-item{
  width: 100%;
}
</style>




