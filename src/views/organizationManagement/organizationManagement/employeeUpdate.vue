<template>
  <div class="myInfo">
    <el-form ref="formUpdate" :model="form" label-width="180px" class="formMyInfo" :rules="rules">
      <el-form-item label="头像" v-if="addFlag">
        <img :src="form.avatar" height="100" class="imgStyle" width="100"/>
      </el-form-item>
      <el-form-item label="姓名" prop="user_name">
        <el-input v-model="form.user_name" :disabled="disabledFlag"></el-input>
      </el-form-item>
      <el-form-item label="英文名" prop="english_name">
        <el-input v-model="form.english_name" :disabled="disabledFlag"></el-input>
      </el-form-item>
      <el-form-item label="性别" prop="sex">
        <el-radio-group v-model="form.sex" :disabled="disabledFlag">
          <el-radio label="1">男</el-radio>
          <el-radio label="2">女</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="员工编号" v-if="addFlag">
        <span>{{form.u_id}}</span>
      </el-form-item>
      <el-form-item label="手机"  prop="mobile_phone">
        <el-col :span="4">
          <el-input v-model="form.phoneNUm" style="width: 100%" :disabled="true"></el-input>
        </el-col>
        <el-col :span="1" class="line">-
        </el-col>
        <el-col :span="19">
          <el-input v-model="form.mobile_phone" style="width: 100%" :disabled="disabledFlag"></el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="座机"  prop="special_plane">
        <el-input v-model="form.special_plane" :disabled="disabledFlag"></el-input>
      </el-form-item>
      <el-form-item label="邮箱"  prop="email">
        <el-input v-model="form.email" :disabled="disabledFlag"></el-input>
      </el-form-item>
      <el-form-item label="公司" prop="gongsi">
        <div >
          <el-button v-if="!form.gongsi" @click="listSelect(1)">选择</el-button>
          {{form.gongsi}}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<el-button v-if="form.gongsi" @click="listSelect(1)" v-show="!disabledFlag">修改</el-button>
          <!--<el-input v-model="form.gongsi" :disabled="true" ></el-input>-->
        </div>
      </el-form-item>
      <el-form-item label="部门" prop="bumen">
        <div >
          <el-button v-if="!form.bumen" @click="listSelect(2)">选择</el-button>
          {{form.bumen}}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<el-button v-if="form.bumen" @click="listSelect(2)" v-show="!disabledFlag">修改</el-button>
          <!--<el-input v-model="form.bumen" :disabled="true"></el-input>-->
        </div>
      </el-form-item>
      <el-form-item label="分管辖区">
        <div >
          <el-button v-if="!form.xiaqu" @click="whereSelect()" v-show="!disabledFlag">选择</el-button>
          {{form.xiaqu}}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<el-button v-if="form.xiaqu" @click="whereSelect()" v-show="!disabledFlag">修改</el-button>
        </div>
      </el-form-item>
      <el-form-item label="入离日期" prop="entry_timeSp">
        <el-col :span="11">
          <el-date-picker type="date" placeholder="选择日期" v-model="entry_timeSp" style="width: 100%;" :disabled="disabledFlag"></el-date-picker>
        </el-col>
        <el-col class="line" :span="2">-</el-col>
        <el-col :span="11">
          <el-date-picker type="date" placeholder="至今" v-model="leave_timeSp" style="width: 100%;" :disabled="disabledFlag"></el-date-picker>
        </el-col>
      </el-form-item>
      <el-form-item label="职务" prop="yt_d_p_id">
        <el-select v-model="form.yt_d_p_id" placeholder="请选择职务" style="width: 100%" @change="selectPosition" :disabled="disabledFlag">
          <el-option
            v-for="item in positionList"
            :key="item.yt_d_p_id"
            :label="item.work_position"
            :value="item.yt_d_p_id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="职级">
        <el-input v-model="form.zhiji" :disabled="true" @click=""></el-input>
      </el-form-item>
      <el-form-item label="上级" prop="shangji">
        <div >
          <el-button v-if="!form.shangji" @click="listSelect(5)">选择</el-button>
          {{form.shangji}}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<el-button v-if="form.shangji" @click="listSelect(5)" v-show="!disabledFlag">修改</el-button>
          <!--<el-input v-model="form.shangji" :disabled="true"></el-input>-->
        </div>
      </el-form-item>
      <el-form-item label="是否启用">
        <el-radio-group v-model="form.use_flag" :disabled="flagStart || disabledFlag" @change="userChange">
          <el-radio label="1">是</el-radio>
          <el-radio label="0">否</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="是否生成邀请码"  >
        <el-radio-group v-model="form.code_flag" @change="codeChange" :disabled="flagCode || disabledFlag">
          <el-radio label="1">是</el-radio>
          <el-radio label="0">否</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="专属邀请码" >
        <span v-if="form.code_flag === '1'" v-show="!flagCode">
            <el-select v-model="form.code_type" placeholder="请选择">
              <el-option
                v-for="item in optionsList"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
        </span>
        <span v-if="addFlag">{{form.invited_code}}</span>
        <span v-if="!form.invited_code">系统生成</span>
      </el-form-item>
      <el-form-item label="角色">
        <el-checkbox-group v-model="yt_r_m_idArr">
          <el-checkbox v-for="item in form.role_info" :label="item.yt_r_m_id" :key="item.yt_r_m_id" :disabled="item.yt_r_m_id === '1' || disabledFlag">{{item.role_name}}</el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item class="line">
        <el-button @click="canclePage">取消</el-button>
        <el-button type="primary" @click="onSubmit" v-if="!disabledFlag">保存</el-button>
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
    <el-dialog title="选择部门" :visible.sync="dialogFormVisibleDepartment" width="40%"  center>
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
          <div>已选择的部门</div>
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
            <el-button slot="append" icon="el-icon-search" @click="listSelect(5)"></el-button>
          </el-input>
        </el-form-item>
        <el-form-item class="line" style="text-align: left">
          {{upNameSelect.user_name}}
        </el-form-item>
        <el-form-item class="line" style="text-align: left">
          <el-radio-group v-model="upNameSelect.parent_id">
            <el-radio  v-for="item in upList"  @change="selectParent(item)" border :label="item.u_id" :key="item.u_id" style="margin-top: 10px;margin-left: 10px;width: 180px">{{item.user_name}}</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer text-right el-dialog-top">
        <el-button @click="dialogFormVisibleUp = false">取 消</el-button>
        <el-button type="primary" @click="submitFormDataUp()">确 定</el-button>
      </div>
    </el-dialog>
    <!--分管区域-->
    <el-dialog title="辖区选择" :visible.sync="dialogFormVisibleWhere" width="40%"  center>
      <el-form>
        <el-form-item class="line" style="text-align: left">
          <el-button type="" v-for="item,index in provincesArr" :key="index" style="margin-top: 10px;margin-left: 10px">
            {{item.province}} {{item.city}}&nbsp;&nbsp;<i class="el-icon-circle-close" @click="delProvince(item, index)"></i></el-button>
        </el-form-item>
        <el-form-item class="line" style="text-align: left">
          <el-popover
            placement="bottom"
            width="400"
            trigger="click"
            @show="showPopover(itemProvince)"
            v-for="itemProvince,index in this.dataProvinces.provinces" :key="index">
            <el-checkbox-group v-model="itemProvince.arr" @change="handleCheckedCitiesChange">
              <el-checkbox v-for="item in itemProvince.citys" :label="item" :key="item" style="margin-left: 30px;margin-top: 10px">{{item}}</el-checkbox>
            </el-checkbox-group>
            <el-button slot="reference" style="margin-top: 10px;margin-left: 10px" icon="el-icon-circle-plus-outline">
              {{itemProvince.name}}</el-button>
          </el-popover>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer text-right el-dialog-top">
        <el-button @click="dialogFormVisibleWhere = false">取 消</el-button>
        <el-button type="primary" @click="submitFormDataCity()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
  import { userDetail, companyDepartmentList, addEditUser, roleList } from '@/api/organizationManagement'
  import dataProvinces from '@/staticData/provinces.json'
  import pic from '@/assets/index/admin.jpg'

  export default {
    data() {
      var validatePass = (rule, value, callback) => {
        var a = /0\d{2}-\d{7,8}/
        if (value === '') {
          callback()
        } else if (!a.test(value)) {
          callback(new Error('请输入正确的座机'))
        } else {
          callback()
        }
      }
      var validateName = (rule, value, callback) => {
        var a = /^[A-Za-z]+$/
        if (value === '') {
          callback()
        } else if (!a.test(value)) {
          callback(new Error('请输入正确的英文名'))
        } else {
          callback()
        }
      }
      var validatePhone = (rule, value, callback) => {
        var a = /^[1][3,4,5,7,8][0-9]{9}$/
        console.log()
        if (value === '') {
          callback()
        } else if (!a.test(value)) {
          callback(new Error('请输入正确的手机号'))
        } else {
          callback()
        }
      }
      return {
        form: {
          name: '',
          english_name: '',
          sex: '1',
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
          department_info: {},
          department_id: '',
          yt_d_p_id: '',
          company_id: '',
          yt_r_m_idArr: [],
          role_info: [],
          use_flag: '0',
          code_flag: '0',
          zhiji: '',
          leave_time: null,
          shangji: '',
          xiaqu: '',
          code_type: ''
        },
        entry_timeSp: new Date(),
        leave_timeSp: null,
        flagStart: false,
        flagCode: false,
        yt_r_m_idArr: [],
        rules: {
          user_name: [
            { required: true, message: '请输入姓名', trigger: 'blur' },
            { max: 28, message: '姓名长度请在在 28 个字符之内', trigger: 'blur' }
          ],
          english_name: [
            { max: 55, message: '英文名长度在 55 个字符之内', trigger: 'blur' },
            { validator: validateName, trigger: 'blur' }
          ],
          sex: [
            { required: true, message: '请选择性别', trigger: 'blur' }
          ],
          mobile_phone: [
            { required: true, message: '请输入手机号', trigger: 'blur' },
            { min: 11, max: 11, message: '手机号长度在 11 个字符之内', trigger: 'blur' },
            { validator: validatePhone, trigger: 'blur' }
          ],
          special_plane: [
            { max: 20, message: '座机长度在 20 个字符之内', trigger: 'blur' },
            { validator: validatePass, trigger: 'blur' }
          ],
          email: [
            { max: 30, message: '英文名长度在 30 个字符之内', trigger: 'blur' },
            { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur'] }
          ],
          gongsi: [
            { required: true, message: '请选择所属公司', trigger: 'blur' }
          ],
          bumen: [
            { trigger: 'blur', required: true, message: '请选择部门' }
          ],
          yt_d_p_id: [
            { required: true, message: '请选择职务', trigger: 'blur' }
          ],
          shangji: [
            { trigger: 'blur', required: true, message: '请选择上级' }
          ]
        },
        optionsList: [{ label: '请选择', value: '' }, { label: '运营人员', value: 'OPERATION' }, { label: '培训师', value: 'MARKET' }],
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
        upList: [],
        upNameSelect: {
          parent_id: '',
          user_name: ''
        },
        arrRole: [],
        dialogFormVisibleUp: false,
        dialogFormVisibleDown: false,
        dialogFormVisibleWhere: false,
        upName: '',
        downName: '',
        dataProvinces: dataProvinces,
        whereProvinces: '',
        provincesArr: '',
        addFlag: false,
        module_id: localStorage.module_id,
        functionFlag: localStorage.function,
        disabledFlag: true
      }
    },
    methods: {
      initRole() {
        const obj = {
          'module_id': this.module_id,
          'type': 1
        }
        roleList(obj).then(response => {
          this.form.role_info = response.response.list
        }).catch()
      },
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
          this.entry_timeSp = new Date(this.form.entry_time.replace(/-/g, '/'))
          if (this.form.leave_time === '' || this.form.leave_time === 0) {
            this.leave_timeSp === null
          } else {
            this.leave_timeSp = new Date(this.form.leave_time.replace(/-/g, '/'))
          }
          this.form.company_id = this.form.company_info.yt_c_id
          this.form.bumen = this.form.department_info.name
          this.form.department_id = this.form.department_info.yt_c_id
          this.form.xiaqu = []
          for (let i = 0; i < this.form.province_city.length; i++) {
            const obj = this.form.province_city[i].province + this.form.province_city[i].city
            this.form.xiaqu.push(obj)
          }
          this.form.xiaqu = this.form.xiaqu.join('，')
          this.form.shangji = this.form.parent_info.user_name
          this.form.parent_id = this.form.parent_info.u_id
          this.yt_r_m_idArr = []
          this.form.zhiji = this.form.position_info.work_level
          for (let i = 0; i < this.form.role_info.length; i++) {
            if (this.form.role_info[i].select) {
              this.yt_r_m_idArr.push(this.form.role_info[i].yt_r_m_id)
            }
          }
          if (this.form.use_flag === '1') {
            this.flagStart = true
          }
          if (this.form.code_flag === '1') {
            this.flagCode = true
          }
          if (this.form.avatar === '') {
            this.form.avatar = pic
          }
          this.listSelect(3)
          this.listSelect(5, 'init')
        })
      },
      onSubmit() {
        console.log('-----')
        this.$refs['formUpdate'].validate((valid) => {
          console.log(valid)
          if (valid) {
            this.form.module_id = this.module_id
            this.form.yt_r_m_id = this.yt_r_m_idArr
            if (this.entry_timeSp === null || this.entry_timeSp === '') {
              this.$message({
                message: '请选择入职时间',
                type: 'error'
              })
              return
            }

            this.form.entry_time = new Date(this.entry_timeSp).getTime() / 1000
            if (this.leave_timeSp === '' || this.leave_timeSp == null) {
              this.form.leave_time = 0
            } else {
              if (new Date(this.leave_timeSp).getFullYear() !== new Date().getFullYear() ||
                new Date(this.leave_timeSp).getMonth() !== new Date().getMonth() || new Date(this.leave_timeSp).getDate() !== new Date().getDate()) {
                this.$message({
                  message: '离职日期只能为当日',
                  type: 'error'
                })
                return
              }
              this.form.leave_time = new Date(this.leave_timeSp).getTime() / 1000
              if (this.form.entry_time > this.form.leave_time) {
                this.$message({
                  message: '离职日期不能早于入职日期！',
                  type: 'error'
                })
                return
              }
            }
            addEditUser(this.form).then(response => {
              this.$message({
                message: response.response.msg,
                type: 'success'
              })
              this.$router.push('employeeMangement')
            })
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
      listSelect(type, flag) {
        const obj = {
          'type': type, // 1公司，2部门，3职务，4职级
          'module_id': this.module_id, // 模块id
          'yt_c_id': '', // 公司/部门id
          'name': '',
          'yt_d_p_id': '',
          'user_name': '',
          'u_id': ''
        }
        if (type === 1) {
          obj.name = this.selectName
        } else if (type === 2) {
          if (this.form.company_id === '') {
            this.$message({
              message: '请先选择公司',
              type: 'error'
            })
            return
          }
          obj.yt_c_id = this.form.company_id
          obj.name = this.selectDepartmentName
        } else if (type === 3) {
          if (this.form.department_id === '') {
            this.$message({
              message: '请先选择部门',
              type: 'error'
            })
            return
          }
          obj.yt_c_id = this.form.department_id
        } else if (type === 5) {
          if (this.form.department_id === '') {
            this.$message({
              message: '请先选择部门',
              type: 'error'
            })
            return
          }
          if (this.form.yt_d_p_id === '') {
            this.$message({
              message: '请先选择职务',
              type: 'error'
            })
            return
          }
          obj.yt_c_id = this.form.department_id
          obj.yt_d_p_id = this.form.yt_d_p_id
          obj.user_name = this.upName
          if (localStorage.u_id_emp !== 'add') {
            obj.u_id = this.form.u_id
          }
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
              if (flag !== 'init') {
                this.dialogFormVisibleDepartment = true
              }
              break
            case 3:
              this.positionList = response.response.list
              break
            case 5:
              this.upList = response.response.list
              console.log(this.form.shangji)
              this.upNameSelect.user_name = this.form.parent_info.user_name
              this.upNameSelect.parent_id = this.form.parent_id
              if (flag !== 'init') {
                this.dialogFormVisibleUp = true
              }
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
        this.listSelect(2, 'init')
        this.form.department_id = ''
        this.form.bumen = ''
        this.form.zhiwu = ''
        this.form.yt_d_p_id = ''
        this.positionList = []
        this.form.zhiji = ''
        this.form.shangji = ''
        this.parent_id = ''
        this.dialogFormVisibleCompany = false
      },
      // 点击tree的节点
      handleNodeClickDepartment(data) {
        console.log(data)
        this.selectDepartment = data
      },
      submitFormDataDe() {
        this.form.bumen = this.selectDepartment.name
        this.form.department_id = this.selectDepartment.yt_c_id
        this.dialogFormVisibleDepartment = false
        this.listSelect(3)
        this.form.zhiwu = ''
        this.form.yt_d_p_id = ''
        this.positionList = []
        this.form.zhiji = ''
        this.form.shangji = ''
        this.parent_id = ''
      },
      canclePage() {
        this.$router.push('employeeMangement')
      },
      whereSelect() {
        for (let i = 0; i < this.dataProvinces.provinces.length; i++) {
          this.dataProvinces.provinces[i].arr = []
        }
        for (let i = 0; i < this.dataProvinces.provinces.length; i++) {
          for (let j = 0; j < this.form.province_city.length; j++) {
            if (this.dataProvinces.provinces[i].name === this.form.province_city[j].province) {
              this.dataProvinces.provinces[i].arr.push(this.form.province_city[j].city)
            }
          }
        }
        this.provincesArr = this.form.province_city
        this.dialogFormVisibleWhere = true
      },
      delProvince(item, index) {
        this.provincesArr.splice(index, 1)
        for (let i = 0; i < this.dataProvinces.provinces.length; i++) {
          if (this.dataProvinces.provinces[i].name === item.province) {
            console.log(this.dataProvinces.provinces[i].name)
            for (let j = 0; j < this.dataProvinces.provinces[i].citys.length; j++) {
              if (item.city === this.dataProvinces.provinces[i].citys[j]) {
                for (let k = 0; k < this.dataProvinces.provinces[i].arr.length; k++) {
                  if (item.city === this.dataProvinces.provinces[i].arr[k]) {
                    this.dataProvinces.provinces[i].arr.splice(k, 1)
                  }
                }
              }
            }
          }
        }
      },
      handleCheckedCitiesChange(value) {
        const provincesArrSp = []
        for (let i = 0; i < this.provincesArr.length; i++) {
          if (this.provincesArr[i].province !== this.whereProvinces.name) {
            provincesArrSp.push(this.provincesArr[i])
          }
        }
        this.provincesArr = provincesArrSp
        for (let j = 0; j < value.length; j++) {
          this.provincesArr.push({
            province: this.whereProvinces.name,
            city: value[j]
          })
        }
      },
      showPopover(itemProvince) {
        this.whereProvinces = itemProvince
      },
      submitFormDataCity() {
        this.form.province_city = this.provincesArr
        this.dialogFormVisibleWhere = false
        this.form.xiaqu = []
        for (let i = 0; i < this.form.province_city.length; i++) {
          const obj = this.form.province_city[i].province + this.form.province_city[i].city
          this.form.xiaqu.push(obj)
        }
        this.form.xiaqu = this.form.xiaqu.join('，')
      },
      selectParent(value) {
        console.log(value)
        this.upNameSelect.user_name = value.user_name
        this.upNameSelect.parent_id = value.u_id
      },
      submitFormDataUp() {
        console.log(this.upNameSelect)
        this.form.shangji = this.upNameSelect.user_name
        this.form.parent_id = this.upNameSelect.parent_id
        this.dialogFormVisibleUp = false
      },
      selectPosition(value) {
        for (let i = 0; i < this.positionList.length; i++) {
          if (this.positionList[i].yt_d_p_id === value) {
            this.form.zhiji = this.positionList[i].work_level
          }
        }
        this.form.shangji = ''
        this.parent_id = ''
        console.log(value)
      },
      codeChange(value) {
        if (this.form.use_flag === '0') {
          this.$message({
            message: '请先启用账户',
            type: 'error'
          })
          this.form.code_flag = '0'
        }
        console.log(this.form.use_flag)
        console.log(value)
      },
      userChange(value) {
        console.log(value)
        if (value === '0') {
          this.form.code_flag = '0'
        }
        console.log(this.form.use_flag)
      }
    },
    created() {
      console.log(this.dataProvinces)
      if (this.functionFlag.indexOf('O') >= 0) {
        this.disabledFlag = false
      }
      if (localStorage.u_id_emp !== 'add') {
        this.addFlag = true
        this.initForm()
      } else {
        this.addFlag = false
        this.initRole()
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
