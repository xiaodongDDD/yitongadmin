<template>
  <div class="workManagement-html">
    <!--搜a索-->
    <el-form :inline="true" :model="formInline" class="form-inline">
      <el-form-item label="入围状态">
        <el-select v-model="formInline.handle_status1" placeholder="">
          <el-option
            v-for="item in optionsStatus1"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
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
      <el-form-item label="时间排序">
        <el-select v-model="formInline.handle_status2" placeholder="">
          <el-option
            v-for="item in optionsStatus2"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="所属区域">
        <el-cascader
          :options="options2"
          :props="props"
          filterable
          v-model="selectedOptions"
        ></el-cascader>
      </el-form-item>
      <el-form-item label="专家打分">
        <el-select v-model="formInline.handle_status3" placeholder="">
          <el-option
            v-for="item in optionsStatus3"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="网络票">
        <el-select v-model="formInline.handle_status4" placeholder="">
          <el-option
            v-for="item in optionsStatus4"
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
    <div class="infoHeadTable">已为您搜索到<span>112</span>条作品</div>
    <el-table v-loading.body="listLoading"
              ref="multipleTable"
              :data="list"
              tooltip-effect="dark"
              style="width: 100%"
              @selection-change="handleSelectionChange"
              element-loading-text="加载中..." border fit highlight-current-row>
      <el-table-column
        type="selection"
        width="40">
      </el-table-column>
      <el-table-column align="center" label='作品编号' width="95">
        <template slot-scope="scope">
          {{scope.row.f_id}}
        </template>
      </el-table-column>
      <el-table-column label="晓黑板账号" width="110" align="center">
        <template slot-scope="scope">
          <span>
            {{scope.row.feedback_name}}
          </span>
        </template>
      </el-table-column>
      <el-table-column label="手机号归属地" width="110" align="center">
        <template slot-scope="scope">
          <span>{{scope.row.feedback_phone}}</span>
        </template>
      </el-table-column>
      <el-table-column label="作品展示" width="170" align="center">
        <template slot-scope="scope">
          <img src="../../assets/404_images/404.png" style="width: 160px;height: 100px" @click="bigPic(scope.row)">
        </template>
      </el-table-column>
      <el-table-column label="作品说明"  align="center">
        <template slot-scope="scope">
          <span v-popover:popover3 style="width: 10px;height: 10px">
            <span class="point">{{scope.row.feedback_name}}</span>
            <el-popover
              ref="popover3"
              placement="top-start"
              width="400"
              trigger="hover">
              <div>
始回流，制造业回暖，很多企业计划或者开始考虑在美国本土建设工厂。三十年来最激进减税法案大举刺激公司投资。我自己的401K加股票就增值30%多。用咱们党最爱说的一句话来形容：“老百姓得了实惠”。 这是好的部分。白人至上，少数民族和有色人种受到大举排斥和攻击 — 没发生。拒绝难民入境，明确指出极端穆斯林和恐怖主义的联系 — 发生了。减少移民，取消移民乐透，取消链式移民，增加职业移民 — 这是他的愿景，目前看来国会通过的希望不大。对了，在著名的白宫移民会议之后，所有人都把注意力集中在shithole上，他那句Why don’t we have more people from countries like Norway? 被主流媒体抓住猛批，说他这是一个种族主义分子终于暴露了。其实川总的原话是Why can’t we have more immigrants from places like Norway and Asia? 看到了吧？主流媒体为了突出床总是个种族分子，不惜改他的原话。至于绿卡乐透是多么荒谬的一个政策，相信有点脑子的都同意。
              </div>
            </el-popover>
          </span>

        </template>
      </el-table-column>
      <el-table-column label="用户角色" width="110" align="center">
        <template slot-scope="scope">
          {{scope.row.detail}}
        </template>
      </el-table-column>
      <el-table-column label="提交时间" width="150" align="center">
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          {{scope.row.handle_time}}
        </template>
      </el-table-column>
      <el-table-column label="入围状态" width="110" align="center">
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span>{{scope.row.handle_status}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="created_at" label="专家打分" width="110">
        <template slot-scope="scope">
          {{scope.row.handle_status}}
        </template>
      </el-table-column>
      <el-table-column align="center" prop="created_at" label="网络票" width="110">
        <template slot-scope="scope">
          {{scope.row.handle_status}}
        </template>
      </el-table-column>
      <el-table-column label="操作" width="180" align="center">
        <template slot-scope="scope">
          <el-button type="" size="mini" @click="operating(scope.row,1)">入围</el-button>
          <!--<el-button type="" size="mini" @click="operating(scope.row,2)">取消</el-button>-->
          <el-button type="" size="mini" @click="goMark(scope.row)">专家打分</el-button>
        </template>
      </el-table-column>

    </el-table>
    <!--分页-->
    <div class="block" v-if="page">
      <el-button class="buttonSelect" type="" icon="document" @click="operating('',3)" >批量入围</el-button>
      <el-button class="buttonSelect" type="" icon="document" @click="operating('',4)" >批量未入围</el-button>
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
      <el-button class="buttonEx" type="" icon="document" @click="handleDownload" :loading="downloadLoading">导出</el-button>
    </div>
    <!--弹窗-->
    <el-dialog title="专家打分" :visible.sync="dialogFormVisible" width="40%">
      <el-row :gutter="20">
        <el-col :span="6">作品展示</el-col>
        <el-col :span="18">
          <img src="../../assets/404_images/404.png" style="width: 100%">
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="6">作品描述</el-col>
        <el-col :span="18">99999999环保部打死你第八名的宝妈的撒打发沙发女
          99999999环保部打死你第八名的宝妈的撒打发沙发女99999999环保部打死你第八名的宝妈的撒打发沙发女99999999环保部打死你第八名的宝妈的撒打发沙发女</el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="6">专家打分</el-col>
        <el-col :span="18">
          <el-select v-model="form.handle_status_code" placeholder="请选择活动区域" class="select-width" @change="selectStatus(form)">
            <el-option
              v-for="item in optionsStatus1"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-col>
      </el-row>
      <div slot="footer" class="dialog-footer text-center el-dialog-top">
        <el-button type="primary" @click="submitForm('ruleForm')">保 存</el-button>
        <el-button @click="dialogFormVisible = false">取 消</el-button>
      </div>
    </el-dialog>
    <!--大图弹窗-->
    <el-dialog title="" :visible.sync="dialogPicVisible" >
      <img src="../../assets/404_images/404.png" style="width: 100%">
    </el-dialog>
  </div>
</template>

<script>
  import { getSchoolH5List, saveFeedbackInfo } from '@/api/schoolH5'
  import dataProvinces from '@/staticData/provinces.json'
  export default {
    data() {
      return {
        formInline: {
          handle_people: 0,
          handle_status1: 0,
          handle_status2: 0,
          handle_status3: 0,
          handle_status4: 0,
          dateValue: ''
        },
        list: null,
        listLoading: true,
        currentPage: 1,
        total: 0,
        page: false,
        pagesize: 10,
        dialogFormVisible: false,
        dialogPicVisible: false,
        form: {},
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
        optionsStatus1: [
          { label: '请选择', value: 0 },
          { label: '待处理', value: 1 },
          { label: '已处理', value: 2 },
          { label: '已入围', value: 3 },
          { label: '未入围', value: 4 }
        ],
        optionsStatus2: [
          { label: '请选择', value: 0 },
          { label: '倒序', value: 1 },
          { label: '正序', value: 2 }
        ],
        optionsStatus3: [
          { label: '请选择', value: 0 },
          { label: '由低到高', value: 1 },
          { label: '由高到低', value: 2 }
        ],
        optionsStatus4: [
          { label: '请选择', value: 0 },
          { label: '由低到高', value: 1 },
          { label: '由高到低', value: 2 }
        ],
        optionsType: [
          { label: '请选择', value: 0 },
          { label: '已解决', value: 1 },
          { label: '无法解决', value: 2 },
          { label: '无需解决', value: 3 }
        ],
        options2: [],
        props: {
          value: 'value',
          label: 'label',
          children: 'cities'
        },
        selectedOptions: null,
        multipleTable: [],
        downloadLoading: false,
        filename: ''
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
        for (let j = 0; j < dataProvinces.provinces.length; j++) {
          this.options2[i].cities.push({ label: dataProvinces.provinces[i].citys[j], value: dataProvinces.provinces[i].citys[j] })
        }
      }
      console.log(dataProvinces)
      console.log(this.options2)
      this.fetchData()
    },
    methods: {
      fetchData() {
        console.log(this.selectedOptions)
        console.log(this.formInline.dateValue)
        let start_time = ''
        let end_time = ''
        if (this.formInline.dateValue === '' || this.formInline.dateValue == null) {
          start_time = ''
          end_time = ''
        } else {
          start_time = this.formInline.dateValue[0].getTime() / 1000
          end_time = this.formInline.dateValue[1].getTime() / 1000
        }
        this.listLoading = true
        const obj = {
          handle_people: this.formInline.handle_people,
          handle_status: this.formInline.handle_status,
          start_time: start_time,
          end_time: end_time,
          now_page: this.currentPage,
          pagesize: this.pagesize
        }
        console.log(obj)
        getSchoolH5List(obj).then(response => {
          console.log(response)
          this.list = response.response.info
          this.listLoading = false
          this.total = response.response.count
          this.page = true
        })
      },
      goMark(item) {
        this.form = JSON.parse(JSON.stringify(item))
        if (item.handle_status === '已处理') {
          this.typeFlag = true
        } else {
          this.typeFlag = false
        }
        this.dialogFormVisible = true
        this.resetForm()
      },
      handleSizeChange(val) {
        this.pagesize = val
        this.fetchData()
        console.log(`每页 ${val} 条`)
      },
      handleCurrentChange(val) {
        this.currentPage = val
        this.fetchData()
        console.log(`当前页: ${val}`)
      },
      submitForm(formName) {
        const obj = {
          handle_people: this.form.handle_people,
          handle_status: this.form.handle_status_code,
          handle_type: this.form.handle_type_code,
          coadjutant: this.form.coadjutant,
          handle_remark: this.form.handle_remark,
          f_id: this.form.f_id
        }
        saveFeedbackInfo(obj).then(response => {
          if (response.response) {
            this.$message({
              message: response.response.msg,
              type: 'success'
            })
            this.dialogFormVisible = false
            this.fetchData()
          } else {
            this.$message({
              message: response.error_response.msg,
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
        this.fetchData()
        console.log('submit!')
      },
      selectStatus(item) {
        if (item.handle_status_code === 2) {
          this.typeFlag = true
        } else {
          this.typeFlag = false
          this.form.handle_type_code = ''
        }
        console.log(this.typeFlag)
      },
      handleSelectionChange(val) {
        this.multipleSelection = val
      },
      handleDownload() {
        if (this.list.length) {
          this.downloadLoading = true
          import('@/vendor/Export2Excel').then(excel => {
            const tHeader = ['作品编号', '晓黑板账号', '手机归属地', '作品说明', '用户角色', '提交时间', '入围状态', '专家打分', '网络票']
            const filterVal = ['f_id', 'detail', 'feedback_name', 'feedback_name', 'feedback_name', 'feedback_name', 'feedback_name', 'feedback_name', 'feedback_name']
            const list = this.list
            for (let i = 0; i < 10000; i++) {
              list.push(this.list[1])
              console.log()
            }
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
        this.dialogPicVisible = true
        console.log(item)
      },
      operating(item, flag) {
        let info = ''
        let successInfo = ''
        let errorInfo = ''
        if (flag === 1) {
          info = '您已选择1号作品为入围作品'
          successInfo = '操作成功'
          errorInfo = '操作已取消'
          console.log()
        } else if (flag === 2) {
          info = '您已选择1号作品为未入围作品'
          successInfo = '操作成功'
          errorInfo = '操作已取消'
          console.log()
        } else if (flag === 3) {
          info = '您已选择1，12，13号作品为入围作品'
          successInfo = '1，12，13号作品已入围，请重新选择'
          errorInfo = '操作已取消'
          console.log()
        } else if (flag === 4) {
          info = '您已选择1，12，13号作品未入围作品'
          successInfo = '1，12，13号作品未入围，请重新选择'
          errorInfo = '操作已取消'
          console.log()
        }
        this.$confirm(info, '操作确认', {
          confirmButtonText: '保存',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
        }).then(() => {
          this.$message({
            type: 'success',
            message: successInfo
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: errorInfo
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
</style>
