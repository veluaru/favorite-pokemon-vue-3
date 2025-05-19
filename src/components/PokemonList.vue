<template>
  <div class="pokemon-list" v-if="!loadingPokemons">
    <div v-for="pokemon in selectedPokemons" :key="pokemon.name">
      <PokemonRow
        :pokemonData="pokemon"
        :isFavorite="favoritePokemonNames.includes(pokemon.name)"
        @addOrRemoveFavorite="addOrRemoveFavorite(pokemon)"
      />
    </div>
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
const favoritePokemonNames = computed(() => store.state.favoritePokemonNames);
const loadingPokemons = computed(() => store.state.loadingPokemons);
const keySelectedPokemons = ref(0);

const updatePokemonsList = async () => {
  if (selectedPokemonView.value === "allPokemons") {
    if (allPokemons.value.length === 0) await store.dispatch("getAllPokemons");
    selectedPokemons.value = allPokemons.value;
  } else {
    selectedPokemons.value = favoritePokemons.value;
  }
  keySelectedPokemons.value += 1;
};

const addOrRemoveFavorite = (pokemon) => {
  for (let i = 0; i < favoritePokemons.value.length; i++) {
    if (favoritePokemonNames.value[i] === pokemon.name) {
      favoritePokemonNames.value.splice(i, 1);
      favoritePokemons.value.splice(i, 1);
      return;
    }
  }
  favoritePokemonNames.value.push(pokemon.name);
  favoritePokemons.value.push(pokemon);
};

onBeforeMount(() => {
  updatePokemonsList();
});
watch(selectedPokemonView, () => {
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
</style>
