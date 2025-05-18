<template>
  <div class="pokemon-list">
    <div v-for="pokemon in selectedPokemons" :key="pokemon.name">
      <PokemonRow
        :pokemonData="pokemon"
        :isFavorite="favoritePokemons.includes(pokemon.name)"
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
const keySelectedPokemons = ref(0);

const updatePokemonsList = async () => {
  if (selectedPokemonView.value === "allPokemons") {
    await store.dispatch("getAllPokemons");
    selectedPokemons.value = allPokemons.value;
  } else {
    selectedPokemons.value = favoritePokemons.value;
  }
  keySelectedPokemons.value += 1;
};

const addOrRemoveFavorite = (pokemon) => {
  for (let i = 0; i < favoritePokemons.value.length; i++) {
    if (favoritePokemons.value[i] === pokemon.name) {
      favoritePokemons.value.splice(i, 1);
      return;
    }
  }
  favoritePokemons.value.push(pokemon.name);
};

onBeforeMount(() => {
  updatePokemonsList();
});
watch(selectedPokemonView, () => {
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
