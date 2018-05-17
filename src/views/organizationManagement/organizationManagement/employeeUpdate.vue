<template>
  <div class="myInfo">
    <el-form ref="form" :model="form" label-width="180px" class="formMyInfo" :rules="rules">
      <el-form-item label="头像">
        <img :src="form.avatar" height="100" class="imgStyle" width="100"/>
      </el-form-item>
      <el-form-item label="姓名" prop="user_name">
        <el-input v-model="form.user_name" ></el-input>
      </el-form-item>
      <el-form-item label="英文名" prop="english_name">
        <el-input v-model="form.english_name" ></el-input>
      </el-form-item>
      <el-form-item label="性别" prop="sex">
        <el-radio-group v-model="form.sex" >
          <el-radio label="男"></el-radio>
          <el-radio label="女"></el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="员工编号">
        <span>{{form.u_id}}</span>
      </el-form-item>
      <el-form-item label="手机"  prop="mobile_phone">
        <el-col :span="2">
          <el-input v-model="form.phoneNUm" style="width: 100%"></el-input>
        </el-col>
        <el-col :span="1" class="line">-
        </el-col>
        <el-col :span="21">
          <el-input v-model="form.mobile_phone" style="width: 100%"></el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="座机"  prop="special_plane">
        <el-input v-model="form.special_plane"></el-input>
      </el-form-item>
      <el-form-item label="邮箱"  prop="email">
        <el-input v-model="form.email"></el-input>
      </el-form-item>
      <el-form-item label="公司" prop="gongsi">
        <div @click="listSelect(1)">
          <el-input v-model="form.gongsi" :disabled="true" ></el-input>
        </div>
      </el-form-item>
      <el-form-item label="部门" prop="bumen">
        <div @click="listSelect(2)">
          <el-input v-model="form.bumen" :disabled="true" @click=""></el-input>
        </div>
      </el-form-item>
      <el-form-item label="分管辖区">
        <div @click="whereSelect()">
          <el-input v-model="form.xiaqu" :disabled="true"></el-input>
        </div>
      </el-form-item>
      <el-form-item label="入离日期" prop="valueDate1">
        <el-col :span="11">
          <el-date-picker type="date" placeholder="选择日期" v-model="form.entry_time" style="width: 100%;"></el-date-picker>
        </el-col>
        <el-col class="line" :span="2">-</el-col>
        <el-col :span="11">
          <el-date-picker type="date" placeholder="至今" v-model="form.leave_time" style="width: 100%;"></el-date-picker>
        </el-col>
      </el-form-item>
      <el-form-item label="职务" prop="zhiwu">
        <el-select v-model="form.yt_d_p_id" placeholder="请选择职务" style="width: 100%">
          <el-option
            v-for="item in positionList"
            :key="item.yt_d_p_id"
            :label="item.work_position"
            :value="item.yt_d_p_id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="职级" prop="zhiji">
        <el-input v-model="form.position_info.work_level" :disabled="true" @click=""></el-input>
      </el-form-item>
      <el-form-item label="上级" prop="shangji">
        <div @click="upDown">
          <el-input v-model="form.shangji" :disabled="true"></el-input>
        </div>
      </el-form-item>
      <el-form-item label="下级" prop="xiaji">
        <div @click="upDownSp">
          <el-input v-model="form.xiaji" :disabled="true"></el-input>
        </div>
      </el-form-item>
      <el-form-item label="是否开通一统账户" prop="sex">
        <el-radio-group v-model="form.use_flag" >
          <el-radio label="1">是</el-radio>
          <el-radio label="0">否</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="是否生成邀请码" prop="sex">
        <el-radio-group v-model="form.code_flag" >
          <el-radio label="1">是</el-radio>
          <el-radio label="0">否</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="专属邀请码">
        <span>{{form.invited_code}}</span>
      </el-form-item>
      <el-form-item label="角色">
        <el-checkbox-group v-model="form.yt_r_m_idArr">
          <el-checkbox v-for="item in form.role_info" :label="item.yt_r_m_id" :key="item.yt_r_m_id">{{item.role_name}}</el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item class="line">
        <el-button @click="canclePage">取消</el-button>
        <el-button type="primary" @click="onSubmit">保存</el-button>
      </el-form-item>
    </el-form>
    <!--公司选择弹窗-->
    <el-dialog title="选择分公司" :visible.sync="dialogFormVisibleCompany" width="40%"  center>
      <el-row :gutter="20" class="rowStyle">
        <el-col :span="12" class="leftTree">
          <div style="margin-bottom: 10px">
            <el-input placeholder="请输入内容" size="small" v-model="selectName" class="input-with-select">
              <el-button slot="append" icon="el-icon-search" @click="listSelect(1)"></el-button>
            </el-input>
          </div>
          <el-tree
            :data="companyList"
            node-key="id"
            :props="defaultProps"
            default-expand-all
            :expand-on-click-node="false"
            @node-click="handleNodeClickCompany">
              <span class="custom-tree-node" slot-scope="{ node, data }">
                <span>{{ node.label }}</span>
              </span>
          </el-tree>
        </el-col>
        <el-col :span="12" class="rightSelect">
          <div>已选择的公司</div>
          <div>{{selectCompany.name}}</div>
        </el-col>
      </el-row>
      <div slot="footer" class="dialog-footer text-right el-dialog-top">
        <el-button @click="dialogFormVisibleCompany = false">取 消</el-button>
        <el-button type="primary" @click="submitFormDataCo()">确 定</el-button>
      </div>
    </el-dialog>

    <!--部门选择弹窗-->
    <el-dialog title="选择分公司" :visible.sync="dialogFormVisibleDepartment" width="40%"  center>
      <el-row :gutter="20" class="rowStyle">
        <el-col :span="12" class="leftTree">
          <div style="margin-bottom: 10px">
            <el-input placeholder="请输入内容" size="small" v-model="selectDepartmentName" class="input-with-select">
              <el-button slot="append" icon="el-icon-search" @click="listSelect(2)"></el-button>
            </el-input>
          </div>
          <el-tree
            :data="departmentList"
            node-key="id"
            :props="defaultProps"
            default-expand-all
            :expand-on-click-node="false"
            @node-click="handleNodeClickDepartment">
              <span class="custom-tree-node" slot-scope="{ node, data }">
                <span>{{ node.label }}</span>
              </span>
          </el-tree>
        </el-col>
        <el-col :span="12" class="rightSelect">
          <div>已选择的公司</div>
          <div>{{selectDepartment.name}}</div>
        </el-col>
      </el-row>
      <div slot="footer" class="dialog-footer text-right el-dialog-top">
        <el-button @click="dialogFormVisibleDepartment = false">取 消</el-button>
        <el-button type="primary" @click="submitFormDataDe()">确 定</el-button>
      </div>
    </el-dialog>

    <!--上级选择-->
    <el-dialog title="选择上级" :visible.sync="dialogFormVisibleUp" width="40%"  center>
      <el-form>
        <el-form-item class="line">
          <el-input placeholder="请输入姓名" v-model="upName" class="input-with-select">
            <el-button slot="append" icon="el-icon-search"></el-button>
          </el-input>
        </el-form-item>
        <el-form-item class="line">
          <!--<el-button type="" v-for="postionItem in formAddepartmentUpdate.postion" :key="postionItem.yt_d_p_id">{{postionItem.work_position}} {{postionItem.work_level}}&nbsp;&nbsp;<i class="el-icon-circle-close" @click="delPosition(postionItem)"></i></el-button>-->
        </el-form-item>
        <el-form-item class="line">
          <el-checkbox-group v-model="form.yt_r_m_idArr">
            <el-checkbox v-for="item in form.role_info" :label="item.yt_r_m_id" :key="item.yt_r_m_id">{{item.role_name}}</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer text-right el-dialog-top">
        <el-button @click="dialogFormVisibleUp = false">取 消</el-button>
        <el-button type="primary" @click="submitFormDataDe()">确 定</el-button>
      </div>
    </el-dialog>
    <!--下级选择-->
    <el-dialog title="选择下级" :visible.sync="dialogFormVisibleDown" width="40%"  center>
      <el-form>
        <el-form-item class="line">
          <el-input placeholder="请输入姓名" v-model="upName" class="input-with-select">
            <el-button slot="append" icon="el-icon-search"></el-button>
          </el-input>
        </el-form-item>
        <el-form-item class="line">
          <!--<el-button type="" v-for="postionItem in formAddepartmentUpdate.postion" :key="postionItem.yt_d_p_id">{{postionItem.work_position}} {{postionItem.work_level}}&nbsp;&nbsp;<i class="el-icon-circle-close" @click="delPosition(postionItem)"></i></el-button>-->
        </el-form-item>
        <el-form-item class="line">
          <el-checkbox-group v-model="form.yt_r_m_idArr">
            <el-checkbox v-for="item in form.role_info" :label="item.yt_r_m_id" :key="item.yt_r_m_id">{{item.role_name}}</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer text-right el-dialog-top">
        <el-button @click="dialogFormVisibleUp = false">取 消</el-button>
        <el-button type="primary" @click="submitFormDataDe()">确 定</el-button>
      </div>
    </el-dialog>

    <!--分管区域-->
    <el-dialog title="辖区选择" :visible.sync="dialogFormVisibleWhere" width="40%"  center>
      <el-form>
        <el-form-item class="line">
          <!--<el-button type="" v-for="postionItem in formAddepartmentUpdate.postion" :key="postionItem.yt_d_p_id">{{postionItem.work_position}} {{postionItem.work_level}}&nbsp;&nbsp;<i class="el-icon-circle-close" @click="delPosition(postionItem)"></i></el-button>-->
        </el-form-item>
        <el-form-item class="line">
          <el-checkbox-group v-model="form.yt_r_m_idArr">
            <el-checkbox v-for="item in form.role_info" :label="item.yt_r_m_id" :key="item.yt_r_m_id">{{item.role_name}}</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer text-right el-dialog-top">
        <el-button @click="dialogFormVisibleWhere = false">取 消</el-button>
        <el-button type="primary" @click="submitFormDataDe()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
  import { userDetail, companyDepartmentList } from '@/api/organizationManagement'
  import store from '@/store'
  export default {
    data() {
      var validatebumen = (rule, value, callback) => {
        if (this.form.gongsi === '') {
          callback(new Error('请先选择公司'))
        }
        if (value === '') {
          callback(new Error('请选择所属部门'))
        }
      }
      var validatexia = (rule, value, callback) => {
        if (this.form.bumen === '') {
          callback(new Error('请先选择部门'))
        }
        if (value === '') {
          callback(new Error('请选择下级'))
        }
      }
      var validateshang = (rule, value, callback) => {
        if (this.form.bumen === '') {
          callback(new Error('请先选择部门'))
        }
        if (value === '') {
          callback(new Error('请选择上级'))
        }
      }
      return {
        form: {
          name: '',
          english_name: '',
          sex: '男',
          phoneNUm: '+86',
          mobile_phone: '',
          special_plane: '',
          email: '',
          gongsi: '',
          gongsiId: '',
          bumen: '',
          zhiwu: '212',
          subordinate_info: [],
          parent_info: [],
          position_info: {},
          province_city: [],
          company_info: {},
          department_info: {}
        },
        rules: {
          name: [
            { required: true, message: '请输入姓名', trigger: 'blur' },
            { max: 28, message: '姓名长度请在在 28 个字符之内', trigger: 'blur' }
          ],
          english_name: [
            { max: 55, message: '英文名长度在 55 个字符之内', trigger: 'blur' }
          ],
          sex: [
            { required: true, message: '请选择性别', trigger: 'blur' }
          ],
          mobile_phone: [
            { required: true, message: '请输入手机号', trigger: 'blur' },
            { max: 11, message: '英文名长度在 11 个字符之内', trigger: 'blur' }
          ],
          special_plane: [
            { max: 20, message: '座机长度在 20 个字符之内', trigger: 'blur' }
          ],
          email: [
            { max: 30, message: '英文名长度在 30 个字符之内', trigger: 'blur' },
            { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
          ],
          gongsi: [
            { required: true, message: '请选择所属公司', trigger: 'blur' }
          ],
          bumen: [
            { validator: validatebumen, trigger: 'blur', required: true }
          ],
          valueDate1: [
            { required: true, message: '请选择入职日期', trigger: 'blur' }
          ],
          zhiwu: [
            { message: '请选择职务', trigger: 'blur' }
          ],
          zhiji: [
            { message: '请选择职级', trigger: 'blur' }
          ],
          shangji: [
            { validator: validateshang, trigger: 'blur', required: true }
          ],
          xiaji: [
            { validator: validatexia, trigger: 'blur', required: true }
          ]
        },
        dialogFormVisibleCompany: false,
        dialogFormVisibleDepartment: false,
        companyList: [],
        selectCompany: {},
        selectName: '',
        defaultProps: {
          children: 'children',
          label: 'name'
        },
        departmentList: [],
        selectDepartmentName: '',
        selectDepartment: {},
        positionList: [],
        levelList: [],
        arrRole: [],
        dialogFormVisibleUp: false,
        dialogFormVisibleDown: false,
        dialogFormVisibleWhere: false,
        upName: '',
        downName: '',
        module_id: store.getters.roles.yt_m_id || localStorage.module_id
      }
    },
    methods: {
      initForm() {
        console.log(localStorage.u_id_emp)
        const obj = {
          'u_id': localStorage.u_id_emp,
          'module_id': this.module_id,
          'type': 0
        }
        userDetail(obj).then(response => {
          this.form = response.response.info
          this.form.phoneNUm = '+86'
          console.log(this.form)
          this.form.gongsi = this.form.company_info.name
          this.form.company_id = this.form.company_info.yt_c_id
          this.form.bumen = this.form.department_info.name
          this.form.department_id = this.form.department_info.yt_c_id
          this.form.xiaqu = this.form.province_city.join('，')
          this.form.shangji = []
          this.form.xiaji = []
          for (let i = 0; i < this.form.subordinate_info.length; i++) {
            this.form.xiaji.push(this.form.subordinate_info[i].user_name)
          }
          for (let i = 0; i < this.form.parent_info.length; i++) {
            this.form.shangji.push(this.form.parent_info[i].user_name)
          }
          this.form.shangji = this.form.shangji.join('，')
          this.form.xiaji = this.form.xiaji.join('，')
          this.form.yt_r_m_idArr = []
          console.log(typeof (this.form.yt_r_m_id))
          console.log(this.form.yt_r_m_idArr)
          for (let i = 0; i < this.form.role_info.length; i++) {
            if (this.form.role_info[i].select) {
              this.form.yt_r_m_idArr.push(this.form.role_info[i].yt_r_m_id)
            }
          }
          this.listSelect(3)
        })
      },
      onSubmit() {
        this.$refs['form'].validate((valid) => {
          if (valid) {
            alert('submit!')
          } else {
            console.log('error submit!!')
            return false
          }
        })
      },
      arrayFilter(arr) {
        console.log(arr)
        return arr.join('，')
      },
      // 公司选择
      listSelect(type) {
        const obj = {
          'type': type, // 1公司，2部门，3职务，4职级
          'module_id': this.module_id, // 模块id
          'yt_c_id': '', // 公司/部门id
          'name': ''
        }
        if (type === 1) {
          obj.name = this.selectName
        } else if (type === 2) {
          obj.yt_c_id = this.form.company_id
          obj.name = this.selectDepartmentName
        } else if (type === 3) {
          obj.yt_c_id = this.form.department_id
        }
        companyDepartmentList(obj).then(response => {
          switch (type) {
            case 1:
              this.companyList = response.response.list
              this.selectCompany.name = this.form.gongsi
              this.dialogFormVisibleCompany = true
              break
            case 2:
              this.departmentList = response.response.list
              this.selectDepartment.name = this.form.bumen
              this.dialogFormVisibleDepartment = true
              break
            case 3:
              this.positionList = response.response.list
              break
            case 4:
              this.levelList = response.response.list
              break
            default:
          }
        })
      },
      // 点击tree的节点
      handleNodeClickCompany(data) {
        console.log(data)
        this.selectCompany = data
      },
      submitFormDataCo() {
        this.form.gongsi = this.selectCompany.name
        this.form.company_id = this.selectCompany.yt_c_id
        this.dialogFormVisibleCompany = false
      },
      // 点击tree的节点
      handleNodeClickDepartment(data) {
        console.log(data)
        this.selectDepartment = data
      },
      submitFormDataDe() {
        this.form.bumen = this.selectCompany.name
        this.form.department_id = this.selectCompany.yt_c_id
        this.dialogFormVisibleDepartment = false
      },
      upDown() {
        this.dialogFormVisibleUp = true
      },
      upDownSp() {
        this.dialogFormVisibleDown = true
      },
      canclePage() {
        this.$router.push('employeeMangement')
      },
      whereSelect() {
        this.dialogFormVisibleWhere = true
      }
    },
    created() {
      if (localStorage.u_id_emp !== 'add') {
        this.initForm()
      }
    },
    filters: {
      arrayFilter(arr) {
        return arr.join('，')
      },
      userNameFilter(arr) {
        const data = []
        for (let i = 0; i < arr.length; i++) {
          data.push(arr[i].user_name)
        }
        return data.join('，')
      }
    }
  }
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
  .myInfo{
    margin: 20px 30px;
    .formMyInfo{
      width: 75%;
    }
    .line{
      text-align: center;
    }
    .el-dialog--center .el-dialog__body{
      padding: 0 !important;
    }
    .leftTree{
      padding-bottom: 20px;
      border-right: 1px solid lightgrey;
      padding-top: 10px;
    }
    .rightSelect{
    }
    .rowStyle{
      border-bottom: 1px solid lightgrey;
      margin-top: -25px;
    }
    .text-right{
      text-align: right;
      margin-top: -30px;
    }
  }
</style>
