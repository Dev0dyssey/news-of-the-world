<template>
  <v-container>
    <v-row class="text-center">
      <v-col>
        <h1>{{ title }}</h1>
      </v-col>
    </v-row>
    <v-row class="text-center">
      <v-col cols="3" class="d-none d-sm-flex">
        <v-navigation-drawer fixed floating permanent>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title class="title">
                News of the World
              </v-list-item-title>
              <v-list-item-subtitle>
                Navigation
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>

          <v-divider></v-divider>

          <v-list dense nav>
            <v-list-item v-for="item in items" :key="item.title" link>
              <v-list-item-icon>
                <v-icon>{{ item.icon }}</v-icon>
              </v-list-item-icon>

              <v-list-item-content>
                <v-list-item-title>{{ item.title }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-navigation-drawer>
      </v-col>
      <v-col xs="12" md="9">
        <ArticleHolder :articles="loadedArticles" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { ref, onMounted } from "@vue/composition-api";
import axios from "axios";

import ArticleHolder from "./ArticleHolder";

export default {
  name: "NewsHome",
  components: {
    ArticleHolder,
  },

  setup() {
    let title = ref("News of the world!");
    let loadedArticles = ref();
    let items = ref([
      { title: "Dashboard", icon: "mdi-view-dashboard" },
      { title: "Photos", icon: "mdi-image" },
      { title: "About", icon: "mdi-help-box" },
    ]);

    onMounted(() => {
      const key = process.env.VUE_APP_API_KEY;
      axios
        .get(`http://newsapi.org/v2/top-headlines?country=gb&apiKey=${key}`)
        .then((res) => {
          const { articles } = res.data;
          loadedArticles.value = articles;
        })
        .catch((err) => {
          console.log("Error: ", err);
        });
    });

    return {
      title,
      loadedArticles,
      items,
    };
  },
};
</script>
