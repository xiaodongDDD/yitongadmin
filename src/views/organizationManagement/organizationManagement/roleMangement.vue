<template>
  <div class="roleMangement">
    <!--添加-->
    <div class="buttonAdd">  <el-button>&nbsp;&nbsp;新&nbsp;增&nbsp;&nbsp;</el-button>
    </div>
    <!--表格-->
    <el-table
      :data="tableData"
      v-loading.body="listLoading" element-loading-text="加载中..." border fit highlight-current-row
      style="width: 100%">
      <el-table-column
        prop="date"
        align="center"
        label="编号"
        width="120">
      </el-table-column>
      <el-table-column
        prop="name"
        label="角色名称"
        align="center"
        width="120">
      </el-table-column>
      <el-table-column
        prop="address"
        label="备注"
        align="center">
      </el-table-column>
      <el-table-column
        prop="address"
        label="创建人"
        align="center"
        width="180">
      </el-table-column>
      <el-table-column
        prop="address"
        label="最后修改日期"
        align="center"
        width="180">
      </el-table-column>
      <el-table-column
        label="操作"
        align="center"
        width="200">
        <template slot-scope="scope">
          <el-button type="" size="mini" @click="updateInfo(scope.row)">修改</el-button>
          <el-button type="" size="mini" @click="deleteInfo(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!--分页-->
    <div class="text-center">
      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[10, 20, 50, 100]"
        :page-size="pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'roleMangement',
    computed: {
    },
    data() {
      return {
        currentPage: 1,
        pagesize: 10,
        total: 0,
        listLoading: false,
        tableData: [{
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }]
      }
    },
    created() {
    },
    methods: {
      updateInfo: function() {
        console.log()
        this.$router.push('authorityMangementSp')
      },
      deleteInfo: function() {
        console.log('qwqwqw')
        this.$confirm('确认要删除角色超级管理员吗?', '确认操作', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
        }).then(() => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
      },
      // 分页
      handleSizeChange(val) {
        this.pagesize = val
        this.currentPage = 1
        this.fetchData()
        console.log(`每页 ${val} 条`)
      },
      handleCurrentChange(val) {
        this.currentPage = val
        this.fetchData()
        console.log(`当前页: ${val}`)
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .roleMangement{
    margin: 20px 30px;
    .buttonAdd{
      text-align: right;
      margin-bottom: 10px;
    }
    .text-center{
      text-align: center;
      margin-top: 10px;
    }
  }
</style>
