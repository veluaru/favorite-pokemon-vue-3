<template>
  <router-view/>
</template>

<style>
#app {
  min-height: 100vh;
  font-family: Arial;
  color: var(--app-text-color);
}
* {
  margin: 0;
}
html {
  height: 100%
}
body {
  min-height: 100%;
  background-color: var(--app-background-color);
  color: var(--app-text-color);
}
/* Scroll bar stylings */
::-webkit-scrollbar {
  width: 6px;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: var(--app-scrollbar-color);
  border-radius: 5px;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: var(--app-scrollbar-hover-color);
}
</style>
