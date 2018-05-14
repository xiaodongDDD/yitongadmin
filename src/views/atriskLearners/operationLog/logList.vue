<template>
  <div class="center-content log-list">
    <my-header :msg='msg'></my-header>
    <p class="position"></p>
    <div class="content-detail">
      <div class="list-table">
        <el-table
          :data="tableData"
          border
          style="width: 100%">
          <el-table-column
            align="center"
            prop="teacher_name"
            label="操作人"
            width="">
          </el-table-column>
          <el-table-column
            align="center"
            prop="type_name"
            label="类型"
            width="">
          </el-table-column>
          <el-table-column
            align="center"
            prop="school_name"
            label="学校"
            width="">
          </el-table-column>
          <el-table-column
            align="center"
            prop="module_name"
            label="操作模板"
            width="">
          </el-table-column>
          <el-table-column
            align="center"
            prop="operator_str"
            label="操作内容"
            width="">
          </el-table-column>
          <el-table-column
            align="center"
            label="时间"
            width="">
            <template slot-scope="scope">
              <span>{{ scope.row.update_time | formatTime }}</span>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            prop="operator_host"
            label="IP"
            width="">
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
  import { getLogList } from '@/api/eduAdmin'
  import { parseTime } from '../../../utils/index'
  export default {
    name: 'logList',
    data() {
      return {
        msg: {
          title1: '操作日志',
          title2: '',
          flag: 0,
          path: '/itemList'
        },
        tableData: []
      }
    },
    components: {
      myHeader
    },
    filters: {
      formatTime: parseTime
    },
    methods: {
      handleCurrentChange(val) {
        this.getList(val)
      },
      getList(page) {
        const obj = {}
        obj.page = page
        obj.pagesize = 10
        obj.token = localStorage.getItem('TOKEN')
        getLogList(obj).then(res => {
          // console.log(res)
          if (res.hasOwnProperty('response')) {
            this.tableData = res.response.list
          }
        })
      }
    },
    mounted() {
      this.getList(1)
    }
  }
</script>

<style scoped>

</style>
