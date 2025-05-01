<template>
   <header class="w-full h-20 bg-secondary flex justify-center items-center">
    <h1 class="m-0 text-white text-3xl font-bold">{{ title }}</h1>
  </header>
</template>

<script>
export default {
  props: ['title']
}
</script>
