<template>
  <div class="center-content log-list">
    <div class="list-table">
      <el-table
        :data="tableData"
        border
        style="width: 100%">
        <el-table-column
          align="center"
          prop="name"
          label="操作人"
          width="">
        </el-table-column>
        <el-table-column
          align="center"
          prop="type"
          label="类型"
          width="">
        </el-table-column>
        <el-table-column
          align="center"
          prop="instruction"
          label="内容"
          width="">
        </el-table-column>
        <el-table-column
          align="center"
          prop="time"
          label="时间"
          width="">
        </el-table-column>
        <el-table-column
          align="center"
          prop="IP"
          label="IP"
          width="">
        </el-table-column>

      </el-table>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'logList',
    data() {
      return {
        tableData: [{
          name: '2018年第二学期语文补差',
          type: '学校',
          square: '评价项目管理',
          instruction: '2018年第二学期',
          time: '2018/03/12 15:00',
          IP: ''
        }, {
          name: '2018年第二学期语文补差',
          type: '学校',
          square: '评价项目管理',
          instruction: '2018年第二学期',
          time: '2018/03/12 15:00',
          IP: ''
        }]
      }
    }
  }
</script>

<style scoped>

</style>
