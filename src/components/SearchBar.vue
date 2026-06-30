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
  margin: 30px auto;
  display: flex;
  justify-content: center;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 20px; // Space between search bar and toggle buttons

  @media (max-width: 768px) {
    max-width: 90%;
  }
}

.search-bar__wrapper {
  display: flex;
  align-items: center;
  gap: 10px;
  border-radius: 10px;
  box-shadow: 0px 5px 20px var(--app-shadow-color);
  background-color: var(--app-surface-color);
  height: 55px;
  padding: 0 15px;

  .search-bar__icon {
    color: var(--app-text-secondary-color); // Custom color for icon
    font-size: 20px; // Larger icon
  }

  .search-bar__input {
    border: none;
    font-size: 1.1em;
    color: var(--app-text-color);
    width: 100%;
    height: 100%;
    background: transparent;
    padding: 0;

    &::placeholder {
      color: var(--app-text-muted-color); // Custom placeholder color
      font-weight: normal;
    }
    &:focus {
      outline: none; // Remove default outline
    }
  }

  .search-bar__clear-button {
    background: none;
    border: none;
    color: var(--app-text-secondary-color);
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
  align-items: center;
  gap: 10px; // Space between buttons

  .view-toggle-buttons__button {
    flex: 1; // Allows buttons to take equal width
    max-width: 180px; // Max width for toggle buttons
    @include main-button;
    background-color: var(--app-surface-muted-color);
    color: var(--app-text-color);
    height: 50px;
    border-radius: 10px; // Match search bar roundedness
    box-shadow: 0 4px 10px rgba(0,0,0,0.1);

    &--selected {
      background: linear-gradient(90deg, $color-pokemon-red, $color-pokemon-red-dark);
      color: white;
      box-shadow: 0 4px 12px rgba(238, 21, 21, 0.3);
    }

    &:not(&--selected):hover {
      background-color: var(--app-border-color);
      transform: translateY(-1px);
    }
    &:disabled {
      cursor: default;
      opacity: 1;
    }

    .basic-icon {
      margin-right: 8px;
      font-size: 1.2em; // Larger icon
    }
  }
}
</style>