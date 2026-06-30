import { ref } from "vue";

export default function usePokemonDetailsModal() {
  const showPokemonDetailsModal = ref(false);
  const selectedPokemonDetails = ref({});

  const openPokemonDetails = (pokemon) => {
    selectedPokemonDetails.value = pokemon;
    showPokemonDetailsModal.value = true;
  };

  const closePokemonDetails = () => {
    showPokemonDetailsModal.value = false;
    selectedPokemonDetails.value = {};
  };

  return {
    showPokemonDetailsModal,
    selectedPokemonDetails,
    openPokemonDetails,
    closePokemonDetails,
  };
}
