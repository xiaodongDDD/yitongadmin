  <template>
  <div class="file_container">
    
        <!-- <div class="fileUpBtn" @click='choose1'>点击选择图片</div> -->
        <div class="fileBox" v-if="noup && urls.url !== ''" element-loading-text="音频上传中" v-loading.fullscreen.lock="fullscreenLoading">
          <audio width="380" controls>
            <source :src="urls.url" type="audio/mp3">
          </audio>
          <label>
            <div class="point-info">
              <div @click="upAudio">重新上传</div>
              <form id="upform">
                <input id="myaudio" type="file" style="display: none;"/>
              </form>
            </div>
          </label> 
        </div>
        <div class="fileBox" v-if="noup === false" element-loading-text="音频上传中" v-loading.fullscreen.lock="fullscreenLoading">
         <!--  <audio width="380" controls>
            <source :src="audioUrl" type="audio/mp3">
          </audio> -->
          <audio :src="audioUrl" width="380" controls>
             您的浏览器不支持 audio。
          </audio>
          <label>
            <div class="point-info">
              <div @click="upAudio" >重新上传</div>
              <form id="upform">
                <input id="myaudio" type="file" style="display: none;"/>
              </form>
            </div>
          </label>
        </div> 
        <div class="fileBox" v-if="urls.url === '' && noup" element-loading-text="音频上传中" v-loading.fullscreen.lock="fullscreenLoading">
          <label>
            <div class="point-info">
              <div @click="upAudio">点击上传</div>
              <form id="upform">
                <input id="myaudio" type="file" style="display: none;"/>
              </form>
            </div>
          </label>
        </div>
        <p style="padding: 0 20px;">请上传mp3格式的音频</p>
    
        <!-- <input id="myaudio" type="file" name="upvideo" style="display: none;" /> -->
         
</div>
</template>
<!-- <script type="text/javascript" src="../../assets/js/cos-js-sdk-v4.js"></script> -->
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
      myFolders: '/audio/',
      taskId: 0,
      size: 0,
      noup: true,
      cancelflags: false,
      sizeM: 0,
      base: 1024 * 1024,
      cos: {},
      utxt1: true,
      audioUrl: '',
      cover: false,
      fullscreenLoading: false
    }
  },
  mounted() {
    this.upFileUrls = process.env.tempurl
    this.audioUrl = this.urls.url
    console.log(this.urls)
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
      const that = this
      that.audioUrl = result.data.access_url
      that.noup = false
      that.$message.success('上传成功')
      that.fullscreenLoading = false
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
      return (this.audioUrl)
    },
    openFun() {
      return this.choose1()
    },
    openFullScreen() {
      this.fullscreenLoading = true
    },
    upAudio(e) {
      console.log(11112222)
      const that = this
      $('#myaudio').off('change').on('change', function(e) {
        that.openFullScreen()
        var files = e.target.files[0]
        console.log(files)
        that.filesName = files.name
        that.size = files.size
        that.sizeM = (that.size / that.base).toFixed(2)
        console.log('size', that.size)
        console.log('sizeM', that.sizeM)
        var fileSize = parseInt(that.sizeM)
        if (fileSize > 200) {
          that.$message.error('文件大小超过200M')
          that.fullscreenLoading = false
          return false
        }
        // 查看文件名后缀是否合法
        var nameFlag = false
        var nameArr = ['MP3']
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
        $('#upform')[0].reset()
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
    width: 200px;
    padding: 0 20px;
    position:relative;
  }
  .fileBox video{
    float:left;
  }
  .fileBox .point-info p{
    font-family: PingFangSC-Light;
    font-size: 16px;
    color: #AAAAAA;
    letter-spacing: -0.39px;
    line-height: 24px;
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
 .file_container .point-info div{
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
