<template>
  <div class="pokemon-card" @click="emit('openPokemonDetails', props.pokemonData)">
    <div class="pokemon-card__image-container" >
      <img
        :src="getPokemonImageUrl(props.pokemonData.url)"
        alt="Pokemon Sprite"
        class="pokemon-card__sprite"
      />
    </div>

    <span class="pokemon-card__name" @click="emit('openPokemonDetails', props.pokemonData)">
      {{ capitalizeStrings(props.pokemonData.name) }}
    </span>

    <div class="pokemon-card__favorite-toggle" @click.stop="addOrRemoveFavorite()">
      <i
        class="pi pi-star-fill pokemon-card__favorite-icon"
        :class="{ 'pokemon-card__favorite-icon--favorited': isFavorited }"
      ></i>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useStore } from "vuex";
import useModifyStrings from "../composables/modifyStrings";

const store = useStore();
const { capitalizeStrings } = useModifyStrings();

const favoritePokemonNames = computed(() => store.state.favoritePokemonNames);

const props = defineProps({
  pokemonData: {
    type: Object,
    required: true,
  },
});
const emit = defineEmits(["openPokemonDetails"]); // Define emits explicitly

// Determine if the current pokemon is favorited
const isFavorited = computed(() =>
  favoritePokemonNames.value.includes(props.pokemonData.name)
);

// Function to extract image URL from the API detail URL
const getPokemonImageUrl = (url) => {
  const id = url.split('/').filter(Boolean).pop();
  // Using official artwork for better visual appeal
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;
  // Fallback to simpler sprite if official artwork is too heavy or not preferred:
  // return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
};

const addOrRemoveFavorite = () => {
  // Use Vuex actions/mutations for better state management
  if (isFavorited.value) {
    store.commit("removeFavoritePokemon", props.pokemonData.name);
  } else {
    store.commit("addFavoritePokemon", props.pokemonData);
  }
};
</script>

<style scoped lang="scss">
.pokemon-card {
  background-color: white;
  border-radius: 15px; // Rounded corners for cards
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.08); // Soft shadow
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 15px;
  position: relative; // For positioning the favorite icon
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-5px); // Lift card on hover
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15); // Deeper shadow on hover
  }

  &__image-container {
    width: 100%;
    max-width: 120px; // Control sprite size
    height: 120px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 10px;
    background-color: $background-light-grey; // Light background for image
    border-radius: 10px;
  }

  &__sprite {
    max-width: 100%;
    max-height: 100%;
    object-fit: contain; // Ensure image fits without cropping
  }

  &__name {
    font-family: 'Pokemon Solid', sans-serif; // Consistent font
    font-size: 1.4em; // Larger name
    color: $color-text-dark; // Darker text
    margin-top: 5px;
    margin-bottom: 15px; // Space below name
    text-align: center;
    line-height: 1.2;

    @media (max-width: 480px) {
      font-size: 1.2em;
    }
  }

  &__favorite-toggle {
    position: absolute;
    top: 10px;
    right: 10px;
    background-color: white;
    border-radius: 50%;
    width: 35px; // Smaller circle
    height: 35px;
    display: flex;
    justify-content: center;
    align-items: center;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    cursor: pointer;
    transition: background-color 0.2s ease, transform 0.2s ease;

    &:hover {
      background-color: $background-light-grey;
      transform: scale(1.1);
    }
  }

  &__favorite-icon {
    font-size: 1.4em; // Consistent size
    color: $color-grey-light; // Default grey

    &--favorited {
      color: $color-star-yellow; // Yellow when favorited
      animation: favorite-pop 0.3s ease-out; // Animation when favorited
    }
  }
}

@keyframes favorite-pop {
  0% { transform: scale(1); }
  50% { transform: scale(1.3); }
  100% { transform: scale(1); }
}
</style>