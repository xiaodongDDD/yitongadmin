<template>
  <div class="center-conten gain-list">
    <my-header :msg='msg'></my-header>
    <div class="content-detail">
        <p class="position"></p>
        <div class="function-btns">
          <el-button icon="el-icon-upload2" type="text" @click="importGain">导出</el-button>
          <el-button type="text" @click="reback">返回</el-button>
        </div>

        <div class="search-contaier">
          <el-form :inline="true" :model="formInline" class="demo-form-inline">
            <el-form-item label="年级">
              <el-dropdown @command="changeGrade" trigger="click">
                <span class="el-dropdown-link">
                  <el-input v-model="formInline.grade" placeholder=""></el-input>
                </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item v-for="item in gradeData" :command="item">{{ item.grade_name}}</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </el-form-item>
            <el-form-item label="班级">
              <el-dropdown @command="changeClass" trigger="click">
                <span class="el-dropdown-link">
                  <el-input v-model="formInline.class" placeholder=""></el-input>
                </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item v-for="item in classData" :command="item">{{ item.class_name}}</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </el-form-item>
            <el-form-item label="学科">
              <el-dropdown @command="changeSubject" trigger="click">
                <span class="el-dropdown-link">
                  <el-input v-model="formInline.subject" placeholder=""></el-input>
                </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item v-for="item in subjectData" :command="item">{{ item.subject_name}}</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>

            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="onSubmit">筛选</el-button>
              <el-button @click="clearCondition ">清除</el-button>
            </el-form-item>
          </el-form>

          <p class="search-result" v-show="isSearch.searched">
            <span>{{formInline.grade}}</span>
            <span>{{formInline.class}}</span>
            <span>{{formInline.subject}}</span>
            <span>共{{isSearch.listNum}}条</span>
          </p>
        </div>

        <div class="list-table">
          <el-table
            :data="tableData"
            border
            style="width: 100%">
            <el-table-column
              align="center"
              prop="student_name"
              label="学生姓名"
              width="120">
            </el-table-column>
            <el-table-column
              align="center"
              prop="grade_class"
              label="年级班级"
              width="120">
            </el-table-column>
            <el-table-column
              align="center"
              prop="subject_name"
              label="辅导学科"
              width="120">
            </el-table-column>
            <el-table-column
              align="center"
              prop="teacher_name"
              label="辅导老师"
              width="120">
            </el-table-column>
            <el-table-column
              align="center"
              prop="template_name"
              label="评价模板"
              width="">
            </el-table-column>
            <el-table-column
              align="center"
              prop="semester_name"
              label="时间"
              width="">
            </el-table-column>

            <el-table-column
              align="center" label="操作" width="">
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  @click="handleEdit(scope.$index, scope.row)">查看详情</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <el-dialog
          title="导出选项"
          :visible.sync="centerDialogVisible"
          width="30%">
          <div class="dialog-content">
            <p>请选择导出内容：</p>
            <el-form ref="form" :model="form">
              <el-form-item label="">
                <el-radio-group v-model="form.resource">
                  <el-radio :label="1">评价成果列表</el-radio>
                  <el-radio :label="2">结果详情</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-form>
          </div>
          <span slot="footer" class="dialog-footer">
            <el-button @click="centerDialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="importResult">确 定</el-button>
         </span>
        </el-dialog>

        <el-pagination
          style='display:inline-block;margin-left:37%;margin-top:20px'
          @current-change="handleCurrentChange"
          background
          layout="prev, pager, next"
          :page-count	="pageData.allPage">
        </el-pagination>
    </div>
  </div>
</template>

<script>
  import myHeader from '../myHeader/myHeader'
  import { gainSchoolList, gainClassSubject, gainImport } from '@/api/eduAdmin'
  export default {
    name: 'gainSchoolList',
    data() {
      return {
        centerDialogVisible: false,
        tname: '',
        form: {
          name: '',
          resource: 1
        },
        msg: {
          title1: '评价成果',
          title2: '评价成果列表',
          flag: 1,
          path: '/gainList'
        },
        formInline: {
          grade: '',
          class: '',
          subject: ''
        },
        tableData: [],
        pageData: {
          page: '',
          allPage: 1
        },
        isSearch: {
          searched: false,
          listNum: 3
        },
        gradeData: [],
        classData: [],
        subjectData: [],
        filterData: {}
      }
    },
    components: {
      myHeader
    },
    methods: {
      handleEdit(index, row) {
        const project_id = this.$route.query.project_id
        this.$router.push({ path: '/gainDetails', query: { 'p_t_id': row.p_t_id, 'student_id': row.student_id, 'p_e_id': row.p_e_id, 'project_id': project_id, 'school_id': this.$route.query.school_id }})
      },
      importGain() {
        if (this.formInline.grade === '' && this.formInline.class === '' && this.formInline.subject === '') {
          this.$message('由于数据量很大，请您先筛选学科或年级班级后导出')
        } else {
          this.centerDialogVisible = true
        }
      },
      importResult() {
        const obj = {}
        obj.school_id = this.$route.query.school_id
        obj.project_id = this.$route.query.project_id
        obj.grade_id = this.filterData.grade_id
        obj.class_id = this.filterData.class_id
        obj.subject_id = this.filterData.subject_id
        obj.type = this.form.resource
        obj.token = localStorage.getItem('TOKEN')
        gainImport(obj).then(res => {
          console.log(res)
          if (res.hasOwnProperty('response')) {
            console.log('success')
          } else {
            this.$alert(res.error_response.msg, '提示', {
              confirmButtonText: '确定'
            })
          }
        })
      },
      onSubmit() {
        this.filterData.school_id = this.$route.query.school_id
        this.getList(1, this.filterData.school_id, this.filterData.grade_id, this.filterData.class_id, this.filterData.subject_id)
      },
      reback() {
        const school_id = this.$route.query.school_id
        this.$router.push({ path: '/gainList', query: { school_id: school_id }})
      },
      clearCondition() {
        this.formInline = { grade: '', class: '', subject: '' }
        this.filterData = {}
      },
      getList(page, school_id, grade_id, class_id, subject_id) {
        const obj = {}
        obj.project_id = this.$route.query.project_id
        obj.page = page
        obj.school_id = school_id
        obj.grade_id = grade_id
        obj.class_id = class_id
        obj.subject_id = subject_id
        obj.token = localStorage.getItem('TOKEN')
        gainSchoolList(obj).then(res => {
          // console.log(res)
          if (res.hasOwnProperty('response')) {
            this.tableData = res.response.info
            this.gradeData = res.response.grade_list
            this.pageData.allPage = res.response.total_page
          }
        })
      },
      changeGrade(item) {
        this.classData = []
        this.subjectData = []

        const obj = {}
        obj.grade_id = item.grade_id
        obj.token = localStorage.getItem('TOKEN')
        this.filterData.grade_id = item.grade_id
        this.formInline.grade = item.grade_name
        this.formInline.class = ''
        this.filterData.class_id = ''
        this.formInline.subject = ''
        this.filterData.subject_id = ''
        gainClassSubject(obj).then(res => {
          // console.log(res)
          if (res.hasOwnProperty('response')) {
            this.classData = res.response.class_info
            this.subjectData = res.response.subject_info
          } else {
            this.$alert(res.error_response.msg, '提示', {
              confirmButtonText: '确定'
            })
          }
        })
      },
      changeClass(item) {
        this.formInline.class = item.class_name
        this.filterData.class_id = item.class_id
      },
      changeSubject(item) {
        this.formInline.subject = item.subject_name
        this.filterData.subject_id = item.subject_id
      },
      handleCurrentChange(val) {
        this.getList(val)
      }
    },
    mounted() {
      // console.log(this.$route.query.school_id)
      this.getList(1, this.$route.query.school_id)
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .search-contaier{
    text-align: left;

    .el-input{
      margin-left: 5px;
    }

    .search-result{
      color: #666;
      font-size: 14px;
    }
  }
  .grade-list{
    list-style: none;
    line-height: 30px;
    margin: 0;
    li{
      cursor: pointer;
    }
  }
  .el-dropdown-menu{
    height: 210px;
    overflow-y: auto;
  }
</style>
