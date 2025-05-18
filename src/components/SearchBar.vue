<template>
  <div class="search-bar">
    <input type="text" class="search-bar__input" placeholder="Search" />
  </div>
</template>

<script setup>
</script>

<style scoped>
.search-bar {
  max-width: 570px;
  width: 100%;
  margin: 20px 0;
}
.search-bar__input {
  border: none;
  border-radius: 5px;
  box-shadow: 0px 2px 10px 4px #00000012;
  width: 100%;
  max-width: 540px;
  height: 50px;
  padding: 0 3%;
}
.search-bar__input::placeholder {
  color: #BFBFBF;
  font-size: 12px;
  font-weight: medium;
}
.search-bar__input:focus-visible {
  outline: none;
  outline-offset: unset;
}

</style>
