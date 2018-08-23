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
        prop="province"
        label="icon"
        width="">
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
          <el-button @click="publishcolumn(scope)" type="text" size="small">发布</el-button>
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
      title="听见好书发布"
      :visible.sync="oneDialogVisible"
      width="30%">
      <div class="signedit">
        <el-form ref="form" :rules="rules" :model="oneform" label-width="80px">
          <el-form-item label="选择文章" prop="name">
            <div class="search-condition">
              <el-input v-model="oneform.name" placehoder="请输入文章标题"></el-input>
              <i class="el-icon-search el-icon--right searchIcon" @click="getArticle"></i>
              <ul class="articles-list" v-show="hasArticle">
                <li v-for="(item, index) in articleList" @click="checkArticle(index, item.article_id, item.title)">{{ item.title }}</li>
              </ul>
            </div>
          </el-form-item>
          <el-form-item>
            <span class="carticle" v-for="(item, index) in articles">{{ item.title }}<i class="el-icon-close el-icon--right ccicon" @click="deleteCarticle(index)"></i></span>
          </el-form-item>
          <el-form-item label="是否置顶" prop="sShow">
            <el-radio-group v-model="oneform.sShow">
              <el-radio :label="1">是</el-radio>
              <el-radio :label="0">否</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="展示图" prop="icon">
            <el-input v-model="oneform.icon" placehoder=""></el-input>
            <p>说明：请上传大小为176*176像素，格式为JPEG或者PNG的图片</p>
          </el-form-item>
          <el-form-item label="展示标题" prop="index">
            <el-input v-model="oneform.index" placehoder="最多输入20个汉子"></el-input>
          </el-form-item>
          <el-form-item label="发布时间" prop="date">
            <el-input v-model="oneform.date" placehoder=""></el-input>
          </el-form-item>
          <el-form-item label="预览地址" prop="index">
            <el-input v-model="oneform.index" placehoder=""></el-input>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="signDialogVisible = false">预 览</el-button>
        <el-button @click="signDialogVisible = false">取 消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import { columnLists, columnInfo, columnArticles, columnSave } from '@/api/schoolH5'
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
        hasArticle: false,
        isAlive: true,
        urls: {
          url: '',
          type: ''
        },
        rules: {
          name: [
            { required: true, message: '请输入栏目名称', trigger: 'change' }
          ],
          sindex: [
            { required: true, message: '请输入快捷栏目排序', trigger: 'blur' }
          ],
          sShow: [
            { required: true, message: '请选择是否显示快捷栏目', trigger: 'change' }
          ],
          index: [
            { required: true, message: '请输入栏目排序', trigger: 'blur' }
          ],
          icon: [
            { required: true, message: '请选择栏目icon', trigger: 'change' }
          ],
          date: [
            { required: true, message: '请选择发布时间', trigger: 'change' }
          ]
        },
        oneDialogVisible: false,
        oneform: {
          name: '',
          sindex: '',
          sShow: 0,
          index: '',
          icon: '',
          date: ''
        },
        articleList: [],
        articles: [],
        defaultHead: defaultHead
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
        columnLists(obj).then(res => {
          console.log(res)
          if (res.hasOwnProperty('response')) {
            const data = res.response
            this.tableData = data.data
          }
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
          } else {
            this.$message.error(res.error_response.msg)
          }
        })
      },
      getArticle() {
        const obj = {
          token: localStorage.getItem('TOKEN'),
          title: this.oneform.name
        }
        columnArticles(obj).then(res => {
          console.log(res)
          if (res.hasOwnProperty('response')) {
            const data = res.response
            this.articleList = data.data
            this.hasArticle = true
          }
        })
      },
      checkArticle(index, id, title) {
        this.oneform.name = title
        this.articles.push(this.articleList[index])
        console.log(this.articles)
        this.hasArticle = false
      },
      deleteCarticle(index) {
        console.log(index)
      },
      publishcolumn(scope) {
        console.log(scope)
        this.oneform.name = ''
        this.oneDialogVisible = true
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
