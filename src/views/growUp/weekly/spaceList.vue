<template>
  <div class="space-list content">

    <div class="label-add list-add">
      <el-button @click="isAdd=true;signDialogVisible=true">新增</el-button>
    </div>

    <div class="label-container list-container">
      <el-table
        :data="tableData"
        border
        style="width: 100%">
        <el-table-column
          prop="name"
          label="所属期刊"
          width="">
        </el-table-column>
        <el-table-column
          fixed
          prop="date"
          label="版面号"
          width="80">
        </el-table-column>
        <el-table-column
          prop="province"
          label="版面分类"
          width="">
        </el-table-column>
        <el-table-column
          prop="city"
          label="版面标题"
          width="">
        </el-table-column>
        <el-table-column
          prop="zip"
          label="创建时间"
          width="">
        </el-table-column>
        <el-table-column
          prop="zip"
          label="创建者"
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
            <el-input v-model="cform.name" placehoder="最多可输入10个汉字"></el-input>
          </el-form-item>
          <el-form-item label="所属期刊" prop="name">
            <el-select v-model="value" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="版面分类" prop="sindex">
            <el-input v-model="cform.sindex" placehoder=""></el-input>
          </el-form-item>
          <el-form-item label="版面标题" prop="index">
            <el-input v-model="cform.index" placehoder=""></el-input>
          </el-form-item>
          <el-form-item label="版面展示图" prop="icon">
            <el-input v-model="cform.icon" placehoder=""></el-input>
            <p>说明：请上传大小为176*176像素，格式为JPEG或者PNG的图片</p>
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
    name: 'spaceList',
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
        },
        options: [{
          value: '选项1',
          label: '黄金糕'
        }, {
          value: '选项2',
          label: '双皮奶'
        }, {
          value: '选项3',
          label: '蚵仔煎'
        }, {
          value: '选项4',
          label: '龙须面'
        }, {
          value: '选项5',
          label: '北京烤鸭'
        }],
        value: ''
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
    }
  }
</script>

<style scoped>

</style>
