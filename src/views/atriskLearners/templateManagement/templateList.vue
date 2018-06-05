<template>
  <div class="center-content template-list">
    <my-header :msg='msg'></my-header>
    <div class="content-detail">
      <div class="schoolName"><span class='schools'>{{ school.school_name}}</span>
        <el-dropdown @command="handleCommand"  trigger="click" v-show="schoolChange">
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
            prop="template_name"
            label="模板名称"
            width="">
          </el-table-column>
          <el-table-column
            align="center"
            prop="mark_weidu"
            label="维度"
            width="">
          </el-table-column>

        <el-table-column
          align="center" label="操作" width="">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, tinfo.tname = scope.row.template_name, tinfo.template_id = scope.row.template_id, tinfo.school_id = scope.row.school_id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="list-add">
      <!--<router-link to="/templateAdd">-->
        <el-button icon="el-icon-plus" @click="templateAdd">新增</el-button>
      <!--</router-link>-->
      <el-pagination
          style='display:inline-block;margin-left:30%;'
          @current-change="handleCurrentChange"
          background
          layout="prev, pager, next"
          :page-count	="pageData.allPage">
        </el-pagination>
      </div>

      <el-dialog
        title="提示"
        :visible.sync="centerDialogVisible"
        width="30%"
        center>
        <div class="dialogContent">
          <p>请确认是否要删除</p>
          <p>{{ tinfo.tname }}模板</p>

          <p>删除后，该模板相关的评价将彻底删除</p>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="centerDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="templateDelete()">确 定</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
  import myHeader from '../myHeader/myHeader'
  import { templateList, templateDelete, getSchoolList } from '@/api/eduAdmin'
  export default {
    name: 'templateList',
    data() {
      return {
        centerDialogVisible: false,
        tinfo: {
          tname: '',
          template_id: '',
          token: localStorage.getItem('TOKEN')
        },
        form: {
          name: ''
        },
        school_info: [],
        school: {},
        schools: [],
        msg: {
          title1: '评价模板管理',
          title2: '',
          flag: 0,
          path: '/itemList'
        },
        tableData: [],
        pageData: {
          page: '',
          allPage: 1
        },
        schoolChange: false
      }
    },
    components: {
      myHeader
    },
    methods: {
      handleEdit(index, row) {
        console.log(row.edit_status)
        // if (row.edit_status === 1) {
        //   this.$alert('此模板已被使用，不可编辑', '提示', {
        //     confirmButtonText: '确定'
        //   })
        // } else {
        this.$router.push({ path: '/templateEdit', query: { 'template_id': row.template_id, 'school_id': this.school.school_id, edit_status: row.edit_status }})
        // }
      },
      handleDelete(index) {
        this.centerDialogVisible = true
      },
      handleCurrentChange(val) {
        // console.log(this.school)
        this.pageData.page = val
        this.getList(val, this.school.school_id, 2)
      },
      templateAdd() {
        this.$router.push({ path: '/templateAdd', query: { 'school_id': this.school.school_id }})
      },
      getSchoolList() {
        const obj = {}
        obj.token = localStorage.getItem('TOKEN')
        getSchoolList(obj).then(res => {
          // console.log(res)
          if (res.hasOwnProperty('response')) {
            this.schools = res.response.info
          }
        })
      },
      templateDelete() {
        templateDelete(this.tinfo).then(res => {
          // console.log(res)
          if (res.hasOwnProperty('response')) {
            this.$message('删除成功！')
            this.getList(this.pageData.page, this.tinfo.school_id)
            this.centerDialogVisible = false
          } else {
            this.$alert(res.error_response.msg, '提示', {
              confirmButtonText: '确定'
            })
          }
        })
      },
      handleCommand(item) {
        this.school = item
        this.getList(this.pageData.page, item.school_id, 2)
        // console.log(this.school)
      },
      getList(page, school_id, type) {
        const obj = {}
        obj.page = page
        obj.school_id = school_id
        // obj.pagesize = 3
        this.pageData.page = page
        obj.token = localStorage.getItem('TOKEN')
        templateList(obj).then(res => {
          if (res.hasOwnProperty('response')) {
            const data = res.response
            this.tableData = data.info
            this.schools = data.school_info
            if (type !== 2) {
              this.school = data.school_info[0]
            }
            if (school_id !== '') {
              for (let i = 0; i < data.school_info.length; i++) {
                if (data.school_info[i].school_id === school_id) {
                  this.school = data.school_info[i]
                }
              }
            }
            this.schoolChange = data.school_change
            this.pageData.allPage = data.total_page
          } else {
            this.$alert('系统出错！', '提示', {
              confirmButtonText: '确定'
            })
          }
        })
      }
    },
    mounted() {
      // this.getSchoolList()
      this.getList(1, this.$route.query.school_id)
    }
  }
</script>

<style scoped>
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
  .el-dropdown-menu{
    max-height: 210px;
    overflow-y: auto;
  }
</style>
