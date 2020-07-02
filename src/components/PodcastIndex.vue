<template>
  <details v-if="podcast !== null">
    <summary>{{ podcast.title }}</summary>
    <button @click="unsubscribe">Unsubscribe</button>
    <div>
      <ul>
        <li v-for="item in podcast.items" :key="item.link">
          <a :href="item.link">{{ item.title }}</a>
          <button @click="play(item)">Play</button>
        </li>
      </ul>
    </div>
  </details>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { Podcast, PodcastItem } from "../models/podcast-models";

@Component({})
export default class PodcastIndex extends Vue {
  @Prop() private feedUrl!: string;
  private podcast: Podcast | null = null;

  private mounted() {
    fetch(this.feedUrl, { method: "HEAD" })
      .then(() => fetch(this.feedUrl))
      .catch(() => fetch(`https://cors-anywhere.herokuapp.com/${this.feedUrl}`))
      .then(r => r.text())
      .then(b => {
        const rss = new DOMParser().parseFromString(b, "text/xml");
        const title = rss.querySelector("channel>title")?.textContent;
        if (!title?.indexOf) {
          return;
        }

        const items: PodcastItem[] = [];
        for (const item of rss.querySelectorAll("item")) {
          const title = item.querySelector("title")?.textContent;
          const link = item.querySelector("link")?.textContent;
          const enclosure = item.querySelector("enclosure");
          const url = enclosure?.attributes.getNamedItem("url")?.value;
          const type = enclosure?.attributes.getNamedItem("type")?.value;
          if (!!title?.indexOf && !!url?.indexOf) {
            items.push({ title, link: link ?? undefined, url, type });
          }
        }

        this.podcast = { title, items };
      });
  }

  private play(item: PodcastItem) {
    this.$store.commit("play", item);
  }

  private unsubscribe() {
    this.$store.dispatch("unsubscribe", this.feedUrl);
  }
}
</script>

<style lang="scss" scoped>
ul {
  display: inline-grid;
  grid-template-columns: auto auto;
  grid-template-rows: auto;
}

li {
  display: inline-grid;
  grid-column: 1 / 3;
  grid-template-columns: subgrid;
}

a {
  padding-right: 0.5em;
}
</style>