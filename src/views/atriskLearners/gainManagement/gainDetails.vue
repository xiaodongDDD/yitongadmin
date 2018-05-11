<template>
  <div class="center-content gain-details">
    <my-header :msg='msg'></my-header>
    <div class="content-detail">
      <p class="position">道达尔学困生辅导记录表</p>
      <div class="function-btns">
        <el-button icon="el-icon-upload2" type="text" @click="">导出</el-button>
        <router-link to="/gainSchoolList"><el-button type="text">返回</el-button></router-link>
      </div>

      <div class="details-table">
        <el-table
          :data="tableData.data"
          border
          style="width: 100%">
          <el-table-column
            v-for="item in tableData.column"
            :prop="item.value"
            :label="item.name"
            width="">
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script>
  import myHeader from '../myHeader/myHeader'
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
          column: [{ name: '成绩记录', value: 'record' }, { name: '基础', value: 'name1' }, { name: '说明', value: 'instruction1' }, { name: '阅读', value: 'name2' }, { name: '说明', value: 'instruction2' }],
          data: [{
            date: '2016-05-02',
            record: '',
            name1: '王小虎',
            instruction1: '上海市普陀区金沙江路 1518 弄',
            name2: '王小虎',
            instruction2: '上海市普陀区金沙江路 1518 弄'
          }, {
            date: '2016-05-04',
            record: '',
            name1: '王小虎',
            instruction1: '上海市普陀区金沙江路 1517 弄',
            name2: '王小虎',
            instruction2: '上海市普陀区金沙江路 1518 弄'
          }, {
            date: '2016-05-01',
            record: '',
            name1: '王小虎',
            instruction1: '上海市普陀区金沙江路 1519 弄',
            name2: '王小虎',
            instruction2: '上海市普陀区金沙江路 1518 弄'
          }]
        },
        tableDatat: [{ name: '时间', value: '2018年第一学期' }, { name: '学生姓名', value: '2018年第一学期' }, { name: '年级班级', value: '2018年第一学期' }]
      }
    },
    components: {
      myHeader
    },
    methods: {
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
    /*font-weight: normal;*/
  }
  .mock-table{
    width: 100%;
    color: #606266;
    border:1px solid #ebeef5;
    border-collapse:collapse;

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
  }
</style>
