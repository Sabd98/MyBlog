<template>
  <!-- Blog Cards -->
  <ul class="grid grid-cols-3 gap-x-5">
    <blog-resource
      v-for="post in posts"
      :key="post.id"
      :id="post.id"
      :title="post.title"
      :description="post.description"
      :author="post.author"
      :created-at="post.createdAt"
      :image-url="post.image_url"
      @read-more="showPostDetail"
    ></blog-resource>

  </ul>
</template>

<script>
import BlogResource from "./BlogResource.vue";

export default {
  //Fetch Post Config and to Post Detail 
  inject: ["posts"],
  components: {
    BlogResource,
  },
  data() {
    return {
      selectedPostId: null,
    };
  },
  methods: {
    showPostDetail(postId) {
      this.selectedPostId = postId;
    },
  },
};
</script>

<style scoped>
ul {
  list-style: none;
  margin: auto;
  max-width: 90rem;
}
</style>
