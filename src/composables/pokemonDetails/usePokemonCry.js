import { ref, watch } from "vue";

export default function usePokemonCry(pokemonCryUrl) {
  const isCryPlaying = ref(false);
  let cryAudio = null;

  const stopCry = () => {
    if (cryAudio) {
      cryAudio.pause();
      cryAudio.currentTime = 0;
      cryAudio = null;
    }
    isCryPlaying.value = false;
  };

  const toggleCry = () => {
    if (!pokemonCryUrl.value) return;

    if (cryAudio && isCryPlaying.value) {
      cryAudio.pause();
      isCryPlaying.value = false;
      return;
    }

    if (!cryAudio) {
      cryAudio = new Audio(pokemonCryUrl.value);
      cryAudio.addEventListener("ended", () => {
        isCryPlaying.value = false;
      });
    }

    cryAudio.play();
    isCryPlaying.value = true;
  };

  watch(pokemonCryUrl, () => {
    stopCry();
  });

  return {
    isCryPlaying,
    toggleCry,
    stopCry,
  };
}
