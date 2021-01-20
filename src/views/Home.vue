<template>
  <div class="home">
    <div class="w-full flex justify-center">
      <input
        type="text"
        name="searchpokemon"
        id="searchpokemon"
        class="mt-10 p-2 border-blue-500 border-2 text-yellow-600"
        v-model="searchKeyText"
        placeholder="Isi kata kunci pencarian"
      />
    </div>
    <div class="mt-10 p-4 flex flex-wrap justify-center">
      <div
        v-for="(pokemon, index) in filteredListPokemon"
        :key="index"
        class="ml-4 text-2xl text-blue-500"
      >
        {{ pokemon.name }}
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue';
import { reactive, toRefs, computed } from 'vue';
import getListPokemon from '../http/poke-request';

// Referensi reactive property
// https://v3.vuejs.org/guide/reactivity-fundamentals.html#declaring-reactive-state
// Penggunaan toRefs
// https://v3.vuejs.org/guide/reactivity-fundamentals.html#destructuring-reactive-state

export default {
  name: 'Home',
  components: {},
  setup() {
    // Composition API https://v3.vuejs.org/guide/composition-api-introduction.html
    // Di sini fungsi dijalankan pertama kali sebelum
    // component dibuat dan dirender
    const stateData = reactive({
      listpokemon: [],
      urlIdLookup: {},
      searchKeyText: '',
      filteredListPokemon: [],
    });

    const getDataPokemonList = () => {
      getListPokemon()
        .then(response => {
          if (response.status === 200) {
            return response.json();
          }
          return Promise.reject(new Error('Gagal mengambil request'));
        })
        .then(value => {
          stateData.listpokemon = value.results;
          return new Promise(resolve => {
            const urlIdLookup = value.results.reduce((acc, currentVal, index) => {
              const dataAccum = { ...acc, [currentVal.name]: index + 1 };
              return dataAccum;
            }, {});

            resolve(urlIdLookup);
          });
        })
        .then(dataurlid => {
          stateData.urlIdLookup = dataurlid;

          // Contoh pengambilan data reactive dengan toRefs
          const datastate = toRefs(stateData);
          console.log(JSON.stringify(datastate.listpokemon.value));
        })
        .catch(error => {
          console.log(error);
        });
    };

    function updatePokemonFilter() {
      // Filter berdasarkan pencarian
      if (!stateData.searchKeyText) {
        return [];
      }

      const filteredlist = stateData.listpokemon.filter(pokemon => {
        return pokemon.name.includes(stateData.searchKeyText);
      });

      return filteredlist;
    }

    // Masukkan ke dalam reactive property
    stateData.filteredListPokemon = computed(() => updatePokemonFilter());

    // Jalankan terlebih dahulu
    getDataPokemonList();

    return {
      ...toRefs(stateData),
      getDataPokemonList,
      updatePokemonFilter,
    };
  },
};
</script>
