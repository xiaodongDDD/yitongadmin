<template>
  <div class="label-list content">

    <div class="label-add list-add">
      <el-button @click="isAdd=true;signDialogVisible=true">新增</el-button>
    </div>

    <div class="label-container list-container">
      <el-table
        :data="tableData"
        border
        style="width: 100%">
        <el-table-column
          prop="label_id"
          label="编号"
          width="100">
        </el-table-column>
        <el-table-column
          prop="name"
          label="标签名称">
        </el-table-column>
        <el-table-column
          prop="creator"
          label="创建人"
          width="180">
        </el-table-column>
        <el-table-column
          prop="times"
          label="创建时间">
        </el-table-column>
        <el-table-column
          prop="refs"
          label="已被使用次数"
          width="120">
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          width="200">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="editLabel(scope)">修改</el-button>
            <el-button type="text" size="small" @click="deleteSign(scope)">删除</el-button>
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
            <span>{{ currentId }}</span>
          </el-form-item>
          <el-form-item label="标签名称" prop="name">
            <el-input v-model="form.name" placehoder="最多可输入10个汉字"></el-input>
          </el-form-item>
          <el-form-item label="温馨提示：">
            <span>标签名称不可重复</span>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancelAdd">取 消</el-button>
        <el-button type="primary" @click="confirmAdd">确 定</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>
  import { getGrowLabel, handleGrowLabel, deleteGrowLabel } from '@/api/schoolH5'
  import { parseTime } from '@/utils/index'
  export default {
    name: 'labelList',
    data() {
      return {
        tableData: [],
        signDialogVisible: false,
        isAdd: false,
        currentId: '',
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
    mounted() {
      this.initData()
    },
    methods: {
      initData() {
        const obj = {
          token: localStorage.getItem('TOKEN'),
          page: 1
        }
        getGrowLabel(obj)
          .then(res => {
            console.log(res)
            if (res.hasOwnProperty('response')) {
              for (var i = 0; i < res.response.label_list.length; i++) {
                res.response.label_list[i].times = parseTime(res.response.label_list[i].create_time, '{y}-{m}-{d}')
              }
              this.tableData = res.response.label_list
            } else {
              this.$message.error(res.error_response.msg)
            }
          })
          .catch(err => {
            console.log(err)
          })
      },
      // 编辑
      editLabel(scope) {
        console.log(scope)
        this.currentId = scope.row.label_id || ''
        this.form.name = scope.row.name
        this.isAdd = false
        this.signDialogVisible = true
      },
      // 确认新增
      confirmAdd() {
        const obj = {
          token: localStorage.getItem('TOKEN'),
          label_id: this.currentId,
          name: this.form.name
        }
        handleGrowLabel(obj)
          .then(res => {
            if (res.hasOwnProperty('response')) {
              this.$message.success(res.response.msg)
              this.initData(1)
              this.signDialogVisible = false
            } else {
              this.$message.error(res.error_response.msg)
            }
          })
      },
      // 取消新增
      cancelAdd() {
        this.signDialogVisible = false
        this.form.name = ''
      },
      // 删除
      deleteSign(scope) {
        this.$confirm('确认删除该标签?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
          .then(() => {
            const obj = {
              token: localStorage.getItem('TOKEN'),
              label_id: scope.row.label_id
            }
            deleteGrowLabel(obj)
              .then(res => {
                if (res.hasOwnProperty('response')) {
                  this.$message.success(res.response.msg)
                  this.initData(1)
                  this.$message.success(res.response.msg)
                } else {
                  this.$message.error(res.error_response.msg)
                }
              })
              .catch(err => {
                console.log(err)
              })
          })
          .catch(() => {
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
