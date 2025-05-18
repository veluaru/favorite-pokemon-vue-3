<template>
  <div class="pokemon-list">
    <div v-for="pokemon in selectedPokemons" :key="pokemon.name">
      <PokemonRow
        :pokemonData="pokemon"
        :isFavorite="favoritePokemonNames.includes(pokemon.name)"
        @addOrRemoveFavorite="addOrRemoveFavorite(pokemon)"
      />
    </div>
  </div>
</template>
 
<script setup>
import { ref, computed, watch, onBeforeMount } from "vue";
import { useStore } from "vuex";
import PokemonRow from "./PokemonRow.vue";

const store = useStore();
const selectedPokemons = ref([]);
const selectedPokemonView = computed(() => store.state.selectedPokemonView);
const allPokemons = computed(() => store.state.allPokemons);
const favoritePokemons = computed(() => store.state.favoritePokemons);
const favoritePokemonNames = computed(() => store.state.favoritePokemonNames);
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

<style scoped>
.pokemon-list {
  display: flex;
  flex-direction: column;
  row-gap: 30px;
  max-width: 570px;
  width: 100%;
  overflow: auto;
  height: 80%;
}
</style>
