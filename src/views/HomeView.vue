<template>
  <div class="home-page-layout">
    <HomeHeader />
    <div class="main-content-area">
      <SearchBar />
      <router-view/>
    </div>
    <HomeFooter />
  </div>
</template>

<script setup>
import SearchBar from "@/components/SearchBar.vue";
import HomeHeader from "@/components/HomeHeader.vue";
import HomeFooter from "@/components/HomeFooter.vue";
</script>

<style scoped lang="scss">
.home-page-layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh; // Ensure it takes full height
  background-color: var(--app-background-color);
  background-image: var(--app-background-image);
  background-repeat: repeat;
  background-position: center center;
  background-size: var(--app-background-size);
  color: var(--app-text-color);

  .main-content-area {
    flex-grow: 1; // Allows content to take available space
    display: flex;
    flex-direction: column;
    align-items: center;
    max-width: 1200px;
    width: 100%;
    margin: 0 auto;
  }
}
</style>