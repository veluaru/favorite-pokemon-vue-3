import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'primeicons/primeicons.css';
import VueAwesomePaginate from "vue-awesome-paginate";
import "vue-awesome-paginate/dist/style.css";
import "@/assets/styles/global.scss";

const isDarkMode = localStorage.getItem("isDarkMode") === "true";
document.documentElement.setAttribute("data-theme", isDarkMode ? "dark" : "light");
store.commit("setIsDarkMode", isDarkMode);

createApp(App).use(store).use(router).use(VueAwesomePaginate).mount('#app')
