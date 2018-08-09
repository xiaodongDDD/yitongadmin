<template>
  <div class="workManagement-html">
    <!--搜a索-->
    <el-form :inline="true" :model="formInline" class="form-inline">
      <el-form-item label="提交日期">
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
      <el-form-item label="所属区域">
        <el-cascader
          :options="options2"
          :props="props"
          clearable
          filterable
          v-model="formInline.selectedOptions"
        ></el-cascader>
      </el-form-item>
      <el-form-item label="时间排序">
        <el-select v-model="formInline.timeSort" placeholder="">
          <el-option
            v-for="item in optionsStatus2"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="专家打分">
        <el-select v-model="formInline.expertScore" placeholder="">
          <el-option
            v-for="item in optionsStatus3"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="网络票">
        <el-select v-model="formInline.webScore" placeholder="">
          <el-option
            v-for="item in optionsStatus4"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="关键字">
        <el-input v-model="formInline.keyword"></el-input>
      </el-form-item>
      <el-form-item label="总分">
        <el-select v-model="formInline.scoreSort" placeholder="">
          <el-option
            v-for="item in optionsStatus5"
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
    <!--列表//-->
    <div class="infoHeadTable">已为您搜索到<span>{{this.total}}</span>条作品</div>
    <div style="margin: 0 30px">
      <el-table v-loading.body="listLoading"
                :data="list"
                @selection-change="handleSelectionChange"
                element-loading-text="加载中..." border fit highlight-current-row >
        <el-table-column
          type="selection"
          width="40">
        </el-table-column>
        <el-table-column align="center" label='作品编号' width="95">
          <template slot-scope="scope">
            {{scope.row.activity.recordId}}
          </template>
        </el-table-column>
        <el-table-column label="晓黑板账号" width="110" align="center">
          <template slot-scope="scope">
            <span>
              {{scope.row.activity.mobile}}
            </span>
          </template>
        </el-table-column>
        <el-table-column label="手机号归属地" width="110" align="center">
          <template slot-scope="scope">
            <span>{{scope.row.activity.province}}{{scope.row.activity.city}}</span>
          </template>
        </el-table-column>
        <el-table-column label="作品展示"  align="center" width="110">
          <template slot-scope="scope">
            <div style="width: 90px;height: 50px;text-align: center;line-height:50px;">
              <img :src="scope.row.imageSrc"  @click="bigPic(scope.row)" v-if="scope.row.imageSrc" style=" width:auto;height:auto;max-width:100%;max-height:100%;display: inline-block; vertical-align: middle;">
            </div>
          </template>
        </el-table-column>
        <el-table-column label="作品说明"  align="center" >
          <template slot-scope="scope">
            <span v-popover:popover3 style="width: 10px;height: 10px">
              <span class="point">{{scope.row.activity.content | contentFilter}}</span>
              <el-popover
                ref="popover3"
                placement="top-start"
                width="300"
                trigger="hover">
                <div style="max-height: 300px;overflow-y: scroll">
                  {{scope.row.activity.content}}
                </div>
              </el-popover>
            </span>
          </template>
        </el-table-column>
        <el-table-column label="用户角色" width="110" align="center">
          <template slot-scope="scope">
            {{scope.row.activity.role | roleFilter}}
          </template>
        </el-table-column>
        <el-table-column label="提交时间" width="170" align="center">
          <template slot-scope="scope">
            <i class="el-icon-time"></i>
            {{scope.row.activity.createTime | timeFilter}}
          </template>
        </el-table-column>
        <el-table-column label="作品类型" width="110" align="center">
          <template slot-scope="scope">
            <span>{{scope.row.activity.status | statusFilter}}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="created_at" label="专家打分" width="110">
          <template slot-scope="scope">
            {{scope.row.activity.expertScore}}
          </template>
        </el-table-column>
        <el-table-column align="center" prop="created_at" label="网络票" width="110">
          <template slot-scope="scope">
            {{scope.row.activity.webScore}}
          </template>
        </el-table-column>
        <el-table-column align="center" prop="created_at" label="总分" width="110">
          <template slot-scope="scope">
            {{scope.row.activity.score}}
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center" width="180">
          <template slot-scope="scope">
            <el-button type="" size="mini" @click="goMark(scope.row)" >专家打分</el-button>
            <el-button type="danger" size="mini" @click="deleteData(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!--分页-->
    <div class="block" v-if="page">
      <el-button class="buttonSelect" type="" icon="document" @click="operating('',3)" >批量删除</el-button>
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
      <el-button type="" class="buttonEx" icon="document" @click="fetchData('all')" :loading="downloadLoading">导出全部</el-button>
      <el-input-number  class="buttonEx" v-model="num1" @change="handleChange" :step="100" :min="100" :max="1000" label="描述文字"></el-input-number>
    </div>
    <!--弹窗-->
    <el-dialog title="专家打分" :visible.sync="dialogFormVisible" width="40%" style="min-width: 600px" center>
      <el-row :gutter="20" class="rowMargin">
        <el-col :span="4">作品展示</el-col>
        <el-col :span="20">
          <div style="width: 200px;height: 200px;text-align: center;line-height:200px;">
            <img :src="form.imgSrc"   style=" width:auto;height:auto;max-width:100%;max-height:100%;display: inline-block; vertical-align: middle;">
          </div>
        </el-col>
      </el-row>
      <el-row :gutter="20" class="rowMargin">
        <el-col :span="4">作品描述</el-col>
        <el-col :span="20">{{form.content}}
          </el-col>
      </el-row>
      <el-row :gutter="20" class="rowMargin">
        <el-col :span="4" class="headSelect">专家打分</el-col>
        <el-col :span="20">
          <el-select v-model="formExpertScore" placeholder="请选择" class="select-width" @change="selectStatus(form)">
            <el-option
              v-for="item in expertOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-col>
      </el-row>
      <div slot="footer" class="dialog-footer text-center el-dialog-top">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitForm('ruleForm')">保 存</el-button>
      </div>
    </el-dialog>
    <!--大图弹窗-->
    <el-dialog title="" :visible.sync="dialogPicVisible" >
      <img :src="bigImgInfo" style="width: 100%">
    </el-dialog>
  </div>
</template>

<script>
  import { getWorkManagementList, updataWorkManagementInfo, deleteWorkManagementInfo, getctivityList } from '@/api/workManagement'
  import { dateFormat } from '@/utils/validate'
  import dataProvinces from '@/staticData/provinces.json'
  import md5 from 'js-md5'
  export default {
    data() {
      return {
        formInline: {
          status: 0,
          timeSort: 'desc',
          selectedOptions: null,
          expertScore: 'desc',
          webScore: 'desc',
          dateValue: [],
          keyword: '',
          scoreSort: 'desc'
        },
        num1: 300,
        list: null,
        listAll: null,
        listLoading: true,
        currentPage: 1,
        total: 0,
        page: false,
        pagesize: 10,
        dialogFormVisible: false,
        dialogPicVisible: false,
        form: {
          imgSrc: null,
          content: '',
          expertScore: 0
        },
        formExpertScore: 0,
        formLabelWidth: '80px',
        rules: {
          handle_status_code: [
            { required: true, message: '请选择处理状态', trigger: 'change' }
          ]
        },
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
        dateValue: '',
        typeFlag: false,
        expertOptions: [
          { label: '请选择', value: 0 }
        ],
        optionsStatus1: [
          { label: '请选择', value: 0 },
          { label: '待处理', value: 1 },
          { label: '未入围', value: 2 },
          { label: '已入围', value: 3 }
        ],
        optionsStatus2: [
          { label: '请选择', value: 0 },
          { label: '提交时间倒序', value: 'desc' },
          { label: '提交时间正序', value: 'asc' }
        ],
        optionsStatus3: [
          { label: '请选择', value: 0 },
          { label: '由低到高', value: 'asc' },
          { label: '由高到低', value: 'desc' }
        ],
        optionsStatus4: [
          { label: '请选择', value: 0 },
          { label: '由低到高', value: 'asc' },
          { label: '由高到低', value: 'desc' }
        ],
        optionsStatus5: [
          { label: '请选择', value: 0 },
          { label: '由低到高', value: 'asc' },
          { label: '由高到低', value: 'desc' }
        ],
        options2: [],
        props: {
          value: 'value',
          label: 'label',
          children: 'cities'
        },
        multipleSelection: [],
        downloadLoading: false,
        filename: '',
        bigImgInfo: null
      }
    },
    filters: {
      contentFilter(content) {
        if (content.length > 7) {
          return content.substr(0, 7) + '...'
        } else {
          return content
        }
      },
      statusFilter(status) {
        const statusMap = {
          1: '植物类',
          2: '昆虫类'
        }
        return statusMap[status]
      },
      roleFilter(role) {
        const statusMap = {
          0: '学生',
          1: '家长',
          2: '老师'
        }
        return statusMap[role]
      },
      timeFilter(item) {
        const date = new Date(item)
        const Y = date.getFullYear() + '/'
        const M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '/'
        const D = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate()) + ' '
        const h = (date.getHours() < 10 ? '0' + (date.getHours()) : date.getHours()) + ':'
        const m = (date.getMinutes() < 10 ? '0' + (date.getMinutes()) : date.getMinutes()) + ':'
        const s = (date.getSeconds() < 10 ? '0' + (date.getSeconds()) : date.getSeconds())
        return Y + M + D + h + m + s
      }
    },
    created() {
      getctivityList().then(response => {
        console.log(response)
      })
      for (let i = 1; i < 101; i++) {
        this.expertOptions.push(
          { label: i, value: i }
        )
      }
      const date = new Date()
      this.formInline.dateValue = [new Date((date.getTime()) - 1000 * 60 * 60 * 24 * 7), date]
      for (let i = 0; i < dataProvinces.provinces.length; i++) {
        this.options2.push({ label: dataProvinces.provinces[i].name, value: dataProvinces.provinces[i].name, cities: [] })
      }
      for (let i = 0; i < dataProvinces.provinces.length; i++) {
        for (let j = 0; j < dataProvinces.provinces[i].citys.length; j++) {
          this.options2[i].cities.push({ label: dataProvinces.provinces[i].citys[j], value: dataProvinces.provinces[i].citys[j] })
        }
      }
      this.fetchData()
    },
    methods: {
      handleChange(value) {
        console.log(value)
      },
      fetchData(item) {
        let province = ''
        let city = ''
        if (this.formInline.selectedOptions === '' || this.formInline.selectedOptions == null) {
          province = ''
          city = ''
        } else {
          province = this.formInline.selectedOptions[0]
          city = this.formInline.selectedOptions[1]
          if (city === '北京' || city === '上海' || city === '广州' || city === '天津' || city === '重庆') {
            city = ''
          }
        }
        this.listLoading = true
        const obj = {
          ActivityId: 11,
          status: this.formInline.status,
          province: province,
          city: city,
          keyword: this.formInline.keyword,
          page: {
            pageNum: this.currentPage,
            size: this.pagesize
          }
        }
        if (this.formInline.dateValue === '' || this.formInline.dateValue === null) {
          console.log()
        } else {
          obj.startTime = this.formInline.dateValue[0].getTime()
          obj.endime = this.formInline.dateValue[1].getTime()
        }
        if (this.formInline.timeSort !== 0) {
          obj.timeSort = this.formInline.timeSort
        }
        if (this.formInline.expertScore !== 0) {
          obj.expertScore = this.formInline.expertScore
        }
        if (this.formInline.webScore !== 0) {
          obj.webScore = this.formInline.webScore
        }
        if (this.formInline.scoreSort !== 0) {
          obj.scoreSort = this.formInline.scoreSort
        }
        if (this.formInline.timeSort === 0 && this.formInline.expertScore === 0 && this.formInline.webScore === 0 && this.formInline.scoreSort === 0) {
          this.$message({
            type: 'warning',
            message: '请选择排序方式'
          })
          this.listLoading = false
          return
        }
        if (item === 'all') {
          obj.page.size = 2000
          obj.page.pageNum = 1
        }
        getWorkManagementList(obj).then(response => {
          if (response.response.info[0].status !== '1') {
            this.$message({
              type: 'error',
              message: response.response.info[0].msg
            })
          } else {
            if (item === 'all') {
              this.listAll = response.response.info[0].data.activities
              this.handleDownload()
            } else {
              this.$message({
                type: 'success',
                message: response.response.info[0].msg
              })
              if (response.response.info[0].hasOwnProperty('data')) {
                if (response.response.info[0].data.hasOwnProperty('activities')) {
                  this.list = response.response.info[0].data.activities
                  this.total = response.response.info[0].data.pageInfo.totalNum
                } else {
                  this.list = []
                  this.total = 0
                }
              } else {
                this.list = []
                this.total = 0
              }
              for (let i = 0; i < this.list.length; i++) {
                if (!this.list[i].hasOwnProperty('extraContent')) {
                  this.list[i].imageSrc = ''
                  this.list[i].imageSrco = ''
                  this.list[i].imageSrcp = ''
                } else {
                  if (!this.list[i].extraContent.hasOwnProperty('images')) {
                    this.list[i].imageSrc = ''
                    this.list[i].imageSrco = ''
                    this.list[i].imageSrcp = ''
                  } else {
                    if (this.list[i].extraContent.images.length > 0) {
                      this.list[i].imageSrco = this.list[i].extraContent.images[0].original
                      this.list[i].imageSrc = this.list[i].extraContent.images[0].thumbnail
                      this.list[i].imageSrcp = this.list[i].extraContent.images[0].thumbnail
                    } else {
                      this.list[i].imageSrc = ''
                      this.list[i].imageSrco = ''
                      this.list[i].imageSrcp = ''
                    }
                  }
                }
              }
            }
          }
          this.listLoading = false
          this.page = true
        })
      },
      goMark(item) {
        console.log(item)
        this.form = JSON.parse(JSON.stringify(item))
        this.form.imgSrc = item.imageSrcp
        this.form.content = item.activity.content
        this.formExpertScore = item.activity.expertScore
        this.dialogFormVisible = true
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
      },
      submitForm(formName) {
        if (this.formExpertScore === 0) {
          this.$message({
            type: 'warning',
            message: '请选择专家打分'
          })
          return
        }
        const obj = { 'requests': [] }
        obj.requests.push({ ActivityId: 11, 'recordId': this.form.activity.recordId, 'status': this.form.activity.status, 'expertScore': this.formExpertScore })
        updataWorkManagementInfo(obj).then(response => {
          if (response.response.info[0].status === '1') {
            this.$message({
              message: response.response.info[0].msg,
              type: 'success'
            })
            this.dialogFormVisible = false
            this.currentPage = 1
            this.fetchData()
          } else {
            this.$message({
              message: response.response.info[0].msg,
              type: 'error'
            })
          }
        })
      },
      resetForm() {
        if (this.$refs['ruleForm'] !== undefined) {
          this.$refs['ruleForm'].resetFields()
        }
      },
      onSubmit() {
        this.currentPage = 1
        this.fetchData()
      },
      selectStatus(item) {
        console.log(item)
      },
      handleSelectionChange(val) {
        this.multipleSelection = val
      },
      handleDownload() {
        if (this.listAll.length) {
          this.downloadLoading = true
          const list = []
          for (let i = 0; i < this.listAll.length; i++) {
            const status = this.statusFilter(this.listAll[i].activity.status)
            const role = this.roleFilter(this.listAll[i].activity.role)
            const createTime = this.timeFilter(this.listAll[i].activity.createTime)
            list.push(
              {
                'recordId': this.listAll[i].activity.recordId,
                'mobile': this.listAll[i].activity.mobile,
                'province': this.listAll[i].activity.province + this.listAll[i].activity.city,
                'content': this.listAll[i].activity.content,
                'role': role,
                'createTime': createTime,
                'status': status,
                'expertScore': this.listAll[i].activity.expertScore,
                'webScore': this.listAll[i].activity.webScore,
                'score': this.listAll[i].activity.score,
                'img': this.listAll[i].extraContent.images[0].original
              }
            )
          }
          console.log(list)
          import('@/vendor/Export2Excel').then(excel => {
            const tHeader = ['作品编号', '晓黑板账号', '手机归属地', '作品说明', '用户角色', '提交时间', '入围状态', '专家打分', '网络票', '总分', '图片']
            const filterVal = ['recordId', 'mobile', 'province', 'content', 'role', 'createTime', 'status', 'expertScore', 'webScore', 'score', 'img']
            const data = this.formatJson(filterVal, list)
            excel.export_json_to_excel(tHeader, data, this.filename)
            this.downloadLoading = false
          })
        } else {
          this.$message({
            message: 'Please select at least one item',
            type: 'warning'
          })
        }
      },
      formatJson(filterVal, jsonData) {
        return jsonData.map(v => filterVal.map(j => v[j]))
      },
      bigPic(item) {
        this.bigImgInfo = item.imageSrco
        this.dialogPicVisible = true
      },
      operating(item, flag) {
        let info = ''
        let successInfo = ''
        let errorInfo = ''
        const obj = { 'requests': [] }
        if (flag === 1) {
          info = '您已选择' + item.activity.recordId + '号作品为入围作品'
          successInfo = '操作成功'
          errorInfo = '操作已取消'
          obj.requests.push({ 'recordId': item.activity.recordId, 'status': 3 })
        } else if (flag === 2) {
          info = '您已选择' + item.activity.recordId + '号作品为未入围作品'
          successInfo = '操作成功'
          errorInfo = '操作已取消'
          obj.requests.push({ 'recordId': item.activity.recordId, 'status': 2, 'expertScore': 0 })
        } else if (flag === 3) {
          if (this.multipleSelection.length < 1) {
            this.$message({
              message: '请选择作品',
              type: 'warning'
            })
            return
          }
          const arr = []
          const arrError = []
          for (let i = 0; i < this.multipleSelection.length; i++) {
            arr.push(this.multipleSelection[i].activity.recordId)
            obj.requests.push({ 'recordId': this.multipleSelection[i].activity.recordId, 'status': 3 })
            if (this.multipleSelection[i].activity.status === 3) {
              arrError.push(this.multipleSelection[i].activity.recordId)
            }
          }
          if (arrError.length > 0) {
            this.$message({
              message: arrError.join(',') + '号作品已入围，请重新选择',
              type: 'warning'
            })
            return
          } else {
            info = '您已选择' + arr.join(',') + '号作品为入围作品'
            successInfo = '操作成功'
            errorInfo = '操作已取消'
          }
        } else if (flag === 4) {
          if (this.multipleSelection.length < 1) {
            this.$message({
              message: '请选择作品',
              type: 'warning'
            })
            return
          }
          const arr = []
          const arrError = []
          for (let i = 0; i < this.multipleSelection.length; i++) {
            arr.push(this.multipleSelection[i].activity.recordId)
            obj.requests.push({ 'recordId': this.multipleSelection[i].activity.recordId, 'status': 2, 'expertScore': 0 })
            if (this.multipleSelection[i].activity.status === 2) {
              arrError.push(this.multipleSelection[i].activity.recordId)
            }
          }
          console.log(arrError)
          if (arrError.length > 0) {
            this.$message({
              message: arrError.join(',') + '号作品未入围，请重新选择',
              type: 'warning'
            })
            return
          } else {
            info = '您已选择' + arr.join(',') + '号作品为未入围作品'
            successInfo = '操作成功'
            errorInfo = '操作已取消'
          }
        }
        this.$confirm(info, '操作确认', {
          confirmButtonText: '保存',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
        }).then(() => {
          updataWorkManagementInfo(obj).then(response => {
            if (response.response.info[0].status === '1') {
              this.$message({
                type: 'success',
                message: successInfo
              })
              this.dialogFormVisible = false
              this.currentPage = 1
              this.fetchData()
            } else {
              this.$message({
                message: response.response.info[0].msg,
                type: 'error'
              })
            }
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: errorInfo
          })
        })
      },
      statusFilter(status) {
        const statusMap = {
          1: '待处理',
          2: '未入围',
          3: '已入围'
        }
        return statusMap[status]
      },
      roleFilter(role) {
        const statusMap = {
          0: '学生',
          1: '家长',
          2: '老师'
        }
        return statusMap[role]
      },
      timeFilter(item) {
        const time = new Date(item)
        return time.getFullYear() + '/' + (time.getMonth() + 1) + '/' + time.getDate() + '/' + time.getHours() + ':' + time.getMinutes() + ':' + time.getSeconds()
      },
      deleteData(item) {
        console.log(item)
        const time = new Date()
        const date = dateFormat(time)
        console.log('===' + date + '---')
        console.log(md5('2018-05-03'))
        const obj = {
          ActivityId: 11,
          'recordId': item.activity.recordId,
          'salt': md5(date)
        }
        this.$confirm('此操作将永久删除该数据, 是否继续?', '警告', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
        }).then(() => {
          deleteWorkManagementInfo(obj).then(response => {
            if (response.response.info[0].status === '1') {
              this.$message({
                type: 'success',
                message: '删除成功!'
              })
              this.dialogFormVisible = false
              this.currentPage = 1
              this.fetchData()
            } else {
              this.$message({
                message: response.response.info[0].msg,
                type: 'error'
              })
            }
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .text-right {
    text-align: right;
  }

  .text-center {
    text-align: center;
  }
  .text-left {
    text-align: left;
  }
  .workManagement-html {
    .form-inline{
      margin: 20px 30px 0 30px;
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
    .select-width {
      width: 100%;
    }
    .el-dialog-top{
      margin-top: -30px;
    }
    .point{
      cursor: pointer;
    }
    .infoHeadTable{
      padding-left: 30px;
      margin-bottom: 10px;
      color: #606266;
      span{
        color: #3a8ee6;
      }
    }

  }
  .el-dialog, .el-pager li {
    background: red;
    -webkit-box-sizing: border-box;
  }
  .rowMargin{
    margin: 10px;
    .headSelect{
      margin-top: 5px;
    }
  }
</style>
