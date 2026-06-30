<template>
  <div class="tab-panel">
    <div class="overview-cards">
      <div class="overview-card">
        <span class="overview-card__label">Pokedex ID</span>
        <span class="overview-card__value">#{{ selectedPokemon.id }}</span>
      </div>
      <div class="overview-card">
        <span class="overview-card__label">Base EXP</span>
        <span class="overview-card__value">{{ selectedPokemon.base_experience }}</span>
      </div>
      <div class="overview-card">
        <span class="overview-card__label">Height</span>
        <span class="overview-card__value">{{ selectedPokemon.height / 10 }} m</span>
      </div>
      <div class="overview-card">
        <span class="overview-card__label">Weight</span>
        <span class="overview-card__value">{{ selectedPokemon.weight / 10 }} kg</span>
      </div>
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
          <img
            :src="getTypeIcon(type.type.name)"
            :alt="type.type.name + ' icon'"
            class="pokemon-type-tag__icon"
          >
          {{ capitalizeStrings(type.type.name) }}
        </span>
      </div>
    </div>

    <div class="pokemon-details__content__row pokemon-details__content__row--abilities">
      <span class="pokemon-details__content__title">Abilities:</span>
      <div class="ability-chips">
        <span
          class="ability-chip"
          v-for="ability in selectedPokemon.abilities"
          :key="ability.ability.name"
        >
          {{ formatDisplayName(ability.ability.name) }}
          <span v-if="ability.is_hidden" class="ability-chip__hidden-tag">Hidden</span>
        </span>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  selectedPokemon: {
    type: Object,
    required: true,
  },
  getTypeColor: {
    type: Function,
    required: true,
  },
  getTypeIcon: {
    type: Function,
    required: true,
  },
  formatDisplayName: {
    type: Function,
    required: true,
  },
  capitalizeStrings: {
    type: Function,
    required: true,
  },
});
</script>

<style scoped lang="scss">
.tab-panel {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.overview-cards {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 10px;
}

.overview-card {
  background-color: var(--app-surface-muted-color);
  border: 1px solid var(--app-border-color);
  border-radius: 10px;
  padding: 10px;
  display: flex;
  flex-direction: column;
  gap: 3px;

  &__label {
    color: var(--app-text-secondary-color);
    font-size: 0.8em;
  }

  &__value {
    color: var(--app-text-color);
    font-weight: bold;
  }
}

.pokemon-details__content__row {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  column-gap: 15px;
  padding: 12px 0;
  border-bottom: 1px solid var(--app-border-color);

  &:last-of-type {
    border-bottom: none;
  }

  &--types,
  &--abilities {
    flex-direction: column;
    align-items: flex-start;
  }
}

.pokemon-details__content__title {
  font-family: "Open Sans", sans-serif;
  font-size: 1.1em;
  font-weight: bold;
  color: var(--app-text-secondary-color);
  min-width: 70px;
}

.pokemon-types {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 10px;
  width: 100%;
}

.pokemon-type-tag {
  display: flex;
  align-items: center;
  padding: 6px 12px;
  border-radius: 20px;
  color: white;
  font-size: 0.9em;
  font-weight: bold;
  text-transform: uppercase;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);

  &__icon {
    width: 20px;
    height: 20px;
    margin-right: 5px;
    border: 2px solid white;
    border-radius: 50%;
  }
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
    background-color: #ee1515;
    color: white;
    border-radius: 999px;
    padding: 2px 6px;
    font-size: 0.75em;
  }
}

@media (max-width: 600px) {
  .overview-cards {
    grid-template-columns: 1fr;
  }
}
</style>
