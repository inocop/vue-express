<template>
  <component v-bind:is="layout"/>
</template>

<script>
  const defaultLayout = 'default';

  export default {
    computed: {
      layout() {
        return (this.$route.meta.layout || defaultLayout) + '-layout';
      }
    }
  }
</script>