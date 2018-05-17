<template>
  <div class="center-content official-Add">
      <my-header :msg='msg'></my-header>
      <div class="content-detail">
        <p class="position">新增负责人</p>
        <div class="add-form">
        <el-form ref="form" :model="form" label-width="100px">
          <el-form-item label="负责人姓名：">
            <el-input style='width:500px' placeholder="请输入" v-model="teacher_name"></el-input>
          </el-form-item>
          <el-form-item label="负责学科：">
            <el-select
              v-model="value1"
              collapse-tags
              multiple
              placeholder="请选择">
              <span id="checkAll2" @click='checkAll'>全选</span>
              <el-option
                v-for="item in options1"
                :key="item.subject_id"
                :label="item.subject_name"
                :value="item.subject_id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="负责年级：">
            <el-select
              v-model="value2"
              multiple
              collapse-tags
              placeholder="请选择">
              <span id="checkAll" @click='checkAll2'>全选</span>
              <el-option
                v-for="item in options2"
                :key="item.grade_id"
                :label="item.grade_name"
                :value="item.grade_id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <router-link to="/itmeList"><el-button>取消</el-button></router-link>
            <el-button @click="saveUser()">保存</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>
<script>
  import myHeader from '../../myHeader/myHeader'
  import { saveLeader, getLeader } from '@/api/eduAdmin'
  export default {
    name: 'officialEdit',
    data() {
      return {
        form: {},
        teacher_name: '',
        msg: {
          title1: '项目评价管理',
          title2: '负责人管理',
          title3: '新增负责人管理',
          flag: 2,
          path1: '/itemList',
          path2: '/officialList'
        },
        options1: [],
        options2: [],
        value2: [],
        value1: [],
        allValues1: [],
        allValues2: [],
        project_id: ''
      }
    },
    components: {
      myHeader
    },
    mounted() {
      this.project_id = this.$route.query.project_id
      this.getData()
    },
    methods: {
      getData() {
        const obj = {
          project_id: this.project_id,
          token: localStorage.getItem('TOKEN')
        }
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
      checkAll() {
        this.value1 = this.allValues1
      },
      checkAll2() {
        this.value2 = this.allValues2
      },
      saveUser() {
        const obj = {
          project_id: this.project_id,
          add_flag: 1,
          teacher_name: this.teacher_name,
          grade_select: this.value1,
          subject_select: this.value2,
          token: localStorage.getItem('TOKEN')
        }
        saveLeader(obj)
          .then(res => {
            console.log(res)
            if (res.hasOwnProperty('response')) {
              this.$router.push({ path: '/itemList' })
              this.$message.success('保存成功')
            } else {
              this.$message.error(res.error_response.msg)
            }
          })
          .catch(err => {
            console.log(err)
          })
        // console.log(this.value1)
      }
    },
    watch: {
      value2: function(news, olds) {
        console.log(news)
        console.log(olds)
        if (news.length === this.allValues2.length) {
          document.getElementById('checkAll').style.color = '#409EFF'
        } else {
          document.getElementById('checkAll').style.color = '#606266'
        }
      },
      value1: function(news, olds) {
        console.log(news)
        console.log(olds)
        if (news.length === this.allValues1.length) {
          document.getElementById('checkAll2').style.color = '#409EFF'
        } else {
          document.getElementById('checkAll2').style.color = '#606266'
        }
      }
    }
  }
</script>

<style scoped>
.title {
  margin-bottom: 30px;
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
</style>


