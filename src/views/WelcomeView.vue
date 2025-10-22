<template>
  <div class="welcome-view" v-if="!loadingNextPage">
    <div class="welcome-view__content-wrapper">
      <img
        src="../assets/images/Pikachu.png"
        alt="Welcome Pikachu"
        class="welcome-view__icon"
      />
      <h1 class="welcome-view__title">Welcome to Pokeworld</h1>
      <p class="welcome-view__subtitle">
        The digital encyclopedia created by Professor Oak is an invaluable tool to
        Trainers in the Pokémon world.
      </p>
      <button class="welcome-view__cta-button" @click="changeView('pokemons')">
        Explore Now!
      </button>
    </div>
  </div>
  <LoadingComponent class="welcome-view__loading" v-if="loadingNextPage" />
</template>

<script setup>
// This is the code for WelcomeView.vue
import { ref } from "vue";
import { useRouter } from "vue-router";
import LoadingComponent from "../components/LoadingComponent.vue";

const router = useRouter();
const loadingNextPage = ref(false);

const changeView = (viewName) => {
  loadingNextPage.value = true;
  setTimeout(() => {
    router.push({ name: viewName });
    // Optionally set loadingNextPage back to false if you ever navigate back
    // loadingNextPage.value = false;
  }, 2000); // 2-second delay for loading animation
};
</script>

<style scoped lang="scss">
.welcome-view {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh; // Occupy full viewport height
  background: $background-light-grey url('../assets/images/pokeball-pattern.png') repeat center center; // Use a subtle pattern
  background-size: 150px; // Adjust pattern size as needed
  padding: 20px; // General padding

  &__content-wrapper {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    row-gap: 25px; // Slightly adjusted row-gap
    max-width: 600px; // Max width for content
    background-color: white; // White background for the content box
    padding: 40px;
    border-radius: 20px; // Rounded corners for the content box
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1); // Subtle shadow

    @media (max-width: 768px) {
      padding: 30px;
      row-gap: 20px;
    }
    @media (max-width: 480px) {
      padding: 20px;
      row-gap: 15px;
    }
  }

  &__icon {
    max-width: 250px; // Slightly smaller and more controlled size
    animation: bounce 2s infinite ease-in-out; // Example animation
    @media (max-width: 768px) {
      max-width: 200px;
    }
    @media (max-width: 480px) {
      max-width: 150px;
    }
  }

  &__title {
    font-family: 'Pokemon Solid', sans-serif; // Assuming you've imported a custom font
    font-size: 3.5em; // Larger, more striking title
    color: $color-pokemon-red; // Custom color from variables
    text-shadow: 2px 2px 0 rgba(0, 0, 0, 0.24); // Outline effect for title
    margin: 0; // Remove default margins
    line-height: 1;

    @media (max-width: 768px) {
      font-size: 2.5em;
    }
    @media (max-width: 480px) {
      font-size: 1.8em;
    }
  }

  &__subtitle {
    font-family: 'Open Sans', sans-serif; // Assuming another custom font for body
    font-size: 1.1em;
    color: $color-text-dark; // Custom text color
    max-width: 450px; // Control width for readability
    line-height: 1.5;
    margin-top: 10px;
    margin-bottom: 20px;

    @media (max-width: 480px) {
      font-size: 0.9em;
    }
  }

  &__cta-button {
@include cta-button-styled; // Use the new mixin
  }

  &__loading {
    max-width: unset; // Ensure loading component respects its own styling
    width: 100%;
    padding-top: 30%; // Keep your original loading padding
  }
}

// Keyframe animation for Pikachu icon
@keyframes bounce {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}
</style>