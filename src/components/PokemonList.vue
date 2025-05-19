<template>
  <div class="pokemon-list" v-if="!loadingPokemons">
    <div v-for="pokemon in selectedPokemons" :key="pokemon.name">
      <PokemonRow :pokemonData="pokemon" />
    </div>
    <vue-awesome-paginate
      class="pokemon-list__paginate"
      v-if="selectedPokemonView === 'allPokemons'"
      :total-items="allPokemons.count"
      :items-per-page="20"
      v-model="currentPage"
      @click="onClickPagingHandler"
    />
    <div class="pokemon-list__empty" v-if="selectedPokemons.length === 0">
      <span class="pokemon-list__empty__title">Uh-oh!</span>
      <span class="pokemon-lis__emptyt__sub-title"
        >You look lost on your journey! No pokemons to show.</span
      >
    </div>
  </div>
  <LoadingComponent v-if="loadingPokemons" />
</template>
 
<script setup>
import { ref, computed, watch, onBeforeMount } from "vue";
import { useStore } from "vuex";
import PokemonRow from "./PokemonRow.vue";
import LoadingComponent from "./LoadingComponent.vue";

const store = useStore();
const selectedPokemons = ref([]);
const selectedPokemonView = computed(() => store.state.selectedPokemonView);
const allPokemons = computed(() => store.state.allPokemons);
const favoritePokemons = computed(() => store.state.favoritePokemons);
const loadingPokemons = computed(() => store.state.loadingPokemons);
const keySelectedPokemons = ref(0);
const allPokemonsPagingParams = ref({
  limit: 20,
  offset: 0,
});
const currentPage = ref(1);

const updatePokemonsList = async () => {
  if (selectedPokemonView.value === "allPokemons") {
    if (!allPokemons.value)
      await store.dispatch("getAllPokemons", allPokemonsPagingParams.value);
    selectedPokemons.value = allPokemons.value?.results;
  } else {
    selectedPokemons.value = favoritePokemons.value;
  }
  keySelectedPokemons.value += 1;
};

const onClickPagingHandler = async (event) => {
  currentPage.value = event;
  allPokemonsPagingParams.value.offset =
    (event - 1) * allPokemonsPagingParams.value.limit;
  await store.dispatch("getAllPokemons", allPokemonsPagingParams.value);
};

onBeforeMount(() => {
  updatePokemonsList();
});
watch(selectedPokemonView, () => {
  allPokemonsPagingParams.value = {
    limit: 20,
    offset: (currentPage.value - 1) * allPokemonsPagingParams.value.limit,
  };
  updatePokemonsList();
});
watch(allPokemons, () => {
  updatePokemonsList();
});
</script>

<style scoped lang="scss">
.pokemon-list {
  display: flex;
  flex-direction: column;
  row-gap: 30px;
  max-width: 570px;
  width: 100%;
  overflow: auto;
  height: 80%;
  &__empty {
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
    &__sub-title {
      font-size: 18px;
      font-weight: medium;
      max-width: 570px;
    }
  }
}
:deep() {
  @extend %paginate;
}
</style>
