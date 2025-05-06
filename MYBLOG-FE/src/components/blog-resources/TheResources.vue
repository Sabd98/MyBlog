<template>
  <section>
    <!-- Main Tab -->
    <base-card>
      <div class="p-2 space-x-3">
        <base-button
          @click="setSelectedTab('stored-posts')"
          :mode="storedResButtonMode"
          >All Blog Posts</base-button
        >
        <base-button
          @click="setSelectedTab('add-post')"
          :mode="addResButtonMode"
          >Add Post</base-button
        >
      </div>
    </base-card>
    <keep-alive>
      <component :is="selectedTab" @submit-post="handlePostSubmit"></component>
    </keep-alive>
  </section>
</template>

<script>
import StoredPosts from "./StoredPosts.vue";
import addPost from "./AddPost.vue";
import axios from "axios";

export default { //Tab components
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
  provide() { //posts and remove provide 
    return {
      posts: this.storedPosts,
      deletePost: this.removePost,
    };
  },
  async created() {
    await this.fetchPosts();
  },
  computed: { 
    //Selected Tab display
    storedResButtonMode() {
      return this.selectedTab === "stored-posts" ? null : "flat";
    },
    addResButtonMode() {
      return this.selectedTab === "add-post" ? null : "flat";
    },
  },
  methods: {
    // Set Clicked Tab
    setSelectedTab(tab) {
      this.selectedTab = tab;
    },
    //Render all Posts
    async fetchPosts() {
      try {
        const response = await axios.get(
          "https://myblog-production-9038.up.railway.app/"
        );
        this.storedPosts.splice(0, this.storedPosts.length, ...response.data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    },
    //Submit a Post handler
    async handlePostSubmit(formData) {
      try {
        const response = await axios.post(
          "https://myblog-production-9038.up.railway.app",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        this.storedPosts.unshift(response.data);
        this.selectedTab = "stored-posts";
      } catch (error) {
        console.error("Error creating post:", error);
      }
    },
    //Delete Post Handler
    async removePost(postId) {
      try {
        await axios.delete(
          `https://myblog-production-9038.up.railway.app/${postId}`
        );
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
