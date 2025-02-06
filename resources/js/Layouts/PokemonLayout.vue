<script setup>
import "../../css/pokemon.css"
import { Link } from '@inertiajs/vue3';
import { ref, onMounted, nextTick, computed } from 'vue';
import VueAudioPlayer from "@liripeng/vue-audio-player";

const currentPath = computed(() => window.location.pathname);
const audioPlayer = ref(null);
const currentAudioName = ref(null);
const currentArtwork = ref('/storage/images/LittleRoot.gif');

const audioList = ref([
  {
    src: '/storage/music/LittleRoot.mp3',
    title: 'Littleroot Town',
    artist: 'Pokemon',
    artwork: '/storage/images/LittleRoot.gif',
  },
  {
    src: '/storage/music/Rustboro.mp3',
    title: 'Rustboro City',
    artwork: '/storage/images/Rustboro.gif',
  },
]);

const handleBeforePlay = (next) => {
  if (audioPlayer.value) {
    const currentIndex = audioPlayer.value.currentPlayIndex;
    currentAudioName.value = audioList.value[currentIndex].title;
    currentArtwork.value = audioList.value[currentIndex].artwork || '/storage/images/default.png';
  }
  next();
};
const simulateUserInteraction = () => {
  if (audioPlayer.value) {
    // Create a fake click event
    const clickEvent = new MouseEvent('click', {
      bubbles: true,
      cancelable: true,
      view: window
    });
    
    // Dispatch the click event on the audio player
    audioPlayer.value.$el.dispatchEvent(clickEvent);
  }
};

onMounted(() => {
  nextTick(() => {
    if (audioPlayer.value) {
      audioPlayer.value.play();
    }
  });
});
</script>

<template>
    <div class="container">
        <aside class="visible">
            <div class="logo">
                <img src="/storage/images/pokemon-23.svg" alt="Pokemon Logo">
            </div>
            <div class="sidebar">
                <Link :class="{ 'active-top': currentPath === '/pokemon' }" href="/pokemon">
                    <img src="/storage/images/ball.png" class="ball" />
                    <h3>Pokemon Home</h3>
                </Link>
            </div>
        </aside>
        <main>
            <slot />
        </main>
        <div class="right-side">
            <div class="music-player">
                <div class="song-info">
                    <img :src="currentArtwork" alt="Current Artwork" class="song-artwork" />
                    <div class="song-name">{{ currentAudioName || audioList[0].title }}</div>
                </div>
                <VueAudioPlayer
                    ref="audioPlayer"
                    :audio-list="audioList"
                    :before-play="handleBeforePlay"
                    :show-play-loading="false"
                    theme-color="#82ba99">
                </VueAudioPlayer>
        </div>
        </div>
    </div>
</template>

<style scoped>

.song-info {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 10px;
}
.song-artwork {
    width: 50px;
    height: 50px;
    border-radius: 5px;
    object-fit: cover;
}
</style>