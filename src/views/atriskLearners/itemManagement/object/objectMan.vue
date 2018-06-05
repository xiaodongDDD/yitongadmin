<template>
  <div class="center-content object-man">
      <my-header :msg='msg'></my-header>
      <div class="content-detail">
        <div class="title"><span class="officialMan">{{ project_name }}评价项目管理</span><span @click="goback" class="goback">返回</span></div>
      <div class="smallTitle">
        <span class='manName'>执行人 {{ teacher_name }}&nbsp&nbsp</span>
        <span class="num">评价对象 {{ num }}人</span>
      </div>
      <div class="list-table">
        <el-table
          :data="tableData"
          border
          style="width: 100%">
          <el-table-column
            align="center"
            prop="student_name"
            label="评价对象"
            width="100">
          </el-table-column>
          <el-table-column
            align="center"
            prop="subject_name"
            label="所属学科"
            width="100">
          </el-table-column>
          <el-table-column
            align="center"
            prop="g_c_name"
            label="所属班级"
            width="100">
          </el-table-column>
          <el-table-column
            align="center"
            prop="template_name"
            label="评价模块"
             >
          </el-table-column>
        </el-table>
      </div>
      <el-pagination
          style='display:inline-block;margin-left:37%;margin-top:20px'
          @current-change="handleCurrentChange"
          background
          layout="prev, pager, next"
          :page-count="total">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import myHeader from '../../myHeader/myHeader'
import { getresultstu } from '@/api/eduAdmin'
export default {
  name: 'objectMan',
  data() {
    return {
      centerDialogVisible: false,
      userName: '',
      total: 0,
      num: 0,
      teacher_name: '',
      p_e_ids: '',
      form: {
        name: ''
      },
      project_name: '',
      msg: {
        title1: '评价项目管理',
        title2: '评价对象管理',
        flag: 1,
        path: '/itemList'
      },
      tableData: []
    }
  },
  components: {
    myHeader
  },
  mounted() {
    this.p_e_ids = this.$route.query.p_e_ids
    this.project_name = this.$route.query.project_name
    this.teacher_name = this.$route.query.teacher_name
    this.getData(1)
  },
  methods: {
    getData(pages) {
      const obj = {
        p_e_ids: this.p_e_ids,
        page: pages,
        token: localStorage.getItem('TOKEN')
      }
      getresultstu(obj)
        .then(res => {
          if (res.hasOwnProperty('response')) {
            console.log(res)
            this.tableData = res.response.list
            this.total = res.response.allPage
            this.num = res.response.num
            // this.teacher_name = res.response.teacher_name
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    goback() {
      this.$router.push({ path: '/objectList' })
    },
    handleCurrentChange(val) {
      this.getData(val)
      console.log(`当前页: ${val}`)
    }
  }
}
</script>

<style scoped>
.title {
  width: 100%;
  height: 30px;
  overflow: hidden;
  margin-bottom: 20px;
  margin-top: 20px;
  color: #333;
  /*font-size: 18px;*/
  padding: 0px 1px;
}
.officialMan {
   float: left;
   height: 30px;
   line-height: 30px;
   display: inline-block;
}
.goback {
  float: right;
  height: 30px;
  line-height: 26px;
  font-size: 15px;
  display: inline-block;
  cursor: pointer;
  padding: 3px;
  background-color: #f4f4f4;
  border-radius: 5px;
}
.smallTitle {
  margin-bottom: 10px;
}
.manName {
  font-size: 14px;
  color: #333;
}
.num {
    font-size: 14px;
    color: #333;
}
</style>
