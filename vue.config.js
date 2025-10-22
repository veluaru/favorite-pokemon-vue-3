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
module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? '/favorite-pokemon-vue-3/' : '/'
}
