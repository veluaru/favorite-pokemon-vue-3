<template>
  <div class="welcome">
    <img
      src="../assets/Pikachu.png"
      alt="Welcome Pikachu"
      class="welcome-icon"
    />
    <span>Welcome to Pokédex</span>
    <span>
      The digital encyclopedia created by Professor Oak is an invaluable tool to
      Trainers in the Pokémon world.
    </span>
    <button class="main-button">Get started</button>
  </div>
</template>

<script setup>
import SearchBar from "@/components/SearchBar.vue";
import PokemonList from "@/components/PokemonList.vue";
import FooterButtons from "@/components/FooterButtons.vue";
</script>

<style scoped>
.welcome {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  row-gap: 30px;
}
.welcome-icon {
  max-width: 325px;
}
.main-button {
  width: 150px;
  height: 44px;
  border: none;
  border-radius: 60px;
  color: white;
  background-color: #f22539;
}
</style>

