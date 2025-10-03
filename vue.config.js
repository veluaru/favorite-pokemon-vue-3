const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  css: {
    loaderOptions: {
      sass: {
        additionalData: `
          @use "@/assets/styles/_variables.scss" as *;
          @use "@/assets/styles/_mixins.scss" as *;
        `
      }
    }
  }
})
