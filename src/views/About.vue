<template>
  <div class="about">
    <div
      v-if="pokemonItem"
      class="w-3/12 m-auto bg-purple-100 mt-4 shadow-2xl flex justify-center flex-col items-center"
    >
      <h3 class="text-2xl text-green-900 uppercase">{{ pokemonItem.name }}</h3>

      <div class="flex justify-center" v-if="pokemonItem.sprites">
        <img
          class="w-48"
          :src="pokemonItem.sprites.front_shiny"
          alt="Pokemon fronts"
          loading="lazy"
        />
        <img
          class="w-48"
          :src="pokemonItem.sprites.back_shiny"
          alt="Pokemon backs"
          loading="lazy"
        />
      </div>

      <h3 class="text-yellow-500">Types</h3>
      <div v-for="(item, index) in pokemonItem.types" :key="index">
        <h5 class="text-blue-800">{{ item.type.name }}</h5>
      </div>
    </div>
  </div>
</template>
<script>
// Menggunakan Composition API untuk router halaman
// https://next.router.vuejs.org/guide/advanced/composition-api.html#accessing-the-router-and-current-route-inside-setup

import { useRoute } from 'vue-router';
import { reactive, toRefs, onMounted } from 'vue';

export default {
  name: 'About',
  setup() {
    const route = useRoute();

    const stateData = reactive({
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
          stateData.pokemonItem = value;
        })
        .catch(() => {
          stateData.pokemonItem = {};
        });
    };

    // dipanggil ketika mounted
    onMounted(() => {
      getDataDetailPokemon();
    });

    return { ...toRefs(stateData), getDataDetailPokemon };
  },
};
</script>
<style lang="scss"></style>
