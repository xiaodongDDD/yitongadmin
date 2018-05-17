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
                      <el-dropdown-item v-for="item in operatingList" v-if="data.company_flag === '2'" :key="item.id" :command="item" @click.native = "goDialog(item, data)">{{item.label}}</el-dropdown-item>
                      <el-dropdown-item v-for="item in operatingListSp" v-if="data.company_flag === '1'" :key="item.id" :command="item" @click.native = "goDialog(item, data)">{{item.label}}</el-dropdown-item>
                    </el-dropdown-menu>
                  </el-dropdown>
                </span>
              </span>
          </el-tree>
        </div>
      </div>
      <!--右侧表-->
      <div class="right">
        <el-row class="headStyle">
          <el-col :span="12"><div class="text-left">{{headName}} ({{numPeople}})</div></el-col>
          <el-col :span="12"><div class="text-right"><span style="cursor: pointer;" @click="operating('add','')">添加员工</span></div></el-col>
        </el-row>        <el-table
          :data="tableData"
          v-loading.body="listLoading" element-loading-text="加载中..." border fit highlight-current-row
          style="width: 100%">
          <el-table-column
            prop="u_id"
            align="center"
            label="员工编号"
            width="120">
          </el-table-column>
          <el-table-column
            prop="user_name"
            label="姓名"
            align="center"
            width="120">
          </el-table-column>
          <el-table-column
            prop="position_level[0].work_position"
            label="职务"
            align="center"
            width="120">
          </el-table-column>
          <el-table-column
            prop="company_info[0].name"
            label="公司"
            align="center"
            width="180">
          </el-table-column>
          <el-table-column
          prop="department_info[0].name"
          label="部门"
          align="center"
          width="180">
          </el-table-column>
          <el-table-column
          prop="mobile_phone"
          label="手机"
          align="center"
          width="120">
          </el-table-column>
          <el-table-column
            prop="email"
            label="邮箱"
            align="center"
            width="120">
          </el-table-column>
          <el-table-column
            align="center"
            label="状态">
            <template slot-scope="scope">
              <span>{{scope.row.status | statusFilter}}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="操作"
            align="center"
            width="160">
            <template slot-scope="scope">
              <el-button type="" size="mini" v-if="scope.row.status === '3'" @click="operating(scope.row,2)">启用</el-button>
              <el-button type="" size="mini" v-if="scope.row.status === '2'" @click="operating(scope.row,3)">冻结</el-button>
              <el-button type="" size="mini" @click="operating(scope.row,'')">详情</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-row :gutter="20" class="buttonClass">
          <el-col :span="8">
            <el-upload
              class="upload-demo"
              ref="upload"
              action="https://jsonplaceholder.typicode.com/posts/"
              :on-preview="handlePreview"
              :on-remove="handleRemove"
              :on-exceed="limit"
              :file-list="fileList"
              :show-file-list="true"
              :auto-upload="false"
              :limit="1">
              <el-button slot="trigger" size="small" type="">选择附件</el-button>
              <el-button style="margin-left: 10px;" size="small" type="" @click="submitUpload">批量导入</el-button>
            </el-upload>
          </el-col>
          <el-col :span="16">
            <el-button size="small"  @click="uploadExcle">下载导入模板</el-button>
            <el-button size="small"  @click="uploadMore">批量导出</el-button>
          </el-col>
        </el-row>
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
    </div>

    <!--添加子部门弹窗-->
    <el-dialog :title="formAddepartment.titleName" :visible.sync="dialogFormAddepartment" width="40%"  center>
      <el-form :label-position="labelPosition" label-width="100px" :model="formAddepartment" :rules="rulesAddepartment" ref="ruleFormAddepartment" >
        <el-form-item label="部门名称" prop="name">
          <el-col :span="20">
            <el-input v-model="formAddepartment.name"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item :label="formAddepartment.label" prop="menuname">
          <el-col :span="20"><el-input v-model="formAddepartment.upName" :disabled="true"></el-input></el-col>
        </el-form-item>
        <div v-for="(domain, index) in formAddepartment.position_data">
          <el-form-item
            label="包含职务"
            :key="domain.key"
            :rules="{max: 20, message: '最多可输入 20 个字符', trigger: 'blur'}">
            <el-col :span="20"> <el-input v-model="domain.work_position"></el-input></el-col>
          </el-form-item>
          <el-form-item
            label="对应职级"
            :key="domain.keySp"
            :rules="{max: 20, message: '最多可输入 20 个字符', trigger: 'blur'}">
            <el-col :span="20"><el-input v-model="domain.work_level"></el-input></el-col>
            <el-col :span="1" >&nbsp;</el-col>
            <el-col :span="3" ><el-button @click.prevent="addDomain(domain)" icon="el-icon-plus" v-if="domain.showButton"></el-button></el-col>
          </el-form-item>
        </div>
      </el-form>
      <div slot="footer" class="dialog-footer text-center el-dialog-top">
        <el-button @click="dialogFormAddepartment = false">取 消</el-button>
        <el-button type="primary" @click="submitFormAddepartment('ruleFormAddepartment')">确 定</el-button>
      </div>
    </el-dialog>

    <!--编辑部门弹窗-->
    <el-dialog title="编辑部门" :visible.sync="dialogFormAddepartmentUpdate" width="40%"  center>
      <el-form :label-position="labelPosition" label-width="100px" :model="formAddepartmentUpdate" :rules="rulesAddepartmentUpdate" ref="ruleFormAddepartmentUpdate" >
        <el-form-item label="部门名称" prop="name">
          <el-col :span="20">
            <el-input v-model="formAddepartmentUpdate.name"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="" >
          <template slot-scope="scope">
            <el-button type="" v-for="postionItem in formAddepartmentUpdate.postion" :key="postionItem.yt_d_p_id">{{postionItem.work_position}} {{postionItem.work_level}}&nbsp;&nbsp;<i class="el-icon-circle-close" @click="delPosition(postionItem)"></i></el-button>
          </template>
        </el-form-item>
        <div v-for="(domain, index) in formAddepartmentUpdate.position_data">
          <el-form-item
            label="包含职务"
            :key="domain.key"
            :rules="{max: 20, message: '最多可输入 20 个字符', trigger: 'blur'}">
            <el-col :span="20"> <el-input v-model="domain.work_position"></el-input></el-col>
          </el-form-item>
          <el-form-item
            label="对应职级"
            :key="domain.keySp"
            :rules="{max: 20, message: '最多可输入 20 个字符', trigger: 'blur'}">
            <el-col :span="20"><el-input v-model="domain.work_level"></el-input></el-col>
            <el-col :span="1" >&nbsp;</el-col>
            <el-col :span="3" ><el-button @click.prevent="addDomain(domain)" icon="el-icon-plus" v-if="domain.showButton"></el-button></el-col>
          </el-form-item>
        </div>
      </el-form>
      <div slot="footer" class="dialog-footer text-center el-dialog-top">
        <el-button @click="dialogFormAddepartmentUpdate = false">取 消</el-button>
        <el-button type="primary" @click="submitFormAddepartmentUpdate('ruleFormAddepartmentUpdate')">确 定</el-button>
      </div>
    </el-dialog>

    <!--添加分公司弹窗-->
    <el-dialog title="添加分公司" :visible.sync="dialogFormCompany" width="40%"  center>
      <el-form :label-position="labelPosition" label-width="100px" :model="formCompany" :rules="rulesCompany" ref="ruleFormCompany" >
        <el-form-item label="分公司名称" prop="name">
          <el-col :span="20">
            <el-input v-model="formCompany.name"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="上级分公司" prop="menuname">
          <el-col :span="20"><el-input v-model="formCompany.upName" :disabled="true"></el-input></el-col>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer text-center el-dialog-top">
        <el-button @click="dialogFormCompany = false">取 消</el-button>
        <el-button type="primary" @click="submitFormCompany('ruleFormCompany')">确 定</el-button>
      </div>
    </el-dialog>


    <!--编辑分公司弹窗-->
    <el-dialog title="编辑分公司" :visible.sync="dialogFormCompanyUpdate" width="40%"  center>
      <el-form :label-position="labelPosition" label-width="100px" :model="formCompanyUpdate" :rules="rulesCompanyUpdate" ref="ruleFormCompanyUpdate" >
        <el-form-item label="分公司名称" prop="name">
          <el-col :span="20">
            <el-input v-model="formCompanyUpdate.name"></el-input>
          </el-col>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer text-center el-dialog-top">
        <el-button @click="dialogFormCompanyUpdate = false">取 消</el-button>
        <el-button type="primary" @click="submitFormCompanyUpdate('ruleFormCompanyUpdate')">确 定</el-button>
      </div>
    </el-dialog>


  </div>
</template>

<script>
  import { companyList, moveCompanyDepartment, delCompanyDepartment, freezeStart, user_export, addCompanyDepartment, companyDepartmentDetail, delPosition } from '@/api/organizationManagement'
  import store from '@/store'

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
          { value: '', label: '请选择' },
          { value: '1', label: '待启用' },
          { value: '2', label: '已启用' },
          { value: '3', label: '已冻结' }
        ],
        dataTree: [],
        defaultProps: {
          children: 'children',
          label: 'name'
        },
        tableData: [],
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
          { id: 8, label: '编辑分公司' },
          { id: 3, label: '上移' },
          { id: 4, label: '下移' },
          { id: 5, label: '删除' }],
        dialogFormAddepartment: false,
        formAddepartment: {
          titleName: '',
          label: '',
          name: '',
          parent_id: '',
          upName: '',
          yt_c_id: '',
          module_id: '',
          type: '',
          position_data: [
            { work_level: '',
              work_position: '',
              showButton: true,
              key: Date.now(),
              keySp: Date.now() + 1
            }
          ]
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
        dialogFormAddepartmentUpdate: false,
        formAddepartmentUpdate: {
          titleName: '',
          label: '',
          name: '',
          parent_id: '',
          upName: '',
          yt_c_id: '',
          module_id: '',
          type: '',
          position_data: [
            { work_level: '',
              work_position: '',
              showButton: true,
              key: Date.now(),
              keySp: Date.now() + 1
            }
          ]
        },
        rulesAddepartmentUpdate: {
          name: [
            { required: true, message: '请输入菜单名称', trigger: 'blur' },
            { max: 20, message: '最多可输入 20 个字符', trigger: 'blur' }
          ]
        },
        // 添加分公司
        dialogFormCompany: false,
        formCompany: {
          name: '',
          parent_id: ''
        },
        rulesCompany: {
          name: [
            { required: true, message: '请输入菜单名称', trigger: 'blur' },
            { max: 20, message: '最多可输入 20 个字符', trigger: 'blur' }
          ],
          mark: [
            { max: 50, message: '最多可输入 50 个字符', trigger: 'blur' }
          ]
        },
        // 编辑分公司
        dialogFormCompanyUpdate: false,
        formCompanyUpdate: {
          name: ''
        },
        rulesCompanyUpdate: {
          name: [
            { required: true, message: '请输入分公司名称', trigger: 'blur' },
            { max: 20, message: '最多可输入 20 个字符', trigger: 'blur' }
          ]
        },
        yt_c_id: '',
        headName: '',
        numPeople: '',
        showPostionData: '',
        module_id: store.getters.roles.yt_m_id || localStorage.module_id
      }
    },
    methods: {
      initTree(item) {
        const obj = {
          'module_id': this.module_id,
          'company': this.formInline.company,
          'department': this.formInline.department,
          'user_name': this.formInline.user_name,
          'status': this.formInline.status,
          'id': ''
        }
        companyList(obj).then(response => {
          this.dataTree = response.response.list
          this.yt_c_id = this.dataTree[0].yt_c_id
          this.headName = this.dataTree[0].name
          this.numPeople = this.dataTree[0].count
          console.log(this.yt_c_id)
          this.initTable()
        })
      },
      initTable(item) {
        const obj = {
          'module_id': this.module_id,
          'company': this.formInline.company,
          'department': this.formInline.department,
          'user_name': this.formInline.user_name,
          'status': this.formInline.status,
          'id': this.yt_c_id
        }
        companyList(obj).then(response => {
          this.tableData = response.response.list.category.rows
          this.total = response.response.list.category.count
        })
      },
      onSubmit() {
        this.initTree()
      },
      // 分页
      handleSizeChange(val) {
        this.pagesize = val
        this.currentPage = 1
        this.initTable('list')
        console.log(`每页 ${val} 条`)
      },
      handleCurrentChange(val) {
        this.currentPage = val
        this.initTable('list')
        console.log(`当前页: ${val}`)
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
          this.formAddepartment = {
            titleName: '添加子部门',
            label: '上级部门',
            name: '',
            parent_id: '',
            upName: data.name,
            yt_c_id: data.yt_c_id,
            module_id: this.module_id,
            type: '2',
            position_data: [{ work_level: '', work_position: '', showButton: true, key: Date.now(), keySp: Date.now() + 1 }]
          }
          this.dialogFormAddepartment = true
        } else if (item.id === 2) {
          this.showPostionData = data
          this.showPostion(data)
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
              this.initTree()
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
              this.initTree()
            })
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消下移'
            })
          })
        } else if (item.id === 5) {
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
              this.initTree()
            })
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消删除'
            })
          })
        } else if (item.id === 6) {
          this.dialogFormCompany = true
          this.formCompany = {
            name: '',
            parent_id: data.yt_c_id,
            upName: data.name,
            module_id: this.module_id,
            type: '1'
          }
          console.log(data)
        } else if (item.id === 7) {
          this.formAddepartment = {
            titleName: '添加部门',
            label: '所属分公司',
            name: '',
            parent_id: data.yt_c_id,
            upName: data.name,
            yt_c_id: '',
            module_id: this.module_id,
            type: '2',
            position_data: [{ work_level: '', work_position: '', showButton: true, key: Date.now(), keySp: Date.now() + 1 }]
          }
          this.dialogFormAddepartment = true
          console.log(data)
        } else if (item.id === 8) {
          console.log(data)
          this.dialogFormCompanyUpdate = true
          this.formCompanyUpdate = {
            name: data.name,
            yt_c_id: data.yt_c_id,
            upName: data.name,
            module_id: this.module_id,
            type: '1'
          }
        }
      },
      operating(item, id) {
        if (id === 2) {
          this.$confirm('确认启用?', '确认操作', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
            center: true
          }).then(() => {
            const obj = {
              'module_id': this.module_id,
              'type': id,
              'u_id': item.u_id
            }
            freezeStart(obj).then(response => {
              this.$message({
                type: 'success',
                message: response.response.msg
              })
              this.initTable()
            })
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消启用'
            })
          })
        } else if (id === 3) {
          this.$confirm('确认冻结?', '确认操作', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
            center: true
          }).then(() => {
            const obj = {
              'module_id': this.module_id,
              'type': id,
              'u_id': item.u_id
            }
            freezeStart(obj).then(response => {
              this.$message({
                type: 'success',
                message: response.response.msg
              })
              this.initTable()
            })
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消冻结'
            })
          })
        } else {
          console.log(item)
          if (item === 'add') {
            localStorage.u_id_emp = 'add'
            this.$router.push('employeeMangementsp')
          } else {
            localStorage.u_id_emp = item.u_id
            this.$router.push('employeeMangementsp')
          }
        }
      },
      showPostion(data) {
        const obj = {
          'module_id': this.module_id,
          'yt_c_id': data.yt_c_id
        }
        companyDepartmentDetail(obj).then(response => {
          this.formAddepartmentUpdate = {
            name: data.name,
            yt_c_id: data.yt_c_id,
            module_id: this.module_id,
            postion: response.response.info.postion,
            type: '2',
            position_data: [{ work_level: '', work_position: '', showButton: true, key: Date.now(), keySp: Date.now() + 1 }]
          }
          this.dialogFormAddepartmentUpdate = true
        })
      },
      delPosition(item) {
        this.$confirm('确定删除?', '确认操作', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
        }).then(() => {
          const obj = {
            'module_id': this.module_id,
            'yt_d_p_id': item.yt_d_p_id
          }
          delPosition(obj).then(response => {
            this.showPostion(this.showPostionData)
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
      },
      addDomain() {
        for (let i = 0; i < this.formAddepartment.position_data.length; i++) {
          this.formAddepartment.position_data[i].showButton = false
        }
        this.formAddepartment.position_data.push({
          work_position: '',
          work_level: '',
          key: Date.now(),
          keySp: Date.now() + 1,
          showButton: true
        })
      },
      submitFormCompanyUpdate(item) {
        this.$refs[item].validate((valid) => {
          if (valid) {
            addCompanyDepartment(this.formCompanyUpdate).then(response => {
              this.$message({
                type: 'success',
                message: response.response.msg
              })
              this.dialogFormCompanyUpdate = false
              this.initTree()
            })
          } else {
            console.log('error submit!!')
            return false
          }
        })
      },
      submitFormCompany(item) {
        this.$refs[item].validate((valid) => {
          if (valid) {
            addCompanyDepartment(this.formCompany).then(response => {
              this.$message({
                type: 'success',
                message: response.response.msg
              })
              this.dialogFormCompany = false
              this.initTree()
            })
          } else {
            console.log('error submit!!')
            return false
          }
        })
      },
      submitFormAddepartment(item) {
        this.$refs[item].validate((valid) => {
          if (valid) {
            addCompanyDepartment(this.formAddepartment).then(response => {
              this.$message({
                type: 'success',
                message: response.response.msg
              })
              this.dialogFormAddepartment = false
              this.initTree()
            })
          } else {
            console.log('error submit!!')
            return false
          }
        })
      },
      submitFormAddepartmentUpdate(item) {
        this.$refs[item].validate((valid) => {
          if (valid) {
            addCompanyDepartment(this.formAddepartmentUpdate).then(response => {
              this.$message({
                type: 'success',
                message: response.response.msg
              })
              this.dialogFormAddepartmentUpdate = false
              this.initTree()
            })
          } else {
            console.log('error submit!!')
            return false
          }
        })
      },
      submitUpload() {
        this.$refs.upload.submit()
      },
      handleRemove(file, fileList) {
        console.log(file, fileList)
      },
      limit(files, fileList) {
        console.log(files)
        console.log(fileList)
      },
      handlePreview(file) {
        console.log(file)
      },
      uploadExcle() {
        console.log()
      },
      uploadMore() {
        this.$confirm('批量导出?', '确认操作', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
        }).then(() => {
          const obj = {
            'module_id': this.module_id,
            'company': this.formInline.company,
            'department': this.formInline.department,
            'user_name': this.formInline.user_name,
            'status': this.formInline.status,
            'id': this.yt_c_id
          }
          user_export(obj).then(response => {
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消批量导出'
          })
        })
      },
      uploadClick() {
        console.log()
      }
    },
    created() {
      this.initTree()
    },
    filters: {
      statusFilter(status) {
        const statusMap = {
          '1': '待启用',
          '2': '已启用',
          '3': '已冻结'
        }
        return statusMap[status]
      }
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
        padding-left: 20px;
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
    .headStyle{
      background-color: gainsboro;
      height: 40px;
      line-height: 40px;
      margin-bottom: 10px;
    }
    .text-left{
      padding-left: 20px;
      text-align: left;
      color: gray;
    }
    .text-right{
      padding-right: 20px;
      text-align: right;
      color: gray;
    }
  }
</style>
