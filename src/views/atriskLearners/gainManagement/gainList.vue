<template>
  <div class="center-content gain-list">
    <my-header :msg='msg'></my-header>
    <div class="content-detail">
      <p class="position">看来打发就安静吃而非小学</p>
      <div class="list-table">
        <el-table
          :data="tableData"
          border
          style="width: 100%">
          <el-table-column
            align="center"
            prop="name"
            label="项目名称"
            width="">
          </el-table-column>
          <el-table-column
            align="center"
            prop="instruction"
            label="项目说明"
            width="">
          </el-table-column>

          <el-table-column
            align="center" label="操作" width="120">
            <template slot-scope="scope">
              <el-button
                size="mini"
                @click="handleEdit(scope.$index, scope.row)">结果查看</el-button>
            </template>
          </el-table-column>
        </el-table>

        <el-pagination
          style='display:inline-block;margin-left:37%;margin-top:20px'
          @current-change="handleCurrentChange" 
          background
          layout="prev, pager, next"
          :total="1000">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
  import myHeader from '../myHeader/myHeader'
  export default {
    name: 'gainList',
    data() {
      return {
        msg: {
          title1: '评价成果',
          title2: '',
          flag: 0,
          path: ''
        },
        tableData: [{
          name: '2018年第二学期语文补差',
          instruction: '2018年第二学期'
        }, {
          name: '2018年第二学期语文补差',
          instruction: '2018年第二学期'
        }]
      }
    },
    components: {
      myHeader
    },
    methods: {
      handleEdit(index, row) {
        this.$router.push({ path: '/gainSchoolList' })
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`)
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .position{
    text-indent: 0;
  }
</style>
