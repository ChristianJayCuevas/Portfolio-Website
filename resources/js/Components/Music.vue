<script setup>
import { ref, computed } from 'vue';
import VueAudioPlayer from '@liripeng/vue-audio-player';

const audioPlayer = ref(null);

const audioList = ref([
  {
    src: 'http://music.163.com/song/media/outer/url?id=317151.mp3',
    title: 'Audio Title 1',
    artist: 'Artist Name 1',
    album: 'Album Name 1',
    artwork: [
      {
        src: 'LittleRootTown.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  },
  {
    src: 'http://downsc.chinaz.net/Files/DownLoad/sound1/201906/11582.mp3',
    title: 'Audio Title 2',
  },
]);

const currentAudioName = computed(() => {
  return audioPlayer.value ? audioList.value[audioPlayer.value.currentPlayIndex].title : audioList.value[0].title;
});

const handleBeforePlay = (next) => {
  next(); // No need to manually update `currentAudioName`
};
</script>

<template>
  <div>
    <div class="name">
      {{ currentAudioName || audioList[0].title }}
    </div>
    <audio-player
      ref="audioPlayer"
      :audio-list="audioList"
      :before-play="handleBeforePlay"
      :show-play-loading="false"
    >
    </audio-player>
  </div>
</template>
