<template>
  <div class="footer">
    <button
      class="main-button"
      :class="selectedView === 'allPokemons' && 'main-button--not-selected'"
    >
      <img src="../assets/ListIcon.png" alt="List" class="basic-icon" />All
    </button>
    <button
      class="main-button"
      :class="
        selectedView === 'favoritePokemons' && 'main-button--not-selected'
      "
    >
      <img
        src="../assets/WhiteStar.png"
        alt="Star"
        class="basic-icon"
      />Favorites
    </button>
  </div>
</template>

<script setup>
import { ref } from "vue";

const selectedView = ref("allPokemons");
</script>

<style scoped>
.footer {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  column-gap: 20px;
  box-shadow: 0px -5px 4px 0px #0000000d;
}
.main-button {
  width: 150px;
  height: 44px;
  border: none;
  border-radius: 60px;
  color: white;
  background-color: #f22539;
}
.main-button--not-selected {
  background-color: #bfbfbf;
}
.basic-icon {
  width: 22px;
  height: 22px;
}
</style>
