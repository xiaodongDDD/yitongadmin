<template>
  <div class="data-list content">
  	<p>链接跳</p>
    <iframe v-show="iframeState" id="show-iframe"  frameborder=0 name="showHere" height="800px" width="100%" src="#/labelList/labelList"></iframe>
  </div>
</template>

<script>
  export default {
    name: 'dataLists',
    data() {
      return {
       iframeState: true
      }
    }
  }
</script>

<style scoped>

</style>
