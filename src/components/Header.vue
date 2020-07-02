<template>
    <div>
        <h1>Podcasts</h1>
        <input type="url" v-model="subscriptionUrl">
        <button @click="subscribe">Subscribe</button>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({})
export default class Header extends Vue {
    private subscriptionUrl = "";

    private subscribe() {
        this.$store.dispatch("subscribe", this.subscriptionUrl);
        this.subscriptionUrl = "";
    }
}
</script>

<style lang="scss" scoped>
div {
    margin-bottom: 1em;
}

h1 {
    margin: 0;
}
</style>