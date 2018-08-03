<template>
  <div class="label-list content">

    <div class="label-add list-add">
      <el-button>新增</el-button>
    </div>

    <div class="label-container list-container">
      <el-table
        :data="tableData"
        border
        style="width: 100%">
        <el-table-column
          type="index"
          label="编号"
          width="100">
        </el-table-column>
        <el-table-column
          prop="signName"
          label="标签名称">
        </el-table-column>
        <el-table-column
          prop="name"
          label="创建人"
          width="180">
        </el-table-column>
        <el-table-column
          prop="date"
          label="创建时间">
        </el-table-column>
        <el-table-column
          prop="name"
          label="已被使用次数"
          width="120">
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          width="200">
          <template slot-scope="scope">
            <el-button type="text" size="small">修改</el-button>
            <el-button type="text" size="small" @click="deleteSign">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <el-dialog
      :title="isAdd === true ? '新增标签' : '修改标签'"
      :visible.sync="signDialogVisible"
      width="30%">
      <div class="signedit">
        <el-form ref="form" :rules="rules" :model="form" label-width="100px">
          <el-form-item label="编号" v-show="!isAdd">
            <span>{{ form.index }}</span>
          </el-form-item>
          <el-form-item label="活动名称" prop="name">
            <el-input v-model="form.name" placehoder="最多可输入10个汉字"></el-input>
          </el-form-item>
          <el-form-item label="温馨提示：">
            <span>标签名称不可重复</span>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="signDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="signDialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>
  export default {
    name: 'labelList',
    data() {
      return {
        tableData: [{
          signName: '大事件',
          date: '2016-05-02',
          name: '王小虎'
        }, {
          signName: '知天下',
          date: '2016-05-04',
          name: '王小虎'
        }],
        signDialogVisible: false,
        isAdd: false,
        form: {
          index: 1,
          name: ''
        },
        rules: {
          name: [
            { required: true, message: '请输入标签名称', trigger: 'blur' },
            { min: 3, max: 10, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ]
        }
      }
    },
    methods: {
      // 删除
      deleteSign() {
        this.$confirm('当前文章已被123篇文章引用，不可删除！', '提示', {
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
