<template>
  <div class="about">
    <h1>This is an about page</h1>
    <p>Slug Data : {{ slugdata }}</p>
  </div>
</template>
<script>
export default {
  data() {
    return {
      slugdata: '',
    };
  },
  mounted() {
    this.getDataRouter();
  },
  methods: {
    getDataRouter() {
      this.slugdata = this.$route.params.slug;
    },
  },
};
</script>
<style lang="scss"></style>
