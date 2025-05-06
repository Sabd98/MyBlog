<template>
  <!-- Home Page With Blog Post Handler -->
  <the-resources @post-created="handleNewPost"></the-resources>
</template>

<script>
import TheResources from "../components/blog-resources/TheResources.vue";

export default {
  //Core Scripts with Post Handlers
  components: {
    TheResources,
  },
  methods: {
    handleNewPost(newPost) {
      this.$refs.resources.fetchPosts();
    },
  },
};
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap");

* {
  box-sizing: border-box;
}

html {
  font-family: "Roboto", sans-serif;
}

body {
  margin: 0;
  background-color: #ecefca;
}
</style>
