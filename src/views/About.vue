<template>
  <div class="about">
    <h1>This is an about page</h1>
    <p>Slug Data : {{ slugdata }}</p>
  </div>
</template>
<script>
// Menggunakan Composition API untuk router halaman
// https://next.router.vuejs.org/guide/advanced/composition-api.html#accessing-the-router-and-current-route-inside-setup

import { useRoute } from 'vue-router';
import { reactive, toRefs } from 'vue';

export default {
  name: 'About',
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
  setup() {
    const route = useRoute();

    const state = reactive({
      pokemonItem: {},
    });

    const slugdata = route.params.slug;

    const getDataDetailPokemon = () => {
      fetch(`https://pokeapi.co/api/v2/pokemon/${slugdata}`)
        .then(response => {
          if (response.status === 200) {
            return response.json();
          }
          return Promise.reject(new Error(`Error mengambil response ${response.status}`));
        })
        .then(value => {
          console.log(value);
        })
        .catch(error => {
          console.log(error);
        });
    };

    return { ...toRefs(state), getDataDetailPokemon };
  },
};
</script>
<style lang="scss"></style>
