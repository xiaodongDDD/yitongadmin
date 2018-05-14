<template>
  <div class="center-content official-Edit">
      <my-header :msg='msg'></my-header>
      <div class="content-detail">
        <div class='content-detail'>
        <p class="position">编辑负责人</p>
        <div class="edit-form">
        <el-form ref="form" :model="form" label-width="100px">
          <el-form-item label="负责人姓名：">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="负责学科：" id='official'>
            <el-select
              id='officialSelect1'
              v-model="value1"
              collapse-tags
              placeholder="请选择">
              <span id="checkAll2" @click='checkAll2'>全选</span>
              <el-option
                v-for="item in options1"
                :key="item.values"
                :label="item.label"
                :value="item.values">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="负责年级：" id='official2'>
            <el-select
              v-model="value2"
              multiple
              collapse-tags
              placeholder="请选择">
              <span id="checkAll" @click='checkAll'>全选</span>
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
  </div>
</template>
<script>
  import myHeader from '../../myHeader/myHeader'
  import { getLeader } from '@/api/eduAdmin'
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
          title3: '编辑负责人管理',
          flag: 2,
          path1: '/itemList',
          path2: '/officialList'
        },
        options1: [{
          values: '选项1',
          label: '黄金糕'
        }, {
          values: '选项2',
          label: '双皮奶'
        }, {
          values: '选项3',
          label: '蚵仔煎'
        }, {
          values: '选项4',
          label: '龙须面'
        }, {
          values: '选项5',
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
        value1: [],
        allValues: ['选项1', '选项2', '选项3', '选项4', '选项5'],
        school_id: '',
        project_id: '',
        teacher_id: ''
      }
    },
    components: {
      myHeader
    },
    mounted() {
      this.school_id = this.$route.query.school_id
      this.project_id = this.$route.query.project_id
      this.teacher_id = this.$route.query.teacher_id
      this.getData()
    },
    methods: {
      getData() {
        const obj = {
          school_id: this.school_id,
          project_id: this.project_id,
          teacher_id: this.teacher_id,
          token: localStorage.getItem('TOKEN')
        }
        getLeader(obj)
          .then(res => {
            if (res.hasOwnProperty('response')) {
              console.log(res)
            } else {
              console.log(res)
            }
          })
          .catch(err => {
            console.log(err)
          })
      },
      saveUser() {
        // this.$router.push({ path: '/officialList' })
        console.log(this.value1)
        console.log(this.value2)
        console.log(this.$router)
      },
      checkAll() {
        this.value2 = ['选项1', '选项2', '选项3', '选项4', '选项5']
      },
      checkAll2() {
        this.value1 = ['选项1', '选项2', '选项3', '选项4', '选项5']
      }
    },
    watch: {
      value2: function(news, olds) {
        console.log(news)
        console.log(olds)
        if (news.length === this.allValues.length) {
          document.getElementById('checkAll').style.color = '#409EFF'
        } else {
          document.getElementById('checkAll').style.color = '#606266'
        }
      },
      value1: function(news, olds) {
        console.log(news)
        console.log(olds)
        if (news.length === this.allValues.length) {
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
</style>




