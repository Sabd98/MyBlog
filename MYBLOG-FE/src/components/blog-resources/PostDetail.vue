<template>
  <div v-if="post" class="post-detail-page">
    <base-card class="p-6">
    <!-- Detail Component -->
      <div v-if="!isEditing">
        <div class="header">
          <h1 class="font-bold">{{ post.title }}</h1>
          <div class="actions">
            <base-button mode="flat" @click="enableEditing">
              <FilePenIcon :size="20" />
            </base-button>
            <router-link to="/" class="back-button">
              <base-button mode="flat" class="flex space-3">
                <ArrowLeftIcon :size="20" /> Back
              </base-button>
            </router-link>
          </div>
        </div>

        <div class="meta">
          <span class="author">By: {{ post.author }}</span>
          <span class="date">{{ formattedDate }}</span>
        </div>

        <img
          :src="`https://myblog-production-9038.up.railway.app${post.image_url}`"
          class="post-image"
        />

        <div class="content">
          <p class="full-content">{{ post.content }}</p>
        </div>
      </div>

      <!-- Form Component -->
      <form v-else @submit.prevent="submitUpdate">
        <div class="form-control">
          <label>Title</label>
          <input v-model="editData.title" />
        </div>
        <div class="form-control">
          <label>Description</label>
          <textarea v-model="editData.description"></textarea>
        </div>
        <div class="form-control">
          <label>Content</label>
          <textarea v-model="editData.content" rows="6"></textarea>
        </div>
        <div class="form-control">
          <label>Current Image</label>
          <img
            v-if="post.image_url"
            :src="
              'https://myblog-production-9038.up.railway.app' + post.image_url
            "
            class="preview-image"
          />
          <input type="file" @change="handleImageUpload" />
        </div>

        <div class="form-actions">
          <base-button type="button" mode="flat" @click="cancelEditing"
            >Cancel
          </base-button>
          <base-button type="submit" mode="flat" class="flex space-3">
            Save <Save :size="20" />
          </base-button>
        </div>
      </form>
    </base-card>
  </div>
  <div v-else-if="isLoading" class="loading">Loading post...</div>
  <div v-else class="error">Error loading post: {{ error }}</div>
</template>

<script>
import axios from "axios";
import { ArrowLeftIcon, FilePenIcon, Save } from "lucide-vue-next";

export default {
  components: {
    FilePenIcon,
    ArrowLeftIcon,
    Save,
  },
  props: ["id"],
  data() {
    return {
      post: null,
      isLoading: false,
      error: null,
      isEditing: false,
      editData: {
        title: "",
        description: "",
        content: "",
        image: null,
      },
    };
  },
  computed: {
    //Date format
    formattedDate() {
      return new Date(this.post.createdAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    },
  },
  async created() {
    await this.fetchPost();
  },
  methods: {
    //Fetch a post detail
    async fetchPost() {
      this.isLoading = true;
      try {
        const response = await axios.get(
          `https://myblog-production-9038.up.railway.app/${this.id}`
        );
        this.post = response.data;
        console.log(this.post);
      } catch (error) {
        this.error = error.message;
      } finally {
        this.isLoading = false;
      }
    },
    //toEditHandler
    enableEditing() {
      this.isEditing = true;
      this.initEditData();
    },
    initEditData() {
      this.editData = {
        title: this.post.title,
        description: this.post.description,
        content: this.post.content,
        image: null,
      };
    },
    //Image Upload Handler
    handleImageUpload(event) {
      this.editData.image = event.target.files[0];
    },
    //Update data Handler
    async submitUpdate() {
      try {
        const formData = new FormData();
        formData.append("title", this.editData.title);
        formData.append("description", this.editData.description);
        formData.append("content", this.editData.content);
        if (this.editData.image) formData.append("image", this.editData.image);

        const response = await axios.put(
          `https://myblog-production-9038.up.railway.app/${this.id}`,
          formData,
          { headers: { "Content-Type": "multipart/form-data" } }
        );

        this.post = response.data;
        this.isEditing = false;
      } catch (error) {
        console.error("Error updating post:", error);
      }
    },
    cancelEditing() {
      this.isEditing = false;
    },
  },
};
</script>

<style lang="scss" scoped>
.loading {
  text-align: center;
  padding: 2rem;
  font-size: 1.2rem;
  color: #666;
}

.error {
  color: #dc3545;
  padding: 2rem;
  text-align: center;
  font-weight: bold;
}

.post-detail-page {
  max-width: 800px;
  margin: 2rem auto;
  padding: 0 1rem;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
}

.meta {
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
  color: #666;
  font-size: 0.9rem;
}

.post-image {
  width: 50%;
  max-height: 100%;
  object-fit: cover;
  border-radius: 8px;
  margin: 1rem 0;
}

.content {
  margin-top: 2rem;
  line-height: 1.6;
}

.full-content {
  white-space: pre-wrap;
  margin-top: 1rem;
}

.back-button {
  text-decoration: none;
}

.actions {
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
}

.form-control {
  margin-bottom: 1.5rem;

  label {
    display: block;
    margin-bottom: 0.5rem;
    font-weight: bold;
  }

  input,
  textarea {
    width: 100%;
    padding: 0.5rem;
    border: 1px solid #ddd;
    border-radius: 4px;
  }
}

.preview-image {
  max-width: 300px;
  margin: 1rem 0;
  border-radius: 8px;
}

.form-actions {
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
  margin-top: 2rem;
}
</style>
