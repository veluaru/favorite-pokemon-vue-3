<template>
  <div class="pokemon-row">
    <span class="pokemon-row__name" @click="openPokemonDetails">
      {{ capitalizeStrings(props.pokemonData.name) }}
    </span>
    <div class="pokemon-row__circle" @click="emit('addOrRemoveFavorite')">
      <i
        class="pi pi-star-fill pokemon-row__icon"
        :style="{ color: props.isFavorite ? '#ECA539' : '#BFBFBF' }"
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
import { ref } from "vue";
import PokemonDetailsModal from "./PokemonDetailsModal.vue";
import useModifyStrings from "../composables/modifyStrings";

const { capitalizeStrings } = useModifyStrings();
const showPokemonDetailsModal = ref(false);
const selectedPokemonDetails = ref({});
const props = defineProps({
  pokemonData: {
    type: Object,
    required: true,
  },
  isFavorite: {
    type: Boolean,
    default: () => false,
    required: false,
  },
});
const emit = defineEmits(["addOrRemoveFavorite", "openPokemonDetails"]);

const openPokemonDetails = () => {
  selectedPokemonDetails.value = props.pokemonData;
  showPokemonDetailsModal.value = true;
};

const closePokemonDetails = () => {
  showPokemonDetailsModal.value = false;
  selectedPokemonDetails.value = {};
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
