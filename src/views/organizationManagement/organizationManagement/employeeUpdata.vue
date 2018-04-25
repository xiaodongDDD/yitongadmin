<template>
  <div class="employeeUpdata">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="用户管理" name="first">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="ruleForm">
          <el-form-item label="角色名称" prop="name">
            <el-input v-model="ruleForm.name"></el-input>
          </el-form-item>
          <el-form-item label="角色编号" prop="code">
            <el-input v-model="ruleForm.code"></el-input>
          </el-form-item>
          <el-form-item label="备注" prop="desc">
            <el-input type="textarea" v-model="ruleForm.desc"></el-input>
          </el-form-item>
        </el-form>
        <div>权限控制</div>
        <div class="treeInfo">
          <el-tree
            :data="data2"
            show-checkbox
            node-key="id"
            :default-expanded-keys="[2, 3]"
            :default-checked-keys="[5]"
            :props="defaultProps">
          </el-tree>
        </div>
        <div class="buttonClass">
          <el-button type="primary" @click="keepInfo">保 存</el-button>
        </div>
      </el-tab-pane>
      <el-tab-pane label="配置管理" name="second">权限设置
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        activeName: 'first',
        ruleForm: {
          name: '',
          code: '123',
          desc: ''
        },
        rules: {
          name: [
            { required: true, message: '请完善角色名称', trigger: 'blur' },
            { max: 20, message: '最多可输入20个汉字', trigger: 'blur' }
          ],
          code: [
            { required: true, message: '请输入活动名称', trigger: 'blur' }
          ],
          desc: [
            { max: 50, message: '最多可输入50个汉字', trigger: 'blur' }
          ]
        },
        data2: [{
          id: 1,
          label: '组织架构',
          children: [{
            id: 2,
            label: '员工管理',
            children: [{
              id: 3,
              label: '操作'
            }, {
              id: 4,
              label: '查看',
              children: [{
                id: 5,
                label: '所有'
              }, {
                id: 6,
                label: '本分公司'
              }, {
                id: 7,
                label: '本部门'
              }]
            }]
          }, {
            id: 8,
            label: '角色管理',
            children: [{
              id: 9,
              label: '操作'
            }, {
              id: 10,
              label: '查看'
            }]
          }, {
            id: 11,
            label: '权限管理',
            children: [{
              id: 12,
              label: '操作'
            }, {
              id: 13,
              label: '查看'
            }]
          }]
        }],
        defaultProps: {
          children: 'children',
          label: 'label'
        }
      }
    },
    methods: {
      handleClick(tab, event) {
      },
      keepInfo() {
        this.$refs['ruleForm'].validate((valid) => {
          if (valid) {
            alert('submit!')
          } else {
            console.log('error submit!!')
            return false
          }
        })
      }
    }
  }
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
  .employeeUpdata{
    margin: 20px 30px;
    .ruleForm{
      width: 75%;
    }
    .treeInfo{
      margin-top: 10px;
      padding-left: 40px;
      width: 66%;
    }
    .buttonClass{
      width: 75%;
      margin-top: 20px;
      text-align: center;
    }
  }
</style>
