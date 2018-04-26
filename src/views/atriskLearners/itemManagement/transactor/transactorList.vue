<template>
  <div class="center-content transactor-list">
    <my-header :msg='msg'></my-header>
    <div class="content-detail">
    	<p class="position">执行人管理</p>
      <div class="list-table">
        <el-table
          :data="tableData"
          border
          style="width: 100%">
          <el-table-column
            align="center"
            prop="onOff"
            label="项目名称"
            width="100">
          </el-table-column>
          <el-table-column
            align="center"
            prop="name"
            label="项目说明"
            width="100">
          </el-table-column>
          <el-table-column
            align="center"
            prop="userName"
            label="负责人"
            width="100">
          </el-table-column>
          <el-table-column
            align="center"
            prop="type"
            label="负责学科"
            width="60">
          </el-table-column>
          <el-table-column
            prop="schoolName"
            label="负责年级">
          </el-table-column>
          <el-table-column
            align="center"
            prop="telephone"
            label="评语"
            width="110">
          </el-table-column>
          <el-table-column
            align="center"
            label="执行人">
             <template slot-scope="scope">
              <span @click='go'>12</span>
            </template>
          </el-table-column>

          <el-table-column
            align="center" label="操作" width="">
            <template slot-scope="scope">
              <el-button
                size="mini"
                @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>

      <el-dialog
        title="提示"
        :visible.sync="centerDialogVisible"
        width="30%"
        center>
        <div class="dialogContent">
          <p>请确认是否要删除</p>
          <p>{{ userName }}账户</p>

          <p>删除后，该账户将无法登录</p>
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
 import myHeader from '../../myHeader/myHeader'
  export default {
    name: 'officialList',
    data() {
    	return {
        centerDialogVisible: false,
        userName: '',
        form: {
          name: ''
        },
        msg: {
          title1: '项目评价管理',
          title2: '执行人管理',
          flag: 1,
          path: '/itemList'
        },
        tableData: [{
          onOff: 0,
          name: '都龙族',
          userName: 'doulongzu',
          type: '学校',
          schoolName: '武宁路育才',
          telephone: '13533790697'
        }, {
          onOff: 1,
          name: '都龙族',
          userName: 'doulongzu',
          type: '运营',
          schoolName: '',
          telephone: '13533790697'
        }, {
          onOff: 0,
          name: '都龙族',
          userName: 'doulongzu',
          type: '学校',
          schoolName: '武宁路育才',
          telephone: '13533790697'
        }]
      }
    },
    components: {
      myHeader
    },  
    methods: {
      handleEdit(index, row) {
        console.log(index, row)
        this.$router.push({ path: '/transactorEdit' })
      },
      handleDelete(index, row) {
        console.log(index, row)
        this.centerDialogVisible = true
      },
      go() {
        this.$router.push({ path: '/poorStudentEdit' })
      }
    }
  }
</script>

<style scoped>
.title{
  margin-bottom: 30px;
}
</style>
