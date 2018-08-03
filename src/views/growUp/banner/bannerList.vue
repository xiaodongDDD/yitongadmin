<template>
  <div class="banner-list content">

    <div class="banner-switch">
      <el-button @click="toMajor" v-bind:class="{'active': isMajor}">主banner</el-button>
      <el-button @click="notMajor" v-bind:class="{'active': !isMajor}">广告位banner</el-button>
    </div>

    <div class="banner-add list-add">
      <el-button @click="editDialogVisible=true;isAdd=true">新增</el-button>
    </div>

    <div class="banner-container list-container">
      <div class="major-banner">
        <el-table
          :data="table"
          border
          style="width: 100%">
          <el-table-column
            type="index"
            label="排序"
            width="100">
          </el-table-column>
          <el-table-column
            prop="img"
            label="图片"
            width="180">
          </el-table-column>
          <el-table-column
            prop="title"
            label="标题">
          </el-table-column>
          <el-table-column
            width="120"
            label="是否展示标题">
            <template slot-scope="scope">
              <el-switch
                v-model="scope.row.showTitle"
                @change="getTitle(scope)">
              </el-switch>
            </template>
          </el-table-column>
          <el-table-column
            prop="href"
            label="链接">
          </el-table-column>
          <el-table-column
            label="编辑"
            width="120">
            <template slot-scope="scope">
              <el-button type="text" @click="editBanner(scope)" size="small">编辑</el-button>
              <el-button type="text" size="small" @click="deleteBanner(scope)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>

    <el-dialog
      :title="isAdd === true ? '新增banner' : '修改banner'"
      :visible.sync="editDialogVisible"
      width="30%">
      <div class="edit-container">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px" class="demo-ruleForm">
          <el-form-item label="编号" prop="index" v-show="!isAdd">
            <span>{{ruleForm.index}}</span>
          </el-form-item>
          <el-form-item label="标题" prop="name">
            <el-input v-model="ruleForm.name" placeholder="最多输入20个汉字"></el-input>
          </el-form-item>
          <el-form-item label="标题是否展示" prop="showTitle">
            <el-radio-group v-model="ruleForm.showTitle">
              <el-radio label="1">是</el-radio>
              <el-radio label="0">否</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="展示排序" prop="sort">
            <el-input v-model="ruleForm.sort"></el-input>
          </el-form-item>
          <el-form-item label="图片" prop="img">
            <el-input v-model="ruleForm.img"></el-input>
          </el-form-item>
          <el-form-item label="链接" prop="href">
            <el-input v-model="ruleForm.href"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary">保存</el-button>
            <el-button>取消</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-dialog>

    <el-dialog
      title="是否展示标题"
      :visible.sync="titleDialogVisible"
      width="30%">
      <span>标题开启/关闭后app端展示如下图所示，请确认是否开启/关闭？</span>
      <span slot="footer" class="dialog-footer">
      <el-button @click="titleDialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="titleDialogVisible = false">确 定</el-button>
    </span>
    </el-dialog>

  </div>
</template>

<script>
  export default {
    name: 'bannerList',
    data() {
      return {
        isMajor: true,
        isAdd: true,
        table: [],
        ruleForm: {
          index: 1,
          name: '',
          showTitle: '0',
          img: '',
          sort: '',
          href: 'hao123.com'
        },
        rules: {
          name: [
            { required: true, message: '请输入活动名称', trigger: 'blur' },
            { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
          showTitle: [
            { required: true, message: '请选择是否展示标题', trigger: 'change' }
          ],
          sort: [
            { required: true, message: '请输入展示排序', trigger: 'blur' }
          ],
          href: [
            { required: true, message: '请输入链接', trigger: 'blur' }
          ],
          img: [
            { required: true, message: '请选择图片', trigger: 'blur' }
          ]
        },
        table1: [
          {
            bannerId: '101',
            img: '',
            title: '不知如何教育孩子家长怎么办',
            showTitle: true,
            href: 'www.hao123.com'
          }
        ],
        table2: [
          {
            bannerId: '102',
            img: '',
            title: '学霸就是这么任性',
            showTitle: false,
            href: 'www.hao123.com'
          }
        ],
        titleDialogVisible: false,
        editDialogVisible: false,
        titleData: {
          bannerId: '',
          showTitle: ''
        }
      }
    },
    mounted() {
      this.table = this.table1
      this.initData()
    },
    methods: {
      // 切换banner列表
      toMajor() {
        this.isMajor = true
        this.table = this.table1
      },
      notMajor() {
        this.isMajor = false
        this.table = this.table2
      },
      // 初始化数据
      initData() {},
      // 获取标题信息
      getTitle(scope) {
        const row = scope.row
        this.titleData.bannerId = row.bannerId
        this.titleData.showTitle = row.showTitle
        this.titleDialogVisible = true
      },
      // 编辑
      editBanner(scope) {
        console.log(scope)
        this.isAdd = false
        this.editDialogVisible = true
      },
      // 删除
      deleteBanner(scope) {
        console.log(scope)
        this.$confirm('此操作将永久删除该banner, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      }
    }
  }
</script>

<style scoped rel="stylesheet/scss" lang="scss">
  .el-button.active{
    color: #409EFF;
    border-color: #c6e2ff;
    background-color: #ecf5ff;
  }
</style>
