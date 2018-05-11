<template>
  <div class="school-html">
    <!--搜索-->
    <el-form :inline="true" :model="formInline" class="form-inline">
      <el-form-item label="处理人">
        <el-input v-model="formInline.handle_people" placeholder=""></el-input>
      </el-form-item>
      <el-form-item label="处理状态">
        <el-select v-model="formInline.handle_status" placeholder="活动区域">
          <el-option
            v-for="item in optionsStatus"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="反馈时间">
        <el-date-picker
          v-model="formInline.dateValue"
          type="datetimerange"
          :picker-options="pickerOptions"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          align="right">
        </el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">搜索</el-button>
      </el-form-item>
    </el-form>
    <!--列表//-->
    <el-table :data="list" v-loading.body="listLoading" element-loading-text="加载中..." border fit highlight-current-row style="width: 100%">
      <el-table-column align="center" label='id' width="95">
        <template slot-scope="scope">
          {{scope.row.f_id}}
        </template>
      </el-table-column>
      <el-table-column label="反馈人" width="110" align="center">
        <template slot-scope="scope">
          <span v-popover:popover3>
            <span class="point">{{scope.row.feedback_name}}</span>
            <el-popover
              ref="popover3"
              placement="top-start"
              width="300"
              trigger="hover">
               <div>
                <el-row>
                  <el-col :span="9" class="text-right" style="text-align: right">学校&nbsp;&nbsp;</el-col>
                  <el-col :span="15">{{scope.row.school_name}}</el-col>
                </el-row>
                <el-row>
                  <el-col :span="9" class="text-right">是否是班主任&nbsp;&nbsp;</el-col>
                  <el-col :span="15">{{scope.row.header_teacher_flag}}</el-col>
                </el-row>
              </div>
            </el-popover>
          </span>
        </template>
      </el-table-column>
      <el-table-column label="手机号码" width="110" align="center">
        <template slot-scope="scope">
          <span>{{scope.row.feedback_phone}}</span>
        </template>
      </el-table-column>
      <el-table-column label="反馈时间" width="170" align="center">
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span>{{scope.row.feedback_time}}</span>
        </template>
      </el-table-column>
      <el-table-column label="关键词" width="110" align="center">
        <template slot-scope="scope">
          {{scope.row.keywords}}
        </template>
      </el-table-column>
      <el-table-column label="问题详情" align="center">
        <template slot-scope="scope">
          <span v-popover:popover4 style="width: 10px;height: 10px;">
              <span class="point">{{scope.row.detail | contentFilter}}</span>
              <el-popover
                ref="popover4"
                placement="top-start"
                width="200"
                trigger="hover">
                <div style="max-height: 300px;overflow-y: scroll;word-break:break-all;">
                  {{scope.row.detail}}
                </div>
              </el-popover>
            </span>
        </template>
      </el-table-column>
      <el-table-column label="处理人" width="110" align="center">
        <template slot-scope="scope">
          {{scope.row.handle_people}}
        </template>
      </el-table-column>
      <el-table-column label="处理时间" width="170" align="center">
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span>{{scope.row.handle_time}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="created_at" label="处理状态" width="110">
        <template slot-scope="scope">
          {{scope.row.handle_status}}
        </template>
      </el-table-column>
      <el-table-column label="操作" width="110" align="center">
        <template slot-scope="scope">
          <div @click="goMark(scope.row)" class="point">处理</div>
        </template>
      </el-table-column>

    </el-table>
    <!--分页-->
    <div class="block" v-if="page">
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
    <!--弹窗-->
    <el-dialog title="" :visible.sync="dialogFormVisible" width="40%">
      <el-form :model="form" :rules="rules" ref="ruleForm">
        <el-form-item label="处理人" :label-width="formLabelWidth" prop="handle_people">
          <el-input v-model="form.handle_people" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="处理状态" :label-width="formLabelWidth" prop="handle_status_code">
          <el-select v-model="form.handle_status_code" placeholder="请选择活动区域" class="select-width" @change="selectStatus(form)">
            <el-option
              v-for="item in optionsStatus"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="处理方式" :label-width="formLabelWidth" prop="handle_type_code" v-if="typeFlag">
          <el-select v-model="form.handle_type_code" placeholder="请选择处理方式" class="select-width">
            <el-option
              v-for="item in optionsType"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="协助人" :label-width="formLabelWidth" prop="coadjutant">
          <el-input v-model="form.coadjutant" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="备注" :label-width="formLabelWidth" prop="handle_remark">
          <el-input type="textarea" v-model="form.handle_remark"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer text-center el-dialog-top">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitForm('ruleForm')">确 定</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
  import { getSchoolH5List, saveFeedbackInfo } from '@/api/schoolH5'

  export default {
    data() {
      return {
        formInline: {
          handle_people: '',
          handle_status: 0,
          dateValue: ''
        },
        list: null,
        listLoading: true,
        currentPage: 1,
        total: 0,
        page: false,
        pagesize: 10,
        dialogFormVisible: false,
        form: {},
        formLabelWidth: '80px',
        rules: {
          handle_people: [
            { required: true, message: '请输入处理人名称', trigger: 'blur' },
            { max: 28, message: '最多可输入28个汉字', trigger: 'blur' }
          ],
          handle_status_code: [
            { required: true, message: '请选择处理状态', trigger: 'change' }
          ],
          handle_type_code: [
            { required: true, message: '请选择处理方式', trigger: 'change' }
          ],
          coadjutant: [
            { max: 28, message: '最多可输入28个汉字', trigger: 'blur' }
          ],
          handle_remark: [
            { max: 140, message: '最多可输入140个汉字', trigger: 'blur' }
          ]
        },
        pickerOptions: {
          shortcuts: [{
            text: '最近一周',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
              picker.$emit('pick', [start, end])
            }
          }, {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
              picker.$emit('pick', [start, end])
            }
          }, {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
              picker.$emit('pick', [start, end])
            }
          }]
        },
        dateValue: '',
        typeFlag: false,
        optionsStatus: [
          { label: '请选择', value: 0 },
          { label: '已处理', value: 2 },
          { label: '待处理', value: 1 }
        ],
        optionsType: [
          { label: '请选择', value: 0 },
          { label: '已解决', value: 1 },
          { label: '无法解决', value: 2 },
          { label: '无需解决', value: 3 }
        ]
      }
    },
    filters: {
      statusFilter(status) {
        const statusMap = {
          published: 'success',
          draft: 'gray',
          deleted: 'danger'
        }
        return statusMap[status]
      },
      peopleFilter(item) {
        if (item === '--') {
          return ''
        } else {
          return item
        }
      },
      contentFilter(content) {
        if (content.length > 7) {
          return content.substr(0, 7) + '...'
        } else {
          return content
        }
      }
    },
    created() {
      this.fetchData()
    },
    methods: {
      fetchData() {
        let start_time = ''
        let end_time = ''
        if (this.formInline.dateValue === '' || this.formInline.dateValue == null) {
          start_time = ''
          end_time = ''
        } else {
          start_time = this.formInline.dateValue[0].getTime() / 1000
          end_time = this.formInline.dateValue[1].getTime() / 1000
        }
        this.listLoading = true
        const obj = {
          handle_people: this.formInline.handle_people,
          handle_status: this.formInline.handle_status,
          start_time: start_time,
          end_time: end_time,
          now_page: this.currentPage,
          pagesize: this.pagesize
        }
        getSchoolH5List(obj).then(response => {
          console.log(response)
          this.list = response.response.info
          this.listLoading = false
          this.total = response.response.count
          this.page = true
        })
      },
      goMark(item) {
        this.form = JSON.parse(JSON.stringify(item))
        if (this.form.handle_people === '--') {
          this.form.handle_people = ''
        }
        if (item.handle_status === '已处理') {
          this.typeFlag = true
        } else {
          this.typeFlag = false
        }
        this.dialogFormVisible = true
        this.resetForm()
      },
      handleSizeChange(val) {
        this.pagesize = val
        this.fetchData()
        console.log(`每页 ${val} 条`)
      },
      handleCurrentChange(val) {
        this.currentPage = val
        this.fetchData()
        console.log(`当前页: ${val}`)
      },
      submitForm(formName) {
        const obj = {
          handle_people: this.form.handle_people,
          handle_status: this.form.handle_status_code,
          handle_type: this.form.handle_type_code,
          coadjutant: this.form.coadjutant,
          handle_remark: this.form.handle_remark,
          f_id: this.form.f_id
        }
        this.$refs[formName].validate((valid) => {
          if (valid) {
            saveFeedbackInfo(obj).then(response => {
              if (response.response) {
                this.$message({
                  message: response.response.msg,
                  type: 'success'
                })
                this.dialogFormVisible = false
                this.fetchData()
              } else {
                this.$message({
                  message: response.error_response.msg,
                  type: 'error'
                })
              }
            })
          } else {
            console.log('error submit!!')
            return false
          }
        })
      },
      resetForm() {
        if (this.$refs['ruleForm'] !== undefined) {
          this.$refs['ruleForm'].resetFields()
        }
      },
      onSubmit() {
        this.fetchData()
        console.log('submit!')
      },
      selectStatus(item) {
        if (item.handle_status_code === 2) {
          this.typeFlag = true
        } else {
          this.typeFlag = false
          this.form.handle_type_code = ''
        }
        console.log(this.typeFlag)
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .text-right {
    text-align: right;
  }

  .text-center {
    text-align: center;
  }

  .school-html {
    margin: 20px 30px 20px 30px;
    .form-inline{
    }
    .block {
      text-align: center;
      margin: 15px 0;
    }
    .select-width {
      width: 100%;
    }
    .el-dialog-top{
      margin-top: -30px;
    }
    .point{
      cursor: pointer;
    }

  }
</style>
