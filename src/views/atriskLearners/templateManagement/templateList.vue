<template>
  <div class="center-content template-list">
    <my-header :msg='msg'></my-header>
    <div class="content-detail">
      <p class="position">上海市普陀山叮叮当小学</p>
      <div class="list-table">
        <el-table
          :data="tableData"
          border
          style="width: 100%">
          <el-table-column
            align="center"
            prop="name"
            label="模板名称"
            width="">
          </el-table-column>
          <el-table-column
            align="center"
            prop="type"
            label="维度"
            width="">
          </el-table-column>

<<<<<<< HEAD
          <el-table-column
            align="center" label="操作" width="">
            <template slot-scope="scope">
              <el-button
                size="mini"
                @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
              <el-button
                size="mini"
                type="danger"
                @click="handleDelete(scope.$index, tname = scope.row.name)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
=======
        <el-table-column
          align="center" label="操作" width="">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, tname = scope.row.name)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="list-add">
      <router-link to="/templateAdd">
        <el-button icon="el-icon-plus">新增</el-button>
      </router-link>
    </div>
>>>>>>> ba1cf0689e63229fe66f4bc91c5cc2bda5f4f94a

      <el-dialog
        title="提示"
        :visible.sync="centerDialogVisible"
        width="30%"
        center>
        <div class="dialogContent">
          <p>请确认是否要删除</p>
          <p>{{ tname }}模板</p>

          <p>删除后，该模板相关的评价将彻底删除</p>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="centerDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="centerDialogVisible = false">确 定</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
  import myHeader from '../myHeader/myHeader'
  export default {
    name: 'templateList',
    data() {
      return {
        centerDialogVisible: false,
        tname: '',
        form: {
          name: ''
        },
        msg: {
          title1: '评价模版管理',
          title2: '',
          flag: 0,
          path: '/itemList'
        },
        tableData: [{
          name: '2018年第一学期语文所有学生补差',
          type: '成绩'
        }, {
          name: '都龙族',
          type: '成绩'
        }, {
          name: '都龙族',
          type: '成绩'
        }]
      }
    },
    components: {
      myHeader
    },  
    methods: {
      handleEdit(index, row) {
        console.log(index, row)
        this.$router.push({ path: '/templateEdit' })
      },
      handleDelete(index, row) {
        console.log(index, row)
        this.centerDialogVisible = true
      }
    }
  }
</script>

<style scoped>
  .position{
    text-indent: 0;
  }
</style>
