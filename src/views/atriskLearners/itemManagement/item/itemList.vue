<template>
  <div class="center-content item-list">
  	<div class="schoolName"><span class='schools'>上海市普陀区武宁路小学</span><span class='change' @click='change'>切换</span></div>
    <div class="list-table">
      <el-table
        :data="tableData"
        border
        style="width: 100%">
        <el-table-column
          align="center"
          prop="onOff"
          label="账户状态"
          width="100">
          <template slot-scope="scope">
            <el-dropdown v-if="scope.row.onOff === 0" @command="handleCommand(scope.$index)">
              <el-button size="mini">
                启用<i class="el-icon-caret-bottom el-icon--right"></i>
              </el-button>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>停用</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
            <el-dropdown v-else @command="handleCommand(scope.$index)">
              <el-button size="mini">
                停用<i class="el-icon-caret-bottom el-icon--right"></i>
              </el-button>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>启用</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
                <!-- <el-select v-model="value" @change='haha(scope.row.onOff)' placeholder="请选择">
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select> -->

          </template>
        </el-table-column>
        <el-table-column
          align="center"
          prop="name"
          label="姓名"
          width="100">
        </el-table-column>
        <el-table-column
          align="center"
          prop="userName"
          label="用户名"
          width="100">
        </el-table-column>
        <el-table-column
          align="center"
          prop="type"
          label="类型"
          width="60">
        </el-table-column>
        <el-table-column
          prop="schoolName"
          label="学校名称">
        </el-table-column>
        <el-table-column
          align="center"
          prop="telephone"
          label="手机号"
          width="110">
        </el-table-column>
        <el-table-column
          prop="email"
          label="邮箱">
        </el-table-column>

        <el-table-column
          align="center" label="操作" width="">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, userName = scope.row.name)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <div class="list-add">
      <router-link to="/itemAdd">
        <el-button icon="el-icon-plus">新增</el-button>
      </router-link>
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
</template>

<script>
  export default {
    name: 'itemList',
    data() {
    	return {
        centerDialogVisible: false,
        userName: '',
        form: {
          name: ''
        },
        // options: [{
        //   value: '选项1',
        //   label: '启用'
        // }, {
        //   value: '选项2',
        //   label: '停用'
        // }],
        // value: '选项1',
        tableData: [{
          onOff: 0,
          name: '都龙族',
          userName: 'doulongzu',
          type: '学校',
          schoolName: '武宁路育才',
          email: '16783949@163.com',
          telephone: '13533790697'
        }, {
          onOff: 1,
          name: '都龙族',
          userName: 'doulongzu',
          type: '运营',
          schoolName: '',
          email: '16783949@163.com',
          telephone: '13533790697'
        }, {
          onOff: 0,
          name: '都龙族',
          userName: 'doulongzu',
          type: '学校',
          schoolName: '武宁路育才',
          email: '16783949@163.com',
          telephone: '13533790697'
        }, {
          onOff: 0,
          name: '都龙族',
          userName: 'doulongzu',
          type: '运营',
          schoolName: '武宁路育才11',
          email: '1623123783949@163.com',
          telephone: '13533790697'
        }]
      }
    },
    methods: {
      handleEdit(index, row) {
        console.log(index, row)
        this.$router.push({ path: '/itemEdit' })
      },
      handleDelete(index, row) {
        console.log(index, row)
        this.centerDialogVisible = true
      },
      handleCommand(indexx) {
        // console.log(command)
        console.log(indexx)
      },
      change() {
        console.log("change")
      }
    }
  }
</script>

<style scoped>
.schoolName {
  margin-bottom: 30px;
}
.schools {
  display: inline-block;
  margin-right: 30px;
}
.change {
  display: inline-block;
  width: 40px;
  text-align: center;
  line-height: 22px;
  border-radius: 5px;
  font-size: 14px;
  height: 25px;
  border: 1px solid #f4f4f4;
  padding: 2px;
  background-color: #f4f4f4;
  cursor: pointer;

}
</style>
