<template>
  <the-header title="Sabda's Blog"></the-header>
  <router-view></router-view>
</template>

<script>
import TheHeader from "./components/layouts/TheHeader.vue";

export default {
  components: {
    TheHeader
  }
};
</script>