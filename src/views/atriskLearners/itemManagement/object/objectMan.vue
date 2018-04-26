<template>
  <div class="center-content object-man">
      <my-header :msg='msg'></my-header>
      <div class="content-detail">
        <div class="title"><span class="officialMan">学困生辅导评价管理</span><span class="goback">返回</span></div>
      <div class="smallTitle">
        <span class='manName'>管理员{{}}</span>
        <span class="num">负责人{{}}</span>
      </div>
      <div class="list-table">
        <el-table
          :data="tableData"
          border
          style="width: 100%">
          <el-table-column
            align="center"
            prop="onOff"
            label="评价对象"
            width="100">
          </el-table-column>
          <el-table-column
            align="center"
            prop="name"
            label="所属学科"
            width="100">
          </el-table-column>
          <el-table-column
            align="center"
            prop="userName"
            label="所属班级"
            width="100">
          </el-table-column>
          <el-table-column
            align="center"
            prop="type"
            label="评价模块"
             >
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
          <p>{{ userName }}执行人</p>
          <p>删除后，该执行人及其执行范围讲彻底删除</p>
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
    name: 'objectMan',
    data() {
    	 return {
        centerDialogVisible: false,
        userName: '',
        form: {
          name: ''
        },
        msg: {
          title1: '评价项目管理',
          title2: '评价对象管理',
          flag: 1,
          path: '/itemList'
        },
        tableData: [{
          onOff: 0,
          name: '都龙族',
          userName: 'doulongzu',
          type: '学校'
        }, {
          onOff: 1,
          name: '都龙族',
          userName: 'doulongzu',
          type: '运营'
        }, {
          onOff: 2,
          name: '都龙族',
          userName: 'doulongzu',
          type: '运营'
        }]
      }
    },
    components: {
      myHeader
    }, 
    methods: {
      handleEdit(index, row) {
        console.log(index, row)
        this.$router.push({ path: '/exectorEdit' })
      },
      handleDelete(index, row) {
        console.log(index, row)
        this.centerDialogVisible = true
      }
    }
  }
</script>

<style scoped>
.title {
  width: 100%;
  height: 30px;
  overflow: hidden;
  margin-bottom: 30px;
  margin-top: 10px;
}
.officialMan {
   float: left;
   height: 30px;
   line-height: 30px;
   display: inline-block;
}
.goback {
  float: right;
  height: 30px;
  line-height: 30px;
  display: inline-block;
}
.smallTitle {
  margin-bottom: 10px;
}
.manName {
  font-size: 14px;
}
.num {
    font-size: 14px;
}
</style>
