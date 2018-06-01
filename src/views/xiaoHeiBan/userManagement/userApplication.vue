<template>
  <div class="userApplication">
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item label="姓名">
        <el-input v-model="formInline.name" placeholder=""></el-input>
      </el-form-item>
      <el-form-item label="学校">
        <el-input v-model="formInline.school" placeholder=""></el-input>
      </el-form-item>
      <el-form-item label="申请手机号">
        <el-input v-model="formInline.phone" placeholder=""></el-input>
      </el-form-item>
      <el-form-item label="归属地">
        <el-cascader
          :options="options2"
          :props="props"
        ></el-cascader>
      </el-form-item>
      <el-form-item label="渠道">
        <el-select v-model="formInline.channel" placeholder="请选择">
          <el-option
            v-for="item in channelList"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="负责人">
        <el-input v-model="formInline.principal" placeholder="请输入培训师姓名"></el-input>
      </el-form-item>
      <el-form-item label="状态">
        <el-select v-model="formInline.channel" placeholder="请选择">
          <el-option
            v-for="item in channelList"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="资质评价">
        <el-select v-model="formInline.channel" placeholder="请选择">
          <el-option
            v-for="item in channelList"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="申请时间">
        <el-date-picker
          v-model="formInline.dateValue"
          type="datetimerange"
          :picker-options="pickerOptions"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          align="right">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="再次联系">
        <el-select v-model="formInline.channel" placeholder="请选择">
          <el-option
            v-for="item in channelList"
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
    <el-row :gutter="20" class="infoHeadTable">
      <el-col :span="12" style="line-height: 40px">
        已为您搜索到<span>{{this.total}}</span>条作品
      </el-col>
      <el-col :span="12" style="text-align: right">
        <el-button class="buttonEx" type="" icon="document" @click="fetchData('all')" :loading="downloadLoading">导出</el-button>
      </el-col>
    </el-row>
    <el-table :data="list" v-loading.body="listLoading" element-loading-text="加载中..." border fit highlight-current-row>
      <el-table-column
        type="selection"
        width="40">
      </el-table-column>
      <el-table-column align="center" label='申请编号' width="95">
        <template slot-scope="scope">
          {{scope.row.user_name}}
        </template>
      </el-table-column>
      <el-table-column label="姓名" width="110" align="center">
        <template slot-scope="scope">
          {{scope.row.is_delete}}
        </template>
      </el-table-column>
      <el-table-column label="申请手机号" width="110" align="center">
        <template slot-scope="scope">
          <span>{{scope.row.invited_code}}</span>
        </template>
      </el-table-column>
      <el-table-column label="手机号" width="110" align="center">
        <template slot-scope="scope">
          {{scope.row.account_number}}
        </template>
      </el-table-column>
      <el-table-column label="申请类型" width="110" align="center">
        <template slot-scope="scope">
          {{scope.row.province}}
        </template>
      </el-table-column>
      <el-table-column label="申请时间" width="110" align="center">
        <template slot-scope="scope">
          {{scope.row.city}}
        </template>
      </el-table-column>
      <el-table-column label="所属学校" width="110" align="center">
        <template slot-scope="scope">
          {{scope.row.position_name}}
        </template>
      </el-table-column>
      <el-table-column label="归属地" width="110" align="center">
        <template slot-scope="scope">
          {{scope.row.position_level}}
        </template>
      </el-table-column>
      <el-table-column align="center" prop="created_at" label="区域负责人" width="200">
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span>{{scope.row.entry_time}}</span>
        </template>
      </el-table-column>
      <el-table-column label="当前处理人" width="110" align="center">
        <template slot-scope="scope">
          {{scope.row.sup_name}}
        </template>
      </el-table-column>
      <el-table-column label="状态" width="110" align="center">
        <template slot-scope="scope">
          {{scope.row.sup_position}}
        </template>
      </el-table-column>
      <el-table-column label="资质评价" align="center">
        <template slot-scope="scope">
          {{scope.row.sup_code}}
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="440">
        <template slot-scope="scope">
          <el-button type="" size="mini" @click="operating(scope.row,1)" >分派</el-button>
          <el-button type="" size="mini" @click="operating(scope.row,2)" >调换</el-button>
          <el-button type="" size="mini" @click="operating(scope.row,3)" >跟进</el-button>
          <el-button type="" size="mini" @click="operating(scope.row,4)" >返回</el-button>
          <el-button type="" size="mini" @click="operating(scope.row,4)" >操作日志</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!--分页-->
    <div class="block" v-if="pageFlag">
      <el-button class="buttonSelect" type="" icon="document" @click="operating('',3)" >批量分派</el-button>
      <el-button class="buttonSelect" type="" icon="document" @click="operating('',4)" >批量调换</el-button>
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
  </div>
</template>

<script>
import { getList } from '@/api/table'
import dataProvinces from '@/staticData/provinces.json'

export default {
  data() {
    return {
      list: null,
      listLoading: true,
      formInline: {
        name: '',
        school: '',
        phone: '',
        selectedOptions: '',
        channel: '',
        principal: '',
        dateValue: ''
      },
      options2: [],
      props: {
        value: 'label',
        children: 'cities'
      },
      channelList: [
        { value: '', label: '请选择' },
        { value: '1', label: '公众号文章' },
        { value: '2', label: '名师推荐' },
        { value: '3', label: '学校使用' },
        { value: '4', label: '老师介绍' }
      ],
      pickerOptions: {
        shortcuts: [{
          text: '最近一周',
          onClick(picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近一个月',
          onClick(picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近三个月',
          onClick(picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
            picker.$emit('pick', [start, end])
          }
        }]
      },
      total: 22,
      pagesize: 10,
      currentPage: 1,
      pageFlag: true,
      downloadLoading: false
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
    for (let i = 0; i < dataProvinces.provinces.length; i++) {
      this.options2.push({ label: dataProvinces.provinces[i].name, value: dataProvinces.provinces[i].name, cities: [] })
    }
    for (let i = 0; i < dataProvinces.provinces.length; i++) {
      for (let j = 0; j < dataProvinces.provinces[i].citys.length; j++) {
        this.options2[i].cities.push({ label: dataProvinces.provinces[i].citys[j], value: dataProvinces.provinces[i].citys[j] })
      }
    }
    // console.log(this.options2)
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
    },
    onSubmit() {
      console.log()
    },
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
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
  .userApplication{
    margin: 20px 30px;
    .infoHeadTable{
      padding-left: 30px;
      margin-bottom: 10px;
      color: #606266;
      span{
        color: #3a8ee6;
      }
    }
    .block {
      text-align: center;
      margin: 15px 0;
      .buttonSelect{
        position: relative;
        left: 30px;
        float: left;
      }
      .buttonEx{
        position: relative;
        right: 40px;
        top: -40px;
        float: right;
      }
    }
  }
</style>
