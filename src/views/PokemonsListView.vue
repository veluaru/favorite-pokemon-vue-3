<template>
  <div class="pokemon-list-container">
    <div class="pokemon-grid" v-if="!loadingPokemons && selectedPokemons.length > 0">
      <PokemonCard
        v-for="pokemon in selectedPokemons"
        :key="pokemon.name"
        :pokemonData="pokemon"
        @openPokemonDetails="openPokemonDetails"
      />
    </div>

    <vue-awesome-paginate
      class="pokemon-pagination"
      v-if="selectedPokemonView === 'allPokemons' && !loadingPokemons"
      :total-items="allPokemons.count"
      :items-per-page="20"
      v-model="currentPage"
      @click="onClickPagingHandler"
    />

    <div class="pokemon-list__empty" v-if="!loadingPokemons && selectedPokemons.length === 0">
      <span class="pokemon-list__empty__title">Uh-oh!</span>
      <span class="pokemon-list__empty__sub-title">
        You look lost on your journey! No pokemons to show.
      </span>
    </div>

    <LoadingComponent v-if="loadingPokemons" class="pokemon-list__loading" />
  </div>

  <PokemonDetailsModal
    v-if="showPokemonDetailsModal"
    :selectedPokemonDetails="selectedPokemonDetails"
    @closeModal="closePokemonDetails"
  />
</template>

<script setup>
import { ref, computed, watch, onBeforeMount } from "vue";
import { useStore } from "vuex";
// Rename PokemonRow to PokemonCard in import
import PokemonCard from "@/components/PokemonCard.vue";
import LoadingComponent from "@/components/LoadingComponent.vue";
import PokemonDetailsModal from "@/components/PokemonDetailsModal.vue"; // Moved here from PokemonRow

const store = useStore();
const selectedPokemons = ref([]);
const selectedPokemonView = computed(() => store.state.selectedPokemonView);
const allPokemons = computed(() => store.state.allPokemons);
const favoritePokemons = computed(() => store.state.favoritePokemons);
const loadingPokemons = computed(() => store.state.loadingPokemons);

const allPokemonsPagingParams = ref({
  limit: 20,
  offset: 0,
});
const currentPage = ref(1);

// Modal state
const showPokemonDetailsModal = ref(false);
const selectedPokemonDetails = ref({});

const updatePokemonsList = async () => {
  if (selectedPokemonView.value === "allPokemons") {
    if (!allPokemons.value || allPokemons.value.results.length === 0) { // Check if allPokemons is empty
      await store.dispatch("getAllPokemons", allPokemonsPagingParams.value);
    }
    selectedPokemons.value = allPokemons.value?.results;
  } else {
    selectedPokemons.value = favoritePokemons.value;
  }
};

const onClickPagingHandler = async (event) => {
  currentPage.value = event;
  allPokemonsPagingParams.value.offset = (event - 1) * allPokemonsPagingParams.value.limit;
  await store.dispatch("getAllPokemons", allPokemonsPagingParams.value);
};

const openPokemonDetails = (pokemon) => {
  selectedPokemonDetails.value = pokemon;
  showPokemonDetailsModal.value = true;
};

const closePokemonDetails = () => {
  showPokemonDetailsModal.value = false;
  selectedPokemonDetails.value = {};
};

onBeforeMount(() => {
  updatePokemonsList();
});

watch(selectedPokemonView, () => {
  // Reset pagination to first page when changing view (All/Favorites)
  currentPage.value = 1;
  allPokemonsPagingParams.value.offset = 0;
  updatePokemonsList();
});

watch(allPokemons, () => {
  updatePokemonsList();
});

// Watch for changes in favoritePokemons when in 'favoritePokemons' view
watch(favoritePokemons, (newVal) => {
  if (selectedPokemonView.value === 'favoritePokemons') {
    selectedPokemons.value = newVal;
  }
}, { deep: true });
</script>

<style scoped lang="scss">
.pokemon-list-container {
  width: 100%;
  max-width: 100%; // Allows grid to expand
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 30px; // Space between grid and pagination
  padding-bottom: 30px; // Bottom padding
}

.pokemon-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr)); // Responsive grid
  gap: 20px; // Space between cards
  width: 100%;
  max-width: 100%; // Ensure it fills its container
  padding: 0 10px; // Slight padding from edges of container

  @media (min-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 25px;
  }
  @media (min-width: 1024px) {
    grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
    gap: 30px;
  }
}

.pokemon-pagination {
  margin-top: 20px;
  // Further styling for pagination will go here (use :deep() if needed for vue-awesome-paginate)
  // For example:
  :deep(.pagination-container) {
    display: flex;
    list-style-type: none;
    margin: 0;
    padding: 0;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 4px 10px rgba(0,0,0,0.08);

    .paginate-buttons {
      background-color: white;
      border: 1px solid $color-border-light;
      color: $color-text-dark;
      padding: 10px 15px;
      cursor: pointer;
      transition: all 0.2s ease;

      &:hover:not(.active) {
        background-color: $background-light-grey;
      }

      &.active {
        background-color: $color-pokemon-red;
        color: white;
        border-color: $color-pokemon-red;
      }
      &.back-button, &.next-button {
        font-weight: bold;
      }
      &.disabled {
        opacity: 0.6;
        cursor: not-allowed;
      }
    }
  }
}

.pokemon-list__empty {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  row-gap: 20px; // Slightly adjusted gap
  width: 100%;
  margin-top: 10%;
  text-align: center;
  padding: 0 20px;

  &__title {
    font-size: 2em; // Larger
    font-weight: bold;
    color: $color-pokemon-red;
  }
  &__sub-title {
    font-size: 1.2em;
    color: $color-text-dark;
    max-width: 400px;
    line-height: 1.4;
  }
}

.pokemon-list__loading {
  margin-top: 50px;
}
</style>