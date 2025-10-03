<template>
  <div class="search-controls">
    <div class="search-bar__wrapper">
      <i class="pi pi-search search-bar__icon"></i>
      <input
        v-model="searchWord"
        type="text"
        class="search-bar__input"
        placeholder="Search Pokémon..."
        @keydown.enter="triggerSearch"
      />
      <button v-if="isSearchView && searchWord" class="search-bar__clear-button" @click="clearSearchAndGoHome">
        &times; </button>
    </div>

    <div class="view-toggle-buttons">
      <button
        class="view-toggle-buttons__button"
        :class="selectedPokemonView === 'allPokemons' && 'view-toggle-buttons__button--selected'"
        @click="changeSelectedPokemonView('allPokemons')"
        :disabled="selectedPokemonView === 'allPokemons'"
      >
        <i class="pi pi-list basic-icon"></i> All
      </button>
      <button
        class="view-toggle-buttons__button"
        :class="selectedPokemonView === 'favoritePokemons' && 'view-toggle-buttons__button--selected'"
        @click="changeSelectedPokemonView('favoritePokemons')"
        :disabled="selectedPokemonView === 'favoritePokemons'"
      >
        <i class="pi pi-star-fill basic-icon"></i> Favorites
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from "vue";
import { useStore } from "vuex";
import { useRouter, useRoute } from "vue-router";

const router = useRouter();
const route = useRoute();
const store = useStore();

const searchWord = ref("");
const isSearchView = computed(() => store.state.isSearchView);
const allPokemons = computed(() => store.state.allPokemons);
const selectedPokemonView = computed(() => store.state.selectedPokemonView); // Get from store

// Initialize searchWord from route param if present
watch(
  () => route.params.word,
  (newWord) => {
    if (newWord && newWord !== searchWord.value) {
      searchWord.value = newWord;
      store.commit("setSearchPokemonWord", newWord);
    } else if (!newWord && isSearchView.value) {
      searchWord.value = "";
      store.commit("setSearchPokemonWord", "");
    }
  },
  { immediate: true }
);

const changeView = (viewName, params) => {
  router.push({ name: viewName, params: { ...params } });
};

const triggerSearch = async () => {
  store.commit("setSearchPokemonWord", searchWord.value);
  if (searchWord.value) {
    if (!allPokemons.value) await store.dispatch("getAllPokemons");
    changeView("search", { word: searchWord.value });
  } else if (isSearchView.value) {
    changeView("pokemons"); // If search is cleared in search view, go back to all pokemons
  }
};

const clearSearchAndGoHome = () => {
  searchWord.value = "";
  store.commit("setSearchPokemonWord", "");
  changeView("pokemons");
};

// Logic for the All/Favorites toggles - moved from FooterButtons
const changeSelectedPokemonView = (view) => {
  if (store.state.selectedPokemonView !== view) {
    store.commit("setSelectedPokemonView", view);
    if (isSearchView.value) { // If currently in search view, go back to pokemons list when changing tab
      router.push({ name: 'pokemons' });
    }
  }
};
</script>

<style scoped lang="scss">
.search-controls {
  width: 100%;
  max-width: 600px; // Slightly larger max-width
  margin: 30px auto;
  display: flex;
  flex-direction: row;
  gap: 20px; // Space between search bar and toggle buttons

  @media (max-width: 768px) {
    max-width: 90%;
  }
}

.search-bar__wrapper {
  display: flex;
  align-items: center;
  gap: 10px;
  border-radius: 10px; // More rounded corners
  box-shadow: 0px 5px 20px rgba(0, 0, 0, 0.1); // Stronger, softer shadow
  background-color: white;
  height: 55px; // Taller search bar
  padding: 0 15px; // Adjusted padding
  width: 100%;

  .search-bar__icon {
    color: $color-grey-dark; // Custom color for icon
    font-size: 20px; // Larger icon
  }

  .search-bar__input {
    border: none;
    font-size: 1.1em; // Slightly larger text
    color: $color-text-dark;
    width: 100%;
    height: 100%; // Fill height of wrapper
    background: transparent; // Ensure transparent background
    padding: 0; // Remove default input padding

    &::placeholder {
      color: $color-grey-light; // Custom placeholder color
      font-weight: normal;
    }
    &:focus {
      outline: none; // Remove default outline
    }
  }

  .search-bar__clear-button {
    background: none;
    border: none;
    color: $color-grey-dark;
    font-size: 2em; // Large 'x'
    cursor: pointer;
    padding: 0 5px;
    line-height: 1;
    transition: color 0.2s ease;
    &:hover {
      color: $color-pokemon-red;
    }
  }
}

.view-toggle-buttons {
  display: flex;
  justify-content: center;
  gap: 10px; // Space between buttons
  width: 100%;

  .view-toggle-buttons__button {
    flex: 1; // Allows buttons to take equal width
    max-width: 180px; // Max width for toggle buttons
    @include main-button; // Use your existing main-button mixin as a base
    background-color: $color-grey-medium; // Default unselected color
    height: 50px; // Consistent height
    border-radius: 10px; // Match search bar roundedness
    box-shadow: 0 4px 10px rgba(0,0,0,0.1); // Shadow for toggle buttons

    &--selected {
      background: linear-gradient(90deg, $color-pokemon-red, $color-pokemon-red-dark); // Gradient for selected
      color: white;
      box-shadow: 0 4px 12px rgba(238, 21, 21, 0.3); // Redder shadow for selected
      transform: translateY(-2px); // Slight lift when selected
    }

    &:not(&--selected):hover {
      background-color: $color-grey-light; // Lighter grey on hover
      transform: translateY(-1px);
    }
    &:disabled {
      cursor: default; // No pointer on disabled
      opacity: 1; // Don't fade out if selected
    }

    .basic-icon {
      margin-right: 8px; // Space between icon and text
      font-size: 1.2em; // Larger icon
    }
  }
}
</style>