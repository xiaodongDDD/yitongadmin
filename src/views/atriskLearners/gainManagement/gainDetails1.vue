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

        <table class="mock-table">
          <tr v-for="item in tableDatat">
            <th>{{ item.name }}</th>
            <td>{{ item.value }}</td>
          </tr>
        </table>

        <el-table
          :data="tableData1"
          border
          style="width: 100%;border-top:none">
          <el-table-column
            prop="date"
            label="成绩记录"
            align="center"
            width="180">
          </el-table-column>

          <el-table-column
            v-for="item in scoreData"
            :prop="item.value"
            :label="item.name"
            align="center"
            width="">

          </el-table-column>

          <!--<el-table-column-->
            <!--prop="name"-->
            <!--label="基础"-->
            <!--align="center"-->
            <!--width="140">-->
          <!--</el-table-column>-->
          <!--<el-table-column-->
            <!--prop="address"-->
            <!--align="center"-->
            <!--label="说明">-->
          <!--</el-table-column>-->
          <!--<el-table-column-->
            <!--prop="name"-->
            <!--label="阅读"-->
            <!--align="center"-->
            <!--width="140">-->
          <!--</el-table-column>-->
          <!--<el-table-column-->
            <!--prop="address"-->
            <!--align="center"-->
            <!--label="说明">-->
          <!--</el-table-column>-->
        </el-table>

        <el-table
          :data="tableData2"
          border
          style="width: 100%;border-top:none">
          <el-table-column
            prop="date"
            label="日期"
            align="center"
            width="180">
          </el-table-column>
          <el-table-column
            prop="name"
            label="姓名"
            align="center"
            width="">
          </el-table-column>
          <el-table-column
            prop="address"
            align="center"
            label="地址">
          </el-table-column>
          <el-table-column
            prop="address"
            align="center"
            label="效果">
          </el-table-column>
        </el-table>

        <!--<el-table-->
          <!--:data="tableData6"-->
          <!--:span-method="arraySpanMethod"-->
          <!--border-->
          <!--style="width: 100%">-->
          <!--<el-table-column-->
            <!--prop="id"-->
            <!--label="ID"-->
            <!--width="180">-->
          <!--</el-table-column>-->
          <!--<el-table-column-->
            <!--prop="name"-->
            <!--label="姓名">-->
          <!--</el-table-column>-->
          <!--<el-table-column-->
            <!--prop="amount1"-->
            <!--sortable-->
            <!--label="数值 1">-->
          <!--</el-table-column>-->
          <!--<el-table-column-->
            <!--prop="amount2"-->
            <!--sortable-->
            <!--label="数值 2">-->
          <!--</el-table-column>-->
          <!--<el-table-column-->
            <!--prop="amount3"-->
            <!--sortable-->
            <!--label="数值 3">-->
          <!--</el-table-column>-->
          <!--<el-table-column-->
            <!--prop="amount4"-->
            <!--sortable-->
            <!--label="数值 4">-->
          <!--</el-table-column>-->
        <!--</el-table>-->
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
        tableDatat: [{ name: '时间', value: '2018年第一学期' }, { name: '学生姓名', value: '2018年第一学期' }, { name: '年级班级', value: '2018年第一学期' }],
        scoreData: [{ name: '基础', value: 'name' }, { name: '说明', value: 'address' }, { name: '阅读', value: 'name' }, { name: '说明', value: 'address' }],
        tableData1: [{
          date: '',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        }, {
          date: '',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        }, {
          date: '',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }],
        tableData2: [{
          date: '',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        }, {
          date: '',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        }, {
          date: '',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }],
        tableData6: [{
          id: '12987122',
          name: '王小虎',
          crow: 2,
          crowFrom: 1,
          amount1: '234',
          amount2: '3.2',
          amount3: 10
        }, {
          id: '12987123',
          name: '王小虎2',
          amount1: '165',
          amount2: '4.43',
          amount3: 12,
          amount4: 15
        }, {
          id: '12987124',
          name: '王小虎3',
          arow: 2,
          arowFrom: 0,
          crow: 2,
          crowFrom: 1,
          amount1: '324',
          amount2: '1.9',
          amount3: 9
        }, {
          id: '12987125',
          name: '王小虎4',
          amount1: '621',
          amount2: '2.2',
          amount3: 17
        }, {
          id: '12987126',
          name: '王小虎5',
          amount1: '539',
          amount2: '4.1',
          amount3: 15,
          amount4: 15
        }, {
          id: '12987126',
          name: '王小虎6',
          amount1: '539',
          amount2: '4.1',
          amount3: 15,
          amount4: 15
        }]
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
