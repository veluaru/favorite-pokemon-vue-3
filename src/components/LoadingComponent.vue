<template>
  <div class="loading">
    <img src="../assets/images/Loader.png" alt="Loading" class="loading__icon" />
  </div>
</template>

<style scoped lang="scss">
.loading {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  max-width: 570px;
  height: 80%;
  width: 100%;
  &__icon {
  width: 106px;
  height: 106px;
  animation: rotation 1s infinite linear;
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