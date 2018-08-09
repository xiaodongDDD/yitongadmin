<template>
  <div class="comment-list content">
    
    <div class="condition">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="姓名">
          <el-input v-model="formInline.user" placeholder=""></el-input>
        </el-form-item>
        <el-form-item label="排序">
          <el-select v-model="formInline.region" placeholder="全部">
            <el-option label="新增时间倒序" value="beijing"></el-option>
            <el-option label="文章总数" value="beijing"></el-option>
            <el-option label="被引用文章数" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">搜索</el-button>
        </el-form-item>
      </el-form>
    </div>

    <div class="label-add list-add">
      <el-button @click="isAdd=true;pageDialogVisible=true">新增</el-button>
    </div>
  
    <div class="tableDiv list-container">
      <el-table
        :data="tableData"
        border
        style="width: 100%">
        <el-table-column
          fixed
          prop="date"
          label="编号"
          width="80">
        </el-table-column>
        <el-table-column
          prop="name"
          label="文章标题"
          width="">
        </el-table-column>
        <el-table-column
          prop="province"
          label="标签"
          width="">
        </el-table-column>
        <el-table-column
          prop="city"
          label="创建时间"
          width="">
        </el-table-column>
        <el-table-column
          prop="address"
          label="创建人"
          width="">
        </el-table-column>
        <el-table-column
          prop="zip"
          label="引用栏目"
          width="">
        </el-table-column>
        <el-table-column
          prop="zip"
          label="所属目录"
          width="">
        </el-table-column>
        <el-table-column
          prop="zip"
          label="是否置顶"
          width="">
        </el-table-column>
        <el-table-column
          prop="zip"
          label="发布时间"
          width="120">
        </el-table-column>
        <el-table-column
          prop="zip"
          label="发布状态"
          width="120">
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          width="100">
          <template slot-scope="scope">
            <el-button @click="editClick(scope.row)" type="text" size="small">编辑</el-button>
            <el-button @click="deleteClick(scope.row)" type="text" size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="list-pagination">
      <el-pagination
        background
        layout="prev, pager, next"
        :total="1000">
      </el-pagination>
    </div>

    <el-dialog
      :title="isAdd === true ? '作者新增' : '作者编辑'"
      :visible.sync="pageDialogVisible"
      width="30%">
      <div class="edit-container">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="80px" class="demo-ruleForm">
          <el-form-item label="作者头像" prop="img">
            <el-input v-model="ruleForm.img"></el-input>
          </el-form-item>
          <el-form-item label="作者姓名" prop="name">
            <el-input v-model="ruleForm.name" placeholder="最多输入40个汉字"></el-input>
          </el-form-item>
          <el-form-item label="英文名" prop="ename">
            <el-input v-model="ruleForm.name" placeholder="最多输入50个字符"></el-input>
          </el-form-item>
          <el-form-item label="作者简介" prop="name">
            <el-input type="textarea" v-model="ruleForm.name" placeholder="最多输入300个汉字"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="titleDialogVisible = false">保 存</el-button>
        <el-button @click="titleDialogVisible = false">取 消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    name: 'artistList',
    data() {
      return {
        isAdd: true,
        pageDialogVisible: false,
        formInline: {
          user: '',
          region: ''
        },
        value6: '',
        value7: '',
        activeName2: 'first',
        tableData: [{
          date: '201',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        }],
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
        }
      }
    },
    methods: {
      onSubmit() {},
      handleClick() {},
      editClick(row) {
        console.log(row)
        this.isAdd = false
        this.pageDialogVisible = true
      },
      deleteClick(row) {}
    }
  }
</script>

<style scoped>

</style>
