<template>
  <div class="search-results-view">
    <div
      class="pokemon-grid"
      v-if="!loadingPokemons && filteredPokemons.length > 0"
      :key="filteredPokemonsKey"
    >
      <PokemonCard
        v-for="pokemon in filteredPokemons"
        :key="pokemon.name"
        :pokemonData="pokemon"
        @openPokemonDetails="openPokemonDetails"
      />
    </div>

    <div class="search__not-found" v-if="!loadingPokemons && filteredPokemons.length === 0">
      <span class="search__not-found__title">Uh-oh!</span>
      <span class="search__not-found__sub-title">
        You look lost on your journey! No Pokémon found for "{{ searchPokemonWord || route.params.word }}".
      </span>
      <button class="cta-button" @click="changeView('pokemons')">
        Go back home
      </button>
    </div>

    <LoadingComponent v-if="loadingPokemons" />
  </div>

  <PokemonDetailsModal
    v-if="showPokemonDetailsModal"
    :selectedPokemonDetails="selectedPokemonDetails"
    @closeModal="closePokemonDetails"
  />
</template>

<script setup>
import { ref, computed, watch, onBeforeMount, onBeforeUnmount } from "vue";
import { useStore } from "vuex";
import { useRoute, useRouter } from "vue-router";
// Rename PokemonRow to PokemonCard
import PokemonCard from "../components/PokemonCard.vue";
import LoadingComponent from "../components/LoadingComponent.vue";
import PokemonDetailsModal from "../components/PokemonDetailsModal.vue"; // Moved here from PokemonCard

const router = useRouter();
const route = useRoute();
const store = useStore();
const filteredPokemons = ref([]);
const allPokemons = computed(() => store.state.allPokemons);
const searchPokemonWord = computed(() => store.state.searchPokemonWord);
const loadingPokemons = computed(() => store.state.loadingPokemons);
const filteredPokemonsKey = ref(0); // Used for force re-render if needed, though Vue usually handles this.

// Modal state
const showPokemonDetailsModal = ref(false);
const selectedPokemonDetails = ref({});

const filterPokemons = () => {
  const searchTerm = searchPokemonWord.value || route.params.word || '';
  if (allPokemons.value && allPokemons.value.results) {
    filteredPokemons.value = allPokemons.value.results.filter((pokemon) =>
      pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  } else {
    filteredPokemons.value = [];
  }
  // No need to increment key unless you're having specific rendering issues
  // filteredPokemonsKey.value += 1;
};

const changeView = (viewName) => {
  router.push({ name: viewName });
};

const openPokemonDetails = (pokemon) => {
  selectedPokemonDetails.value = pokemon;
  showPokemonDetailsModal.value = true;
};

const closePokemonDetails = () => {
  showPokemonDetailsModal.value = false;
  selectedPokemonDetails.value = {};
};

onBeforeMount(async () => {
  store.commit("setIsSearchView", true);
  if (!allPokemons.value || allPokemons.value.results.length === 0) {
    await store.dispatch("getAllPokemons");
  }
  filterPokemons();
});

onBeforeUnmount(() => {
  store.commit("setIsSearchView", false);
  store.commit("setSearchPokemonWord", ""); // Clear search word on unmount
});

watch([searchPokemonWord, allPokemons], () => { // Watch both
  filterPokemons();
}, { deep: true }); // Use deep watch for allPokemons if its structure changes
</script>

<style scoped lang="scss">
.search-results-view {
  width: 100%;
  max-width: 100%;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 30px;
  padding-bottom: 30px;
}

// Reuse pokemon-grid styling from PokemonListView
.pokemon-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 20px;
  width: 100%;
  max-width: 100%;
  padding: 0 10px;

  @media (min-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 25px;
  }
  @media (min-width: 1024px) {
    grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
    gap: 30px;
  }
}

.search__not-found {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  row-gap: 20px;
  width: 100%;
  margin-top: 10%;
  text-align: center;
  padding: 0 20px;

  &__title {
    font-size: 2em;
    font-weight: bold;
    color: $color-pokemon-red;
  }
  &__sub-title {
    font-size: 1.2em;
    color: $color-text-dark;
    max-width: 400px;
    line-height: 1.4;
  }

  .cta-button { // Use the general CTA button styling
    @include cta-button-styled; // Assuming you made this mixin for WelcomeView
    max-width: 200px; // Adjust max width for this button
  }
}
</style>