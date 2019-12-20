<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style lang="scss">
#app {
  height: 100vh;
}
.page-toggle-enter-active {
  transition: opacity 0.6s;
}
.page-toggle-enter {
  opacity: 0;
}
.page-toggle-enter-to {
  opacity: 1;
}
</style>