<template>
  <div class="pokemon-row">
    <span class="pokemon-row__name" @click="openPokemonDetails">
      {{ capitalizeStrings(props.pokemonData.name) }}
    </span>
    <div class="pokemon-row__circle" @click="addOrRemoveFavorite()">
      <i
        class="pi pi-star-fill pokemon-row__icon"
        :style="{ color: favoritePokemonNames.includes(props.pokemonData.name) ? '#ECA539' : '#BFBFBF' }"
      ></i>
    </div>
  </div>
  <PokemonDetailsModal
    v-if="showPokemonDetailsModal"
    :selectedPokemonDetails="selectedPokemonDetails"
    @closeModal="closePokemonDetails"
  />
</template>
 
<script setup>
import { ref, computed } from "vue";
import PokemonDetailsModal from "./PokemonDetailsModal.vue";
import useModifyStrings from "../composables/modifyStrings";
import { useStore } from "vuex";

const store = useStore();
const { capitalizeStrings } = useModifyStrings();
const favoritePokemons = computed(() => store.state.favoritePokemons);
const favoritePokemonNames = computed(() => store.state.favoritePokemonNames);
const showPokemonDetailsModal = ref(false);
const selectedPokemonDetails = ref({});
const props = defineProps({
  pokemonData: {
    type: Object,
    required: true,
  },
});
defineEmits(["openPokemonDetails"]);

const openPokemonDetails = () => {
  selectedPokemonDetails.value = props.pokemonData;
  showPokemonDetailsModal.value = true;
};

const closePokemonDetails = () => {
  showPokemonDetailsModal.value = false;
  selectedPokemonDetails.value = {};
};

const addOrRemoveFavorite = () => {
  for (let i = 0; i < favoritePokemons.value.length; i++) {
    if (favoritePokemonNames.value[i] === props.pokemonData.name) {
      favoritePokemonNames.value.splice(i, 1);
      favoritePokemons.value.splice(i, 1);
      return;
    }
  }
  favoritePokemonNames.value.push(props.pokemonData.name);
  favoritePokemons.value.push(props.pokemonData);
};
</script>

<style scoped lang="scss">
.pokemon-row {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  overflow-y: auto;
  height: inherit;
  &__name {
    font-size: 22px;
    font-weight: medium;
    color: #353535;
    cursor: pointer;
  }
  &__circle {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    background-color: #f5f5f5;
    border-radius: 50%;
    width: 44px;
    height: 44px;
    cursor: pointer;
  }
  &__icon {
    font-size: 26px;
  }
}
</style>
