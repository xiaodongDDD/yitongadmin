<template>
  <div class="employeeMangement">
    <!--搜索-->
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
      <!--左侧树-->
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
      <!--右侧表-->
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
        <div class="text-center">
          <el-pagination
            background
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-sizes="[10, 20, 50, 100]"
            :page-size="pagesize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total">
          </el-pagination>
        </div>
        <el-row :gutter="20" class="buttonClass">
          <el-col :span="12">
            <el-upload
              class="uploadClass"
              action="https://jsonplaceholder.typicode.com/posts/"
              :on-preview="handlePreview"
              :on-remove="handleRemove"
              :before-remove="beforeRemove"
              multiple
              :limit="1"
              :on-exceed="handleExceed"
              :file-list="fileList">
              <el-button size="small" >点击上传</el-button>
              <!--<div slot="tip" class="el-upload__tip">只能上传xlsx文件，且不超过500kb</div>-->
            </el-upload>
          </el-col>
          <el-col :span="12">
            <el-button size="small" style="float: left">下载导入模板</el-button>
            <el-button size="small" style="float: left">批量导出</el-button>
          </el-col>
        </el-row>
      </div>
    </div>


  </div>
</template>

<script>
  export default {
    name: 'employeeMangement',
    computed: {},
    data() {
      return {
        currentPage: 1,
        pagesize: 10,
        total: 0,
        id: 1000,
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
          label: '晓信科技上海总公司 （300人）',
          children: [{
            id: 4,
            label: '北京分公司 （30人）',
            children: [{
              id: 9,
              label: '人事部 （230人）'
            }, {
              id: 11,
              label: '培训部 （30人）'
            }]
          }, {
            id: 5,
            label: '深圳分公司 （12人）',
            children: [{
              id: 9,
              label: '培训部 （39人）'
            }, {
              id: 10,
              label: '人事部 （88人）'
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
        }],
        fileList: []
      }
    },
    methods: {
      onSubmit() {
        console.log('submit!')
      },
      append(data) {
        const newChild = { id: this.id++, label: 'testtest', children: [] }
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
      },
      // 分页
      handleSizeChange(val) {
        this.pagesize = val
        this.currentPage = 1
        this.fetchData()
        console.log(`每页 ${val} 条`)
      },
      handleCurrentChange(val) {
        this.currentPage = val
        this.fetchData()
        console.log(`当前页: ${val}`)
      },
      // 选择文件导入
      handleRemove(file, fileList) {
        console.log(file, fileList)
      },
      handlePreview(file) {
        console.log(file)
      },
      handleExceed(files, fileList) {
        this.$message.warning(`当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`)
      },
      beforeRemove(file, fileList) {
        return this.$confirm(`确定移除 ${file.name} ？`)
      }
    },
    created() {
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .text-center{
    text-align: center;
    margin-top: 10px;
  }
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
      .buttonClass{
        margin-top: 10px;
        text-align: center;
      }
      .uploadClass{
        width: 50%;
      }
    }
  }
</style>
