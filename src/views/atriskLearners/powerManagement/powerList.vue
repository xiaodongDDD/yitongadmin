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
            prop="teacher_name"
            label="姓名"
            width="100">
          </el-table-column>
          <el-table-column
            align="center"
            prop="teacher_type"
            label="类型"
            width="60">
          </el-table-column>
          <el-table-column
            prop="school_name"
            label="学校名称">
          </el-table-column>
          <el-table-column
            align="center"
            prop="telephone"
            label="手机号"
            width="110">
          </el-table-column>
          <el-table-column
            prop="auth_list"
            label="菜单权限">
          </el-table-column>

          <el-table-column
            align="center" label="操作" width="120">
            <template slot-scope="scope">
              <el-button
                size="mini"
                @click="handleEdit(scope.row.teacher_id)">编辑</el-button>
            </template>
          </el-table-column>
        </el-table>

        <el-pagination
          style='display:inline-block;margin-left:37%;margin-top:20px'
          @current-change="handleCurrentChange"  
          background
          layout="prev, pager, next"
          :page-count="total"
          :pageSize='10'>
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
  import myHeader from '../myHeader/myHeader'
  import { getPowerList } from '@/api/eduAdmin'
  export default {
    name: 'powerList',
    data() {
      return {
        centerDialogVisible: false,
        userName: '',
        teacherType: '',
        form: {
          name: ''
        },
        msg: {
          title1: '权限管理',
          title2: '',
          flag: 0,
          path: '/userList'
        },
        tableData: [],
        total: 0
      }
    },
    components: {
      myHeader
    },
    mounted() {
      this.getData(1)
    },
    methods: {
      getData(pages) {
        const obj = {
          page: pages,
          token: localStorage.getItem('TOKEN')
        }
        getPowerList(obj)
          .then(res => {
            console.log(res)
            if (res.hasOwnProperty('response')) {
              this.tableData = res.response.list
              this.total = res.response.allPage
              for (var i=0; i < this.tableData.length; i++) {
                if (this.tableData[i].teacher_type !== '3') {
                  this.tableData[i].teacher_type = '学校'
                } else {
                  this.tableData[i].teacher_type = '运营'
                }
              }
            } else {
              console.log(res.error_response.msg)
            }
          })
          .catch(err => {
            console.log(err)
          })
      },
      handleEdit(val) {
        console.log(val)
        this.$router.push({ path: '/powerEdit', query: { teacher_id: val }})
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`)
        this.getData(val)
      }
    }
  }
</script>

<style scoped>

</style>
