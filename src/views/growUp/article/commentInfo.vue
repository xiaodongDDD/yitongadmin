<template>
  <div class="comment-info content">
  	<h3>文章标题</h3>

  	<h5>2017-10-07 22:33</h5>

  	<el-radio-group v-model="tabPosition" style="margin-bottom: 30px;">
	  <el-radio-button label="0">全部评论（50）</el-radio-button>
	  <el-radio-button label="1">已回复（30）</el-radio-button>
	  <el-radio-button label="2">待回复（30）</el-radio-button>
	  <el-radio-button label="3">审核通过（30）</el-radio-button>
	  <el-radio-button label="4">待审核（30）</el-radio-button>
	</el-radio-group>

	<div class="comment">
	  <ul class="comment-items">
	  	<li>
	  	  <div class="top">
	  	    <div class="user-info fleft">
	  		  <img src="../../../assets/imgs/44650116_p0.png" alt="">
	  		  特朗普你吧
	  	    </div>
	  	    <div class="time fleft">10-07 23:20</div>
	  	  </div>

	  	  <div class="content">老师您说的太对了，特朗普是个熊孩子！</div>

	  	  <div class="bot-bot">
	  	    <el-button type="text">取消置顶</el-button>
	  	    <el-button type="text">回复</el-button>
	  	    <el-button type="text">审核通过</el-button>
	  	  </div>

	  	  <div class="reply">
	  	  	<div class="top">
	  	      <div class="user-info fleft">我的回复</div>
	  	      <div class="time fleft">10-07 23:20</div>
	  	    </div>

	  	    <div class="content">熊孩子就要使劲打！</div>
	  	    <el-button type="text" class="delete-re">删除</el-button>
	  	  </div>
	  	</li>
	  	<li>
	  	  <div class="top">
	  	    <div class="user-info fleft">
	  		  <img src="../../../assets/imgs/44650116_p0.png" alt="">
	  		  特朗普你吧
	  	    </div>
	  	    <div class="time fleft">10-07 23:20</div>
	  	  </div>

	  	  <div class="content">老师您说的太对了，特朗普是个熊孩子！</div>

	  	  <div class="bot-bot">
	  	    <el-button type="text">取消置顶</el-button>
	  	    <el-button type="text">回复</el-button>
	  	    <el-button type="text">审核通过</el-button>
	  	  </div>

	  	  <div class="reply">
	  	  	<div class="top">
	  	      <div class="user-info fleft">我的回复</div>
	  	      <div class="time fleft">10-07 23:20</div>
	  	    </div>

	  	    <div class="content">熊孩子就要使劲打！</div>
	  	    <el-button type="text" class="delete-re">删除</el-button>
	  	  </div>
	  	</li>
	  </ul>
	</div>
    <div class="list-pagination">
      <el-pagination
        background
        layout="prev, pager, next"
        :total="pageData.allSum">
      </el-pagination>
    </div>

  </div>
</template>

<script>
  export default {
    name: 'commentInfo',
    data() {
      return {
        tabPosition: '1',
        ruleForm: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        },
        pageData: {
          allSum: 1
        }
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
