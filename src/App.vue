<template>
  <div class="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  components: {},
  data: function() {
    return {
      msg: "hello app",
      count: 0
    };
  }
};
</script>

<style>
html,
body {
  padding: 0;
  margin: 0;
  width: 100%;
  height: 100%;
}
.app {
  width: 100%;
  height: 100%;
}
</style>
