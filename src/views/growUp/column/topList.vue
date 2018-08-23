<template>
  <div class="top-list content">

    <div class="top-container list-container">
      <div class="column1 column">
        <h4>育儿好文</h4>
        <ul class="children-list">
          <li @click='changeChild(index)' v-for="(item, index) in childs1">
            <div class="child">
              <img :src="item.cover" alt="" />
              <p>{{ item.short_title }}</p>
            </div>
          </li>
        </ul>
      </div>

      <div class="column2 column">
        <h4>精品专栏</h4>

        <ul class="children-list">
          <li>
            <div class="child">
              <img src="../../../assets/imgs/add-stu.png" alt="" />
              <p></p>
            </div>
          </li>
          <li>
            <div class="child">
              <img src="../../../assets/imgs/add-stu.png" alt="" />
              <p></p>
            </div>
          </li>
        </ul>
      </div>

      <div class="column3 column">
        <h4>知晓天下<span>请点击下方蓝字选择</span></h4>

        <ul class="children-list">
          <li class="clickt">短标题1</li>
          <li class="clickt">短标题2</li>
          <li class="clickt">短标题3</li>
          <li class="clickt">短标题4</li>
        </ul>
      </div>
      
      <div class="column4 column">
        <h4>听见好书</h4>

        <ul class="children-list">
          <li>
            <div class="child">
              <img src="../../../assets/imgs/add-stu_1.png" alt="" />
              <p></p>
            </div>
          </li>
        </ul>
      </div>
    </div>


    <el-dialog
      title="育儿好文编辑"
      :visible.sync="childDialogVisible"
      width="30%">
      <div class="edit-container">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="80px" class="demo-ruleForm">
          <el-form-item label="选择图片" prop="img">
            <upImage1 ref="upLoadFile1" :urls="urls1" v-if='isAlive1'></upImage1>
            <p style="line-height: 20px;">说明：请上传大小为330*180像素，格式为JPEG或者PNG的图片</p>
          </el-form-item>
          <el-form-item label="选择文章" prop="name">
            <el-input v-model="ruleForm.name" placeholder="最多输入20个汉字"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="titleDialogVisible = false">保 存</el-button>
        <el-button @click="titleDialogVisible = false">取 消</el-button>
      </span>
    </el-dialog>

    <el-dialog
      title="精品专栏编辑"
      :visible.sync="pageDialogVisible"
      width="30%">
      <div class="edit-container">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="80px" class="demo-ruleForm">
          <el-form-item label="选择图片" prop="img">
            <upImage2 ref="upLoadFile2" :urls="urls2" v-if='isAlive2'></upImage2>
            <p style="line-height: 20px;">说明：请上传大小为330*200像素，格式为JPEG或者PNG的图片</p>
          </el-form-item>
          <el-form-item label="选择文章" prop="name">
            <el-input v-model="ruleForm.name" placeholder="最多输入20个汉字"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="titleDialogVisible = false">保 存</el-button>
        <el-button @click="titleDialogVisible = false">取 消</el-button>
      </span>
    </el-dialog>

    <el-dialog
      title="知晓天下编辑"
      :visible.sync="seeDialogVisible"
      width="30%">
      <div class="edit-container">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="80px" class="demo-ruleForm">
          <el-form-item label="选择文章" prop="name">
            <el-input v-model="ruleForm.name" placeholder="最多输入20个汉字"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="titleDialogVisible = false">保 存</el-button>
        <el-button @click="titleDialogVisible = false">取 消</el-button>
      </span>
    </el-dialog>

    <el-dialog
      title="听见好书编辑"
      :visible.sync="bookDialogVisible"
      width="30%">
      <div class="edit-container">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="80px" class="demo-ruleForm">
          <el-form-item label="选择图片" prop="img">
            <upImage3 ref="upLoadFile3" :urls="urls3" v-if='isAlive3'></upImage3>
            <p style="line-height: 20px;">说明：请上传大小为208*280像素，格式为JPEG或者PNG的图片</p>
          </el-form-item>
          <el-form-item label="选择文章" prop="name">
            <el-input v-model="ruleForm.name" placeholder="最多输入20个汉字"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="titleDialogVisible = false">保 存</el-button>
        <el-button @click="titleDialogVisible = false">取 消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import { topList, topInfo, topSave } from '@/api/schoolH5'
  import upImage1 from '../upImg/topImg1'
  import upImage2 from '../upImg/topImg2'
  import upImage3 from '../upImg/topImg3'
  import defaultHead from '../../../assets/imgs/add-stu.png'
  export default {
    name: 'topList',
    data() {
      return {
        defaultHead: defaultHead,
        childDialogVisible: false,
        pageDialogVisible: false,
        seeDialogVisible: false,
        bookDialogVisible: false,
        isAlive1: true,
        urls1: {
          url: '',
          type: ''
        },
        isAlive2: true,
        urls2: {
          url: '',
          type: ''
        },
        isAlive3: true,
        urls3: {
          url: '',
          type: ''
        },
        childs1: [
        {
          title: "",
          short_title: "",
          cover: defaultHead
        },
        {
          title: "",
          short_title: "",
          cover: defaultHead
        },
        {
          title: "",
          short_title: "",
          cover: defaultHead
        },
        {
          title: "",
          short_title: "",
          cover: defaultHead
        }],
        ruleForm: {
          index: 1,
          name: '',
          showTitle: '0',
          img: '',
          sort: '',
          href: 'hao123.com'
        },
        rules: {
          name: [
            { required: true, message: '请输入活动名称', trigger: 'blur' },
            { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
          showTitle: [
            { required: true, message: '请选择是否展示标题', trigger: 'change' }
          ],
          sort: [
            { required: true, message: '请输入展示排序', trigger: 'blur' }
          ],
          href: [
            { required: true, message: '请输入链接', trigger: 'blur' }
          ],
          img: [
            { required: true, message: '请选择图片', trigger: 'blur' }
          ]
        }
      }
    },
    mounted() {
      this.initData()
    },
    components: {
      upImage1,
      upImage2,
      upImage3
    },
    methods: {
      initData() {
        const obj = {
          token: localStorage.getItem('TOKEN')
        }
        topList(obj).then(res => {
          console.log(res)
        })
      },
      changeChild(index) {
        this.childDialogVisible = true
      }
    }
  }
</script>

<style scoped rel="stylesheet/scss" lang="scss">
  .column{
    margin-bottom: 40px;
  }
  .children-list{
    list-style: none;
    overflow: hidden;
    width: 700px;
    margin-top: 0;
    padding: 0;

    li{
      // width: 200px;
      text-align: center;
      float: left;
      margin-right: 20px;
      margin-bottom: 20px;
      cursor: pointer;
    }

    .child{
      position: relative;

      span {
        position: absolute;
        left: 116px;
        top: 130px;
        color: #999;
      }
      img{
        width: 150px;
      }
    }
  }
  .column3{
    h4{

      span{
        font-size: 14px;
        color: #333;
        font-weight: normal;
      }
    }
    li{
      text-align: left;
    }
    .clickt{
      color: blue;
    }
  }
  .column4{
     .child img{
      width: 106px;
     }
  }
</style>
