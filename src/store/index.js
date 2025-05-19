import { createStore } from 'vuex'
import axiosClient from '../services/axiosClient';

export default createStore({
  state() {
    return {
      favoritePokemons: [],
      favoritePokemonNames: [],
      allPokemons: null,
      selectedPokemon: {},
      selectedPokemonView: 'allPokemons',
      loadingPokemons: false,
      loadingPokemonByName: false,
      isSearchView: false,
      searchPokemonWord: null,
    }
  },
  getters: {
  },
  mutations: {
    setFavoritePokemons(state, newValue) {
      state.favoritePokemons = newValue || [];
    },
    setFavoritePokemonNames(state, newValue) {
      state.favoritePokemonNames = newValue || [];
    },
    setAllPokemons(state, newValue) {
      state.allPokemons = newValue;
    },
    setSelectedPokemon(state, newValue) {
      state.selectedPokemon = newValue || {};
    },
    setSelectedPokemonView(state, newValue) {
      state.selectedPokemonView = newValue || 'allPokemons';
    },
    setLoadingPokemons(state, newValue) {
      state.loadingPokemons = newValue || false;
    },
    setLoadingPokemonByName(state, newValue) {
      state.loadingPokemonByName = newValue || false;
    },
    setIsSearchView(state, newValue) {
      state.isSearchView = newValue || false;
    },
    setSearchPokemonWord(state, newValue) {
      state.searchPokemonWord = newValue || false;
    }
  },
  actions: {
    getAllPokemons({ commit }, payload) {
      commit('setLoadingPokemons', true);
      setTimeout(() => {
        console.log(payload)
        axiosClient.get('https://pokeapi.co/api/v2/pokemon', { payload })
          .then(({ data }) => {
            commit('setAllPokemons', data)
            commit('setLoadingPokemons', false)
          }).catch(error => {
            console.error(error);
          });
      }, 1000);

    },
    getPokemonByName({ commit }, payload) {
      commit('setLoadingPokemonByName', true);
      axiosClient.get(`https://pokeapi.co/api/v2/pokemon/${payload}`)
        .then(({ data }) => {
          commit('setSelectedPokemon', data)
          commit('setLoadingPokemonByName', false)
        }).catch(error => {
          console.error(error);
        });
    }
  },

})
