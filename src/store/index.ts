import Vue from 'vue';
import Vuex from 'vuex';

import { PodcastItem } from '../models/podcast-models';

Vue.use(Vuex);

function loadSubscriptions(): string[] {
  const json = localStorage.getItem("podcast-app:subscriptions");
  if (json) {
    return JSON.parse(json);
  } else {
    localStorage.setItem("podcast-app:subscriptions", "[]");
    return [];
  }
}

function addSubscription(url: string) {
  const subscriptions = loadSubscriptions();
  if (!subscriptions.includes(url)) {
    subscriptions.push(url);
    localStorage.setItem("podcast-app:subscriptions", JSON.stringify(subscriptions));
    return true;
  }
  return false;
}

function removeSubscription(url: string) {
  const subscriptions = loadSubscriptions();
  const index = subscriptions.indexOf(url);
  if (index !== -1) {
    subscriptions.splice(index, 1);
    localStorage.setItem("podcast-app:subscriptions", JSON.stringify(subscriptions));
    return true;
  }
  return false;
}

export default new Vuex.Store<{
  currentlyPlaying: PodcastItem;
  subscriptions: string[];
}>({
  state: {
    currentlyPlaying: { title: "", url: "" },
    subscriptions: loadSubscriptions(),
  },
  mutations: {
    play(state, item) {
      state.currentlyPlaying = item;
    },
    addSubscription(state, url) {
      state.subscriptions.push(url);
    },
    removeSubscription(state, url) {
      state.subscriptions.splice(state.subscriptions.indexOf(url), 1);
    }
  },
  actions: {
    subscribe({ commit }, url) {
      if (addSubscription(url)) {
        commit('addSubscription', url);
      }
    },
    unsubscribe({ commit }, url) {
      if (removeSubscription(url)) {
        commit('removeSubscription', url);
      }
    }
  },
  modules: {
  }
});
