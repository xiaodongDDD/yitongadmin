<template>
  <div class="authorityMangement">
    <div class="left">
      <div class="blockTree">
        <el-row :gutter="20">
          <el-col :span="12"><p>一统管理系统</p></el-col>
          <el-col :span="12" class="buttonAlign"><el-button size="mini" type="text" icon="el-icon-plus" @click="addMenu('','')" v-if="!disabledFlag"></el-button></el-col>
        </el-row>
        <el-tree
          :data="dataList"
          :highlight-current="true"
          node-key="id"
          default-expand-all
          :props="defaultProps"
          :expand-on-click-node="false"
          @node-click="handleNodeClick">
          <span class="custom-tree-node" slot-scope="{ node, data }">
            <span>{{ node.label }}</span>
            <span class="operatingList"  v-if="!disabledFlag">
              <el-dropdown trigger="click">
                <span class="el-dropdown-link">
                  <i class="el-icon-more"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item v-for="item in operatingList" :key="item.id"  @click.native = "goDialog(item, data)">{{item.label}}</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </span>
          </span>
        </el-tree>
      </div>
    </div>
    <div class="right">
      <el-row :gutter="20">
        <el-col :span="12"><p>菜单权限</p></el-col>
      </el-row>
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="菜单名称" prop="menu_name">
          <el-input v-model="ruleForm.menu_name" :disabled="disabledFlagSp"></el-input>
        </el-form-item>
        <el-form-item label="上级菜单" >
          <el-input v-model="ruleForm.parent_info" disabled placeholder="无"></el-input>
        </el-form-item>
        <el-form-item label="菜单编号" >
          <el-input v-model="ruleForm.yt_m_id" disabled placeholder="系统生成"></el-input>
        </el-form-item>
        <el-form-item label="菜单标识" >
          <el-input v-model="ruleForm.menu_url" :disabled="disabledFlagSp"></el-input>
        </el-form-item>
        <el-form-item label="备注" prop="comment">
          <el-input type="textarea" v-model="ruleForm.comment" :disabled="disabledFlagSp"></el-input>
        </el-form-item>
      </el-form>

      <!--下一步的按钮-->
      <div class="submitButton" v-show="!addShow">
        <el-button @click="cancleForm()">取 消</el-button>
        <el-button type="primary" @click="submitForm('next')">保存，下一步</el-button>
      </div>
      <!--数据和功能权限-->
      <div v-show="addShow" v-if="treeFlag">
        <el-row :gutter="20">
          <el-col :span="12"><p>功能权限</p></el-col>
          <el-col :span="12" class="buttonAlign"><el-button type="primary" plain icon="el-icon-plus" size="small" @click="functionAny('',2)" v-if="!disabledFlagSp">添加功能</el-button></el-col>
        </el-row>
        <el-table
          :data="tableFunction"
          element-loading-text="加载中..." border fit highlight-current-row
          style="width: 100%">
          <el-table-column
            prop="yt_m_f_id"
            align="center"
            label="编号"
            width="120">
          </el-table-column>
          <el-table-column
            prop="name"
            label="功能名称"
            align="center"
            width="120">
          </el-table-column>
          <el-table-column
            prop="remark"
            label="标识"
            align="center"
            width="120">
          </el-table-column>
          <el-table-column
            prop="comment"
            label="备注"
            align="center">
          </el-table-column>
          <el-table-column
            label="操作"
            align="center"
            width="230"  v-if="!disabledFlagSp">
            <template slot-scope="scope">
              <el-button type="" size="mini" @click="functionAny(scope.row,1)">详情</el-button>
              <el-button type="danger" size="mini" @click="deleteFunction(scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-row :gutter="20" class="rowMargin">
          <el-col :span="12"><p>数据权限</p></el-col>
          <el-col :span="12" class="buttonAlign"><el-button type="primary" plain icon="el-icon-plus" size="small" @click="dataAny('',2)" v-if="!disabledFlagSp">添加数据</el-button></el-col>
        </el-row>
        <el-table
          :data="tableData"
          element-loading-text="加载中..." border fit highlight-current-row
          style="width: 100%">
          <el-table-column
            prop="yt_m_d_id"
            align="center"
            label="编号"
            width="120">
          </el-table-column>
          <el-table-column
            prop="data_name"
            label="数据名称"
            align="center"
            width="120">
          </el-table-column>
          <el-table-column
            prop="remark"
            label="标识"
            align="center"
            width="120">
          </el-table-column>
          <el-table-column
            prop="comment"
            label="备注"
            align="center">
          </el-table-column>
          <el-table-column
            label="操作"
            align="center"
            width="230" v-if="!disabledFlagSp">
            <template slot-scope="scope">
              <el-button type="" size="mini" @click="dataAny(scope.row,1)">详情</el-button>
              <el-button type="danger" size="mini" @click="deleteData(scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="submitButton" v-if="!disabledFlagSp">
          <el-button @click="cancleForm()">取 消</el-button>
          <el-button type="primary" @click="submitForm('ruleForm')">保 存</el-button>
        </div>
      </div>
    </div>

    <!--功能弹窗-->
    <el-dialog title="添加功能" :visible.sync="dialogFormVisibleFunction" width="40%"  center>
      <el-form :label-position="labelPosition" label-width="100px" :model="formFunction" :rules="rulesFunction" ref="formFunction">
        <el-form-item label="菜单名称" prop="menu_name">
          <el-input v-model="formFunction.menu_name" disabled></el-input>
        </el-form-item>
        <el-form-item label="功能名称" prop="name">
          <el-input v-model="formFunction.name"></el-input>
        </el-form-item>
        <el-form-item label="功能标识" prop="code">
          <el-input v-model="formFunction.remark"></el-input>
        </el-form-item>
        <el-form-item label="功能备注"  prop="comment">
          <el-input type="textarea" v-model="formFunction.comment"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer text-center el-dialog-top">
        <el-button @click="dialogFormVisibleFunction = false">取 消</el-button>
        <el-button type="primary" @click="submitFormFunction()">确 定</el-button>
      </div>
    </el-dialog>

    <!--数据权限弹窗-->
    <el-dialog title="数据权限" :visible.sync="dialogFormVisibleData" width="40%"  center>
      <el-form :label-position="labelPosition" label-width="100px" :model="formData" :rules="rulesData" ref="formData">
        <el-form-item label="菜单名称" prop="menu_name">
          <el-input v-model="formData.menu_name" disabled></el-input>
        </el-form-item>
        <el-form-item label="数据名称" prop="name">
          <el-input v-model="formData.name"></el-input>
        </el-form-item>
        <el-form-item label="数据标识" prop="remark">
          <el-input v-model="formData.remark"></el-input>
        </el-form-item>
        <el-form-item label="数据备注"  prop="comment">
          <el-input type="textarea" v-model="formData.comment"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer text-center el-dialog-top">
        <el-button @click="dialogFormVisibleData = false">取 消</el-button>
        <el-button type="primary" @click="submitFormData()">确 定</el-button>
      </div>
    </el-dialog>

  </div>
</template>


<script>
  import { menuList, moveMenu, delMenu, menuDetail, menu, menuFunctionAuth, menuDataAuth, delMenuFunction, delMenuData } from '@/api/organizationManagement'
  import store from '@/store'

  export default {
    data() {
      return {
        dataList: [],
        defaultProps: {
          children: 'children',
          label: 'menu_name'
        },
        operatingList: [{ id: 1, label: '添加子菜单' },
          { id: 2, label: '编辑菜单' },
          { id: 3, label: '上移' },
          { id: 4, label: '下移' },
          { id: 5, label: '删除' }],
        ruleForm: {
        },
        rules: {
          menu_name: [
            { required: true, message: '请输入菜单名称', trigger: 'blur' },
            { max: 40, message: '最多可输入 40 个字符', trigger: 'blur' }
          ],
          comment: [
            { max: 50, message: '最多可输入 50 个字符', trigger: 'blur' }
          ]
        },
        tableData: [],
        tableFunction: [],
        dialogFormVisibleFunction: false,
        formFunction: {
          menu_name: '',
          name: '',
          remark: '',
          comment: '',
          yt_m_id: '',
          module_id: ''
        },
        rulesFunction: {
          name: [
            { required: true, message: '请输入菜单名称', trigger: 'blur' },
            { max: 20, message: '最多可输入 20 个字符', trigger: 'blur' }
          ],
          comment: [
            { max: 50, message: '最多可输入 50 个字符', trigger: 'blur' }
          ]
        },
        labelPosition: 'right',
        dialogFormVisibleData: false,
        formData: {
          menu_name: '',
          name: '',
          remark: '',
          comment: '',
          yt_m_id: '',
          module_id: ''
        },
        rulesData: {
          name: [
            { required: true, message: '请输入菜单名称', trigger: 'blur' },
            { max: 20, message: '最多可输入 20 个字符', trigger: 'blur' }
          ],
          comment: [
            { max: 50, message: '最多可输入 50 个字符', trigger: 'blur' }
          ]
        },
        addShow: true,
        yt_m_id: '',
        module_id: store.getters.roles.yt_m_id || localStorage.module_id,
        functionFlag: localStorage.function,
        disabledFlag: true, // 默认的是不能操作的
        disabledFlagSp: true,
        treeFlag: true
      }
    },
    created() {
      if (this.functionFlag.indexOf('O') >= 0) {
        this.disabledFlag = false
      }
      this.initTree('init')
    },
    methods: {
      initTree(item) {
        const obj = {
          'module_id': this.module_id
        }
        menuList(obj).then(response => {
          this.dataList = response.response.info
          if (item === 'init') {
            this.menuDetail(this.dataList[0].yt_m_id)
            this.yt_m_id = this.dataList[0].yt_m_id
          }
        })
      },
      goDialog(item, data) {
        console.log(item)
        console.log(data)
        if (item.id === 1) {
          this.addMenu('1', data)
        } else if (item.id === 2) {
          this.disabledFlagSp = this.disabledFlag
          this.menuDetail(data.yt_m_id)
          this.yt_m_id = data.yt_m_id
        } else if (item.id === 3) {
          this.$confirm('确认上移?', '确认操作', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
            center: true
          }).then(() => {
            const obj = {
              'yt_m_id': data.yt_m_id,
              'module_id': this.module_id,
              'move_type': '-1'
            }
            moveMenu(obj).then(response => {
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
              'yt_m_id': data.yt_m_id,
              'module_id': this.module_id,
              'move_type': '1'
            }
            moveMenu(obj).then(response => {
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
        } else {
          this.$confirm('确认删除?', '确认操作', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
            center: true
          }).then(() => {
            const obj = {
              'yt_m_id': data.yt_m_id,
              'module_id': this.module_id
            }
            delMenu(obj).then(response => {
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
        }
      },
      // 保存菜单权限
      submitForm(item) {
        this.$refs['ruleForm'].validate((valid) => {
          if (valid) {
            const obj = {
              yt_m_id: this.ruleForm.yt_m_id, // 菜单id（编辑必传）
              module_id: this.module_id,
              parent_id: this.ruleForm.parent_id, // 父类id（新增必传）
              menu_name: this.ruleForm.menu_name,
              menu_url: this.ruleForm.menu_url,
              comment: this.ruleForm.comment
            }
            menu(obj).then(response => {
              this.$message({
                type: 'success',
                message: response.response.msg
              })
              if (item === 'next') {
                this.addShow = true
                this.yt_m_id = response.response.id
                this.menuDetail(this.yt_m_id)
                this.initTree()
              }
            })
          } else {
            console.log('error submit!!')
            return false
          }
        })
      },
      // 保存菜单数据权限表格
      submitFormData() {
        this.$refs['formData'].validate((valid) => {
          if (valid) {
            menuDataAuth(this.formData).then(response => {
              this.$message({
                type: 'success',
                message: response.response.msg
              })
              this.dialogFormVisibleData = false
              this.menuDetail(this.yt_m_id)
            })
          } else {
            console.log('error submit!!')
            return false
          }
        })
      },
      // 保存菜单功能权限表格
      submitFormFunction() {
        this.$refs['formFunction'].validate((valid) => {
          if (valid) {
            menuFunctionAuth(this.formFunction).then(response => {
              this.$message({
                type: 'success',
                message: response.response.msg
              })
              this.dialogFormVisibleFunction = false
              this.menuDetail(this.yt_m_id)
            })
          } else {
            console.log('error submit!!')
            return false
          }
        })
      },
      // 删除数据权限
      deleteData(item) {
        this.$confirm('确认删除?', '确认操作', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
        }).then(() => {
          const obj = {
            yt_m_d_id: item.yt_m_d_id,
            module_id: this.module_id
          }
          delMenuData(obj).then(response => {
            this.$message({
              type: 'success',
              message: response.response.msg
            })
            this.menuDetail(this.yt_m_id)
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
      },
      // 删除功能权限
      deleteFunction(item) {
        this.$confirm('确认删除?', '确认操作', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
        }).then(() => {
          const obj = {
            yt_m_f_id: item.yt_m_f_id,
            module_id: this.module_id
          }
          delMenuFunction(obj).then(response => {
            this.$message({
              type: 'success',
              message: response.response.msg
            })
            this.menuDetail(this.yt_m_id)
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
      },
      // 取消操作
      cancleForm() {
        this.addShow = true
        this.disabledFlagSp = true
        this.initTree('init')
        this.$message({
          type: 'info',
          message: '已取消操作'
        })
      },
      functionAny(item, flag) {
        if (flag === 1) {
          this.formFunction = {
            menu_name: this.ruleForm.menu_name,
            name: item.name,
            remark: item.remark,
            comment: item.comment,
            yt_m_id: item.yt_m_id,
            module_id: this.module_id,
            yt_m_f_id: item.yt_m_f_id
          }
        } else {
          this.formFunction = {
            menu_name: this.ruleForm.menu_name,
            name: '',
            remark: '',
            comment: '',
            yt_m_id: this.ruleForm.yt_m_id,
            module_id: this.module_id
          }
        }
        this.dialogFormVisibleFunction = true
      },
      dataAny(item, flag) {
        if (flag === 1) {
          this.formData = {
            menu_name: this.ruleForm.menu_name,
            name: item.data_name,
            remark: item.remark,
            comment: item.comment,
            yt_m_id: item.yt_m_id,
            module_id: this.module_id,
            yt_m_d_id: item.yt_m_d_id
          }
        } else {
          this.formData = {
            menu_name: this.ruleForm.menu_name,
            name: '',
            remark: '',
            comment: '',
            yt_m_id: this.ruleForm.yt_m_id,
            module_id: this.module_id
          }
        }
        this.dialogFormVisibleData = true
      },
      // 点击tree的节点
      handleNodeClick(data) {
        if (data.children.length > 0) {
          this.treeFlag = false
        } else {
          this.treeFlag = true
        }
        this.addShow = true
        this.disabledFlagSp = true
        this.menuDetail(data.yt_m_id)
      },
      // 调用菜单详情接口
      menuDetail(item) {
        const obj = {
          yt_m_id: item,
          module_id: this.module_id
        }
        menuDetail(obj).then(response => {
          this.ruleForm = response.response.info
          this.tableData = this.ruleForm.data
          this.tableFunction = this.ruleForm.function
        })
      },
      addMenu(item, data) {
        console.log(data)
        this.disabledFlagSp = this.disabledFlag
        if (item === '') {
          this.ruleForm = {}
          this.ruleForm.parent_id = 0
        } else {
          this.ruleForm = {}
          this.ruleForm.parent_id = data.yt_m_id
          if (data.hasOwnProperty('menu_name')) {
            this.ruleForm.parent_info = data.menu_name
          }
        }
        this.addShow = false
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .text-center{
    text-align: center;
  }
  .el-dialog-top{
    margin-top: -30px;
  }
  .authorityMangement {
    margin: 20px 30px;
    .left {
      float: left;
      width: 30%;
      .blockTree {
        width: 85%;
        border: 1px solid lightgrey;
        padding: 10px 15px;
      }
    }
    .right {
      float: left;
      width: 70%;
      border: 1px solid lightgrey;
      padding: 10px 15px;
      /*margin-left: 400px;*/
      /*word-break: break-all;*/
      .submitButton{
        margin-top: 20px;
        margin-bottom: 40px;
        text-align: center;
      }
    }
    .buttonAlign{
      text-align: right;
      height: 50px;
      line-height: 50px;
    }
    .rowMargin{
      margin-top: 30px;
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
</style>
