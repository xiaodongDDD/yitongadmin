<template>
  <div class="center-content official-Add">
      <my-header :msg='msg'></my-header>
      <div class="content-detail">
        <p class="position">新增负责人</p>
        <div class="add-form">
        <el-form ref="form" :model="form" label-width="100px">
          <el-form-item label="负责人姓名：">
            <el-input style='width:500px' v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="负责学科：">
            <el-select
              v-model="value1"
              multiple
              collapse-tags
              placeholder="请选择">
              <el-option
                v-for="item in options1"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="负责年级：">
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
  import { saveLeader } from '@/api/eduAdmin'
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
          title1: '项目评价管理',
          title2: '负责人管理',
          title3: '新增负责人管理',
          flag: 2,
          path1: '/itemList',
          path2: '/officialList'
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
        value2: [],
        value1: []
      }
    },
    components: {
      myHeader
    },
    methods: {
      saveUser() {
        const obj = {
          project_id: 1,
          add_flag: 0,
          teacher_id: 1,
          school_id: 1,
          grade_select: this.value1,
          subject_select: this.value2
        }
        saveLeader(obj)
          .then(res => {
            console.log(res)
          })
        // this.$router.push({ path: '/itemList' })
        // console.log(this.value1)
      }
    }
  }
</script>

<style scoped>
.title {
  margin-bottom: 30px;
}
</style>


