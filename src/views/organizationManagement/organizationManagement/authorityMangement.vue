<template>
  <div class="authorityMangement">
    <div class="left">
      <div class="blockTree">
        <el-row :gutter="20">
          <el-col :span="12"><p>一统管理系统</p></el-col>
          <el-col :span="12" class="buttonAlign"><el-button size="mini" icon="el-icon-plus" round></el-button></el-col>
        </el-row>
        <el-tree
          :data="data5"
          node-key="id"
          default-expand-all
          :expand-on-click-node="false">
          <span class="custom-tree-node" slot-scope="{ node, data }">
            <span>{{ node.label }}</span>
            <span class="operatingList">
              <el-dropdown trigger="click">
                <span class="el-dropdown-link">
                  <i class="el-icon-more"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item v-for="item in operatingList" :key="item.id">{{item.label}}</el-dropdown-item>
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
        <el-form-item label="菜单名称" prop="name">
          <el-input v-model="ruleForm.name"></el-input>
        </el-form-item>
        <el-form-item label="上级菜单" prop="upname">
          <el-input v-model="ruleForm.upname"></el-input>
        </el-form-item>
        <el-form-item label="菜单编号" prop="code">
          <el-input v-model="ruleForm.code"></el-input>
        </el-form-item>
        <el-form-item label="菜单标识" prop="menuid">
          <el-input v-model="ruleForm.menuid"></el-input>
        </el-form-item>
        <el-form-item label="备注" prop="mark">
          <el-input type="textarea" v-model="ruleForm.mark"></el-input>
        </el-form-item>
      </el-form>
      <el-row :gutter="20">
        <el-col :span="12"><p>功能权限</p></el-col>
        <el-col :span="12" class="buttonAlign"><el-button type="primary" plain icon="el-icon-plus" size="small" @click="functionAny">添加功能</el-button></el-col>
      </el-row>
      <el-table
        :data="tableData"
        element-loading-text="加载中..." border fit highlight-current-row
        style="width: 100%">
        <el-table-column
          prop="date"
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
          prop="address"
          label="标识"
          align="center"
          width="120">
        </el-table-column>
        <el-table-column
          prop="address"
          label="备注"
          align="center">
        </el-table-column>
        <el-table-column
          label="操作"
          align="center"
          width="230">
          <template slot-scope="scope">
            <el-button type="" size="mini" @click="operating(scope.row,1)">详情</el-button>
            <el-button type="" size="mini" @click="deleteData(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-row :gutter="20" class="rowMargin">
        <el-col :span="12"><p>数据权限</p></el-col>
        <el-col :span="12" class="buttonAlign"><el-button type="primary" plain icon="el-icon-plus" size="small">添加数据</el-button></el-col>
      </el-row>
      <el-table
        :data="tableData"
        element-loading-text="加载中..." border fit highlight-current-row
        style="width: 100%">
        <el-table-column
          prop="date"
          align="center"
          label="编号"
          width="120">
        </el-table-column>
        <el-table-column
          prop="name"
          label="数据名称"
          align="center"
          width="120">
        </el-table-column>
        <el-table-column
          prop="address"
          label="标识"
          align="center"
          width="120">
        </el-table-column>
        <el-table-column
          prop="address"
          label="备注"
          align="center">
        </el-table-column>
        <el-table-column
          label="操作"
          align="center"
          width="230">
          <template slot-scope="scope">
            <el-button type="" size="mini" @click="operating(scope.row,1)">详情</el-button>
            <el-button type="" size="mini" @click="deleteData(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="submitButton">
        <el-button @click="cancleForm()">取 消</el-button>
        <el-button type="primary" @click="submitForm('ruleForm')">保 存</el-button>
      </div>
    </div>
    <!--功能弹窗-->
    <el-dialog title="" :visible.sync="dialogFormVisibleFunction" width="40%" label-width="100">
      <el-form :model="formFunction" :rules="rulesFunction" ref="ruleFormFunction">
        <el-form-item label="菜单名称" prop="handle_people">
          <el-input v-model="formFunction.menuname" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="功能名称" prop="coadjutant">
          <el-input v-model="formFunction.name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="功能标识"  prop="coadjutant">
          <el-input v-model="formFunction.code" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="功能备注"  prop="handle_remark">
          <el-input type="textarea" v-model="formFunction.remark"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer text-center el-dialog-top">
        <el-button @click="dialogFormVisibleFunction = false">取 消</el-button>
        <el-button type="primary" @click="submitForm('ruleForm')">确 定</el-button>
      </div>
    </el-dialog>


  </div>
</template>


<script>
  let id = 1000
  export default {
    data() {
      const data = [{
        id: 1,
        label: '组织架构',
        children: [{
          id: 4,
          label: '二级 1-1',
          children: [{
            id: 9,
            label: '三级 1-1-1'
          }, {
            id: 10,
            label: '三级 1-1-2'
          }]
        }]
      }, {
        id: 2,
        label: '个人中心'
      }, {
        id: 3,
        label: '首页'
      }, {
        id: 99,
        label: '首页'
      }, {
        id: 88,
        label: '首页'
      }]
      return {
        data5: JSON.parse(JSON.stringify(data)),
        operatingList: [{ id: 1, label: '添加子菜单' },
          { id: 2, label: '编辑菜单' },
          { id: 3, label: '上移' },
          { id: 4, label: '下移' },
          { id: 5, label: '删除' }],
        ruleForm: {
          name: '',
          upname: '',
          code: '',
          menuid: '',
          mark: ''
        },
        rules: {
          name: [
            { required: true, message: '请输入菜单名称', trigger: 'blur' },
            { max: 40, message: '最多可输入 40 个字符', trigger: 'blur' }
          ],
          mark: [
            { max: 50, message: '最多可输入 50 个字符', trigger: 'blur' }
          ]
        },
        tableData: [{
          date: '2016-05-02',
          name: '王小虎',
          address: '上海'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市'
        }],
        dialogFormVisibleFunction: false,
        formFunction: {
          menuname: '',
          name: '',
          code: '',
          remark: ''
        },
        rulesFunction: {
          name: [
            { required: true, message: '请输入菜单名称', trigger: 'blur' },
            { max: 20, message: '最多可输入 20 个字符', trigger: 'blur' }
          ],
          mark: [
            { max: 50, message: '最多可输入 50 个字符', trigger: 'blur' }
          ]
        }
      }
    },
    methods: {
      append(data) {
        const newChild = { id: id++, label: 'testtest', children: [] }
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
      // 保存
      submitForm() {
        this.$refs['ruleForm'].validate((valid) => {
          if (valid) {
            alert('submit!')
          } else {
            console.log('error submit!!')
            return false
          }
        })
      },
      deleteData() {
        this.$confirm('确认删除?', '确认操作', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
        }).then(() => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
      },
      cancleForm() {
        this.$message({
          type: 'info',
          message: '已取消操作'
        })
      },
      functionAny() {
        this.dialogFormVisibleFunction = true
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .authorityMangement {
    margin: 20px 30px;
    .left {
      float: left;
      width: 30%;
      .blockTree {
        width: 85%;
        border: 1px solid #8c939d;
        padding: 10px 15px;
      }
    }
    .right {
      float: left;
      width: 70%;
      border: 1px solid #8c939d;
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
