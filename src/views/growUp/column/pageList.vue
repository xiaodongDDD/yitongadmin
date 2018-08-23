<template>
  <div class="page-list content">

    <div class="label-add list-add">
      <el-button @click="addColumn">新增</el-button>
    </div>

    <div class="label-container list-container">
      <el-table
        :data="tableData"
        border
        style="width: 100%">
        <el-table-column
          fixed
          prop="scid"
          label="编号"
          width="80">
        </el-table-column>
        <el-table-column
          prop="column_name"
          label="所属栏目"
          width="">
        </el-table-column>
        <el-table-column
          prop="name"
          label="专栏名称"
          width="">
        </el-table-column>
        <el-table-column
          prop="catalogs"
          label="目录数量"
          width="">
        </el-table-column>
        <el-table-column
          prop="catalogs_2"
          label="二级目录数量"
          width="">
        </el-table-column>
        <el-table-column
          prop="articles"
          label="文章数量"
          width="">
        </el-table-column>
        <el-table-column
          prop="creator"
          label="创建者"
          width="">
        </el-table-column>
        <el-table-column
          prop="create_time"
          label="创建时间"
          width="">
        </el-table-column>
        <el-table-column
          prop="status"
          label="状态"
          width="120">
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
      :title="isAdd === true ? '新增栏目' : '修改栏目'"
      :visible.sync="signDialogVisible"
      width="30%">
      <div class="signedit">
        <el-form ref="form" :rules="rules" :model="cform" label-width="80px">
          <el-form-item label="专栏名称" prop="name">
            <el-input v-model="cform.name" placehoder="最多可输入30个汉字"></el-input>
          </el-form-item>
          <el-form-item label="专栏图片" prop="img">
            <upImage ref="upLoadFile" :urls="urls" v-if='isAlive'></upImage>
            <p style="line-height: 20px;">说明：请上传大小为176*176像素，格式为JPEG或者PNG的图片</p>
          </el-form-item>
          <el-form-item label="专栏介绍" prop="introduce">
            <el-input type="textarea" v-model="cform.introduce" placehoder=""></el-input>
          </el-form-item>
          <el-form-item label="目录" prop="catalogs">
            <span class="catalogs" v-for="(item, index) in cform.catalogList">
              <el-input class="catalog" v-model="item.name" placehoder=""></el-input>
              <i class="el-icon-close el-icon--right cataDle" @click="delCatalog(index)"></i>
            </span>
            <el-button icon="el-icon-plus" @click="addCatalog">新增</el-button>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="savePage">保 存</el-button>
        <el-button @click="signDialogVisible = false">取 消</el-button>
      </span>
    </el-dialog>
    
    <div class="list-pagination">
      <el-pagination
        background
        layout="prev, pager, next"
        @current-change="handleCurrentChange"
        :page-count="pages.pageAll">
      </el-pagination>
    </div>
  </div>
</template>

<script>
  import { pageList, pageSave, pageInfo, pageDelete } from '@/api/schoolH5'
  // import { parseTime } from '@/utils/index'
  import upImage from '../upImg/columnImg1'
  import defaultHead from '../../../assets/imgs/add-stu.png'
  export default {
    name: 'pageList',
    data() {
      return {
        defaultHead: defaultHead,
        tableData: [],
        isAdd: true,
        signDialogVisible: false,
        isAlive: true,
        urls: {
          url: '',
          type: ''
        },
        cform: {},
        cformr: {
          name:"",
          img:"",
          introduce:"",
          catalogs:[],
          catalogList: []
        },
        scid: '',
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
        pages: {}
      }
    },
    components: {
      upImage
    },
    watch: {
      'signDialogVisible': function(news, olds) {
        if (news === false) {
          this.reload()
          this.cform = this.cformr
          this.urls.url = this.defaultHead
        }
      }
    },
    mounted() {
      this.initData(1)
      this.cform = this.cformr
    },
    methods: {
      reload() {
        this.isAlive = false
        this.$nextTick(function() {
          this.isAlive = true
        })
      },
      initData(page) {
        const obj = {
          token: localStorage.getItem('TOKEN'),
          // pageSize: 2,
          page: page
        }
        pageList(obj).then(res => {
          // console.log(res)
          if (res.hasOwnProperty('response')) {
            const data = res.response.data
            this.tableData = data.rows
            this.pages = data.pages
          } else {
            this.$message.error(res.error_response.msg)
          }
        })
      },
      handleCurrentChange(val) {
        this.initData(val)
        this.pages.page = val
      },
      delCatalog(index) {
        // console.log(index)
        this.$confirm('此操作将对app端展示造成影响，请谨慎删除?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.cform.catalogList.splice(index, 1)
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })        
      },
      addCatalog() {
        const catalog = {
          sccid: "", 
          name: ""
        }
        this.cform.catalogList.push(catalog)
      },
      addColumn() {
        this.isAdd=true
        this.signDialogVisible=true
        this.scid=''
        this.cform = this.cformr
      },
      editClick(row) {
        this.isAdd = false
        const obj = {
          scid: row.scid,
          token: localStorage.getItem('TOKEN')
        }
        this.scid = row.scid
        pageInfo(obj).then(res => {
          // console.log(res)
          if (res.hasOwnProperty('response')) {
            const data = res.response.data
            this.cform = data
            this.cform.catalogList = data.catalogs
            this.urls.url = data.img
            this.signDialogVisible = true
          } else {
            this.$message.error(res.error_response.msg)
          }
        })
      },
      savePage() {
        this.cform.scid = this.scid
        this.cform.img = this.$refs.upLoadFile.getUrl() !== '' ? this.$refs.upLoadFile.getUrl() : this.cform.img
        this.cform.catalogs = JSON.stringify(this.cform.catalogList)
        this.cform.token = localStorage.getItem('TOKEN')
        pageSave(this.cform).then(res => {
          console.log(res)
          if (res.hasOwnProperty('response')) {
            this.$message({
              type: 'success',
              message: '保存成功!'
            })
            this.signDialogVisible = false
            this.initData(this.pages.page)
          } else {
            this.$message.error(res.error_response.msg)
          }
        })
      },
      handleClick(row) {
        console.log(row)
        const obj = {
          scid: row.scid,
          token: localStorage.getItem('TOKEN')
        }
        this.$confirm('此操作将永久删除该栏目, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          pageDelete(obj).then(res => {
            // console.log(res)
            if (res.hasOwnProperty('response')) {
              this.$message({
                type: 'success',
                message: '删除成功!'
              })
              this.initData(this.pages.page)
            } else {
              this.$message.error(res.error_response.msg)
            }
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
      }
    }
  }
</script>

<style scoped rel="stylesheet/scss" lang="scss">
  .catalogs{
    position: relative;
    display: block;
    margin-bottom: 10px;

    .cataDle{
      position: absolute;
      top: 12px;
      right: 10px;
      font-size: 18px;
      cursor: pointer;
    }
  }
</style>
