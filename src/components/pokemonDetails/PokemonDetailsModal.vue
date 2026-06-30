<template>
  <div class="modal-overlay" @click.self="emit('closeModal')">
    <div class="modal-content">
      <button class="modal-close-button" @click="emit('closeModal')">
        <i class="pi pi-times"></i>
      </button>

      <div class="pokemon-details" v-if="!loadingPokemonByName && selectedPokemon?.name">
        <div
          class="pokemon-details__header"
          :style="{ backgroundColor: getTypeColor(selectedPokemon.types[0]?.type.name) }"
        >
          <img
            :src="pokemonImage"
            alt="Pokemon Official Artwork"
            class="pokemon-details__header__pokemon-sprite"
          />
          <h2 class="pokemon-details__header__name">
            {{ capitalizeStrings(selectedPokemon.name) }}
          </h2>
        </div>

        <div class="pokemon-details__content">
          <div class="pokemon-details__actions">
            <button class="action-button" @click="toggleShinySprite">
              <i class="pi pi-star"></i>
              {{ showShiny ? "Default Sprite" : "Shiny Sprite" }}
            </button>
            <button class="action-button" :disabled="!pokemonCryUrl" @click="toggleCry">
              <i class="pi" :class="isCryPlaying ? 'pi-pause' : 'pi-volume-up'"></i>
              {{ isCryPlaying ? "Pause Cry" : "Play Cry" }}
            </button>
          </div>

          <div class="pokemon-details__tabs">
            <button
              v-for="tab in tabs"
              :key="tab"
              class="pokemon-details__tabs__button"
              :class="{ 'pokemon-details__tabs__button--active': activeTab === tab }"
              @click="activeTab = tab"
            >
              {{ tab }}
            </button>
          </div>

          <PokemonDetailsOverviewTab
            v-if="activeTab === 'overview'"
            :selectedPokemon="selectedPokemon"
            :getTypeColor="getTypeColor"
            :getTypeIcon="getTypeIcon"
            :formatDisplayName="formatDisplayName"
            :capitalizeStrings="capitalizeStrings"
          />

          <PokemonDetailsStatsTab
            v-if="activeTab === 'stats'"
            :selectedPokemon="selectedPokemon"
            :totalBaseStats="totalBaseStats"
            :formatDisplayName="formatDisplayName"
            :getStatPercentage="getStatPercentage"
          />

          <PokemonDetailsMovesTab
            v-if="activeTab === 'moves'"
            :moveFilters="moveFilters"
            :selectedMoveFilter="selectedMoveFilter"
            :visibleMoves="visibleMoves"
            :hasMoreMoves="hasMoreMoves"
            :showAllMoves="showAllMoves"
            :formatDisplayName="formatDisplayName"
            @update:selectedMoveFilter="selectedMoveFilter = $event"
            @update:showAllMoves="showAllMoves = $event"
          />

          <button class="pokemon-details__content__share-button" @click="sharePokemon()">
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
import { computed, onBeforeMount, onBeforeUnmount, onMounted, ref } from "vue";
import { useStore } from "vuex";
import LoadingComponent from "@/components/LoadingComponent.vue";
import useModifyStrings from "@/composables/modifyStrings";
import { typeColors, typeIcons } from "@/utils/pokemonTypes";
import usePokemonCry from "@/composables/pokemonDetails/usePokemonCry.js";
import PokemonDetailsOverviewTab from "./PokemonDetailsOverviewTab.vue";
import PokemonDetailsStatsTab from "./PokemonDetailsStatsTab.vue";
import PokemonDetailsMovesTab from "./PokemonDetailsMovesTab.vue";

const { capitalizeStrings } = useModifyStrings();
const store = useStore();
const emit = defineEmits(["closeModal"]);
const selectedPokemon = computed(() => store.state.selectedPokemon);
const loadingPokemonByName = computed(() => store.state.loadingPokemonByName);
const tabs = ["overview", "stats", "moves"];
const activeTab = ref("overview");
const showShiny = ref(false);
const selectedMoveFilter = ref("all");
const showAllMoves = ref(false);

const props = defineProps({
  selectedPokemonDetails: {
    type: Object,
    required: true,
  },
});

const moveFilters = [
  { label: "All", value: "all" },
  { label: "Level Up", value: "level-up" },
  { label: "TM", value: "machine" },
  { label: "Egg", value: "egg" },
];

const getTypeColor = (type) => typeColors[type] || "#ccc";
const getTypeIcon = (type) => typeIcons[type] || "";

const pokemonImage = computed(() => {
  const sprites = selectedPokemon.value?.sprites;
  if (!sprites) return "";

  if (showShiny.value) {
    return (
      sprites?.other?.["official-artwork"]?.front_shiny ||
      sprites?.front_shiny ||
      sprites?.other?.["official-artwork"]?.front_default ||
      sprites?.front_default
    );
  }

  return sprites?.other?.["official-artwork"]?.front_default || sprites?.front_default;
});

const pokemonCryUrl = computed(() => {
  return selectedPokemon.value?.cries?.latest || selectedPokemon.value?.cries?.legacy || "";
});
const { isCryPlaying, toggleCry, stopCry } = usePokemonCry(pokemonCryUrl);

const totalBaseStats = computed(() => {
  return (selectedPokemon.value?.stats || []).reduce((acc, item) => acc + item.base_stat, 0);
});

const parsedMoves = computed(() => {
  const moves = selectedPokemon.value?.moves || [];
  return moves.map((move) => {
    const methods = [...new Set(
      (move.version_group_details || []).map((detail) => detail.move_learn_method.name)
    )];
    return {
      name: move.move.name,
      methods,
    };
  });
});

const filteredMoves = computed(() => {
  if (selectedMoveFilter.value === "all") {
    return parsedMoves.value;
  }
  return parsedMoves.value.filter((move) => move.methods.includes(selectedMoveFilter.value));
});

const visibleMoves = computed(() => {
  if (showAllMoves.value) {
    return filteredMoves.value;
  }
  return filteredMoves.value.slice(0, 15);
});

const hasMoreMoves = computed(() => filteredMoves.value.length > 15);

const formatDisplayName = (value) => {
  if (!value) return "";
  return value
    .split("-")
    .map((part) => capitalizeStrings(part))
    .join(" ");
};

const getStatPercentage = (value) => Math.min((value / 255) * 100, 100);

const toggleShinySprite = () => {
  showShiny.value = !showShiny.value;
};

const sharePokemon = async () => {
  let text = `Check out ${capitalizeStrings(selectedPokemon.value.name)}! `;
  text += `Type(s): ${selectedPokemon.value.types.map((t) => capitalizeStrings(t.type.name)).join(", ")}. `;
  text += `Weight: ${selectedPokemon.value.weight / 10} kg, Height: ${selectedPokemon.value.height / 10} m. `;
  text += `More details at your Pokedex app!`;
  try {
    await navigator.clipboard.writeText(text);
    alert("Pokémon details copied to clipboard!");
  } catch (err) {
    console.error("Failed to copy text: ", err);
    alert("Failed to copy details to clipboard.");
  }
};

onBeforeMount(async () => {
  if (!selectedPokemon.value || selectedPokemon.value.name !== props.selectedPokemonDetails.name) {
    await store.dispatch("getPokemonByName", props.selectedPokemonDetails.name);
  }
});

onMounted(() => {
  document.body.style.overflow = "hidden";
});

onBeforeUnmount(() => {
  document.body.style.overflow = "";
  stopCry();
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
  overflow: hidden;
  overscroll-behavior: contain;
}

.modal-content {
  position: relative; // For close button positioning
  background-color: var(--app-surface-color);
  border-radius: 20px; // More rounded corners
  width: 90%; // Max width percentage
  max-width: 560px; // Absolute max-width
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.3); // Deeper shadow
  overflow: hidden; // Ensure header background doesn't overflow rounded corners
  display: flex;
  flex-direction: column; // Content inside flows vertically
  max-height: min(90vh, 720px);
  min-height: 0;
  overscroll-behavior: contain;

  @media (max-width: 768px) {
    max-width: 95%;
  }
  @media (max-width: 480px) {
    width: calc(100% - 16px);
    max-width: 100%;
    max-height: calc(100vh - 16px);
    border-radius: 14px;
  }
}

.modal-close-button {
  position: absolute;
  top: 15px;
  right: 15px;
  background-color: var(--app-surface-muted-color);
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
    background-color: var(--app-surface-color);
    transform: scale(1.1);
  }
  .pi {
    font-size: 1.2em;
    color: var(--app-text-color);
  }
}

.pokemon-details {
  display: grid;
  grid-template-rows: auto 1fr;
  width: 100%;
  flex: 1;
  min-height: 0;
  overflow: hidden;

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
    flex-shrink: 0;

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
      padding: 0 45px 5px;
      max-width: 100%;
      text-align: center;
      line-height: 1.1;
      overflow-wrap: anywhere;
    }
  }

  &__actions {
    display: flex;
    gap: 10px;
    justify-content: center;
    margin-bottom: 20px;
    flex-wrap: wrap;
  }

  &__tabs {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    margin-bottom: 18px;

    &__button {
      border: 1px solid var(--app-border-color);
      background-color: var(--app-surface-muted-color);
      color: var(--app-text-secondary-color);
      border-radius: 999px;
      padding: 7px 12px;
      font-weight: bold;
      text-transform: capitalize;
      cursor: pointer;
      transition: all 0.2s ease;

      &--active {
        background-color: var(--app-text-color);
        color: var(--app-surface-color);
      }
    }
  }

  &__content {
    display: flex;
    flex-direction: column;
    padding: 25px; // More generous padding
    background-color: var(--app-surface-color); // Explicit white background
    border-radius: 0 0 20px 20px; // Match modal border radius at bottom
    overflow-y: auto;
    overflow-x: hidden;
    min-height: 0;
    overscroll-behavior: contain;

    &__row {
      display: flex;
      flex-wrap: wrap; // Allow items to wrap
      align-items: center;
      column-gap: 15px; // Increased gap
      padding: 12px 0; // Slightly more padding
      border-bottom: 1px solid var(--app-border-color); // Lighter border

      &:last-of-type {
        border-bottom: none; // No border on last row
      }

      &--types {
        flex-direction: column;
        align-items: flex-start;
      }

      &--abilities {
        flex-direction: column;
        align-items: flex-start;
      }
    }

    &__title {
      font-family: 'Open Sans', sans-serif; // Consistent font
      font-size: 1.1em;
      font-weight: bold;
      color: var(--app-text-secondary-color); // Muted title color
      min-width: 70px; // Give titles some minimum width
    }
    &__text {
      font-family: 'Open Sans', sans-serif;
      font-size: 1.1em;
      font-weight: normal; // Less bold for value
      color: var(--app-text-color);
      flex-grow: 1; // Allows text to fill space
    }

    .pokemon-types {
      display: flex;
      flex-wrap: wrap;
      gap: 8px; // Space between type tags
      margin-top: 10px; // Space from "Types:" title
      width: 100%;
    }

    .ability-chips {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
      margin-top: 10px;
      width: 100%;
    }

    .ability-chip {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 6px 10px;
      background-color: var(--app-surface-muted-color);
      color: var(--app-text-color);
      border: 1px solid var(--app-border-color);
      border-radius: 999px;
      font-size: 0.9em;
      font-weight: 600;
      max-width: 100%;
      overflow-wrap: anywhere;

      &__hidden-tag {
        background-color: $color-pokemon-red;
        color: white;
        border-radius: 999px;
        padding: 2px 6px;
        font-size: 0.75em;
      }
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

.action-button {
  border: 1px solid var(--app-border-color);
  background-color: var(--app-surface-muted-color);
  color: var(--app-text-color);
  border-radius: 10px;
  font-weight: 600;
  padding: 8px 12px;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 8px;

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
}

@media (max-width: 600px) {
  .pokemon-details {
    &__header {
      height: 180px;
      padding-bottom: 14px;

      &__pokemon-sprite {
        height: 140px;
      }

      &__name {
        font-size: 2em;
        padding: 0 40px 3px;
      }
    }

    &__actions {
      gap: 8px;
      margin-bottom: 14px;
      justify-content: stretch;
    }

    &__tabs {
      margin-bottom: 14px;

      &__button {
        padding: 6px 10px;
        font-size: 0.85em;
      }
    }

    &__content {
      padding: 16px;
    }
  }

  .action-button {
    flex: 1 1 100%;
    justify-content: center;
    font-size: 0.9em;
  }
}
</style>