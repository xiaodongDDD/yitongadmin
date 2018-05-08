<template>
  <div class="center-content template-edit">
    <my-header :msg='msg'></my-header>
    <div class="content-detail">
      <p class="position">编辑评价模板</p>
      <div class="edit-form">
      <el-form ref="form" :model="form" label-width="100px">
        <el-form-item label="模板名称：">
          <el-input v-model="form.name" maxlength="50"></el-input>
        </el-form-item>
        <el-form-item label="评价维度：">
          <el-checkbox-group v-model="form.checktype">
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
              <el-input placeholder="请输入等级名称（中文、英文、数字不限）" maxlength="200" v-model="item.type"></el-input>
              <i class="el-icon-circle-close-outline type-icon" @click="removeRank(index1, index2)"></i>
              <el-input class="right-in" placeholder="请输入等级说明（选填）" v-model="item.remark"></el-input>
            </div>
            <div class="sign-list">
              <el-button class="item-plus" icon="el-icon-plus" @click="addItem2(index1)">新增</el-button>
            </div>
          </el-form-item>
        </div>

        <el-form-item>
          <router-link to="/templateList"><el-button>取消</el-button></router-link>
          <el-button @click="saveUser()">保存</el-button>
        </el-form-item>
      </el-form>
     </div>
    </div>
  </div>
</template>

<script>
  import myHeader from '../myHeader/myHeader'
  import { templateDetail, addTemplate } from '@/api/eduAdmin'
  export default {
    name: 'templateEdit',
    data() {
      return {
        form: {},
        msg: {
          title1: '评价模版管理',
          title2: '编辑评价模版管理',
          flag: 1,
          path: '/templateList'
        },
        isAddSign: false,
        addSignType: ''
      }
    },
    components: {
      myHeader
    },
    methods: {
      getDetail() {
        const obj = {}
        obj.template_id = this.$route.query.template_id
        obj.token = localStorage.getItem('TOKEN')
        templateDetail(obj).then(res => {
          // console.log(res)
          if (res.hasOwnProperty('response')) {
            this.form = res.response.info
            const checktype = []
            for (let i = 0; i < res.response.info.type.length; i++) {
              checktype.push(res.response.info.type[i].rank)
            }
            this.form.checktype = checktype
          }
        })
      },
      saveUser() {
        const obj = this.form
        const token = localStorage.getItem('TOKEN')
        obj.token = token
        obj.is_update = 2
        obj.type = this.form.checktype

        const len = this.form.signList.length
        let signSum = 0
        let oneSum = 0
        for (let i = 0; i < len; i++) {
          signSum += parseInt(this.form.signList[i].rate)
          let targetSum = 0
          for (let k = 0; k < this.form.signList[i].target.length; k++) {
            targetSum += parseInt(this.form.signList[i].target[k].rate)
          }
          if (targetSum !== 100) {
            oneSum++
          }
        }
        console.log(JSON.stringify(obj))
        // return false
        if (signSum === 100 && oneSum === 0) {
          addTemplate(obj).then(res => {
            if (res.hasOwnProperty('response')) {
              this.$message('修改成功')
              this.$router.push({ path: '/templateList' })
            } else {
              this.$alert(res.error_response.msg, '提示', {
                confirmButtonText: '确定'
              })
            }
          })
        } else {
          this.$alert('请确认占比总和！', '提示', {
            confirmButtonText: '确定'
          })
        }
      },
      removeDomain(index) {
        this.form.signList.splice(index, 1)
      },
      addSignList() {
        const addSign = {
          type: '',
          sign: '',
          rate: '',
          target: [{ type: '', rate: '' }],
          rank: [{ type: '', remark: '' }]
        }
        const addType = {
          rank: '',
          rate: ''
        }
        if (this.addSignType !== '' && this.addSignType.length <= 20) {
          addSign.type = this.addSignType
          addSign.sign = this.addSignType + '维度：'
          this.form.signList.push(addSign)
          this.isAddSign = false
          this.addSignType = ''
          this.form.checktype.push(addSign.type)

          addType.rank = addSign.type
          addType.rate = addSign.rate
          this.form.type.push(addType)
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
    },
    mounted() {
      this.getDetail()
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
