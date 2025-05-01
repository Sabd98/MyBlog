<template>
<button :class="buttonClasses" class="space-x-2">
      <slot></slot>
  </button>
</template>

<script>
export default {
  props: ['mode'],
  computed: {
    buttonClasses() {
      const base = 'px-6 py-3 font-roboto rounded-lg transition-colors duration-200 cursor-pointer'
      return this.mode === 'flat' 
        ? `${base} bg-accent text-primary hover:text-white hover:bg-secondary` 
        : `${base} bg-primary text-white hover:bg-secondary`
    }
  }
}
</script>

