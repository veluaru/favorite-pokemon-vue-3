<template>
  <div class="modal-overlay">
    <div class="modal-content">
      <img
        @click="emit('closeModal')"
        src="../assets/images/CloseIcon.png"
        alt="Close"
        class="modal-close"
      />
      <div class="pokemon-details" v-if="!loadingPokemonByName">
        <div class="pokemon-details__header">
          <img
            :src="selectedPokemon.sprites.front_default"
            alt="Pokemon"
            class="pokemon-details__header__pokemon-sprite"
          />
        </div>

        <div class="pokemon-details__content">
          <div class="pokemon-details__content__row">
            <span class="pokemon-details__content__title">Name:</span>
            <span class="pokemon-details__content__text">
              {{ capitalizeStrings(selectedPokemon.name) }}
            </span>
          </div>
          <div class="pokemon-details__content__row">
            <span class="pokemon-details__content__title">Weight:</span>
            <span class="pokemon-details__content__text">
              {{ selectedPokemon.weight }}
            </span>
          </div>
          <div class="pokemon-details__content__row">
            <span class="pokemon-details__content__title">Height:</span>
            <span class="pokemon-details__content__text">
              {{ selectedPokemon.height }}
            </span>
          </div>
          <div class="pokemon-details__content__row">
            <span class="pokemon-details__content__title">Types:</span>
            <span
              class="pokemon-details__content__text"
              v-for="type in selectedPokemon.types"
              :key="selectedPokemon.name + type"
            >
              {{ capitalizeStrings(type.type.name) }}
            </span>
          </div>
          <button
            class="pokemon-details__content__share-button"
            @click="sharePokemon()"
          >
            Share to my friends
          </button>
        </div>
      </div>
      <div class="pokemon-details__loading" v-else>
        <LoadingComponent v-if="loadingPokemonByName" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onBeforeMount } from "vue";
import { useStore } from "vuex";
import LoadingComponent from "./LoadingComponent.vue";
import useModifyStrings from "../composables/modifyStrings";

const { capitalizeStrings } = useModifyStrings();
const store = useStore();
const emit = defineEmits(["closeModal"]);
const selectedPokemon = computed(() => store.state.selectedPokemon);
const loadingPokemonByName = computed(() => store.state.loadingPokemonByName);
const props = defineProps({
  selectedPokemonDetails: {
    type: Object,
    required: true,
  },
});

const sharePokemon = async () => {
  let text = `${capitalizeStrings(selectedPokemon.value.name)}`;
  for (let stat of selectedPokemon.value.stats) {
    const statText = `, ${stat.stat.name} ${stat.base_stat}`;
    text = text + statText;
  }
  await navigator.clipboard.writeText(text);
};

onBeforeMount(async () => {
  await store.dispatch("getPokemonByName", props.selectedPokemonDetails.name);
});
</script>

<style scoped lang="scss">
.pokemon-details {
  display: flex;
  flex-direction: column;
  &__header {
    border-radius: 5px 5px 0 0;
    height: 220px;
    background-image: url("../assets/images/Background1.png");
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    &__pokemon-sprite {
      border-radius: 5px 5px 0 0;
      height: 220px;
      z-index: 10;
    }
  }
  &__content {
    display: flex;
    flex-direction: column;
    padding: 20px;
    &__title {
      font-size: 18px;
      font-weight: bold;
      line-height: 150%;
      color: #5e5e5e;
    }
    &__text {
      font-size: 18px;
      font-weight: medium;
      line-height: 150%;
      color: #5e5e5e;
    }
    &__row {
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      flex-wrap: wrap;
      column-gap: 10px;
      align-items: center;
      border-bottom: 1px solid #e8e8e8;
      padding: 10px 0;
    }
    &__share-button {
      width: 100%;
      max-width: 190px;
      height: 44px;
      border: none;
      border-radius: 60px;
      color: white;
      font-size: 18px;
      font-weight: bold;
      background-color: #f22539;
      cursor: pointer;
      margin-top: 20px;
    }
  }
  &__loading {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    height: 520px;
  }
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.534);
  z-index: 1000;
}

.modal-content {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #fff;
  border-radius: 5px;
  width: 50%;
  box-shadow: 0px -1px 8px 0px #0000002c;
  @media screen and (max-width: 768px) {
    width: 70%;
  }
    @media screen and (max-width: 480px) {
    width: 90%;
  }
}

.modal-close {
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
  height: 26px;
  width: 26px;
}
</style>
