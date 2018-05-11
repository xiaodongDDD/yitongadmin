<template>
  <div class="employeeMangement">
    <!--搜索-->
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item label="公司">
        <el-input v-model="formInline.company" placeholder="公司名称"></el-input>
      </el-form-item>
      <el-form-item label="部门">
        <el-input v-model="formInline.department" placeholder="部门名称"></el-input>
      </el-form-item>
      <el-form-item label="员工">
        <el-input v-model="formInline.user_name" placeholder="员工姓名"></el-input>
      </el-form-item>
      <el-form-item label="账户状态">
        <el-select v-model="formInline.status" placeholder="请选择">
          <el-option
            v-for="item in statusList"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">查询</el-button>
      </el-form-item>
    </el-form>
    <div style="margin-top: 1px">
      <!--左侧树-->
      <div class="left">
        <div class="block">
          <el-tree
            :data="dataTree"
            node-key="id"
            :props="defaultProps"
            default-expand-all
            :expand-on-click-node="false">
              <span class="custom-tree-node" slot-scope="{ node, data }">
                <span>{{ node.label }}</span>
                <span class="operatingList">
                  <el-dropdown trigger="click" >
                    <span class="el-dropdown-link">
                      <i class="el-icon-more"></i>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                      <el-dropdown-item v-for="item in operatingList" :key="item.id" :command="item" @click.native = "goDialog(item, data)">{{item.label}}</el-dropdown-item>
                    </el-dropdown-menu>
                  </el-dropdown>
                </span>
              </span>
          </el-tree>
        </div>
      </div>
      <!--右侧表-->
      <div class="right">
        <div></div>
        <el-table
          :data="tableData"
          v-loading.body="listLoading" element-loading-text="加载中..." border fit highlight-current-row
          style="width: 100%">
          <el-table-column
            prop="date"
            align="center"
            label="员工编号"
            width="120">
          </el-table-column>
          <el-table-column
            prop="name"
            label="姓名"
            align="center"
            width="120">
          </el-table-column>
          <el-table-column
            prop="address"
            label="职务"
            align="center"
            width="120">
          </el-table-column>
          <el-table-column
            prop="address"
            label="公司"
            align="center"
            width="180">
          </el-table-column>
          <el-table-column
          prop="address"
          label="部门"
          align="center"
          width="180">
          </el-table-column>
          <el-table-column
          prop="address"
          label="手机"
          align="center"
          width="120">
          </el-table-column>
          <el-table-column
            prop="address"
            label="邮箱"
            align="center"
            width="120">
          </el-table-column>
          <el-table-column
            prop="address"
            align="center"
            label="状态">
          </el-table-column>
          <el-table-column
            label="操作"
            align="center"
            width="260">
            <template slot-scope="scope">
              <el-button type="" size="mini" @click="operating(scope.row,1)">启用</el-button>
              <!--<el-button type="" size="mini" @click="operating(scope.row,2)">冻结</el-button>-->
              <el-button type="" size="mini" @click="operating(scope.row,3)">详情</el-button>
              <el-button type="" size="mini" @click="passwordInit(scope.row)">重置密码</el-button>
            </template>
          </el-table-column>
        </el-table>
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
        <el-row :gutter="20" class="buttonClass">
          <el-col :span="12">
            <el-upload
              class="uploadClass"
              action="https://jsonplaceholder.typicode.com/posts/"
              :on-preview="handlePreview"
              :on-remove="handleRemove"
              :before-remove="beforeRemove"
              multiple
              :limit="1"
              :on-exceed="handleExceed"
              :file-list="fileList">
              <el-button size="small" >点击上传</el-button>
              <!--<div slot="tip" class="el-upload__tip">只能上传xlsx文件，且不超过500kb</div>-->
            </el-upload>
          </el-col>
          <el-col :span="12">
            <el-button size="small" style="float: left">下载导入模板</el-button>
            <el-button size="small" style="float: left">批量导出</el-button>
          </el-col>
        </el-row>
      </div>
    </div>

    <!--添加子部门弹窗-->
    <el-dialog title="添加子部门" :visible.sync="dialogFormAddepartment" width="40%"  center>
      <el-form :label-position="labelPosition" label-width="100px" :model="formAddepartment" :rules="rulesAddepartment" ref="ruleFormAddepartment">
        <el-form-item label="部门名称" prop="name">
          <el-input v-model="formAddepartment.name"></el-input>
        </el-form-item>
        <el-form-item label="上级部门" prop="menuname">
          <el-input v-model="formAddepartment.menuname"></el-input>
        </el-form-item>
        <el-form-item label="包含职务" prop="code">
          <el-input v-model="formAddepartment.code"></el-input>
        </el-form-item>
        <el-form-item label="对应职级"  prop="remark">
          <el-input  v-model="formAddepartment.remark"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer text-center el-dialog-top">
        <el-button @click="dialogFormAddepartment = false">取 消</el-button>
        <el-button type="primary" @click="submitForm('ruleForm')">确 定</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
  import { companyList, moveCompanyDepartment, delCompanyDepartment } from '@/api/organizationManagement'
  export default {
    name: 'employeeMangement',
    computed: {},
    data() {
      return {
        currentPage: 1,
        pagesize: 10,
        total: 0,
        id: 1000,
        listLoading: false,
        labelPosition: 'right',
        formInline: {
          company: '',
          department: '',
          user_name: '',
          status: ''
        },
        statusList: [
          { value: '0', label: '请选择' },
          { value: '1', label: '待激活' },
          { value: '2', label: '已激活' },
          { value: '3', label: '已冻结' }
        ],
        dataTree: [],
        defaultProps: {
          children: 'children',
          label: 'name'
        },
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
        }],
        fileList: [],
        operatingList: [
          { id: 1, label: '添加子部门' },
          { id: 2, label: '编辑部门' },
          { id: 3, label: '上移' },
          { id: 4, label: '下移' },
          { id: 5, label: '删除' }],
        operatingListSp: [
          { id: 6, label: '添加分公司' },
          { id: 7, label: '添加部门' },
          { id: 8, label: '添加部门' },
          { id: 3, label: '上移' },
          { id: 4, label: '下移' },
          { id: 5, label: '删除' }],
        dialogFormAddepartment: false,
        formAddepartment: {
          menuname: '',
          name: '',
          code: '',
          remark: ''
        },
        rulesAddepartment: {
          name: [
            { required: true, message: '请输入菜单名称', trigger: 'blur' },
            { max: 20, message: '最多可输入 20 个字符', trigger: 'blur' }
          ],
          mark: [
            { max: 50, message: '最多可输入 50 个字符', trigger: 'blur' }
          ]
        },
        module_id: 16
      }
    },
    methods: {
      initData() {
        const obj = {
          'module_id': this.module_id,
          'company': '',
          'yt_m_id': '',
          'department': '',
          'user_name': '',
          'status': '',
          'id': ''
        }
        companyList(obj).then(response => {
          this.dataTree = response.response.list
        })
      },
      onSubmit() {
        this.initData()
      },
      append(data) {
        const newChild = { id: this.id++, label: 'testtest', children: [] }
        if (!data.children) {
          this.$set(data, 'children', [])
        }
        data.children.push(newChild)
      },
      remove(node, data) {
        const parent = node.parent
        const children = parent.data.children || parent.data
        const index = children.findIndex(d => d.id === data.id)
        children.splice(index, 1)
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
      },
      // 选择文件导入
      handleRemove(file, fileList) {
        console.log(file, fileList)
      },
      handlePreview(file) {
        console.log(file)
      },
      handleExceed(files, fileList) {
        this.$message.warning(`当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`)
      },
      beforeRemove(file, fileList) {
        return this.$confirm(`确定移除 ${file.name} ？`)
      },
      goDialog(item, data) {
        console.log(item.id)
        console.log(data)
        if (item.id === 1) {
          this.dialogFormAddepartment = true
        } else if (item.id === 2) {
          this.dialogFormAddepartment = true
        } else if (item.id === 3) {
          this.$confirm('确认上移?', '确认操作', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
            center: true
          }).then(() => {
            const obj = {
              'module_id': this.module_id,
              'move_type': '-1',
              'yt_c_id': data.yt_c_id
            }
            moveCompanyDepartment(obj).then(response => {
              this.$message({
                type: 'success',
                message: response.response.msg
              })
              this.initData()
            })
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消上移'
            })
          })
        } else if (item.id === 4) {
          this.$confirm('确认下移?', '确认操作', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
            center: true
          }).then(() => {
            const obj = {
              'module_id': this.module_id,
              'move_type': '1',
              'yt_c_id': data.yt_c_id
            }
            moveCompanyDepartment(obj).then(response => {
              this.$message({
                type: 'success',
                message: response.response.msg
              })
              this.initData()
            })
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消下移'
            })
          })
        } else {
          this.$confirm('确认删除?', '确认操作', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
            center: true
          }).then(() => {
            const obj = {
              'module_id': this.module_id,
              'yt_c_id': data.yt_c_id
            }
            delCompanyDepartment(obj).then(response => {
              this.$message({
                type: 'success',
                message: response.response.msg
              })
              this.initData()
            })
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消删除'
            })
          })
        }
      },
      operating(item, id) {
        if (id === 1) {
          console.log(item)
        } else if (id === 2) {
          this.$confirm('确认冻结?', '确认操作', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
            center: true
          }).then(() => {
            this.$message({
              type: 'success',
              message: '冻结成功!'
            })
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消冻结'
            })
          })
        } else {
          this.$router.push('employeeMangementsp')
        }
      },
      passwordInit(item) {
        this.$confirm('确认重置密码?', '确认操作', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
        }).then(() => {
          this.$message({
            type: 'success',
            message: '重置密码成功!'
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消重置密码'
          })
        })
      }
    },
    created() {
      this.initData()
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .text-center{
    text-align: center;
    margin-top: 10px;
  }
  .el-dialog-top{
    margin-top: -30px;
  }
  .employeeMangement {
    margin: 20px 30px;
    .left {
      float: left;
      width: 30%;
      .block {
        width: 85%;
      }
    }
    .right {
      float: left;
      /*margin-left: 400px;*/
      width: 70%;
      word-break: break-all;
      .buttonClass{
        margin-top: 10px;
        text-align: center;
      }
      .uploadClass{
        width: 50%;
      }
    }
    .custom-tree-node {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-size: 15px;
      padding-right: 8px;
    }
    .operatingList{
      opacity: 0;
      transition: 0.3s;
      -webkit-transition: .5s;
      -moz-transition: .5s;
      display: flex;
    }
    .custom-tree-node:hover .operatingList{
      opacity: 1;
    }
  }
</style>
