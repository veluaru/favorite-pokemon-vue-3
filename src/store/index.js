import { createStore } from 'vuex'
import axiosClient from '../services/axiosClient';

export default createStore({
  state() {
    return {
      favoritePokemons: [],
      allPokemons: [],
      selectedPokemon: {},
      selectedPokemonView: 'allPokemons',
      loadingPokemons: false,
    }
  },
  getters: {
  },
  mutations: {
    setFavoritePokemons(state, newValue) {
      state.favoritePokemons = newValue || [];
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
    }
  },
  actions: {
    getAllPokemons({ commit }) {
      commit('setLoadingPokemons');
      axiosClient.get('https://pokeapi.co/api/v2/pokemon')
        .then(({ data }) => {
          console.log(data)
          commit('setAllPokemons', data.results)
          commit('setLoadingPokemons', false)
        }).catch(error => {
          console.error(error);
        });
    },
    getPokemonByName({ commit }, payload) {
      axiosClient.get(`https://pokeapi.co/api/v2/pokemon/${payload}`)
        .then(({ data }) => {
          commit('setSelectedPokemon', data)
        })
    }
  },

})
