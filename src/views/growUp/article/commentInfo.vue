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
	  		<div class="user-info">
	  			<img src="../../../assets/imgs/44650116_p0.png" alt="">
	  			特朗普你吧
	  		</div>
	  	</li>
	  </ul>
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
        }
      }
    }
  }
</script>

<style scoped rel="stylesheet/scss" lang="scss">
  .comment-items{
  	.user-info{

      img{
  		width: 60px;
  	    height: 60px;
  	    border-radius: 60px;
  	  }
  	}
  }
</style>
