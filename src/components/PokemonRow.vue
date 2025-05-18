<template>
  <div class="pokemon-row">
    <span class="pokemon-row__name">{{ props.pokemonData.name }}</span>
    <img
      :src="
        props.isFavorite ? require('../assets/ActiveStar.png') : require('../assets/DisabledStar.png')
      "
      alt="Star"
      class="pokemon-row__icon"
      @click="emit('addOrRemoveFavorite')"
    />
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
.pokemon-row__icon {
  width: 44px;
  height: 44px;
  cursor: pointer;
}
</style>
