<template>
  <base-card>
    <div class="p-2 space-x-3">
      <base-button
        @click="setSelectedTab('stored-posts')"
        :mode="storedResButtonMode"
        >All Blog Posts</base-button
      >
      <base-button @click="setSelectedTab('add-post')" :mode="addResButtonMode"
        >Add Post</base-button
      >
    </div>
  </base-card>
  <keep-alive>
    <component :is="selectedTab" @submit-post="handlePostSubmit"></component>
  </keep-alive>
</template>

<script>
import StoredPosts from "./StoredPosts.vue";
import addPost from "./AddPost.vue";
import axios from "axios";

export default {
  components: {
    StoredPosts,
    addPost,
  },
  data() {
    return {
      selectedTab: "stored-posts",
      storedPosts: [],
    };
  },
  provide() {
    return {
      posts: this.storedPosts,
      addPost: this.addPost,
      deletePost: this.removePost,
    };
  },
  async created() {
    await this.fetchPosts();
  },
  computed: {
    storedResButtonMode() {
      return this.selectedTab === "stored-posts" ? null : "flat";
    },
    addResButtonMode() {
      return this.selectedTab === "add-post" ? null : "flat";
    },
  },
  methods: {
    setSelectedTab(tab) {
      this.selectedTab = tab;
    },
    async fetchPosts() {
      try {
        const response = await axios.get("http://localhost:3000/");
        this.storedPosts.splice(0, this.storedPosts.length, ...response.data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    },
    async handlePostSubmit(formData) {
      try {
        const response = await axios.post("http://localhost:3000", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        this.storedPosts.unshift(response.data);
        this.selectedTab = "stored-posts";
      } catch (error) {
        console.error("Error creating post:", error);
      }
    },
    async removePost(postId) {
      try {
        await axios.delete(`http://localhost:3000/${postId}`);
        const index = this.storedPosts.findIndex((post) => post.id === postId);

        if (index > -1) {
          this.storedPosts.splice(index, 1);
        }
      } catch (error) {
        console.error("Error deleting post:", error);
      }
    },
  },
};
</script>
