<template>
  <div class="employeeUpdata">
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="ruleForm">
      <el-form-item label="角色名称" prop="role_name">
        <el-input v-model="ruleForm.role_name"></el-input>
      </el-form-item>
      <el-form-item label="角色编号">
        <el-input v-model="ruleForm.yt_r_m_id" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="备注" prop="comment">
        <el-input type="textarea" v-model="ruleForm.comment"></el-input>
      </el-form-item>
    </el-form>
    <div>权限控制</div>
    <div class="treeInfo">
      <el-tree
        :data="treeData"
        show-checkbox
        node-key="id"
        default-expand-all
        :default-expanded-keys="[2, 3]"
        :default-checked-keys="[5]">
      </el-tree>
    </div>
    <div class="buttonClass">
      <el-button type="primary" @click="keepInfo">保 存</el-button>
    </div>
  </div>
</template>
<script>
  import { addEditRole, menuList } from '@/api/organizationManagement'
  export default {
    data() {
      return {
        activeName: 'first',
        ruleForm: {
        },
        rules: {
          role_name: [
            { required: true, message: '请完善角色名称', trigger: 'blur' },
            { max: 20, message: '最多可输入20个汉字', trigger: 'blur' }
          ],
          comment: [
            { max: 50, message: '最多可输入50个汉字', trigger: 'blur' }
          ]
        },
        treeData: [],
        defaultProps: {
          children: 'children',
          label: 'menu_name'
        },
        module_id: 17
      }
    },
    methods: {
      initData() {
        const obj = {
          'module_id': this.module_id,
          'yt_r_m_id': this.ruleForm.yt_r_m_id,
          'type': 1
        }
        menuList(obj).then(response => {
          this.treeData = this.recursive(response.response.info)
        }).catch()
      },
      recursive(data) {
        var result = []
        if (data.length === 0) {
          return result
        }
        for (var i in data) {
          result[i] = { 'label': '', 'id': '', 'children': [] }
          result[i]['label'] = data[i]['menu_name'] + ' ' + data[i]['yt_m_id']
          if (data[i]['children'].length !== 0) {
            result[i]['children'] = this.recursive(data[i]['children'])
          } else if (data[i]['function'].length !== 0) {
            var tmp = []
            var func = data[i]['function']
            for (var j in func) {
              tmp[j] = { 'label': '', 'children': [] }
              tmp[j]['label'] = func[j]['name'] + ' ' + data[i]['yt_m_id'] + '-' + func[j]['yt_m_f_id']
              if (func[j]['data'].length !== 0) {
                var tmp1 = []
                var fdata = func[j]['data']
                for (var k in fdata) {
                  tmp1[k] = { 'label': '', 'children': [] }
                  tmp1[k]['label'] = fdata[k]['data_name'] + ' ' + data[i]['yt_m_id'] + '-' + func[j]['yt_m_f_id'] + '-' + fdata[k]['yt_m_d_id']
                }
              }
              tmp[j]['children'] = tmp1
            }
            result[i]['children'] = tmp
          }
        }
        console.log(result)
        return result
      },
      handleClick(tab, event) {
      },
      keepInfo() {
        this.$refs['ruleForm'].validate((valid) => {
          if (valid) {
            const obj = {
              'module_id': this.module_id,
              'comment': this.ruleForm.comment,
              'role_name': this.currentPage,
              'yt_r_m_id': this.ruleForm.yt_r_m_id,
              'role_auth': ''
            }
            addEditRole(obj).then(response => {
            }).catch()
            alert('submit!')
          } else {
            console.log('error submit!!')
            return false
          }
        })
      },
      getCheckedKeys() {
        console.log(this.$refs.tree.getCheckedKeys())
      }
    },
    created() {
      if (this.$route.query.itemInfo === 'add') {
        this.ruleForm = {
          role_name: '',
          yt_r_m_id: '',
          comment: ''
        }
      } else {
        this.ruleForm = this.$route.query.itemInfo
      }
      this.initData()
      console.log(this.$route.query.itemInfo)
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
