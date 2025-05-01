<template>
  <teleport to="body">
    <div class="fixed inset-0 bg-dialogOverlay" @click="$emit('close')"></div>
    <dialog class="fixed top-[20vh] left-[10%] w-[80%] rounded-xl shadow-xl md:left-[calc(50%-20rem)] md:w-[40rem]" open>
      <header class="w-full p-4 bg-primary text-white">
        <slot name="header">
          <h2 class="m-0 text-2xl">{{ title }}</h2>
        </slot>
      </header>
      <section class="p-4">
        <slot></slot>
      </section>
      <menu class="flex justify-end p-4 m-0">
        <slot name="actions">
          <base-button @click="$emit('close')">Close</base-button>
        </slot>
      </menu>
    </dialog>
  </teleport>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: false,
    },
  },
  emits: ['close'],
};
</script>
