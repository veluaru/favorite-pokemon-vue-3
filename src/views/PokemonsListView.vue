<template>
  <div class="pokemon-list-container">
    <PokemonGrid
      v-if="!loadingPokemons && selectedPokemons.length > 0"
      :pokemons="selectedPokemons"
      @openPokemonDetails="openPokemonDetails"
    />

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
import LoadingComponent from "@/components/LoadingComponent.vue";
import PokemonDetailsModal from "@/components/pokemonDetails/PokemonDetailsModal.vue";
import PokemonGrid from "@/components/PokemonGrid.vue";
import usePokemonDetailsModal from "@/composables/pokemonDetails/usePokemonDetailsModal";

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

const {
  showPokemonDetailsModal,
  selectedPokemonDetails,
  openPokemonDetails,
  closePokemonDetails,
} = usePokemonDetailsModal();

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
@use "@/assets/styles/_paginate.scss";

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

.pokemon-pagination {
  margin-top: 20px;
  :deep() {
    @extend %paginate;
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
    font-size: 2em;
    font-weight: bold;
    color: $color-pokemon-red;
  }
  &__sub-title {
    font-size: 1.2em;
    color: var(--app-text-color);
    max-width: 400px;
    line-height: 1.4;
  }
}

.pokemon-list__loading {
  margin-top: 50px;
}
</style>