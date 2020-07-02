<template>
  <div id="app">
    <div id="main-content">
      <Header />
      <PodcastIndex v-for="url of $store.state.subscriptions" :key="url" :feedUrl="url" />
    </div>
    <Player />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Header from "./components/Header.vue";
import PodcastIndex from "./components/PodcastIndex.vue";
import Player from "./components/Player.vue";

@Component({
  components: {
    Header,
    PodcastIndex,
    Player
  }
})
export default class App extends Vue {}
</script>

<style lang="scss">
html,
body,
#app {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

#app {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

#main-content {
  overflow-y: auto;
  padding: 1em;
}
</style>
