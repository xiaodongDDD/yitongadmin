  <template>
  <div class="file_container">
      <label>
        <!-- <div class="fileUpBtn" @click='choose1'>点击选择图片</div> -->
        <i @click='choose1' class="imgSize" element-loading-text="图片上传中" title='点击上传' v-loading.fullscreen.lock="fullscreenLoading" v-if="noup && urls.url !== ''"><img :src="urls.url" class="avatar" style="cursor:pointer;"></i>
        <i @click='choose1' class="imgSize" element-loading-text="图片上传中" v-loading.fullscreen.lock="fullscreenLoading" title='点击上传' v-if="noup === false"><img :src="imgUrl" class="avatar" style="cursor:pointer;"></i>
        <i v-if="urls.url === ''  && noup" title='点击上传' v-loading.fullscreen.lock="fullscreenLoading" class="imgSize" element-loading-text="图片上传中" @click='choose1'>
          <img src="../../../assets/imgs/add-stu.png" class="avatar" style="cursor:pointer;">
        </i>
        <!-- <input id="myvideo" type="file" name="upvideo" style="display: none;" /> -->
        <form id='filesUp'>
         <input id="myfile" type="file" name="upfiles" style="display:none;" />
        </form>
      </label>
<!--       <el-dialog
      title="无法上传"
      :visible.sync="delDialogVisible"
      width="480px"
      :top='topValues'
      center
      id="del-dialog">
      <span class="text-center">文件大于50M 无法上传</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="goback">我知道了</el-button>
      </span>
    </el-dialog>
        <el-dialog
                title="取消上传"
                :visible.sync="cancelUpFile"
                width="480px"
                :top = 'topValues'
                center
                id="file_del-dialog">
                <span class="text-center">取消上传将消除目前的上传进度</span>
                <span slot="footer" class="dialog-footer">
                  <el-button @click="cancelUpFile = false">取 消</el-button>
                  <el-button type="primary" @click="sureCancelFile">取消上传</el-button>
                </span>
           </el-dialog>
  <!--  <div id='filehash' v-if='itemShow == 2'>
     <div id='upContent'>正在上传...</div>
   </div>
   <div id='delFile' v-if='itemShow == 3' @click='delFile'>
    <div class="fileName2">{{ filesName }}</div>
   删除附件
   </div> --> 
</div>
</template>
<script type="text/javascript" src="../../assets/js/cos-js-sdk-v4.js"></script>
<script>
import $ from 'jquery'
export default {
  name: 'files',
  data() {
    return {
      buckets: process.env.buckets,
      appid: '1252817547',
      upFileUrls: '',
      region: 'sh',
      topValues: '',
      lastTaskId: '',
      myFolders: '/image/',
      taskId: 0,
      size: 0,
      noup: true,
      cancelflags: false,
      sizeM: 0,
      base: 1024 * 1024,
      cos: {},
      utxt1: true,
      imgUrl: '',
      cover: false,
      fullscreenLoading: false
    }
  },
  mounted() {
    this.upFileUrls = process.env.tempurl
    const that = this
    var cos = new CosCloud({
      appid: that.appid, // APPID 必填参数
      bucket: that.buckets, // bucketName 必填参数
      region: that.region, // 地域信息 必填参数 华南地区填gz 华东填sh 华北填tj
      getAppSign: function(callback) { // 获取签名 必填参数
        $.get(that.upFileUrls + '/api/upload/getSign', function(xhr) {
          callback(xhr.data.authorization)
        }, 'json')
      },
      getAppSignOnce: function(callback) { // 单次签名，参考上面的注释即可
      }
    })
    this.cos = cos
  },
  props: ['urls'],
  methods: {
    // 成功回调
    successCallBacks(result) {
      console.log(result)
      const URL = result.data.access_url
      const img = new Image()
      img.src = URL
      console.log(img)
      const that = this
      // that.imgUrl = result.data.access_url
      // that.noup = false
      // that.$message.success('上传成功')
      that.fullscreenLoading = false
      // console.log('img.width', img.width, 'img.height', img.height)
      // 判断是否有缓存
      if (img.complete) {
      // 打印
        // alert('from:complete : width:'+img.width+',height:'+img.height)
        console.log('errors2')
        if (img.width !== 160 || img.height !== 160) {
          that.$message.error('请上传160*160px的图片')
          that.fullscreenLoading = false
          return false
        } else {
          that.imgUrl = result.data.access_url
          that.cover = true
          that.noup = false
          that.$message.success('上传成功')
          that.fullscreenLoading = false
        }
      } else {
        // 加载完成执行
        img.onload = function() {
        // 打印
          // alert('from:onload : width:'+img.width+',height:'+img.height)
          console.log('errors3')
          if (img.width !== 160 || img.height !== 160) {
            that.$message.error('请上传160*160px的图片')
            that.fullscreenLoading = false
            return false
          } else {
          that.imgUrl = result.data.access_url
          that.cover = true
          that.noup = false
          that.$message.success('上传成功')
          that.fullscreenLoading = false
          }
        }
      }
    },
    // 错误回调
    errorCallBacks(result) {
      result = result || {}
      console.log('request error:', result && result.message)
      console.log(result.responseText || 'error')
      this.$message.error('上传失败，请重新上传')
      this.fullscreenLoading = false
    },
    taskReadys(taskId) {
      this.lastTaskId = taskId
    },
    getUrl() {
      return (this.imgUrl)
    },
    openFun() {
      return this.choose1()
    },
    openFullScreen() {
      this.fullscreenLoading = true
    },
    choose1(e) {
      const that = this
      $('#myfile').off('change').on('change', function(e) {
        that.openFullScreen()
        var files = e.target.files[0]
        console.log(files)
        that.filesName = files.name
        that.size = files.size
        that.sizeM = (that.size / that.base).toFixed(2)
        console.log('size', that.size)
        console.log('sizeM', that.sizeM)
        var fileSize = parseInt(that.sizeM)
        if (fileSize > 20) {
          that.$message.error('文件大小超过20M')
          that.fullscreenLoading = false
          return false
        }
        // 查看文件名后缀是否合法
        var nameFlag = false
        var nameArr = ['PNG', 'JPEG', 'JPG', 'GIF']
        var nameIndex = that.filesName.lastIndexOf('.')
        var extension = that.filesName.substr(nameIndex + 1).toUpperCase()
        for (var i = 0; i < nameArr.length; i++) {
          if (extension === nameArr[i]) {
            nameFlag = true
            break
          }
        }
        if (!nameFlag) {
          that.$message.error('文件格式不支持')
          that.fullscreenLoading = false
          return false
        }
        // 修改file.name 唯一
        var ext = files.name.split('.')
        var fileNames = new Date().getTime() + '.' + ext[ext.length - 1]
        // console.log(fileName);return false;
        // 分片上传直接调用uploadFile方法，内部会判断是否需要分片
        // 分片上传过程可能会有 op=upload_slice_list 的 POST 请求返回 404，不会影响上传：https://  github.com /tencentyun/cos-js-sdk-v4/issues/16
        that.taskId = that.cos.uploadFile(that.successCallBacks, that.errorCallBacks, that.progressCallBacks, that.buckets, that.myFolders + fileNames, files, 0, that.taskReadys)
        // insertOnly==0 表示允许覆盖文件 1表示不允许
        $('#filesUp')[0].reset()
        return false
      })
    },
    progressCallBacks(currs, sha1s) {
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
 .file_container{
  position: relative;
 }
 #filePopUp{
    display:block;
    border-radius:5px;
    margin-top:-20px;
  }
 #filetop{
   /*height:30px;*/
   font-size:16px;
   font-weight:bold;
   line-height:30px;
   /*background: #E5E5E5;*/
   }
  .bheight{
    height:20px;
  }
  #filemiddle{
      height:30px;
      line-height: 30px;
      text-indent: 15px;
      width:0%;
      background-color:#5895FF;
      position: absolute;
      top: 0;
      left: 0;
  }
  #filebottom{
      margin-top:10px;
      /*height:20px;*/
      /*font-size:12px;*/
      color: #aaa;;
  }
  .theight{
    height:30px;
  }
  #filebottom .left{
      float:left;
  }
  #filebottom .right{
      float:right;
  }
  .fileBox{
    /*position: absolute;
    top: 5px;
    right: 10px*/
    padding: 0 30px;
    overflow:hidden;
    position:relative;
  }
  .fileBox video{
    float:left;
  }
  .fileBox .point-info{
    margin-left:340px;
  }
  .fileBox .point-info p{
    font-family: PingFangSC-Light;
    font-size: 16px;
    color: #AAAAAA;
    letter-spacing: -0.39px;
    line-height: 24px;
  }
  .fileBox .point-info input{
    width:112px;
    height:32px;
    background: #FFFFFF;
    border: 1px solid #E5E5E5;
    border-radius: 2px;
    font-family: PingFangSC-Regular;
    font-size: 16px;
    color: #444444;
    letter-spacing: -0.39px;
    line-height: 32px;
    text-align:center;
    position:absolute;
    bottom:0;
    right:30px;
    cursor:pointer;
  }

  .fileUpBtn{
    cursor:pointer;
    width: 280px;
    height: 32px;
    line-height: 32px;
    border:1px solid #dcdfe6;
    border-radius: 2px;
    color: #606266;
    text-align: center;
    font-size: 16px;
    margin-top: 10px;
  }
  .uploadRule{
    color: #aaa;
    line-height: 24px;
    text-align: center;
    margin-top: 20px;
  }
  .fileName{
    font-size: 24px;
    text-indent: 20px;
    line-height: 30px;
    margin-top: 60px;
  }
  .mpro1{
    background: #E5E5E5;
    position: relative;
  }
  .overtxt1,.overplus1,.cancelUp1{
    position: absolute;
    height:30px;
    line-height: 30px;
    top: 0;
    right: 10px;
    font-size: 14px;
    color: #444;
  }
  .overtxt1{
    left: 0;
    text-indent: 15px;
  color: #fff;
  }
  .cancel{
    right: 10px;
    z-index: 1000;
  }
  .cancelUp1 img{
    width: 10px;
    height: 10px;
    vertical-align:middle;
    cursor:pointer;
  }
  .transfer1{
    color: #4CBF4A;
    text-indent: 15px;
  }
  .dialog-footer .el-button--primary{
  background: #FFFFFF;
  border: 1px solid #E5E5E5;
  color: #444444;
}
.dialog-footer .el-button--primary:hover{
  color: #409EFF;
  border-color:#c6e2ff;
  background-color:#ecf5ff;
}
.dialog-footer button{
    height: 32px;
    width: 196px;
    line-height:8px;
  }
  .cancel-button {
    background: #FFFFFF;
    border: 1px solid #E5E5E5;
    border-radius: 2px;
    font-family: PingFangSC-Regular;
    font-size: 16px;
    color: #444444;
    letter-spacing: -0.39px;
    line-height: 8px;
  }
  #del-dialog{
  text-align: center;
}
#del-dialog .text-center{
  text-align: center;
}
#del-dialog .dialog-footer .el-button--default{
  width: 200px;
  background-color: #5895FF;
  color: #ffffff;
}
.text-center{
  display:block;
  width:90%;
  margin:0 auto;
  text-align:center;
  font-family: PingFangSC-Light;
  font-size: 16px;
  color: #444444;
  letter-spacing: -0.39px;
  line-height: 16px;
}
 .file_container .fileName1{
   font-family: PingFangSC-Regular;
   font-size: 16px;
   width: 280px;
   color: #444444;
   letter-spacing: -0.39px;
   line-height: 16px;
   padding:12px 0 8px;
   word-break: break-all;
   overflow:hidden;
 }
 .file_container .point-info input{
   width:112px;
   height:32px;
   background: #FFFFFF;
   border: 1px solid #E5E5E5;
   border-radius: 2px;
   font-family: PingFangSC-Regular;
   font-size: 16px;
   color: #444444;
   letter-spacing: -0.39px;
   line-height: 32px;
   text-align:center;
 }
 .dialog-footer button{
      height: 32px;
      width: 196px;
      line-height:8px;
  }
  .cancel-button {
      background: #FFFFFF;
      border: 1px solid #E5E5E5;
      border-radius: 2px;
      font-family: PingFangSC-Regular;
      font-size: 16px;
      color: #444444;
      letter-spacing: -0.39px;
      line-height: 8px;
  }
  .dialog-footer .el-button--primary{
    background: #FFFFFF;
    border: 1px solid #E5E5E5;
    color: #444444;
  }
  .dialog-footer .el-button--primary:hover{
     color: #409EFF;
     border-color:#c6e2ff;
     background-color:#ecf5ff;
  }
  .imgSize img{
    display: inline-block;
    width: 150px;
    overflow: hidden;
  }

  .eImg{
    width: 80px;
    height: 80px;
  }
</style>
<style>
#file_del-dialog .el-dialog__header{
  padding: 32px 20px 7px
 }
  #file_del-dialog .el-dialog__headerbtn .el-dialog__close{
     display:none;
  }
  #file_del-dialog .el-dialog__title{
    font-family: PingFangSC-Regular;
    font-size: 20px;
    color: #444444;
    letter-spacing: -0.48px;
    line-height: 20px;
  }
  #file_del-dialog .el-dialog__footer{
    padding:10px 20px 32px;
}
</style>
