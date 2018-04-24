<template>
  <div class="center-conten gain-list">

    <div class="function-btns">
      <el-button icon="el-icon-upload2" type="text" @click="importGain">导出</el-button>
      <router-link to="/gainList"><el-button type="text">返回</el-button></router-link>
    </div>

    <div class="search-contaier">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="年级">
          <el-input v-model="formInline.grade" placeholder=""></el-input>
        </el-form-item>
        <el-form-item label="班级">
          <el-input v-model="formInline.class" placeholder=""></el-input>
        </el-form-item>
        <el-form-item label="学科">
          <el-input v-model="formInline.subject" placeholder=""></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">筛选</el-button>
          <el-button @click="clearCondition ">清除</el-button>
        </el-form-item>
      </el-form>

      <p class="search-result" v-show="isSearch.searched">
        <span>{{formInline.grade}}</span>
        <span>{{formInline.class}}</span>
        <span>{{formInline.subject}}</span>
        <span>共{{isSearch.listNum}}条</span>
      </p>
    </div>

    <div class="list-table">
      <el-table
        :data="tableData"
        border
        style="width: 100%">
        <el-table-column
          align="center"
          prop="name"
          label="学生姓名"
          width="120">
        </el-table-column>
        <el-table-column
          align="center"
          prop="class"
          label="年级班级"
          width="120">
        </el-table-column>
        <el-table-column
          align="center"
          prop="subject"
          label="辅导学科"
          width="120">
        </el-table-column>
        <el-table-column
          align="center"
          prop="teacher"
          label="辅导老师"
          width="120">
        </el-table-column>
        <el-table-column
          align="center"
          prop="template"
          label="评价模板"
          width="">
        </el-table-column>
        <el-table-column
          align="center"
          prop="time"
          label="时间"
          width="">
        </el-table-column>

        <el-table-column
          align="center" label="操作" width="">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handleEdit(scope.$index, scope.row)">查看详情</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>


    <el-dialog
      title="导出选项"
      :visible.sync="centerDialogVisible"
      width="30%">
      <div class="dialog-content">
        <p>请选择导出内容：</p>
        <el-form ref="form" :model="form">
          <el-form-item label="">
            <el-radio-group v-model="form.resource">
              <el-radio label="评价成果列表"></el-radio>
              <el-radio label="结果详情"></el-radio>
            </el-radio-group>
          </el-form-item>
        </el-form>
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
    name: 'gainSchoolList',
    data() {
      return {
        centerDialogVisible: false,
        tname: '',
        form: {
          name: ''
        },
        formInline: {
          grade: '',
          class: '',
          subject: ''
        },
        tableData: [{
          name: '和多啦',
          class: '一年级1班',
          subject: '语文',
          teacher: '尅阿拉丁',
          template: '2018年第二学期语文补差',
          time: '2018年第二学期',
          type: '成绩'
        }, {
          name: '都龙族',
          class: '一年级1班',
          subject: '语文',
          teacher: '尅阿拉丁',
          template: '2018年第二学期语文补差',
          time: '2018年第二学期',
          type: '成绩'
        }],
        isSearch: {
          searched: false,
          listNum: 3
        }
      }
    },
    methods: {
      handleEdit(index, row) {
        console.log(index, row)
        this.$router.push({ path: '/gainDetails' })
      },
      importGain() {
        this.centerDialogVisible = true
        this.$message('由于数据量很大，请您先筛选学科或年级班级后导出')
      },
      onSubmit() {},
      clearCondition() {
        this.formInline = { grade: '', class: '', subject: '' }
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .search-contaier{
    text-align: left;

    .el-input{
      margin-left: 5px;
    }

    .search-result{
      color: #666;
      font-size: 14px;
    }
  }

  .function-btns{
    text-align: right;

    .el-button--text{
      color: #666;
      margin-left: 15px;
      font-size: 16px;
    }
  }

</style>
