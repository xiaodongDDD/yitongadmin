<template>
  <div class="center-content template-add">
    <my-header :msg='msg'></my-header>
    <p class="position">新增评价模板</p>

    <div class="edit-form">
      <el-form ref="form" :model="form" label-width="100px">
        <el-form-item label="模板名称：">
          <el-input v-model="form.name" maxlength="50"></el-input>
        </el-form-item>
        <el-form-item label="评价维度：">
          <el-checkbox-group v-model="form.type">
            <div class="item-list" v-for="(item, index) in form.signList">
              <el-checkbox :label="item.type"></el-checkbox>
              <i class="el-icon-circle-close-outline type-icon" @click.prevent="removeDomain(index)"></i>
              <span class="ratetxt">占比</span>
              <el-input class="rate" v-model="item.rate"></el-input>
            </div>
          </el-checkbox-group>
          <div class="item-list">
            <el-button class="item-plus" icon="el-icon-plus" v-show="!isAddSign" @click="isAddSign = true">新增</el-button>
            <div class="add-item" v-show="isAddSign">
              <el-input class="add-dimen" maxlength="20" placeholder="请输入维度名" v-model="addSignType"></el-input>
              <i class="el-icon-check" @click="addSignList"></i>
              <i class="el-icon-close" @click="isAddSign = false"></i>
            </div>
          </div>
        </el-form-item>

        <div class="" v-for="(bItem, index1) in form.signList">
          <el-form-item class="big-label" label-width="auto" :label="bItem.sign"></el-form-item>
          <el-form-item label="指标名称：">
            <div class="sign-list" v-for="(item,index2) in bItem.target">
              <el-input placeholder="请输入指标名称" maxlength="200" v-model="item.type"></el-input>
              <i class="el-icon-circle-close-outline type-icon" @click="removeTarget(index1, index2)"></i>
              <span class="ratetxt">占比</span>
              <el-input class="right-in" placeholder="请输入占比（选填）" v-model="item.rate"></el-input>
            </div>
            <div class="sign-list">
              <el-button class="item-plus" icon="el-icon-plus" @click="addItem1(index1)">新增</el-button>
            </div>
          </el-form-item>

          <el-form-item label="评价等级：">
            <div class="sign-list" v-for="(item,index2) in bItem.rank">
              <el-input placeholder="请输入等级名称（中文、英文、数字不限）" maxlength="15" v-model="item.type"></el-input>
              <i class="el-icon-circle-close-outline type-icon" @click="removeRank(index1, index2)"></i>
              <el-input class="right-in" placeholder="请输入等级说明（选填）" v-model="item.remark"></el-input>
            </div>
            <div class="sign-list">
              <el-button class="item-plus" icon="el-icon-plus" @click="addItem2(index1)">新增</el-button>
            </div>
          </el-form-item>
        </div>

        <el-form-item>
          <el-button @click="reback">取消</el-button>
          <el-button @click="saveTemplate()">保存</el-button>
        </el-form-item>
      </el-form>
    </div>
    <el-dialog
      title="提示"
      :visible.sync="centerDialogVisible"
      width="30%"
      center>
      <div class="dialogContent">
        <p>请确认是否要删除</p>
        <p>{{ tinfo.tname }}评价维度</p>

        <p>删除后，该维度相关的评价将彻底删除</p>
      </div>
      <span slot="footer" class="dialog-footer">
          <el-button @click="centerDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="signDelete()">确 定</el-button>
        </span>
    </el-dialog>
  </div>
</template>

<script>
  import myHeader from '../myHeader/myHeader'
  import { addTemplate } from '@/api/eduAdmin'
  export default {
    name: 'templateEdit',
    data() {
      return {
        form: {
          name: '',
          type: ['成绩'],
          signList: [{ sign: '成绩维度：', type: '成绩', rate: '', target: [{ type: '', rate: '' }], rank: [{ type: '', remark: '' }] }]
        },
        isAddSign: false,
        msg: {
          title1: '评价模版管理',
          title2: '新增评价模版管理',
          flag: 1,
          path: '/templateList'
        },
        addSignType: '',
        tinfo: {},
        centerDialogVisible: false
      }
    },
    components: {
      myHeader
    },
    methods: {
      saveTemplate() {
        const obj = this.form
        const token = localStorage.getItem('TOKEN')
        obj.token = token
        obj.is_update = 1
        obj.school_id = this.$route.query.school_id

        const len = this.form.signList.length
        let signSum = 0
        let oneSum = 0
        let soSum = 0
        let flag = true
        for (let i = 0; i < len; i++) {
          // 判断评价维度的占比总和
          if (this.form.signList[i].rate !== '') {
            signSum += parseInt(this.form.signList[i].rate)
          } else {
            soSum++
          }
          if (soSum === len) {
            signSum = 100
          }

          // 判断评价维度下的指标占比总和
          let targetSum = 0
          let oSum = 0
          if (this.form.signList[i].target.length !== 0) {
            for (let k = 0; k < this.form.signList[i].target.length; k++) {
              if (this.form.signList[i].target[k].rate !== '') {
                targetSum += parseInt(this.form.signList[i].target[k].rate)
              } else {
                oSum++
              }
              if (oSum === this.form.signList[i].target.length) {
                targetSum = 100
              }
            }
            if (targetSum !== 100) {
              oneSum++
            }
          } else {
            flag = false
          }
        }
        console.log(JSON.stringify(obj))
        // return false
        if (flag) {
          if (signSum === 100 && oneSum === 0) {
            addTemplate(obj).then(res => {
              if (res.hasOwnProperty('response')) {
                this.$message('新增成功')
                this.$router.push({ path: '/templateList', query: { school_id: this.$route.query.school_id }})
              } else {
                this.$alert(res.error_response.msg, '提示', {
                  confirmButtonText: '确定'
                })
              }
            })
          } else {
            this.$alert('请确认填写项是否正确', '提示', {
              confirmButtonText: '确定'
            })
          }
        } else {
          this.$alert('评价维度下指标条数不能为零！', '提示', {
            confirmButtonText: '确定'
          })
        }
      },
      reback() {
        const school_id = this.$route.query.school_id
        this.$router.push({ path: '/templateList', query: { school_id: school_id }})
      },
      removeDomain(index, type) {
        this.tinfo.index = index
        this.tinfo.tname = type
        this.centerDialogVisible = true
      },
      signDelete() {
        this.form.signList.splice(this.tinfo.index, 1)
        this.centerDialogVisible = false
      },
      addSignList() {
        const addSign = {
          type: '',
          sign: '',
          rate: '',
          target: [{ type: '', rate: '' }],
          rank: [{ type: '', remark: '' }]
        }
        const reg = /^[\u4e00-\u9fa5a-zA-Z\d]+$/
        if (this.addSignType !== '' && this.addSignType.length <= 20 && reg.test(this.addSignType)) {
          addSign.type = this.addSignType
          addSign.sign = this.addSignType + '维度：'

          const aindex = this.form.type.indexOf(addSign.type)
          // console.log(aindex)
          if (aindex > -1) {
            this.$alert('已存在同名评价维度', '提示', {
              confirmButtonText: '确定'
            })
          } else {
            this.form.signList.push(addSign)
            this.isAddSign = false
            this.addSignType = ''
            this.form.type.push(addSign.type)
          }
        } else {
          this.$alert('请确认评价维度名是否正确', '提示', {
            confirmButtonText: '确定'
          })
        }
      },
      addItem1(index) {
        const str = { type: '', rate: '' }
        this.form.signList[index].target.push(str)
      },
      addItem2(index) {
        const str = { type: '', remark: '' }
        this.form.signList[index].rank.push(str)
      },
      removeTarget(index1, index2) {
        this.form.signList[index1].target.splice(index2, 1)
      },
      removeRank(index1, index2) {
        this.form.signList[index1].rank.splice(index2, 1)
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .type-icon{
    color: #606266;
    margin-left: 5px;
    font-size: 14px;
  }
  .ratetxt{
    color: #606266;
    margin-left: 15px;
  }
  .rate{
    width: 60px!important;
    margin-left: 5px;
  }
  .item-list{
    margin-right: 30px;
    margin-bottom: 15px;
    float: left;
  }
  .item-plus{
    border: none;
  }
  .sign-list{
    margin-bottom: 15px;
  }
  .right-in{
    margin-left: 10px;
  }
  .add-item{
    float: left;

    .add-dimen{
      width: 120px;
    }
    i{
      font-size: 16px;
    }
  }
</style>
