<template>
  <div class="center-content template-edit">
    <my-header :msg='msg'></my-header>
    <div class="content-detail">
      <p class="position">编辑评价模板</p>

      <div class="edit-form">
        <el-form ref="form" :model="form" label-width="100px" :rules="rules">
          <el-form-item label="模板名称：">
            <el-input v-model="form.name"></el-input>
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
                <el-input class="add-dimen" placeholder="请输入维度名" v-model="addSignType"></el-input>
                <i class="el-icon-check" @click="addSignList"></i>
                <i class="el-icon-close" @click="isAddSign = false"></i>
              </div>
            </div>
          </el-form-item>

          <div class="" v-for="(bItem, index1) in form.signList">
            <el-form-item class="big-label" label-width="auto" :label="bItem.sign"></el-form-item>
            <el-form-item label="指标名称：">
              <div class="sign-list" v-for="(item,index2) in bItem.target">
                <el-input placeholder="" v-model="item.type"></el-input>
                <i class="el-icon-circle-close-outline type-icon" @click="removeTarget(index1, index2)"></i>
                <span class="ratetxt">占比</span>
                <el-input class="right-in" v-model="item.rate"></el-input>
              </div>
              <div class="sign-list">
                <el-button class="item-plus" icon="el-icon-plus" @click="addItem1(index1)">新增</el-button>
              </div>
            </el-form-item>

            <el-form-item label="评价等级：">
              <div class="sign-list" v-for="(item,index2) in bItem.rank">
                <el-input placeholder="" v-model="item.type"></el-input>
                <i class="el-icon-circle-close-outline type-icon" @click="removeRank(index1, index2)"></i>
                <el-input class="right-in" v-model="item.rate"></el-input>
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
  export default {
    name: 'templateEdit',
    data() {
      var checkSign = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('维度名称不能为空'))
        }
        if (value.length > 20) {
          return callback(new Error('维度名称过长'))
        }
      }
      return {
        form: {
          name: '2018年第一学期语文所有学生补差',
          type: ['成绩', '态度'],
          signList: [{ sign: '成绩空的房阿里维度：', type: '成绩', rate: '40%', target: [{ type: '基础', rate: '30%' }, { type: '阅读', rate: '20%' }, { type: '作文', rate: '30%' }], rank: [{ type: '思维', rate: '30%' }, { type: '礼仪', rate: '20%' }] },
            { sign: '态度维度：', type: '态度', rate: '60%', target: [{ type: '思想', rate: '30%' }], rank: [{ type: '优秀', rate: '30%' }] }],
          status: 0
        },
        msg: {
          title1: '评价模版管理',
          title2: '编辑评价模版管理',
          flag: 1,
          path: '/templateList'
        },
        isAddSign: false,
        addSignType: '',
        rules: {
          type: [
            { validator: checkSign, trigger: 'blur' }
          ]
        }
      }
    },
    components: {
      myHeader
    },
    methods: {
      saveUser() {
        this.$router.push({ path: '/accountList' })
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
          rank: [{ type: '', rate: '' }]
        }
        if (this.addSignType !== '' && this.addSignType.length <= 20) {
          addSign.type = this.addSignType
          addSign.sign = this.addSignType + '维度：'
          this.form.signList.push(addSign)
          this.isAddSign = false
          this.addSignType = ''
          this.form.type.push(addSign.type)
        }
      },
      addItem1(index) {
        const str = { type: '', rate: '' }
        this.form.signList[index].target.push(str)
      },
      addItem2(index) {
        const str = { type: '', rate: '' }
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
