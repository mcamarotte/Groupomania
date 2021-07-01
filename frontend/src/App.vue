<template>
  <div id="app">
    <div
      id="nav"
      class="d-flex sticky-top justify-content-start justify-content-sm-center mb-2 p-3">
      <router-link to="/">
        <img
          id="logo"
          :src="require('../src/assets/logo/icon-left-font-monochrome-black.png')"
          alt="logo Groupomania"
        />
      </router-link>
    </div>
    <NotificationAlert />
    <router-view />
  </div>
</template>

<script>

import NotificationAlert from '../src/components/NotificationAlert'
export default {
  name: 'App',
  components: {
    NotificationAlert
  }
}

</script>

<style>

#app {
  font-family: Georgia, serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  background: rgb(9, 9, 70);
}
#nav {
  background: white;
  box-shadow: 0 0 6px black;
  z-index: 1;
}
#logo {
    max-width: 300px;
}

</style>