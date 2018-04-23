<template>
  <div class="employeeMangement">
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item label="">
        <el-input v-model="formInline.user" placeholder="搜索员工、部门、分公司"></el-input>
      </el-form-item>
      <el-form-item label="账户状态">
        <el-select v-model="formInline.status" placeholder="活动区域">
          <el-option
            v-for="item in statusList"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">查询</el-button>
      </el-form-item>
    </el-form>
    <div style="margin-top: 1px">
      <div class="left">
        <div class="block">
          <el-tree
            :data="data5"
            node-key="id"
            default-expand-all
            :expand-on-click-node="false">
      <span class="custom-tree-node" slot-scope="{ node, data }">
        <span>{{ node.label }}</span>
        <span>
          <el-button
            type="text"
            size="mini"
            @click="() => append(data)">
            Append
          </el-button>
          <el-button
            type="text"
            size="mini"
            @click="() => remove(node, data)">
            Delete
          </el-button>
        </span>
      </span>
          </el-tree>
        </div>
      </div>
      <div class="right">
        <div></div>
        <el-table
          :data="tableData"
          v-loading.body="listLoading" element-loading-text="加载中..." border fit highlight-current-row
          style="width: 100%">
          <el-table-column
            prop="date"
            align="center"
            label="员工编号"
            width="120">
          </el-table-column>
          <el-table-column
            prop="name"
            label="姓名"
            align="center"
            width="120">
          </el-table-column>
          <el-table-column
            prop="address"
            label="职务"
            align="center"
            width="120">
          </el-table-column>
          <el-table-column
            prop="address"
            label="公司"
            align="center"
            width="180">
          </el-table-column>
          <el-table-column
          prop="address"
          label="部门"
          align="center"
          width="180">
          </el-table-column>
          <el-table-column
          prop="address"
          label="手机"
          align="center"
          width="120">
          </el-table-column>
          <el-table-column
            prop="address"
            label="邮箱"
            align="center"
            width="120">
          </el-table-column>
          <el-table-column
            prop="address"
            align="center"
            label="状态">
          </el-table-column>
          <el-table-column
            label="操作"
            align="center"
            width="260">
            <template slot-scope="scope">
              <el-button type="" size="mini" @click="operating(scope.row,1)">启用</el-button>
              <!--<el-button type="" size="mini" @click="operating(scope.row,2)">冻结</el-button>-->
              <el-button type="" size="mini" @click="operating(scope.row,1)">详情</el-button>
              <el-button type="" size="mini" @click="goMark(scope.row)">重置密码</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>


  </div>
</template>

<script>
  let id = 1000
  export default {
    name: 'employeeMangement',
    computed: {},
    data() {
      return {
        listLoading: false,
        formInline: {
          user: '',
          status: ''
        },
        statusList: [
          { value: '0', label: '请选择' },
          { value: '1', label: '待激活' },
          { value: '2', label: '已激活' },
          { value: '3', label: '已冻结' }
        ],
        data5: [{
          id: 1,
          label: '一级 1',
          children: [{
            id: 4,
            label: '二级 1-1',
            children: [{
              id: 9,
              label: '三级 1-1-1'
            }, {
              id: 10,
              label: '三级 1-1-2'
            }]
          }]
        }],
        tableData: [{
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }]
      }
    },
    methods: {
      onSubmit() {
        console.log('submit!')
      },
      append(data) {
        const newChild = { id: id++, label: 'testtest', children: [] }
        if (!data.children) {
          this.$set(data, 'children', [])
        }
        data.children.push(newChild)
      },
      remove(node, data) {
        const parent = node.parent
        const children = parent.data.children || parent.data
        const index = children.findIndex(d => d.id === data.id)
        children.splice(index, 1)
      }
    },
    created() {
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .employeeMangement {
    margin: 20px 30px;
    .left {
      float: left;
      width: 400px;
      .block {
        width: 85%;
      }
    }
    .right {
      margin-left: 400px;
      word-break: break-all;
    }
  }
</style>
