<template>
  <div class="tab-panel">
    <div class="stats-total">
      <span>Total Base Stats</span>
      <strong>{{ totalBaseStats }}</strong>
    </div>
    <div class="stats-list">
      <div class="stat-item" v-for="stat in selectedPokemon.stats" :key="stat.stat.name">
        <span class="stat-item__name">{{ formatDisplayName(stat.stat.name) }}</span>
        <div class="stat-item__bar-wrapper">
          <div class="stat-item__bar" :style="{ width: `${getStatPercentage(stat.base_stat)}%` }"></div>
        </div>
        <span class="stat-item__value">{{ stat.base_stat }}</span>
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
  totalBaseStats: {
    type: Number,
    required: true,
  },
  formatDisplayName: {
    type: Function,
    required: true,
  },
  getStatPercentage: {
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

.stats-total {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: var(--app-surface-muted-color);
  border: 1px solid var(--app-border-color);
  border-radius: 10px;
  padding: 10px 12px;
  color: var(--app-text-color);
}

.stats-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.stat-item {
  display: grid;
  grid-template-columns: 110px 1fr 38px;
  gap: 10px;
  align-items: center;

  &__name {
    color: var(--app-text-secondary-color);
    font-size: 0.88em;
  }

  &__bar-wrapper {
    height: 9px;
    background-color: var(--app-surface-muted-color);
    border-radius: 999px;
    overflow: hidden;
  }

  &__bar {
    height: 100%;
    background: linear-gradient(90deg, #ff6b6b, #e02f2f);
  }

  &__value {
    color: var(--app-text-color);
    font-weight: bold;
    text-align: right;
  }
}

@media (max-width: 600px) {
  .stat-item {
    grid-template-columns: 1fr;
    gap: 4px;

    &__name,
    &__value {
      text-align: left;
    }
  }
}
</style>
