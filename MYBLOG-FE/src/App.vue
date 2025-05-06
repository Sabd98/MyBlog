<template>
  <main>
 <the-header title="Sabda's Blog"></the-header>
  <router-view></router-view>
  </main>
 
</template>

<script>
import TheHeader from "./components/layouts/TheHeader.vue";

export default {
  components: {
    TheHeader
  }
};
</script>