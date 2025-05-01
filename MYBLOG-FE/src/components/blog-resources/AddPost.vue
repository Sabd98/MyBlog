<template>
  <base-dialog
    v-if="inputIsInvalid"
    title="Invalid Input"
    @close="confirmError"
  >
    <template #default>
      <p>Unfortunately, at least one input value is invalid.</p>
      <p>
        Please check all inputs and make sure you enter at least a few
        characters into each input field.
      </p>
    </template>
    <template #actions>
      <base-button @click="confirmError">Okay</base-button>
    </template>
  </base-dialog>
  <base-card>
    <form class="space-y-4 p-4" @submit.prevent="submitData">
      <div class="form-control">
        <label :class="labelClass" for="title">Title</label>
        <input id="title" v-model="title" />
      </div>
      <div class="form-control">
        <label :class="labelClass" for="description">Short Description</label>
        <textarea id="description" v-model="description" rows="3"></textarea>
      </div>
      <div class="form-control">
        <label :class="labelClass" for="content">Content</label>
        <textarea id="content" v-model="content" rows="6"></textarea>
      </div>
      <div class="form-control">
        <label :class="labelClass" for="image">Post Image</label>
        <input
          type="file"
          :class="inputClass"
          id="image"
          @change="handleImageUpload"
        />
      </div>
      <div>
        
        <base-button type="submit" :loading="isSubmitting"
          >Submit Post</base-button
        >
      </div>
    </form>
  </base-card>
</template>

<script>
export default {
  inject: ["addPost"],
  data() {
    return {
      title: "",
      description: "",
      content: "",
      // author: '',
      image: null,
      isSubmitting: false,
      inputIsInvalid: false,
      labelClass: "block font-bold mb-2",
      inputClass:
        "w-full p-2 border rounded focus:border-primary focus:ring-2 focus:ring-primary/50",
    };
  },
  methods: {
    handleImageUpload(event) {
      this.image = event.target.files[0];
    },
    async submitData() {
      if (!this.validateInput()) return;

      this.isSubmitting = true;

      const formData = new FormData();
      formData.append("title", this.title);
      formData.append("description", this.description);
      formData.append("content", this.content);
      if (this.image) formData.append("image", this.image);
      this.$emit("submit-post", formData);
      this.resetForm();
    },
    validateInput() {
      if (
        !this.title.trim() ||
        !this.description.trim() ||
        !this.content.trim()
      ) {
        this.inputIsInvalid = true;
        return false;
      }
      return true;
    },
    resetForm() {
      this.title = "";
      this.description = "";
      this.content = "";
      this.image = null;
    },
    confirmError() {
      this.inputIsInvalid = false;
    },
  },
};
</script>

<style scoped>
label {
  font-weight: bold;
  display: block;
  margin-bottom: 0.5rem;
}

input,
textarea {
  display: block;
  width: 100%;
  font: inherit;
  padding: 0.15rem;
  border: 1px solid #ccc;
}

input:focus,
textarea:focus {
  outline: none;
  border-color: #3a0061;
  background-color: #f7ebff;
}

.form-control {
  margin: 1rem 0;
}
</style>
