# 📚 Pokémon App (favorite-pokemon-vue-3) - README

## Features
🌎 Pokémon Data - List and search for various Pokémons.

📊 Detailed Stats - View a Pokémon name, weight, height and types.

🗺️ Favorite Pokémons - Save your favorite Pokémons.

🎮 Share stats - Share a pokemon specific stats with your friends.

## Tech Stack

- ### Vue.js 3 and Javascript:
  This project was developed using Vue.js 3 along with JavaScript, leveraging its flexibility and ease of use.
- ### CSS and SASS:
  For the project's CSS styles, the Sass library was used, as it helps maintain a more organized and cleaner code structure. It also makes it easier to manage imports and reuse code, optimizing both the development and maintenance of the design.
- ### Vuex:
  For state management, Vuex was used, the recommended data handling system for Vue. This approach simplifies data persistence between components, ensuring smooth and centralized communication.
- ### Axios:
  Axios was used to handle requests to the Pokémon API, as it is a widely used and reliable library that simplifies making HTTP requests with its clear syntax and efficient response handling. 
- ### PrimeIcons:
  The PrimeIcons library was used for the application’s icons because it is easy to integrate, offers a wide variety of icons, and allows for simple style customization. This way, there is no need to add each icon file individually to the project.
- ### Vue Awesome Paginate:
  For pagination i chose to use Vue Awesome Paginate libreary because it’s quick to set up and the styles are easy to customize. This helped to save time and manage the large amount of data coming from the endpoint.


I kept the project simple but included a few libraries I’m familiar with to speed things up. For SASS/SCSS, I think it makes the CSS more organized and quicker to write, plus it’s easier to reuse mixins. For API requests, I went with Axios because it simplifies making calls and is a well-known, stable library. I used PrimeIcons for the app’s icons since it’s a lightweight library with all the essential icons, and it’s super easy to customize their styles. Lastly, I used the Vue Awesome Paginate library to add a paginator and limit the amount of data returned by the endpoint, since it was bringing in a lot of information. I chose this library because it allowed me to quickly set up the component, and I didn’t have much time to build it from scratch.

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
