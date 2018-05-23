<template>
  <div class="roleMangement">
    <!--添加-->
    <div class="buttonAdd">  <el-button @click="updateInfo('add')" v-if="!disabledFlag">&nbsp;&nbsp;新&nbsp;增&nbsp;&nbsp;</el-button>
    </div>
    <!--表格-->
    <el-table
      :data="tableData"
      v-loading.body="listLoading" element-loading-text="加载中..." border fit highlight-current-row
      style="width: 100%">
      <el-table-column
        prop="yt_r_m_id"
        align="center"
        label="编号"
        width="120">
      </el-table-column>
      <el-table-column
        prop="role_name"
        label="角色名称"
        align="center"
        width="120">
      </el-table-column>
      <el-table-column
        prop="comment"
        label="备注"
        align="center">
      </el-table-column>
      <el-table-column
        prop="create_people_info"
        label="创建人"
        align="center"
        width="180">
      </el-table-column>
      <el-table-column
        prop="update_time"
        label="最后修改日期"
        align="center"
        width="180">
      </el-table-column>
      <el-table-column
        label="操作"
        align="center"
        width="200" v-if="!disabledFlag">
        <template slot-scope="scope">
          <el-button type="" size="mini" @click="updateInfo(scope.row)" >修改</el-button>
          <el-button type="danger" size="mini" @click="deleteInfo(scope.row)" :disabled="!scope.row.is_delete">删除</el-button>
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
  import { roleList, delRole } from '@/api/organizationManagement'
  import store from '@/store'

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
        tableData: [],
        module_id: store.getters.roles.yt_m_id || localStorage.module_id,
        functionFlag: localStorage.function,
        disabledFlag: true // 默认的是不能操作的
      }
    },
    created() {
      console.log(this.functionFlag)
      if (this.functionFlag.indexOf('O') >= 0) {
        this.disabledFlag = false
      }
      this.initData()
    },
    methods: {
      initData: function() {
        const obj = {
          'module_id': this.module_id,
          'pagesize': this.pagesize,
          'now_page': this.currentPage,
          'type': 0
        }
        roleList(obj).then(response => {
          this.tableData = response.response.list
          this.total = response.response.count
        }).catch()
      },
      updateInfo: function(item) {
        console.log(item)
        localStorage.itemInfo = item
        localStorage.role_name = item.role_name
        localStorage.yt_r_m_id = item.yt_r_m_id
        localStorage.comment = item.comment
        this.$router.push('authorityMangementsp')
      },
      deleteInfo: function(item) {
        console.log('qwqwqw')
        this.$confirm('确认要删除' + item.role_name + '吗?', '确认操作', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
        }).then(() => {
          const obj = {
            'module_id': this.module_id,
            'yt_r_m_id': item.yt_r_m_id
          }
          delRole(obj).then(response => {
            this.$message({
              type: 'success',
              message: response.response.msg
            })
            this.initData()
          }).catch()
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
        this.initData()
        console.log(`每页 ${val} 条`)
      },
      handleCurrentChange(val) {
        this.currentPage = val
        this.initData()
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
