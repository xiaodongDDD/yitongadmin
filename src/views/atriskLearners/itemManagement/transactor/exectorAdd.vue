<template>
  <div class="center-content exector-Edit">
    <my-header :msg='msg'></my-header>
    <div class="content-detail">
      <p class="position">新增执行人</p>
        <div class="edit-form">
        <el-form ref="form" :model="form" label-width="100px">
          <el-form-item label="执行人姓名：" id='names'>
            <el-select
              v-model="value"
              collapse-tags
              @change="chooseName"
              placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.teacher_id"
                :label="item.teacher_name"
                :value="item.teacher_id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="执行学科：" id='subject'>
            <el-select
              v-model="value1"
              collapse-tags
              @change="chooseSubject"
              placeholder="请选择">
              <el-option
                v-for="item in options1"
                :key="item.subject_id"
                :label="item.subject_name"
                :value="item.subject_id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="执行班级：" id='grade'>
            <el-select
              v-model="value2"
              multiple
              collapse-tags
              placeholder="请选择">
              <el-option
                v-for="item in options2"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="评价项目：" id='project'>
            <el-select v-model="value3" placeholder="请选择">
              <el-option
                v-for="item in options3"
                :key="item.value"
                :label="item.template_name"
                :value="item.template_id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <router-link to="/poorStudentEdit"><el-button>取消</el-button></router-link>
            <el-button @click="saveUser()">保存</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>
<script>
  import myHeader from '../../myHeader/myHeader'
  import { getExecutor, getExecutorSubject, getExecutorTeacher, getExecutorClass, saveExecutor } from '@/api/eduAdmin'
  export default {
    name: 'exectorEdit',
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
        leader_id: '',
        school_id: '',
        project_id: '',
        subject_id: [],
        msg: {
          title1: '评价项目管理',
          title2: '新增执行人',
          flag: 1,
          path: '/itemList'
        },
        options: [],
        options1: [],
        options2: [],
        options3: [],
        value3: '',
        value2: [],
        value1: '',
        value: ''
      }
    },
    components: {
      myHeader
    },
    mounted() {
      this.leader_id = this.$route.query.leader_id
      this.school_id = this.$route.query.school_id
      this.project_id = this.$route.query.project_id
      this.subject_id = this.$route.query.subject_id
      this.getData()
    },
    methods: {
      getData() {
        const obj = {
          school_id: this.school_id,
          project_id: this.project_id,
          leader_id: this.leader_id,
          subject_id: this.subject_id,
          token: localStorage.getItem('TOKEN')
        }
        getExecutor(obj)
          .then(res => {
            if (res.hasOwnProperty('response')) {
              console.log(res)
              this.options = res.response.subjectTeachers
              this.options1 = res.response.subject_list
              if (this.options1.length === 1) {
                this.value1 = res.response.subject_list[0].subject_id
              }
              this.options2 = res.response.class_list
              this.options3 = res.response.template_list
            } else {
              console.log(res)
            }
          })
          .catch(err => {
            console.log(err)
          })
      },
      chooseSubject() {
        // if (this.value === '') {
        //   this.$message.error('请先选择执行人姓名')
        //   this.value1 = ''
        //   return false
        // }
        this.getClassData()
        this.getNameData()
      },
      chooseName() {
        this.getClassData()
        this.getSubjectData()
      },
      getNameData() {
        const obj = {
          project_id: this.project_id,
          leader_id: this.leader_id,
          school_id: this.school_id,
          subject_id: this.value1,
          token: localStorage.getItem('TOKEN')
        }
        getExecutorTeacher(obj)
          .then(res => {
            if (res.hasOwnProperty('response')) {
              this.options = res.response.executor_list
            } else {
              this.$message.error(res.error_response.msg)
            }
          })
          .catch(err => {
            console.log(err)
          })
      },
      getSubjectData() {
        const obj = {
          project_id: this.project_id,
          leader_id: this.leader_id,
          school_id: this.school_id,
          token: localStorage.getItem('TOKEN')
        }
        getExecutorSubject(obj)
          .then(res => {
            if (res.hasOwnProperty('response')) {
              this.options1 = res.response.subject_list
              if (this.options1.length === 1) {
                this.options1 = res.response.subject_list
                this.value1 = res.response.subject_list[0].subject_id
              }
            } else {
              this.$message.error(res.error_response.msg)
            }
          })
          .catch(err => {
            console.log(err)
          })
      },
      getClassData() {
        const obj = {
          project_id: this.project_id,
          leader_id: this.leader_id,
          school_id: this.school_id,
          subject_id: this.value1,
          executor_id: this.value,
          token: localStorage.getItem('TOKEN')
        }
        if (obj.executor_id === '') {
          this.$message.error('请先选择执行人姓名')
          this.value2 = []
          return false
        }
        if (obj.subject_id === '') {
          this.value1 = ''
          return false
        }
        getExecutorClass(obj)
          .then(res => {
            if (res.hasOwnProperty('response')) {
              this.options2 = res.response.subject_list
            } else {
              this.$message.error(res.error_response.msg)
            }
          })
          .catch(err => {
            console.log(err)
          })
      },
      saveUser() {
        console.log(this.value3, this.value2, this.value1)
        const obj = {
          project_id: this.project_id,
          leader_id: this.leader_id,
          school_id: this.school_id,
          executor_id: this.value,
          template_id: this.value3,
          grade_id: this.grade_id,
          subject_id: this.value1,
          class_id: this.value2,
          token: localStorage.getItem('TOKEN')
        }
        saveExecutor(obj)
          .then(res => {
            if (res.hasOwnProperty('response')) {
              this.$router.push({ path: '/poorStudentEdit' })
              console.log(res)
            } else {
              this.$message.error(res.error_response.msg)
              console.log(res)
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
<style type="text/css">
#subject .el-select__tags {
  max-width: 163px;
}
#grade .el-select__tags {
  max-width: 163px;
}
#names .el-select__tags {
  max-width: 163px;
}
.main-content .edit-form #names .el-input {
  width: 195px;
}
.main-content .edit-form #subject .el-input {
  width: 195px;
}
.main-content .edit-form #grade .el-input {
  width: 195px;
}
.main-content .edit-form #project .el-input {
  width: 375px;
}
</style>

