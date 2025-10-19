<template>
  <div class="modal-overlay" @click.self="emit('closeModal')">
    <div class="modal-content">
      <button class="modal-close-button" @click="emit('closeModal')">
        <i class="pi pi-times"></i> </button>

      <div class="pokemon-details" v-if="!loadingPokemonByName && selectedPokemon">
        <div class="pokemon-details__header" :style="{ backgroundColor: getTypeColor(selectedPokemon.types[0]?.type.name) }">
          <img
            :src="selectedPokemon.sprites.other['official-artwork'].front_default || selectedPokemon.sprites.front_default"
            alt="Pokemon Official Artwork"
            class="pokemon-details__header__pokemon-sprite"
          />
          <h2 class="pokemon-details__header__name">
            {{ capitalizeStrings(selectedPokemon.name) }}
          </h2>
        </div>

        <div class="pokemon-details__content">
          <div class="pokemon-details__content__row">
            <span class="pokemon-details__content__title">Name:</span>
            <span class="pokemon-details__content__text">
              {{ capitalizeStrings(selectedPokemon.name) }}
            </span>
          </div>
          <div class="pokemon-details__content__row">
            <span class="pokemon-details__content__title">Weight:</span>
            <span class="pokemon-details__content__text">
              {{ selectedPokemon.weight / 10 }} kg </span>
          </div>
          <div class="pokemon-details__content__row">
            <span class="pokemon-details__content__title">Height:</span>
            <span class="pokemon-details__content__text">
              {{ selectedPokemon.height / 10 }} m </span>
          </div>
          <div class="pokemon-details__content__row pokemon-details__content__row--types">
            <span class="pokemon-details__content__title">Types:</span>
            <div class="pokemon-types">
              <span
                class="pokemon-type-tag"
                v-for="type in selectedPokemon.types"
                :key="type.type.name"
                :style="{ backgroundColor: getTypeColor(type.type.name) }"
              >
                <img :src="getTypeIcon(type.type.name)" :alt="type.type.name + ' icon'" class="pokemon-type-tag__icon">
                {{ capitalizeStrings(type.type.name) }}
              </span>
            </div>
          </div>
          <button
            class="pokemon-details__content__share-button"
            @click="sharePokemon()"
          >
            Share to my friends
          </button>
        </div>
      </div>
      <div class="pokemon-details__loading" v-else>
        <LoadingComponent />
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onBeforeMount } from "vue";
import { useStore } from "vuex";
import LoadingComponent from "./LoadingComponent.vue";
import useModifyStrings from "../composables/modifyStrings";
import { typeColors, typeIcons } from '../utils/pokemonTypes'; // Import type utilities

const { capitalizeStrings } = useModifyStrings();
const store = useStore();
const emit = defineEmits(["closeModal"]);
const selectedPokemon = computed(() => store.state.selectedPokemon);
const loadingPokemonByName = computed(() => store.state.loadingPokemonByName);
const props = defineProps({
  selectedPokemonDetails: {
    type: Object,
    required: true,
  },
});

const getTypeColor = (type) => typeColors[type] || '#ccc'; // Fallback color
const getTypeIcon = (type) => typeIcons[type] || ''; // Fallback icon path

const sharePokemon = async () => {
  let text = `Check out ${capitalizeStrings(selectedPokemon.value.name)}! `;
  text += `Type(s): ${selectedPokemon.value.types.map(t => capitalizeStrings(t.type.name)).join(', ')}. `;
  text += `Weight: ${selectedPokemon.value.weight / 10} kg, Height: ${selectedPokemon.value.height / 10} m. `;
  text += `More details at your Pokedex app!`;
  try {
    await navigator.clipboard.writeText(text);
    alert('Pokémon details copied to clipboard!'); // User feedback
  } catch (err) {
    console.error('Failed to copy text: ', err);
    alert('Failed to copy details to clipboard.');
  }
};

onBeforeMount(async () => {
  // Only dispatch if current selectedPokemon doesn't match the one for the modal
  if (!selectedPokemon.value || selectedPokemon.value.name !== props.selectedPokemonDetails.name) {
    await store.dispatch("getPokemonByName", props.selectedPokemonDetails.name);
  }
});
</script>

<style scoped lang="scss">
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6); // Darker overlay
  z-index: 1000;
  display: flex;
  justify-content: center;
  align-items: center;
  backdrop-filter: blur(5px); // Frosted glass effect
}

.modal-content {
  position: relative; // For close button positioning
  background-color: #fff;
  border-radius: 20px; // More rounded corners
  width: 90%; // Max width percentage
  max-width: 500px; // Absolute max-width
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.3); // Deeper shadow
  overflow: hidden; // Ensure header background doesn't overflow rounded corners
  display: flex;
  flex-direction: column; // Content inside flows vertically

  @media (max-width: 768px) {
    max-width: 95%;
  }
  @media (max-width: 480px) {
    width: 95%;
    max-width: 380px;
  }
}

.modal-close-button {
  position: absolute;
  top: 15px;
  right: 15px;
  background-color: rgba(255, 255, 255, 0.8); // Semi-transparent white
  border: none;
  border-radius: 50%;
  width: 35px;
  height: 35px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  z-index: 10; // Above content
  box-shadow: 0 2px 5px rgba(0,0,0,0.2);
  transition: all 0.2s ease;

  &:hover {
    background-color: white;
    transform: scale(1.1);
  }
  .pi {
    font-size: 1.2em;
    color: $color-text-dark;
  }
}

.pokemon-details {
  display: flex;
  flex-direction: column;
  width: 100%;

  &__header {
    height: 220px;
    display: flex;
    flex-direction: column; // Stack image and name
    justify-content: flex-end; // Push image and name to bottom
    align-items: center;
    padding-bottom: 20px;
    position: relative; // For absolute positioning of name
    background-size: cover; // Ensure background image covers
    background-position: center bottom; // Focus background bottom

    &__pokemon-sprite {
      position: absolute;
      top: 0; // Position at the top of the header
      height: 180px; // Larger sprite
      width: auto;
      object-fit: contain;
      z-index: 5; // Above background
      filter: drop-shadow(0 5px 10px rgba(0,0,0,0.2)); // Shadow for sprite
    }

    &__name {
      font-family: 'Pokemon Solid', sans-serif;
      font-size: 2.8em; // Very large, striking name
      color: white;
      text-shadow: 2px 2px 0 rgba(0,0,0,0.3); // Darker shadow for legibility
      z-index: 6; // Above sprite if needed
      margin-top: auto; // Push to bottom if header height increases
      padding-bottom: 5px; // Ensure space from bottom
    }
  }

  &__content {
    display: flex;
    flex-direction: column;
    padding: 25px; // More generous padding
    background-color: white; // Explicit white background
    border-radius: 0 0 20px 20px; // Match modal border radius at bottom

    &__row {
      display: flex;
      flex-wrap: wrap; // Allow items to wrap
      align-items: center;
      column-gap: 15px; // Increased gap
      padding: 12px 0; // Slightly more padding
      border-bottom: 1px solid $color-border-light; // Lighter border

      &:last-of-type {
        border-bottom: none; // No border on last row
      }

      &--types {
        flex-direction: column; // Types stacked if title is first
        align-items: flex-start;
        padding-bottom: 0; // Adjusted for type tags
      }
    }

    &__title {
      font-family: 'Open Sans', sans-serif; // Consistent font
      font-size: 1.1em;
      font-weight: bold;
      color: $color-grey-dark; // Muted title color
      min-width: 70px; // Give titles some minimum width
    }
    &__text {
      font-family: 'Open Sans', sans-serif;
      font-size: 1.1em;
      font-weight: normal; // Less bold for value
      color: $color-text-dark;
      flex-grow: 1; // Allows text to fill space
    }

    .pokemon-types {
      display: flex;
      flex-wrap: wrap;
      gap: 8px; // Space between type tags
      margin-top: 10px; // Space from "Types:" title
      width: 100%;
    }

    .pokemon-type-tag {
      display: flex;
      align-items: center;
      padding: 6px 12px;
      border-radius: 20px; // Pill shape
      color: white; // White text on type background
      font-size: 0.9em;
      font-weight: bold;
      text-transform: uppercase; // Uppercase for types
      box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);

      &__icon {
        width: 20px; // Size of type icon
        height: 20px;
        margin-right: 5px;
        border: 2px solid white;
        border-radius: 50%;
      }
    }

    &__share-button {
      @include cta-button-styled; // Reuse styled button mixin
      width: 100%; // Full width within modal content
      max-width: 280px; // Max width for share button
      margin: 25px auto 0 auto; // Center it with top margin
      box-shadow: 0 5px 12px rgba(0, 0, 0, 0.15); // Lighter shadow than welcome button
    }
  }

  &__loading {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 200px; // Give loading space
    padding: 50px;
  }
}
</style>