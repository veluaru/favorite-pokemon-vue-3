<template>
  <div class="home">
    <SearchBar />
    <router-view/>
  </div>
</template>

<script setup>
import SearchBar from "@/components/SearchBar.vue";
</script>

<style scoped lang="scss">
.home {
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 3%;
}
</style>
