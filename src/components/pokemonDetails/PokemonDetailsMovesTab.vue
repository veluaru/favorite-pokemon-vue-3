<template>
  <div class="tab-panel">
    <div class="moves-filters">
      <button
        v-for="filter in moveFilters"
        :key="filter.value"
        class="moves-filters__button"
        :class="{ 'moves-filters__button--active': selectedMoveFilter === filter.value }"
        @click="emit('update:selectedMoveFilter', filter.value)"
      >
        {{ filter.label }}
      </button>
    </div>
    <div class="moves-list">
      <span class="move-chip" v-for="move in visibleMoves" :key="move.name">
        {{ formatDisplayName(move.name) }}
      </span>
    </div>
    <button
      v-if="hasMoreMoves"
      class="moves-toggle-button"
      @click="emit('update:showAllMoves', !showAllMoves)"
    >
      {{ showAllMoves ? "Show Less" : "View More Moves" }}
    </button>
  </div>
</template>

<script setup>
defineProps({
  moveFilters: {
    type: Array,
    required: true,
  },
  selectedMoveFilter: {
    type: String,
    required: true,
  },
  visibleMoves: {
    type: Array,
    required: true,
  },
  hasMoreMoves: {
    type: Boolean,
    required: true,
  },
  showAllMoves: {
    type: Boolean,
    required: true,
  },
  formatDisplayName: {
    type: Function,
    required: true,
  },
});

const emit = defineEmits(["update:selectedMoveFilter", "update:showAllMoves"]);
</script>

<style scoped lang="scss">
.tab-panel {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.moves-filters {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;

  &__button {
    border: 1px solid var(--app-border-color);
    background-color: var(--app-surface-muted-color);
    color: var(--app-text-secondary-color);
    border-radius: 999px;
    padding: 6px 10px;
    font-size: 0.85em;
    font-weight: 600;
    cursor: pointer;

    &--active {
      background-color: var(--app-text-color);
      color: var(--app-surface-color);
    }
  }
}

.moves-list {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  max-height: 220px;
  overflow-y: auto;
  overscroll-behavior: contain;
  padding-right: 4px;
}

.move-chip {
  border: 1px solid var(--app-border-color);
  background-color: var(--app-surface-muted-color);
  color: var(--app-text-color);
  border-radius: 999px;
  padding: 6px 10px;
  font-size: 0.88em;
  max-width: 100%;
  white-space: normal;
  overflow-wrap: anywhere;
}

.moves-toggle-button {
  margin-top: 8px;
  align-self: center;
  border: 1px solid var(--app-border-color);
  background-color: transparent;
  color: var(--app-text-secondary-color);
  border-radius: 999px;
  padding: 6px 12px;
  font-size: 0.82em;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: var(--app-surface-muted-color);
    color: var(--app-text-color);
  }
}

@media (max-width: 600px) {
  .moves-list {
    max-height: 180px;
  }
}
</style>
