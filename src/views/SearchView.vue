<template>
  <div class="search" v-if="!loadingPokemons && filteredPokemons.length > 0" :key="filteredPokemonsKey">
    <button class="search__not-found__main-button" @click="changeView('pokemons')">
      Go back home
    </button>
    <div v-for="pokemon in filteredPokemons" :key="pokemon.name">
      <PokemonRow
        :pokemonData="pokemon"
        @openPokemonDetails="openPokemonDetails(pokemon)"
      />
    </div>
  </div>
  <div  class="search__not-found" v-if="!loadingPokemons && filteredPokemons.length === 0">
    <span class="search__not-found__title">Uh-oh!</span>
    <span class="search__not-found__sub-title"
      >You look lost on your journey!</span
    >
    <button class="search__not-found__main-button" @click="changeView('pokemons')">
      Go back home
    </button>
  </div>
  <LoadingComponent v-if="loadingPokemons" />
</template>
 
<script setup>
import { ref, computed, watch, onBeforeMount, onBeforeUnmount } from "vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";
import PokemonRow from "../components/PokemonRow.vue";
import LoadingComponent from "../components/LoadingComponent.vue";
import { useRouter } from "vue-router";

const router = useRouter();
const route = useRoute();
const store = useStore();
const filteredPokemons = ref([]);
const allPokemons = computed(() => store.state.allPokemons);
const searchPokemonWord = computed(() => store.state.searchPokemonWord);
const loadingPokemons = computed(() => store.state.loadingPokemons);
const filteredPokemonsKey = ref(0);

const filterPokemons = () => {
  filteredPokemons.value = allPokemons.value.results.filter((pokemon) =>
    pokemon.name.includes(searchPokemonWord.value || route.params.word)
  );
  filteredPokemonsKey.value += 1;
};

const changeView = (viewName) => {
  router.push({ name: viewName });
};

onBeforeMount(async () => {
  store.commit("setIsSearchView", true);
  if (!allPokemons.value) await store.dispatch("getAllPokemons");
  filterPokemons();
});

onBeforeUnmount(() => {
  store.commit("setIsSearchView", false);
});

watch(searchPokemonWord, () => {
  filterPokemons();
});

watch(allPokemons, () => {
  filterPokemons();
});
</script>

<style scoped lang="scss">
.search {
  display: flex;
  flex-direction: column;
  row-gap: 30px;
  max-width: 570px;
  width: 100%;
  overflow: auto;
  height: 80%;
  &__not-found {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    row-gap: 30px;
    width: 100%;
    margin-top: 10%;
    text-align: center;
    &__title {
      font-size: 26px;
      font-weight: bold;
    }
    &__main-button {
      @include main-button;
    }
    &__sub-title {
      font-size: 18px;
      font-weight: medium;
      max-width: 570px;
    }
  }
}
</style>
