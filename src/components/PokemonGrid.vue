<template>
  <div class="pokemon-grid">
    <PokemonCard
      v-for="pokemon in pokemons"
      :key="pokemon.name"
      :pokemonData="pokemon"
      @openPokemonDetails="emit('openPokemonDetails', $event)"
    />
  </div>
</template>

<script setup>
import PokemonCard from "@/components/PokemonCard.vue";

defineProps({
  pokemons: {
    type: Array,
    default: () => [],
  },
});

const emit = defineEmits(["openPokemonDetails"]);
</script>

<style scoped lang="scss">
.pokemon-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(min(100%, 160px), 1fr));
  gap: 20px;
  width: 100%;
  max-width: 100%;
  padding: 0 10px;
  box-sizing: border-box;

  @media (min-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 25px;
  }

  @media (min-width: 1024px) {
    grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
    gap: 30px;
  }
}
</style>
