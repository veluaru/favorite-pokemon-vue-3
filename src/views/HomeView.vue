<template>
  <div class="home">
    <SearchBar />
    <!-- <PokemonList />
    <FooterButtons /> -->
    <router-view/>
  </div>
</template>

<script setup>
import SearchBar from "@/components/SearchBar.vue";
// import PokemonList from "@/components/PokemonList.vue";
// import FooterButtons from "@/components/FooterButtons.vue";
</script>

<style scoped lang="scss">
.home {
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
