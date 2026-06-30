<template>
  <header class="app-header">
    <img src="../assets/images/PokedexLogo.png" alt="Pokédex Logo" class="app-header__logo" />
    <div class="app-header__theme-toggle" @click="toggleTheme">
      <i class="pi" :class="{ 'pi-moon': isDarkMode, 'pi-sun': !isDarkMode }"></i>
      <span>{{ isDarkMode ? "Dark Mode" : "Light Mode" }}</span>
    </div>
  </header>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useStore } from "vuex";

const store = useStore();
const isDarkMode = ref(false);

const applyTheme = (enabled) => {
  document.documentElement.setAttribute("data-theme", enabled ? "dark" : "light");
};

const toggleTheme = () => {
  isDarkMode.value = !isDarkMode.value;
  applyTheme(isDarkMode.value);
  store.commit("setIsDarkMode", isDarkMode.value);
  localStorage.setItem("isDarkMode", isDarkMode.value);
};

onMounted(() => {
  isDarkMode.value = localStorage.getItem("isDarkMode") === "true";
  applyTheme(isDarkMode.value);
  store.commit("setIsDarkMode", isDarkMode.value);
});
</script>

<style scoped lang="scss">
.app-header {
  padding: 20px;
  display: flex;
  position: relative;
  justify-content: center;
  align-items: center;
  background-color: var(--app-surface-color);
  box-shadow: 0 2px 10px var(--app-shadow-color);
  margin-bottom: 20px;

  &__logo {
    height: 60px;

    @media (max-width: 480px) {
      height: 45px;
    }
  }

  &__theme-toggle {
    position: absolute;
    right: 20px;
    display: flex;
    align-items: center;
    gap: 10px;
    cursor: pointer;
    font-size: 24px;
    color: var(--app-text-secondary-color);
    transition: all 0.3s ease-in-out;

    span {
      font-size: 16px;
      font-weight: 600;
      transition: all 0.3s ease-in-out;
    }

    @media (max-width: 600px) {
      span {
        display: none;
      }
    }

    &:hover {
      color: $color-button-red-light;
      transform: scale(1.1);
    }
  }
}
</style>
