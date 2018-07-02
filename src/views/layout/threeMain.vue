<template>
  <section class="threeMain.vue">
    <transition name="fade" mode="out-in">
      <router-view></router-view>
    </transition>
  </section>
</template>

<script>
export default {
  name: 'threeMain'
}
</script>
