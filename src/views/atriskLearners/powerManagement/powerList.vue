<template>
  <div class="center-content power-list">
    <my-header :msg='msg'></my-header>
    <div class="content-detail">
      <p class="position"></p>
      <div class="list-table">
        <el-table
          :data="tableData"
          border
          style="width: 100%">
          <el-table-column
            align="center"
            prop="name"
            label="姓名"
            width="100">
          </el-table-column>
          <el-table-column
            align="center"
            prop="type"
            label="类型"
            width="60">
          </el-table-column>
          <el-table-column
            prop="schoolName"
            label="学校名称">
          </el-table-column>
          <el-table-column
            align="center"
            prop="telephone"
            label="手机号"
            width="110">
          </el-table-column>
          <el-table-column
            prop="powerlist"
            label="菜单权限">
          </el-table-column>

          <el-table-column
            align="center" label="操作" width="120">
            <template slot-scope="scope">
              <el-button
                size="mini"
                @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
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
    name: 'powerList',
    data() {
      return {
        centerDialogVisible: false,
        userName: '',
        form: {
          name: ''
        },
        msg: {
          title1: '权限管理',
          title2: '',
          flag: 0,
          path: '/userList'
        },
        tableData: [{
          name: '都龙族',
          type: '学校',
          schoolName: '武宁路育才',
          telephone: '13533790697',
          powerlist: '账户管理、评价项目管理'
        }, {
          name: '都龙族',
          type: '运营',
          schoolName: '',
          telephone: '13533790697',
          powerlist: '账户管理、评价项目管理'
        }, {
          name: '都龙族',
          type: '学校',
          schoolName: '武宁路育才',
          telephone: '13533790697',
          powerlist: '账户管理、评价项目管理'
        }]
      }
    },
    components: {
      myHeader
    },
    methods: {
      handleEdit(index, row) {
        console.log(index, row)
        this.$router.push({ path: '/powerEdit' })
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`)
      }
    }
  }
</script>

<style scoped>

</style>
