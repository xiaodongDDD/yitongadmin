<template>
  <div class="column-list content">

    <el-table
      :data="tableData"
      border
      style="width: 100%">
      <el-table-column
        fixed
        prop="kj_sort"
        label="快捷栏目排序"
        width="150">
      </el-table-column>
      <el-table-column
        prop="lm_sort"
        label="栏目排序"
        width="120">
      </el-table-column>
      <el-table-column
        label="icon"
        width="">
        <template slot-scope="scope">
          <img width="60px" :src="scope.row.img" alt="">
        </template>
      </el-table-column>
      <el-table-column
        prop="name"
        label="栏目名称"
        width="">
      </el-table-column>
      <el-table-column
        label="是否栏目"
        width="120">
        <template slot-scope="scope">
          <span v-if="scope.row.is_column == 0">否</span>
          <span v-else>是</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="article_num"
        label="上架文章数"
        width="120">
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        width="100">
        <template slot-scope="scope">
          <el-button @click="editcolumn(scope)" type="text" size="small">编辑</el-button>
          <el-button v-show="scope.row.column_id != 6 && scope.row.column_id != 7 && scope.row.column_id != 5" @click="publishcolumn(scope)" type="text" size="small">发布</el-button>
        </template>
      </el-table-column>
    </el-table>


    <!--编辑栏目-->
    <el-dialog
      title="编辑栏目"
      :visible.sync="signDialogVisible"
      width="30%">
      <div class="signedit">
        <el-form ref="form" :rules="rules" :model="cform" label-width="140px">
          <el-form-item label="栏目名称" prop="name">
            <el-input v-model="cform.name" placehoder="最多可输入10个汉字"></el-input>
          </el-form-item>
          <el-form-item label="快捷栏目排序" prop="kj_sort">
            <el-input v-model="cform.kj_sort" placehoder=""></el-input>
          </el-form-item>
          <el-form-item label="快捷栏目是否展示" prop="is_show">
            <el-radio-group v-model="cform.is_show">
              <el-radio :label="'1'">是</el-radio>
              <el-radio :label="'0'">否</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="栏目排序" prop="lm_sort">
            <el-input v-model="cform.lm_sort" placehoder=""></el-input>
          </el-form-item>
          <el-form-item label="icon" prop="img">
            <upImage ref="upLoadFile" :urls="urls" v-if='isAlive'></upImage>
            <p style="line-height: 20px;">说明：请上传大小为176*176像素，格式为JPEG或者PNG的图片</p>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="saveEditColumn">保 存</el-button>
        <el-button @click="signDialogVisible = false">取 消</el-button>
      </span>
    </el-dialog>

    <!--发布-->
    <el-dialog
      :title="rData.title + '发布'"
      :visible.sync="oneDialogVisible"
      width="30%">
      <div class="signedit">
        <el-form ref="form" :model="oneform" label-width="80px">
          <el-form-item label="选择文章" prop="name">
            <span class="redicon">*</span>
            <div style="margin-bottom:20px;">
              <el-select v-model="value8" filterable placeholder="请选择或搜索" ref="selectValue" @keyup.enter.native="searchArticle">
                <el-option
                  v-for="item in options"
                  :key="item.article_id"
                  :label="item.title"
                  :value="item.article_id">
                </el-option>
              </el-select>
            </div>
            <div id="haha">
              <el-select v-model="value9" multiple placeholder="" id='noCss'>
              </el-select>
            </div>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="pushSave">保 存</el-button>
        <el-button @click="oneDialogVisible = false">取 消</el-button>
      </span>
    </el-dialog>

    <el-dialog
      title="精品专栏发布"
      :visible.sync="threeDialogVisible"
      width="30%">
      <div class="signedit">
        <el-form :model="ruleForm" :rules="rules1" ref="ruleForm" label-width="100px" class="demo-ruleForm">
          <el-form-item label="选择栏目" prop="column">
            <el-select v-model="ruleForm.column" @change="chooseColumn" placeholder="请选择栏目">
              <el-option
                v-for="item in columnList"
                :key="item.scid"
                :label="item.name"
                :value="item.scid">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="选择目录" prop="catalog" v-show="showCatalog">
            <el-select v-model="ruleForm.catalog" placeholder="请选择目录">
              <el-option
                v-for="item in catalogList"
                :key="item.sccid"
                :label="item.cname"
                :value="item.sccid">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="二级目录" prop="ml2_name">
            <el-input v-model="ruleForm.ml2_name" placeholder="最多输入20个汉字"></el-input>
          </el-form-item>
          <el-form-item label="排序" prop="sort_ml2">
            <el-input v-model="ruleForm.sort_ml2" placeholder="请输入阿拉伯数字"></el-input>
          </el-form-item>
          <el-form-item label="选择文章" prop="">
            <span class="redicon">*</span>
            <div style="margin-bottom:20px;">
              <el-select v-model="value8" filterable placeholder="请选择或搜索" ref="selectValue" @keyup.enter.native="searchArticle">
                <el-option
                  v-for="item in options"
                  :key="item.article_id"
                  :label="item.title"
                  :value="item.article_id">
                </el-option>
              </el-select>
            </div>
            <div id="haha">
              <el-select v-model="value9" multiple placeholder="" id='noCss'>
              </el-select>
            </div>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="pushSave">保存</el-button>
        <el-button @click="threeDialogVisible = false">取消</el-button>
      </span>
    </el-dialog>

    <el-dialog
      title="家庭晓电台发布"
      :visible.sync="fourDialogVisible"
      width="30%">
      <div class="signedit">
        <el-form ref="form" :model="oneform" label-width="80px">
          <el-form-item label="选择文章" prop="name">
            <div class="search-condition">
            </div>
            <div style="margin-bottom:20px;">
              <el-select v-model="value8" filterable placeholder="请选择或搜索" ref="selectValue" @keyup.enter.native="searchArticle">
                <el-option
                  v-for="item in options"
                  :key="item.article_id"
                  :label="item.title"
                  :value="item.article_id">
                </el-option>
              </el-select>
            </div>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="fourDialogVisible = false">预 览</el-button>
        <el-button @click="fourDialogVisible = false">取 消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import { columnLists, columnInfo, columnArticles, columnSave, columnPublish, columnCatalogs, columnScols } from '@/api/schoolH5'
  import { parseTime } from '@/utils/index'
  import upImage from '../upImg/columnImg1'
  import defaultHead from '../../../assets/imgs/add-stu.png'
  export default {
    name: 'columnList',
    data() {
      return {
        tableData: [],
        signDialogVisible: false,
        cform: {
          name: '',
          sindex: '',
          sShow: 0,
          index: '',
          icon: '',
          date: ''
        },
        value8: '',
        value9: [],
        values: [],
        options: [],
        hasArticle: false,
        isAlive: true,
        urls: {
          url: '',
          type: ''
        },
        rules: {
          name: [
            { required: true, message: '请选择文章', trigger: 'change' }
          ]
        },
        oneDialogVisible: false,
        twoDialogVisible: false,
        threeDialogVisible: false,
        fourDialogVisible: false,
        oneform: {
          name: ''
        },
        articleList: [],
        articles: [],
        defaultHead: defaultHead,
        rDatar: {
          title: '',
          column_id: '',
          aids: '',
          scid: '',
          sccid: '',
          ml2_name: '',
          sort_ml2: ''
        },
        rData: {
          title: '',
          column_id: '',
          aids: '',
          scid: '',
          sccid: '',
          ml2_name: '',
          sort_ml2: ''
        },
        columnList: [],
        catalogList: [],
        ruleFormr: {
          column: '',
          catalog: '',
          ml2_name: '',
          sort_ml2: ''
        },
        showCatalog: true,
        ruleForm: {
          column: '',
          catalog: '',
          ml2_name: '',
          sort_ml2: ''
        },
        rules1: {
          column: [
            { required: true, message: '请选择专栏', trigger: 'change' }
          ],
          catalog: [
            { required: true, message: '请选择目录', trigger: 'change' }
          ],
          ml2_name: [
            { required: true, message: '请选择二级目录', trigger: 'blur' }
          ],
          sort_ml2: [
            { required: true, message: '请选择二级目录', trigger: 'blur' }
          ]
        }
      }
    },
    components: {
      upImage
    },
    watch: {
      'signDialogVisible': function(news, olds) {
        if (news === false) {
          this.reload()
          this.urls.url = this.defaultHead
        }
      },
      'value8': function(news, old) {
        if (news !== '') {
          if (this.rData.column_id == 1 || this.rData.column_id == 4) {
            this.chooseArticle(news)
          } else if (this.rData.column_id == 8 || this.rData.column_id == 2) {
            this.values = []
            this.value9 = []
            for (let i in this.options) {
              if (this.options[i].article_id === news) {
                this.oneform.name = this.options[i].title
                this.value9.push(this.options[i].title)
              }
            }
            this.values.push(news)
          }  
        }
        console.log(this.values)
      }
    },
    mounted() {
      this.initData()
    },
    methods: {
      reload() {
        this.isAlive = false
        this.$nextTick(function() {
          this.isAlive = true
        })
      },
      initData() {
        const obj = {
          token: localStorage.getItem('TOKEN')
        }
        columnLists(obj)
          .then(res => {
            console.log(res)
            if (res.hasOwnProperty('response')) {
              const data = res.response
              this.tableData = data.data
            } else {
              this.$message.error(res.error_response.msg)
            }
          })
          .catch(err => {
            console.log(err)
          })
      },
      editcolumn(scope) {
        const row = scope.row
        this.signDialogVisible = true
        const obj = {
          column_id: row.column_id,
          token: localStorage.getItem('TOKEN')
        }
        columnInfo(obj).then(res => {
          // console.log(res)
          if (res.hasOwnProperty('response')) {
            const data = res.response
            data.data.create_time = parseTime(data.data.create_time, '{y}-{m}-{d}')
            this.cform = data.data
          } else {
            this.$message.error(res.error_response.msg)
          }
        }).catch(err => {
            console.log(err)
          })
      },
      saveEditColumn() {
        this.cform.img = this.$refs.upLoadFile.getUrl() !== '' ? this.$refs.upLoadFile.getUrl() : this.cform.img
        this.cform.is_show = parseInt(this.cform.is_show)
        this.cform.token = localStorage.getItem('TOKEN')
        columnSave(this.cform).then(res => {
          // console.log(res)
          if (res.hasOwnProperty('response')) {
            this.$message({
              message: '修改成功',
              type: 'success'
            })
            this.signDialogVisible = false
            this.initData()
          } else {
            this.$message.error(res.error_response.msg)
          }
        })
      },
      searchArticle() {
        const obj = {
          title: this.$refs.selectValue.query,
          token: localStorage.getItem('TOKEN')
        }
        console.log(obj)
        columnArticles(obj).then(res => {
          console.log(res)
          if (res.hasOwnProperty('response')) {
            const data = res.response
            this.options = data.data
          } else {
            this.$message.error(res.error_response.msg)
          }
        })
      },
      chooseArticle(val) {
        var val1 = this.value9
        var val2 = this.values
        if (val2.indexOf(val) === -1) {
          for (var i = 0; i < this.options.length; i++) {
            if (this.options[i].article_id === val) {
              val1.push(this.options[i].title)
              val2.push(val)
              this.value9 = val1
              this.values = val2
            }
          }
          this.value8 = ''
        } else {
          for (var j = 0; j < this.options.length; j++) {
            if (this.options[j].article_id === val) {
              val1.splice(val1.indexOf(this.options[j].title), 1)
              val2.splice(val2.indexOf(val), 1)
              this.value9 = val1
              this.values = val2
            }
          }
          this.value8 = ''
        }
      },
      chooseColumn(val) {
        this.ruleForm.catalog = ''
        const obj = {
          scid: val,
          token: localStorage.getItem('TOKEN')
        }
        columnCatalogs(obj).then(res => {
          // console.log(res)
          if (res.hasOwnProperty('response')) {
            const data = res.response
            this.catalogList = data.data
            if (this.catalogList.length == 0) {
              this.showCatalog = false
            } else {
              this.showCatalog = true
            }
          }
        })
      },
      publishcolumn(scope) {
        this.rData = this.rDatar
        this.options = []
        this.oneform.name = ''
        this.value8 = ''
        this.value9 = []
        this.values = []
        const row = scope.row
        this.rData.column_id = row.column_id
        this.rData.title = row.name
        if (row.column_id == 1 || row.column_id == 4 || row.column_id == 8) {
          this.oneDialogVisible = true
        } else if (row.column_id == 2) {
          const obj = {
            token: localStorage.getItem('TOKEN')
          }
          columnScols(obj).then(res => {
            console.log(res)
            if (res.hasOwnProperty('response')) {
              const data = res.response
              this.columnList = data.data
            }
          })
          this.threeDialogVisible = true
        } else if (row.column_id == 3) {
          this.fourDialogVisible = true
        }
      },
      pushSave() {
        const obj = {
          token: localStorage.getItem('TOKEN'),
          aids: this.values.join(","),
          column_id: this.rData.column_id,
          scid: this.ruleForm.column,
          sccid: this.ruleForm.catalog,
          ml2_name: this.ruleForm.ml2_name,
          sort_ml2: this.ruleForm.sort_ml2
        }
        // console.log(obj)
        // return false
        columnPublish(obj).then(res => {
          // console.log(res)
          if (res.hasOwnProperty('response')) {
            this.$message({
              type: 'success',
              message: '发布成功!'
            })
            this.oneDialogVisible = false
            this.threeDialogVisible = false
            this.initData()
          } else {
            this.$message.error(res.error_response.msg)
          }
        })
      },
      handleCommand(command) {
        // console.log(command)
        this.oneform.name = command
      }
    }
  }
</script>

<style scoped rel="stylesheet/scss" lang="scss">
  .searchCon{
    position: absolute;
    right: 5px;
    top: 0;
  }
  .searchIcon{
    font-size: 18px;
  }
  .search-condition{

    .searchIcon{
      position: absolute;
      right: 10px;
      top: 10px;
    }

    .articles-list{
      position: absolute;
      right: 0;
      background: #FFF;
      z-index: 1000;
      padding: 0px;
      border: 1px solid #eee;
      margin-top: 0;
      line-height: 50px;

      li{
        cursor: pointer;
        text-align: center;
        padding: 0 20px;

        &:hover{
          background-color: #ecf5ff;
          color: #66b1ff;
        }
      }
    }
  }
  .carticle{
    border: 1px solid #66b1ff;
    padding: 5px 10px;
    margin-right: 10px;

    .ccicon{
      color: red;
      font-size: 15px;
    }
  }
</style>
<style type="text/css">
  div.edui-editor-toolbarboxinner.edui-default {
    line-height: 20px;
  }
  .demo-ruleForm h4{
    text-indent: 10px;
  }
  input#noCss.el-input__inner {
  border: none;
   width: 300px;
  }
  #haha span.el-input__suffix{
    display: none;
  }
  div.el-select-dropdown.el-popper.is-multiple{
    display: none;
  }
  .redicon{
    display: block;
    position: absolute;
    color: red;
    left: -82px;
    top: 2px;
  }
  .choosed{
    box-sizing: border-box;
    border-color: transparent;
    margin: 2px 0 2px 6px;
    color: #909399;
    height: 24px;
    font-size: 12px;
    line-height: 22px;
    background-color: #f0f2f5;
  }
</style>
