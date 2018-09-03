<template>
  <div class="space-list content">

    <div class="condition">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="所属期刊">
          <el-input v-model="formInline.term" placeholder="文章标题"></el-input>
        </el-form-item>
        <el-form-item label="版面分类">
          <el-input v-model="formInline.type" placeholder="标签"></el-input>
        </el-form-item>
        <el-form-item label="版面标题">
          <el-input v-model="formInline.title" placeholder="创建人"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">搜索</el-button>
        </el-form-item>
      </el-form>
    </div>

    <div class="label-add list-add">
      <el-button @click="addVersion">新增</el-button>
    </div>

    <div class="label-container list-container">
      <el-table
        :data="tableData"
        border
        style="width: 100%">
        <el-table-column
          prop="version_num"
          label="版面号"
          width="80">
        </el-table-column>
        <el-table-column
          prop="vid"
          label="所属期刊"
          width="">
        </el-table-column>
        <el-table-column
          prop="name"
          label="版面分类"
          width="">
        </el-table-column>
        <el-table-column
          prop="version_title"
          label="版面标题"
          width="">
        </el-table-column>
        <el-table-column
          prop="create_time"
          label="创建时间"
          width="">
        </el-table-column>
        <el-table-column
          prop="creator"
          label="创建人"
          width="">
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          width="100">
          <template slot-scope="scope">
            <el-button @click="editClick(scope.row)" type="text" size="small">编辑</el-button>
            <el-button @click="handleClick(scope.row)" type="text" size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <el-dialog
      :title="isAdd === true ? '新增版面' : '修改版面'"
      :visible.sync="signDialogVisible"
      width="30%">
      <div class="signedit">
        <el-form ref="form" :rules="rules" :model="cform" label-width="100px">
          <el-form-item label="所属版面号" prop="name">
            <el-input v-model="cform.version_num" placehoder="最多可输入10个汉字"></el-input>
          </el-form-item>
          <el-form-item label="所属期刊" prop="name">
            <el-select v-model="cform.scid" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.scid"
                :label="item.name"
                :value="item.scid">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="版面分类" prop="sindex">
            <el-select v-model="cform.label_id" filterable ref='searchLabel' placeholder="请选择或搜索" @keyup.enter.native="searchLabel">
              <el-option
                v-for="item in options1"
                :key="item.label_id"
                :label="item.name"
                :value="item.label_id">
              </el-option>
            </el-select>
            <el-button @click="addLabels" type="text" size="small">新增</el-button>
          </el-form-item>
          <el-form-item label="" prop="index" v-if='addLabel' @keyup.enter.native="confirmAdd">
            <el-input style='width:195px' v-model="add_label_name" placehoder=""></el-input>
            <el-button @click="deleteLabel" type="text" size="small">删除</el-button>
            <el-button @click="confirmAdd" type="text" size="small">保存</el-button>
          </el-form-item>
          <el-form-item label="版面标题" prop="index">
            <el-input v-model="cform.version_title" placehoder=""></el-input>
          </el-form-item>
          <el-form-item label="版面展示图" prop="icon">
            <upImage ref="upLoadFile" :urls="urls1" v-if='isAlive'></upImage>
          </el-form-item>
          <el-form-item label="选择文章" prop="sindex">
            <el-select v-model="cform.article_id" filterable ref='searchArtist' placeholder="请选择或搜索" @keyup.enter.native="searchArtist">
              <el-option
                v-for="item in options2"
                :key="item.article_id"
                :label="item.title"
                :value="item.article_id">
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="saveInfo">保 存</el-button>
        <el-button @click="signDialogVisible = false">取 消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import upImage from '../upImg/versionImage'
  import { versionIndexSearch, termManage, versionDetail, termList, versionLabel, versionSaveLabel, versionManage, articleSearch, versionLabelSearch } from '@/api/schoolH5'
  export default {
    name: 'spaceList',
    data() {
      return {
        tableData: [{
          vid: '',
          name: '',
          version_title: '',
          create_time: '',
          creator: '',
          version_num: ''
        }],
        formInline: {
          term: '',
          type: '',
          title: ''
        },
        addLabel: false,
        add_label_name: '',
        isAdd: true,
        signDialogVisible: false,
        cform: {
          vid: '',
          version_num: '',
          label_id: '',
          label_name: '',
          icon: '',
          date: '',
          scid: '',
          version_title: '',
          article_id: '',
          title: '',
          sccid: '',
          pid: ''
        },
        isAlive: true,
        rules: {
          name: [
            { required: true, message: '请输入栏目名称', trigger: 'blur' }
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
        urls1: {
          url: ''
        },
        options: [],
        options1: [
        {
          label_id: '',
          label_name: ''
        }],
        options2: [{
          article_id: '',
          title: ''
        }]
      }
    },
    components: {
      upImage
    },
    mounted() {
      this.initData()
    },
    methods: {
      initData() {
        const obj = {
          token: localStorage.getItem('TOKEN'),
          term: this.formInline.term,
          type: this.formInline.type,
          title: this.formInline.title
        }
        console.log(obj)
        versionIndexSearch(obj)
          .then(res => {
            if (res.hasOwnProperty('response')) {
              this.tableData = res.response.version_list
            } else {
              this.$message.error(res.error_response.msg)
            }
          })
          .catch(err => {
            console.log(err)
          })
      },
      reload() {
        this.isAlive = false
        this.$nextTick(function() {
          this.isAlive = true
        })
        console.log(1111)
      },
      addVersion() {
        this.isAdd = true
        this.signDialogVisible = true
        this.getLabel()
        this.getTerm()
      },
      addLabels() {
        this.addLabel = true
      },
      confirmAdd() {
        const obj = {
          token: localStorage.getItem('TOKEN'),
          label_name: this.add_label_name
        }
        versionSaveLabel(obj)
          .then(res => {
            if (res.hasOwnProperty('response')) {
              this.$message.success(res.response.msg)
              this.getLabel()
            } else {
              this.$message.error(res.error_response.msg)
            }
          })
          .catch(err => {
            console.log(err)
          })
      },
      deleteLabel() {
        this.add_label_name = ''
        this.addLabel = false
      },
      getLabel() {
        const obj = {
          token: localStorage.getItem('TOKEN')
        }
        versionLabel(obj)
          .then(res => {
            if (res.hasOwnProperty('response')) {
              this.options1 = res.response.version_label
            } else {
              this.$message.error(res.error_response.msg)
            }
          })
          .catch(err => {
            console.log(err)
          })
      },
      getTerm() {
        const obj = {
          token: localStorage.getItem('TOKEN')
        }
        termList(obj)
          .then(res => {
            if (res.hasOwnProperty('response')) {
              this.options = res.response.term_list
            } else {
              this.$message.error(res.error_response.msg)
            }
          })
          .catch(err => {
            console.log(err)
          })
      },
      searchArtist() {
        const obj = {
          token: localStorage.getItem('TOKEN'),
          article_title: this.$refs.searchArtist.query
        }
        articleSearch(obj)
          .then(res => {
            if (res.hasOwnProperty('response')) {
              this.options2 = res.response.article_list
            } else {
              this.$message.error(res.error_response.msg)
            }
          })
          .catch(err => {
            console.log(err)
          })
      },
      searchLabel() {
        const obj = {
          token: localStorage.getItem('TOKEN'),
          name: this.$refs.searchLabel.query
        }
        versionLabelSearch(obj)
          .then(res => {
            if (res.hasOwnProperty('response')) {
              this.options1 = res.response.label_list
            } else {
              this.$message.error(res.error_response.msg)
            }
          })
          .catch(err => {
            console.log(err)
          })
      },
      editClick(row) {
        this.getLabel()
        this.getTerm()
        console.log(row)
        this.isAdd = false
        this.signDialogVisible = true
        const obj = {
          token: localStorage.getItem('TOKEN'),
          sccid: row.sccid
        }
        versionDetail(obj)
          .then(res => {
            if (res.hasOwnProperty('response')) {
              // this.options = res.response.term_list
              // this.value = res.response.version_detail[0].scid
              this.urls1.url = res.response.version_detail[0].version_image
              // this.options1[0].label_id = res.response.version_detail[0].label_id
              // this.options1[0].label_name = res.response.version_detail[0].label_name
              this.options2[0].title = res.response.version_detail[0].title
              this.options2[0].article_id = res.response.version_detail[0].article_id
              this.cform = res.response.version_detail[0]
            } else {
              this.$message.error(res.error_response.msg)
            }
          })
          .catch(err => {
            console.log(err)
          })
      },
      onSubmit() {
        this.initData()
      },
      saveInfo() {
        const obj = {
          token: localStorage.getItem('TOKEN'),
          sccid: this.cform.sccid,
          version_num: this.cform.version_num,
          scid: this.cform.scid,
          label_id: this.cform.label_id,
          title: this.cform.version_title,
          cover: this.$refs.upLoadFile.getUrl() === '' ? this.cform.version_image : this.$refs.upLoadFile.getUrl(),
          article_id: this.cform.article_id,
          pid: this.cform.pid
        }
        versionManage(obj)
          .then(res => {
            if (res.hasOwnProperty('response')) {
              this.signDialogVisible = false
              this.initData()
              this.$message.success(res.response.msg)
            } else {
              this.$message.error(res.error_response.msg)
            }
          })
          .catch(err => {
            console.log(err)
          })
      },
      handleClick(row) {
        console.log(row)
        this.$confirm('此操作将永久删除该版面, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
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
      }
    },
    watch: {
      'signDialogVisible': function(news, olds) {
        if (news === false) {
          this.cform.version_num = ''
          this.cform.label_id = ''
          this.cform.label_name = ''
          this.cform.scid = ''
          this.cform.version_title = ''
          this.cform.article_id = ''
          this.cform.title = ''
          this.cform.sccid = ''
          this.cform.pid = ''
          this.urls1.url = ''
          this.options1 = [{ label_id: '', label_name: '' }],
          this.options2 = [{ article_id: '', title: '' }],
          this.options = []
          this.reload()
        }
      }
    }
  }
</script>

<style scoped>

</style>
