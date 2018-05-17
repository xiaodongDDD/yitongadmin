<template>
  <div class="center-content power=edit">
    <my-header :msg='msg'></my-header>
    <div class="content-detail">
      <p class="position">编辑权限管理</p>
      <div class="edit-form">
        <el-form ref="form" :model="form" label-width="100px">
          <el-form-item label="姓名：">
            <span>{{form.teacher_name}}</span>
          </el-form-item>
          <el-form-item label="类型：">
            <span v-if="form.teacher_type == 3">运营</span>
            <span v-else>学校</span>
          </el-form-item>
          <el-form-item label="学校：">
            <span>{{form.school_name}}</span>
          </el-form-item>
          <el-form-item label="手机号：">
            <span>{{form.telephone}}</span>
          </el-form-item>

          <el-form-item label="菜单：" prop="powerlist">
            <el-checkbox-group v-model="powerlist">
              <el-checkbox label="1" name="powerlist" v-if="form.teacher_type == '3'">学校用户管理</el-checkbox>
              <el-checkbox label="2" name="powerlist">账户管理</el-checkbox>
              <el-checkbox label="3" name="powerlist">权限管理</el-checkbox>
              </el-checkbox-group>
              <!-- <el-checkbox :indeterminate="isIndeterminate" name="powerlist" v-model="checkAll" @change="handleCheckAllChange">评价项目管理</el-checkbox>
              <div style="margin: 15px 0;"></div>
              <el-checkbox-group class="checkbox-menu" v-model="form.powerlist" @change="handleCheckedCitiesChange">
                <el-checkbox v-for="city in cities" :label="city" :key="city">{{ city }}</el-checkbox>
              </el-checkbox-group> -->
              <el-checkbox label="4" v-model='checked1' name="powerlist">评价项目管理</el-checkbox>
              <el-checkbox-group v-model="powerlist">
              <el-checkbox label="5" :disabled='disabled' @change="handleCheckAllChange" style='margin-left:20px' name="powerlist">负责人管理</el-checkbox>
              <el-checkbox label="6" style='margin-left:20px' name="powerlist">执行人管理</el-checkbox>
              <el-checkbox label="7" style='margin-left:20px' name="powerlist">评价对象管理</el-checkbox>
              <el-checkbox label="8" name="powerlist">评价模板管理</el-checkbox>
              <el-checkbox label="9" name="powerlist">评价成果</el-checkbox>
              <el-checkbox label="10" name="powerlist" v-if="form.teacher_type == '3'">操作日志</el-checkbox>
            </el-checkbox-group>
          </el-form-item>

          <el-form-item>
            <router-link to="/powerList"><el-button>取消</el-button></router-link>
            <el-button @click="saveUser()">保存</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
  import myHeader from '../myHeader/myHeader'
  import { getPowerDetail, authSave } from '@/api/eduAdmin'
  export default {
    name: 'powerEdit',
    data() {
      return {
        form: {
          auth_list: [],
          teacher_name: '石选晓',
          teacher_type: 0,
          school_name: '石选晓可代发集齐啊小花',
          status: 'on',
          telephone: '13535790897'
        },
        powerlist: [],
        checked1: false,
        disabled: true,
        msg: {
          title1: '权限管理',
          title2: '编辑权限管理',
          flag: 1,
          path: '/powerList'
        }
        // checkAll: false,
        // checkedCities: [],
        // cities: ['负责人管理', '执行人管理', '评价对象管理'],
        // isIndeterminate: false
      }
    },
    components: {
      myHeader
    },
    mounted() {
      // this.checked1 = true
      this.teacher_id = this.$route.query.teacher_id
      this.getData()
      console.log(this.$route.path)
    },
    methods: {
      getData() {
        const obj = {
          teacher_id: 10220,
          token: localStorage.getItem('TOKEN')
        }
        getPowerDetail(obj)
          .then(res => {
            console.log(res)
            if (res.hasOwnProperty('response')) {
              this.form = res.response.detail
              const nowList = res.response.detail.auth_list
              // const nowList = ['2','3','6','7','9','10']
              if (nowList.indexOf('4') !== -1) {
                this.checked1 = true
              }
              this.powerlist = nowList
            } else {
              console.log(res.error_response.msg)
            }
          })
          .catch(err => {
            console.log(err)
          })
      },
      saveUser() {
        if (this.powerlist.indexOf('4') === -1 && this.powerlist.indexOf('5') !== -1) {
          this.powerlist.push('4')
        } else if (this.powerlist.indexOf('4') !== -1 && this.powerlist.indexOf('5') === -1) {
          const num = this.powerlist.indexOf('4')
          this.powerlist.splice(num, 1)
        }
        const obj = {
          teacher_id: this.teacher_id,
          auth_list: this.powerlist,
          token: localStorage.getItem('TOKEN')
        }
        authSave(obj)
          .then(res => {
            if (res.hasOwnProperty('response')) {
              console.log(res)
              this.$message.success(res.response.msg)
            } else {
              this.$message.error(res.error_response.msg)
            }
          })
          .catch(err => {
            console.log(err)
          })
        console.log(this.powerlist)
        console.log(this.checked1)

        // this.$router.push({ path: '/powerList' })
      },
      handleCheckAllChange(val) {
        // this.checkedCities = val ? this.cities : []
        // this.isIndeterminate = false
        console.log(val)
        if (val === true) {
          this.checked1 = true
          console.log(1111)
        }
        // console.log('checks', this.checkAll, this.check1, this.check2, this.check3)
        // console.log(this.isIndeterminate)
      }
      // handleCheckedCitiesChange(value) {
      // console.log('value', value)
      // let checkedCount = value.length
      // console.log('value.lengt', value.length)
      // console.log('this.cities.length', this.cities.length)
      // this.checkAll = checkedCount === this.cities.length
      // console.log('this.checkAll',this.checkAll)
      // this.isIndeterminate = checkedCount > 0 && checkedCount < this.cities.length
      // console.log('this.isIndeterminate', this.isIndeterminate)
      //   console.log(value)
      // }
    },
    watch: {
      checked1: function(news, old) {
        // console.log(news)
        if (news === true) {
          this.disabled = false
        } else {
          this.disabled = true
          this.powerlist = this.powerlist.filter(function(x, index) {
            return x !== '5'
          })
        }
      }
    }
  }
</script>

<style scoped>
  .checkbox-menu{
    margin-left: 20px;
  }
</style>
