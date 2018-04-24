<template>
  <div class="center-content official-Add">
      <div class="title">新增负责人</div>
      <div class="add-form">
      <el-form ref="form" :model="form" label-width="100px">
        <el-form-item label="负责人姓名：">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="负责学科：">
          <el-select
            v-model="value1"
            multiple
            collapse-tags
            style="margin-left: 20px;"
            placeholder="请选择">
            <el-option
              v-for="item in options1"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="负责年级：">
          <el-select
            v-model="value2"
            multiple
            collapse-tags
            style="margin-left: 20px;"
            placeholder="请选择">
            <el-option
              v-for="item in options2"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <router-link to="/itmeList"><el-button>取消</el-button></router-link>
          <el-button @click="saveUser()">保存</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'officialEdit',
    data() {
      return {
        form: {
          name: '石选晓',
          schoolName: '武宁路小学',
          userName: 'shixiuan',
          type: '0',
          telephone: '13535790897',
          email: '134752398@348.cn',
          status: 0
        },
        options1: [{
          value: '选项1',
          label: '黄金糕'
        }, {
          value: '选项2',
          label: '双皮奶'
        }, {
          value: '选项3',
          label: '蚵仔煎'
        }, {
          value: '选项4',
          label: '龙须面'
        }, {
          value: '选项5',
          label: '北京烤鸭'
        }],
        options2: [{
          value: '选项1',
          label: '黄金糕1'
        }, {
          value: '选项2',
          label: '双皮奶1'
        }, {
          value: '选项3',
          label: '蚵仔煎1'
        }, {
          value: '选项4',
          label: '龙须面1'
        }, {
          value: '选项5',
          label: '北京烤鸭1'
        }],
        value2: [],
        value1: []
      }
    },
    methods: {
      saveUser() {
        this.$router.push({ path: '/itmeList' })
      }
    }
  }
</script>

<style scoped>
.title {
  margin-bottom: 30px;
}
</style>


