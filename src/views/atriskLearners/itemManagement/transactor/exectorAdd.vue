<template>
  <div class="center-content exector-Edit">
    <my-header :msg='msg'></my-header>
    <div class="content-detail">
      <p class="position">新增执行人</p>
        <div class="edit-form">
        <el-form ref="form" :model="form" label-width="100px">
          <el-form-item label="执行人姓名：">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="执行学科：">
            <el-select
              v-model="value1"
              multiple
              collapse-tags
              style="margin-left: 20px;"
              placeholder="请选择">
              <el-option
                v-for="item in options1"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="执行班级：">
            <el-select
              v-model="value2"
              multiple
              collapse-tags
              style="margin-left: 20px;"
              placeholder="请选择">
              <el-option
                v-for="item in options2"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="评价项目：">
            <el-select v-model="value3" placeholder="请选择">
              <el-option
                v-for="item in options3"
                :key="item.value"
                :label="item.label"
                :value="item.value">
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
        msg: {
          title1: '项目评价管理',
          title2: '新增执行人',
          flag: 1,
          path: '/itemList'
        },
        options1: [{
          value: '选项1',
          label: '黄金糕'
        }, {
          value: '选项2',
          label: '双皮奶'
        }, {
          value: '选项3',
          label: '蚵仔煎'
        }, {
          value: '选项4',
          label: '龙须面'
        }, {
          value: '选项5',
          label: '北京烤鸭'
        }],
        options2: [{
          value: '选项1',
          label: '黄金糕1'
        }, {
          value: '选项2',
          label: '双皮奶1'
        }, {
          value: '选项3',
          label: '蚵仔煎1'
        }, {
          value: '选项4',
          label: '龙须面1'
        }, {
          value: '选项5',
          label: '北京烤鸭1'
        }],
        options3: [{
          value: '选项1',
          label: '黄金糕'
        }, {
          value: '选项2',
          label: '双皮奶'
        }, {
          value: '选项3',
          label: '蚵仔煎'
        }, {
          value: '选项4',
          label: '龙须面'
        }, {
          value: '选项5',
          label: '北京烤鸭'
        }],
        value3: '',
        value2: [],
        value1: []
      }
    },
    components: {
      myHeader
    },
    methods: {
      saveUser() {
        this.$router.push({ path: '/poorStudentEdit' })
      }
    }
  }
</script>

<style scoped>

</style>


