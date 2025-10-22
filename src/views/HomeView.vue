<template>
  <div class="home-page-layout">
    <header class="app-header">
      <img src="../assets/images/PokedexLogo.png" alt="Pokédex Logo" class="app-header__logo" />
    </header>

    <div class="main-content-area">
      <SearchBar />
      <router-view/>
    </div>
  </div>
</template>

<script setup>
import SearchBar from "@/components/SearchBar.vue";
</script>

<style scoped lang="scss">
.home-page-layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh; // Ensure it takes full height
  background: $background-light-grey url('../assets/images/pokeball-pattern.png') repeat center center;
  background-size: 150px;
  color: $color-text-dark; // Default text color

  .app-header {
    width: 100%;
    padding: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: white; // Or a subtle gradient
    box-shadow: 0 2px 10px rgba(0,0,0,0.08);
    margin-bottom: 20px; // Space below header

    &__logo {
      height: 60px; // Adjust size as needed
      @media (max-width: 480px) {
        height: 45px;
      }
    }
  }

  .main-content-area {
    flex-grow: 1; // Allows content to take available space
    display: flex;
    flex-direction: column;
    align-items: center; // Center content like search bar and list
    padding: 0 20px; // General horizontal padding
    max-width: 1200px; // Max width for content on larger screens
    margin: 0 auto; // Center content area
    width: 100%; // Take full width up to max-width
  }
}
</style>