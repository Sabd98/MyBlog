<template>
  <li class="max-w-xl mx-auto">
    <!-- Card Layout -->
    <base-card>
      <img
        :src="`https://myblog-production-9038.up.railway.app${imageUrl}`"
        alt="Post image"
        class="post-image"
      />
      <div class="p-4">
        <h1 class="font-bold">{{ title }}</h1>
        <p class="text-justify indent-10 mt-3">{{ description }}</p>
        <router-link
          :to="{ name: 'PostDetail', params: { id: id } }"
          class="read-more-link"
          >Read More...</router-link
        >
        <div class="meta">
          <span>By: {{ author }} </span>
          <span>{{ formattedDate }}</span>
        </div>
        <div class="actions">
          <base-button mode="flat" @click="deletePost(id)">
            <TrashIcon color="red" :size="20" />
          </base-button>
        </div>
      </div>
    </base-card>
  </li>
</template>

<script>
import { TrashIcon } from "lucide-vue-next";

export default {
  components: {
    TrashIcon,
  },
  props: ["id", "title", "description", "author", "createdAt", "imageUrl"],
  computed: {
    //date format and back page handler
    formattedDate() {
      return new Date(this.createdAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    },
    link() {
      return `/${this.id}`;
    },
  },
  methods: {
    //Emitting read more method
    readMore() {
      this.$emit("read-more", this.id);
    },
  },
  inject: ["deletePost"],
};
</script>

<style lang="scss" scoped>
.post-image {
  width: 100%;
  height: 20rem;
  object-fit: fill;
  border-radius: 8px 8px 0 0;
}

.actions {
  margin-top: 1rem;
  display: flex;
  gap: 0.5rem;
}

.meta {
  display: flex;
  gap: 1rem;
  font-size: 0.9rem;
  color: #666;
}

.read-more-link {
  text-decoration: none;
  cursor: pointer;
  border-radius: 4px;
  transition: 0.2s;
  color: #969696;

  &:hover {
    color: #353535;
  }
}
</style>
