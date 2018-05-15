<template>
  <div class="center-content gain-list">
    <my-header :msg='msg'></my-header>
    <div class="content-detail">
      <div class="schoolName"><span class='schools'>{{school.school_name}}</span>
        <el-dropdown @command="handleCommand"  trigger="click" v-show="school_change">
          <span class="el-dropdown-link change">
            切换
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item v-for="(item, value) in schools" :key='value' :command="item">{{ item.school_name }}</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
      <div class="list-table">
        <el-table
          :data="tableData"
          border
          style="width: 100%">
          <el-table-column
            align="center"
            prop="project_name"
            label="项目名称"
            width="">
          </el-table-column>
          <el-table-column
            align="center"
            prop="project_remark"
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
          :page-count	="pageData.allPage">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
  import myHeader from '../myHeader/myHeader'
  import { gainList } from '@/api/eduAdmin'
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
        school: {},
        schools: [],
        tableData: [],
        pageData: {
          page: '',
          allPage: 1
        },
        school_change: false
      }
    },
    components: {
      myHeader
    },
    methods: {
      handleEdit(index, row) {
        this.$router.push({ path: '/gainSchoolList', query: { 'project_id': row.project_id, 'school_id': this.school.school_id }})
      },
      handleCurrentChange(val) {
        this.pageData.page = val
        this.getList(val, this.school.school_id)
      },
      handleCommand(item) {
        this.school = item
        this.getList(this.pageData.page, item.school_id)
      },
      getList(page, id) {
        const obj = {}
        obj.page = page
        obj.school_id = id
        // obj.pagesize = 1
        obj.token = localStorage.getItem('TOKEN')
        gainList(obj).then(res => {
          // console.log(res)
          if (res.hasOwnProperty('response')) {
            this.tableData = res.response.info
            this.pageData.allPage = res.response.total_page
            this.school_change = res.response.school_change
            this.school = res.response.school_info[0]
            this.schools = res.response.school_info
          } else {
            this.$alert(res.error_response.msg, '提示', {
              confirmButtonText: '确定'
            })
          }
        })
      }
    },
    mounted() {
      this.getList(1, this.$route.query.school_id)
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .position{
    text-indent: 0;
  }
  .schoolName {
    margin-bottom: 30px;
    margin-top: 20px;
  }
  .schools {
    display: inline-block;
    margin-right: 30px;
  }
  .change {
    display: inline-block;
    width: 40px;
    text-align: center;
    line-height: 22px;
    border-radius: 5px;
    font-size: 14px;
    height: 25px;
    border: 1px solid #f4f4f4;
    padding: 2px;
    background-color: #f4f4f4;
    cursor: pointer;

  }
</style>
