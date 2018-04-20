<template>
  <div class="center-content power-list">
    权限列表
    haha
    <p @click='test'>hahahaha</p>
  </div>
</template>

<script>
  export default {
    name: 'powerList',
    data(){
      return {

      }
    },
    methods: {
       test() {
       	let obj = {
       		aid: 65,
       		auth_token: 'ZGU1ZXJ2NDMrS2lJekN4Q2duWExlNXMvdVNjbGFZcHVTa1dLN2JlUFljM013b1FVVmcvQ081UWRIRzgzMU12YjhleXNWdTRjNFBrZlhzNA=='
       	}
       	this.eduData.getData('article.detail', obj)
       	   .then(res => {
       	   	  console.log(res)
       	   })
       }
    }
  }
</script>

<style scoped>

</style>
