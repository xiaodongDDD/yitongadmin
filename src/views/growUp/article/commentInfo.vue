<template>
  <div class="comment-info content">
  	<h3>{{ article_info.title }}</h3>

  	<h5>{{ article_info.publish_time }}</h5>

  	<el-radio-group v-model="tabPosition" style="margin-bottom: 30px;">
	  <el-radio-button label="">全部评论{{ '('+ article_info.comment_all +') '}}</el-radio-button>
	  <el-radio-button label="1">已回复{{ '('+ article_info.comment_replied +')'}}</el-radio-button>
	  <el-radio-button label="2">待回复{{ '('+ article_info.comment_repling +')'}}</el-radio-button>
	  <el-radio-button label="3">审核通过{{ '('+ article_info.comment_checked +')'}}</el-radio-button>
	  <el-radio-button label="4">待审核{{ '('+ article_info.comment_checking +')'}}</el-radio-button>
	</el-radio-group>

	<div class="comment">
	  <ul class="comment-items">
	  	<li v-for="(item, index) in comment_info">
	  	  <div class="top">
	  	    <div class="user-info fleft">
	  		  <img :src="item.avator" alt="">
	  		  {{ item.display_name }}
	  	    </div>
	  	    <div class="time fleft">{{ item.comment_time }}</div>
	  	  </div>

	  	  <div class="content">{{ item.content }}</div>

	  	  <div class="bot-bot">
          <el-button type="text" v-if="item.is_stick === '1'" @click="setTop(item.comment_id, item.is_stick)">取消置顶</el-button>
	  	    <el-button type="text" v-if="item.is_stick === '0'" @click="setTop(item.comment_id, item.is_stick)">置顶</el-button>
          <el-button type="text" @click='replys(item.comment_id)' v-if="item.is_reply === 0">回复</el-button>
	  	    <el-button type="text" disabled v-if="item.is_reply === 1">已回复</el-button>
          <el-button type="text" v-if="item.status === '1'" @click='checks(item.comment_id)'>审核通过</el-button>
	  	    <el-button type="text" v-if="item.status === '2'" disabled>审核已通过</el-button>
	  	  </div>

	  	  <div class="reply" v-if="item.is_reply === 1">
	  	  	<div class="top">
	  	      <div class="user-info fleft">我的回复</div>
	  	      <div class="time fleft">{{ item.reply_time }}</div>
	  	    </div>
	  	    <div class="content">{{ item.reply_content }}</div>
	  	    <el-button type="text" class="delete-re" @click="deletes(item.comment_id)">删除</el-button>
	  	  </div>
        <div class="reply" v-if="item.is_reply === 0 && repling && replyId === item.comment_id ">
          <el-input
            type="textarea"
            style='width:800px;'
            autosize
            maxlength=200
            placeholder="回复该评论：最多输入200字"
            v-model="textarea">
          </el-input>
          <el-button type="text" class="delete-re" @click='commit(item.comment_id)'>提交</el-button>
        </div>
	  	</li>
	  </ul>
	</div>
    <div class="list-pagination">
      <el-pagination
        background
        @current-change="handleCurrentChange"
        layout="prev, pager, next"
        :total="pageData.allSum">
      </el-pagination>
    </div>

  </div>
</template>

<script>
  import { growCommnetDetail, commentPass, growCommnetReply, replyDelete, handleGrowCommnet } from '@/api/schoolH5'
  export default {
    name: 'commentInfo',
    data() {
      return {
        tabPosition: '',
        currentId: '',
        textarea: '',
        repling: false,
        replyId: '',
        article_info: {},
        comment_info: [],
        pageData: {
          allSum: 1
        }
      }
    },
    mounted() {
      this.currentId = this.$route.query.article_id
      this.initData()
    },
    methods: {
      initData() {
        const obj = {
          token: localStorage.getItem('TOKEN'),
          article_id: this.currentId,
          type: this.tabPosition,
          page: this.currentPage
        }
        growCommnetDetail(obj)
          .then(res => {
            if (res.hasOwnProperty('response')) {
              console.log(res)
              this.article_info = res.response.article_info
              this.comment_info = res.response.comment_info
              this.pageData.allSum = res.response.comment_sum
            } else {
              this.$message.error(res.error_response.msg)
            }
          })
          .catch(err => {
            console.log(err)
          })
      },
      checks(val) {
        const obj = {
          token: localStorage.getItem('TOKEN'),
          comment_id: val
        }
        commentPass(obj)
          .then(res => {
            if (res.hasOwnProperty('response')) {
              console.log(res)
              this.initData()
              this.$message.success(res.response.msg)
            } else {
              this.$message.error(res.error_response.msg)
            }
          })
          .catch(err => {
            console.log(err)
          })
      },
      replys(val) {
        this.repling = true
        this.replyId = val
      },
      commit(val) {
        const obj = {
          token: localStorage.getItem('TOKEN'),
          comment_id: val,
          content: this.textarea
        }
        growCommnetReply(obj)
          .then(res => {
            if (res.hasOwnProperty('response')) {
              console.log(res)
              this.initData()
              this.$message.success(res.response.msg)
              this.textarea = ''
            } else {
              this.$message.error(res.error_response.msg)
            }
          })
          .catch(err => {
            console.log(err)
          })
      },
      setTop(val1, val2) {
        const obj = {
          token: localStorage.getItem('TOKEN'),
          comment_id: val1,
          status: val2
        }
        handleGrowCommnet(obj)
          .then(res => {
            if (res.hasOwnProperty('response')) {
              console.log(res)
              this.initData()
              this.$message.success(res.response.msg)
            } else {
              this.$message.error(res.error_response.msg)
            }
          })
          .catch(err => {
            console.log(err)
          })
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`)
        this.currentPage = val
        this.initData()
      },
      deletes(val) {
        this.$confirm('此操作将删除该回复, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          const obj = {
            token: localStorage.getItem('TOKEN'),
            comment_id: val
          }
          replyDelete(obj)
            .then(res => {
              if (res.hasOwnProperty('response')) {
                console.log(res)
                this.initData()
                this.repling = false
                this.$message.success(res.response.msg)
              } else {
                this.$message.error(res.error_response.msg)
              }
            })
            .catch(err => {
              console.log(err)
            })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
      }
    },
    watch: {
      'tabPosition': function(news, olds) {
        this.currentPage = '1'
        this.repling = false
        this.initData()
      }
    }
  }
</script>

<style scoped rel="stylesheet/scss" lang="scss">
  .el-radio-group{
  	margin-bottom: 0!important;

  }
  .comment{
  	border: 1px solid #dcdfe6;
  }
  .comment-items{
  	overflow: hidden;
  	padding-left: 0;
  	margin: 0;

  	.user-info{
  	  color: #999;
      img{
  		width: 60px;
  	    height: 60px;
  	    border-radius: 60px;
  	    vertical-align: middle;
  	  }
  	}
  	li{
  	  padding: 20px 0px 20px 40px;
  	  overflow: hidden;
  	  border-bottom: 1px solid #dcdfe6;

  	  &:last-child{
  	  	border-bottom: none;
  	  }

  	  .top{
  	    line-height: 60px;
  	  	overflow: hidden;
  	  }
  	  div.fleft{
  	  	float: left;
  	  }
  	  div.time{
  	  	float: right;
  	  	margin-right: 40px;
  	  	color: #666;
  	  	font-size: 14px;
  	  }
  	  .content{
  	  	padding-left: 60px;
  	  	line-height: 24px;
  	  }
  	  .bot-bot{
  	  	text-align: right;
  	  	padding-right: 40px;
  	  	height: 40px;
  	  	line-height: 40px;
  	  }
  	}
  }
  .reply{
  	overflow: hidden;
  	position: relative;
  	.user-info{
  	  padding-left: 60px;
  	}
  	.content{
  	  float: left;
  	  margin-right: 70px;
  	}
  	.delete-re{
  	  padding: 0;
  	  position: absolute;
  	  bottom: 4px;
  	  right: 40px;
  	}
  }
</style>
