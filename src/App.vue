<template>
  <router-view/>
</template>

<style>
#app {
  min-height: 100vh;
  font-family: Arial;
  /* -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center; */
  color: #2c3e50;
}
* {
  margin: 0;
}
html {
  height: 100%
}
body {
  min-height: 100%
}
/* Scroll bar stylings */
::-webkit-scrollbar {
  width: 6px;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: #bdbdbd; 
  border-radius: 5px;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #a8a8a8; 
}
</style>
