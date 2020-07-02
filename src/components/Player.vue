<template>
  <div>
    <audio controls :src="$store.state.currentlyPlaying.url"></audio>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({})
export default class Player extends Vue {
    private _audio: HTMLAudioElement | null = null;

    private get audio() {
        if (this._audio) {
            return this._audio;
        } else {
            return this._audio = this.$el.querySelector("audio");
        }
    }

    private beforeUpdate() {
        if (this.$store.state.currentlyPlaying.url !== this.audio?.src) {
            this.$nextTick(function () {
                this.audio?.play();
            });
        }
    }
}
</script>

<style lang="scss" scoped>
div {
    border-top: 0.5em black double;
    padding: 0.5em;
}

audio {
    width: 100%;
}
</style>