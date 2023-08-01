<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App',
};
</script>

<style lang="scss">
body, html {
  margin: 0;
  padding: 0;
}

.app {
  width: 100%;
  height: 100vh;
  background-color: #f0f0f0;
}
</style>
