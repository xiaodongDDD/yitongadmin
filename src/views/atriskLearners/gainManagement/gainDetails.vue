<template>
  <div class="center-content gain-details">
    <my-header :msg='msg'></my-header>
    <div class="content-detail">
      <p class="position">道达尔学困生辅导记录表</p>
      <div class="function-btns">
        <el-button icon="el-icon-upload2" type="text" @click="">导出</el-button>
        <!--<router-link to="/gainSchoolList"><el-button type="text">返回</el-button></router-link>-->
        <el-button type="text" @click="reback">返回</el-button>
      </div>


      <div class="details-table">

        <table class="mock-table">
          <tr>
            <th>时间</th>
            <td>{{ tableDatat.semester_name }}</td>
          </tr>
          <tr>
            <th>学生姓名</th>
            <td>{{ tableDatat.student_name }}</td>
          </tr>
          <tr>
            <th>年级班级</th>
            <td>{{ tableDatat.grade_name }}{{ tableDatat.class_name }}</td>
          </tr>
          <tr>
            <th>辅导学科</th>
            <td>{{ tableDatat.subject_name }}</td>
          </tr>
          <tr>
            <th>辅导教师</th>
            <td>{{ tableDatat.teacher_name }}</td>
          </tr>
          <tr>
            <th>学生属性</th>
            <td>{{ tableDatat.student_label }}</td>
          </tr>
          <tr>
            <th>辅导目标</th>
            <td>{{ tableDatat.coach_target }}</td>
          </tr>
        </table>

        <el-table
          :data="tableData.data"
          border
          style="width: 100%;border-top: none;">
          <el-table-column
            v-for="(item, index) in tableData.column"
            :prop="item.value"
            :label="item.name"
            align="center"
            :width="item.width">
          </el-table-column>
        </el-table>


        <el-table
          :data="tableDataf"
          border
          style="width: 100%;border-top: none;border-bottom: 0px;">
          <el-table-column
            prop="record"
            label="辅导记录"
            width="180"
            align="center">
          </el-table-column>
          <el-table-column
            prop="date"
            label="时间"
            align="center">
          </el-table-column>
          <el-table-column
            prop="content"
            label="内容"
            align="center">
          </el-table-column>
          <el-table-column
            prop="effect"
            label="效果"
            align="center">
          </el-table-column>
        </el-table>

        <table class="mock-table">
          <tr>
            <th>阶段小结</th>
            <td>{{ tableDatat.coach_summary }}</td>
          </tr>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
  import myHeader from '../myHeader/myHeader'
  import { gainDetail } from '@/api/eduAdmin'
  export default {
    name: 'gainDetails',
    data() {
      return {
        msg: {
          title1: '评价成果',
          title2: '评价成果列表',
          title3: '评价成果详情',
          flag: 2,
          path1: '/gainList',
          path2: '/gainSchoolList'
        },
        tableData: {
          column: [],
          data: []
        },
        tableDataf: [],
        tableDatat: {},
        project_id: ''
      }
    },
    components: {
      myHeader
    },
    methods: {
      getDetail() {
        const obj = {}
        obj.token = localStorage.getItem('TOKEN')
        obj.p_t_id = this.$route.query.p_t_id
        obj.student_id = this.$route.query.student_id
        obj.p_e_id = this.$route.query.p_e_id
        gainDetail(obj).then(res => {
          console.log(res)
          if (res.hasOwnProperty('response')) {
            this.tableData.column = res.response.table_head
            this.tableData.data = res.response.table_body
            for (let i = 0; i < this.tableData.column.length; i++) {
              if (i === 0) {
                this.tableData.column[i].width = '180'
              } else {
                this.tableData.column[i].width = ''
              }
            }
            this.tableDatat = res.response.result_base_info
            this.tableDataf = res.response.fudao_record
          }
        })
      },
      reback() {
        this.project_id = this.$route.query.project_id
        this.$router.push({ path: '/gainSchoolList', query: { 'project_id': this.project_id }})
      },
      // 跨行跨列处理
      arraySpanMethod({ row, column, rowIndex, columnIndex }) {
        if (row.hasOwnProperty('crow')) {
          if (row.hasOwnProperty('crowFrom')) {
            if (columnIndex === row.crowFrom) {
              return [row.crowFrom, row.crow]
            }
          }
        }
        if (row.hasOwnProperty('arow')) {
          if (row.hasOwnProperty('arowFrom')) {
            if (columnIndex === row.arowFrom) {
              return {
                rowspan: 2,
                colspan: 1
              }
            }
          }
        }
      }
    },
    mounted() {
      this.getDetail()
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss">
  .position{
    text-indent: 0;
  }
  .position{
    float: left;
  }
  .function-btns{
    float: right;
    margin-top: -10px;
  }
  .el-table thead{
    color: #606266;
  }
  .mock-table{
    width: 100%;
    color: #606266;
    border:1px solid #ebeef5;
    border-collapse:collapse;
    margin-top: -1px;

    th{
      width: 180px;
    }
    td{
      text-indent: 30px;
    }
    th, td{
      padding: 12px 0;
      font-size: 14px;
      border:1px solid #ebeef5;
    }
    tr:hover{
      background: #f5f7fa;
    }
  }
  .el-table tr th:first-child{
    width: 180px!important;
  }
</style>
