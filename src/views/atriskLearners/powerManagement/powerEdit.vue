<template>
  <div class="center-content power=edit">
    <my-header :msg='msg'></my-header>
    <div class="content-detail">
      <p class="position">编辑权限管理</p>
      <div class="edit-form">
        <el-form ref="form" :model="form" label-width="100px">
          <el-form-item label="姓名：">
            <span>{{form.name}}</span>
          </el-form-item>
          <el-form-item label="类型：">
            <span v-if="form.type == 0">学校</span>
            <span v-else>运营</span>
          </el-form-item>
          <el-form-item label="学校：">
            <span>{{form.schoolName}}</span>
          </el-form-item>
          <el-form-item label="手机号：">
            <span>{{form.telephone}}</span>
          </el-form-item>

          <el-form-item label="菜单：" prop="powerlist">
            <el-checkbox-group v-model="form.powerlist">
              <el-checkbox label="学校用户管理" name="powerlist"></el-checkbox>
              <el-checkbox label="账户管理" name="powerlist"></el-checkbox>
              <el-checkbox label="权限管理" name="powerlist"></el-checkbox>
              </el-checkbox-group>
              <!-- <el-checkbox :indeterminate="isIndeterminate" name="powerlist" v-model="checkAll" @change="handleCheckAllChange">评价项目管理</el-checkbox>
              <div style="margin: 15px 0;"></div>
              <el-checkbox-group class="checkbox-menu" v-model="form.powerlist" @change="handleCheckedCitiesChange">
                <el-checkbox v-for="city in cities" :label="city" :key="city">{{ city }}</el-checkbox>
              </el-checkbox-group> -->
              <el-checkbox label="评价项目管理" v-model='checked1' name="powerlist"></el-checkbox>
              <el-checkbox-group v-model="form.powerlist">
              <el-checkbox label="负责人管理" :disabled='disabled' @change="handleCheckAllChange" style='margin-left:20px' name="powerlist"></el-checkbox>
              <el-checkbox label="执行人管理" :disabled='disabled' @change="handleCheckAllChange" style='margin-left:20px' name="powerlist"></el-checkbox>
              <el-checkbox label="评价对象管理" :disabled='disabled' @change="handleCheckAllChange" style='margin-left:20px' name="powerlist"></el-checkbox>
              <el-checkbox label="评价模板管理" name="powerlist"></el-checkbox>
              <el-checkbox label="评价成果" name="powerlist"></el-checkbox>
              <el-checkbox label="操作日志" name="powerlist"></el-checkbox>
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
  export default {
    name: 'powerEdit',
    data() {
      return {
        form: {
          name: '石选晓',
          type: 0,
          schoolName: '石选晓可代发集齐啊小花',
          status: 'on',
          telephone: '13535790897',
          powerlist: []
        },
        checked1: false,
        disabled: true,
        check1: false,
        check2: false,
        check3: false,
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
    },
    methods: {
      saveUser() {
        // const allcheck = this.form.powerlist.concat(this.checkedCities)
        // console.log(this.checkedCities)
        if (this.checked1) {
          this.form.powerlist.push('评价项目管理')
        }
        console.log(this.form.powerlist)
        console.log(this.checked1)
        // console.log(allcheck)
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
          this.form.powerlist = this.form.powerlist.filter(function(x, index) {
            return x !== '负责人管理' && x !== '执行人管理' && x !== '评价对象管理'
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
