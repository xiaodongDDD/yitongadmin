<template>
  <div class="center-content gain-details">
    <p class="position">道达尔学困生辅导记录表</p>

    <div class="function-btns">
      <el-button icon="el-icon-upload2" type="text" @click="">导出</el-button>
      <router-link to="/gainSchoolList"><el-button type="text">返回</el-button></router-link>
    </div>

    <div class="details-table">
      <el-table
        :data="tableData6"
        :span-method="arraySpanMethod"
        border
        style="width: 100%">
        <el-table-column
          prop="id"
          label="ID"
          width="180">
        </el-table-column>
        <el-table-column
          prop="name"
          label="姓名">
        </el-table-column>
        <el-table-column
          prop="amount1"
          sortable
          label="数值 1">
        </el-table-column>
        <el-table-column
          prop="amount2"
          sortable
          label="数值 2">
        </el-table-column>
        <el-table-column
          prop="amount3"
          sortable
          label="数值 3">
        </el-table-column>
        <el-table-column
          prop="amount4"
          sortable
          label="数值 4">
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'gainDetails',
    data() {
      return {
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

<style scoped>
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
</style>
