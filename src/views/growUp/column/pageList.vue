<template>
  <div class="page-list content">

    <div class="label-add list-add">
      <el-button @click="isAdd=true;signDialogVisible=true">新增</el-button>
    </div>

    <div class="label-container list-container">
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
          label="所属栏目"
          width="">
        </el-table-column>
        <el-table-column
          prop="province"
          label="专栏名称"
          width="">
        </el-table-column>
        <el-table-column
          prop="city"
          label="目录数量"
          width="">
        </el-table-column>
        <el-table-column
          prop="address"
          label="二级目录数量"
          width="">
        </el-table-column>
        <el-table-column
          prop="zip"
          label="文章数量"
          width="">
        </el-table-column>
        <el-table-column
          prop="zip"
          label="创建者"
          width="">
        </el-table-column>
        <el-table-column
          prop="zip"
          label="创建时间"
          width="">
        </el-table-column>
        <el-table-column
          prop="zip"
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
            <el-input v-model="cform.name" placehoder="最多可输入10个汉字"></el-input>
          </el-form-item>
          <el-form-item label="专栏图片" prop="icon">
            <el-input v-model="cform.icon" placehoder=""></el-input>
            <p>说明：请上传大小为176*176像素，格式为JPEG或者PNG的图片</p>
          </el-form-item>
          <el-form-item label="专栏介绍" prop="sindex">
            <el-input v-model="cform.sindex" placehoder=""></el-input>
          </el-form-item>
          <el-form-item label="目录" prop="index">
            <el-input v-model="cform.index" placehoder=""></el-input>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="signDialogVisible = false">保 存</el-button>
        <el-button @click="signDialogVisible = false">取 消</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>
  export default {
    name: 'pageList',
    data() {
      return {
        tableData: [{
          date: '201',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        }],
        isAdd: true,
        signDialogVisible: false,
        cform: {
          name: '',
          sindex: '',
          sShow: 0,
          index: '',
          icon: '',
          date: ''
        },
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
        }
      }
    },
    methods: {
      editClick(row) {
        console.log(row)
        this.isAdd = false
        this.signDialogVisible = true
      },
      handleClick(row) {
        console.log(row)
        this.$confirm('此操作将永久删除该栏目, 是否继续?', '提示', {
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
    }
  }
</script>

<style scoped>

</style>
