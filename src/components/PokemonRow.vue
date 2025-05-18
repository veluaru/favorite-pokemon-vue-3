<template>
  <div class="pokemon-row">
    <span class="pokemon-row__name">{{ props.pokemonData.name }}</span>
    <div class="pokemon-row__circle" @click="emit('addOrRemoveFavorite')">
      <i
        class="pi pi-star-fill pokemon-row__icon"
        :style="{ color: props.isFavorite ? '#ECA539' : '#BFBFBF' }"
      ></i>
    </div>
  </div>
</template>
 
<script setup>
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
const emit = defineEmits(["addOrRemoveFavorite"]);
</script>

<style scoped>
.pokemon-row {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  overflow-y: auto;
  height: inherit;
}
.pokemon-row__name {
  font-size: 22px;
  font-weight: medium;
}
.pokemon-row__circle {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background-color: #F5F5F5;
  border-radius: 50%;
  width: 44px;
  height: 44px;
  cursor: pointer;
}
.pokemon-row__icon {
  font-size: 26px;
}
</style>
