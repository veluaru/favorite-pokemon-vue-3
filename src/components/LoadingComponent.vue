<template>
  <div class="app-loader">
    <img src="../assets/images/Loader.png" alt="Loading" class="app-loader__icon" />
    <span class="app-loader__text">Loading Pokémon...</span>
  </div>
</template>

<style scoped lang="scss">
.app-loader {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  padding: 50px 0; // Add some padding
  min-height: 200px; // Ensure it has minimum display height
  row-gap: 15px; // Space between icon and text

  &__icon {
    width: 106px;
    height: 106px;
    animation: rotation 1.5s infinite linear; // Slower rotation
    filter: drop-shadow(0 5px 10px rgba(0,0,0,0.1)); // Add a subtle shadow
  }

  &__text {
    font-size: 1.2em;
    font-weight: bold;
    color: $color-grey-dark; // Muted text color
  }
}

@keyframes rotation {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>