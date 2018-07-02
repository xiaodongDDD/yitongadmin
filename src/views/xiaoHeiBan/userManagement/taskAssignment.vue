<template>
  <div class="app-container">
    <el-table :data="list" v-loading.body="listLoading" element-loading-text="加载中..." border fit highlight-current-row>
      <el-table-column align="center" label='培训师姓名' width="95">
        <template slot-scope="scope">
          {{scope.row.user_name}}
        </template>
      </el-table-column>
      <el-table-column label="在职状态" width="110" align="center">
        <template slot-scope="scope">
          {{scope.row.is_delete}}
        </template>
      </el-table-column>
      <el-table-column label="邀请码" width="110" align="center">
        <template slot-scope="scope">
          <span>{{scope.row.invited_code}}</span>
        </template>
      </el-table-column>
      <el-table-column label="手机号" width="110" align="center">
        <template slot-scope="scope">
          {{scope.row.account_number}}
        </template>
      </el-table-column>
      <el-table-column label="所在省" width="110" align="center">
        <template slot-scope="scope">
          {{scope.row.province}}
        </template>
      </el-table-column>
      <el-table-column label="所在市" width="110" align="center">
        <template slot-scope="scope">
          {{scope.row.city}}
        </template>
      </el-table-column>
      <el-table-column label="目前职位" width="110" align="center">
        <template slot-scope="scope">
          {{scope.row.position_name}}
        </template>
      </el-table-column>
      <el-table-column label="是否管理" width="110" align="center">
        <template slot-scope="scope">
          {{scope.row.position_level}}
        </template>
      </el-table-column>
      <!--<el-table-column class-name="status-col" label="所在省" width="110" align="center">-->
        <!--<template slot-scope="scope">-->
          <!--<el-tag :type="scope.row.status | statusFilter">{{scope.row.status}}</el-tag>-->
        <!--</template>-->
      <!--</el-table-column>-->
      <el-table-column align="center" prop="created_at" label="入职日期" width="200">
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span>{{scope.row.entry_time}}</span>
        </template>
      </el-table-column>
      <el-table-column label="直属上级" width="110" align="center">
        <template slot-scope="scope">
          {{scope.row.sup_name}}
        </template>
      </el-table-column>
      <el-table-column label="直属上级职位" width="110" align="center">
        <template slot-scope="scope">
          {{scope.row.sup_position}}
        </template>
      </el-table-column>
      <el-table-column label="直属上级邀请码" align="center">
        <template slot-scope="scope">
          {{scope.row.sup_code}}
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getList } from '@/api/table'

export default {
  data() {
    return {
      list: null,
      listLoading: true
    }
  },
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'gray',
        deleted: 'danger'
      }
      return statusMap[status]
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      getList(this.listQuery).then(response => {
        console.log(response)
        this.list = response.response.user_list
        this.listLoading = false
      })
    }
  }
}
</script>
