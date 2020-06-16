<template>
  <v-container>
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
                <v-select
                  outlined
                  :items="item.categories"
                  item-text="country"
                  item-value="code"
                  v-model="category"
                >
                </v-select>
              </v-list-item-content>
            </v-list-item>

            <v-list-item>
              <v-list-item-icon>
                <v-icon>{{ countries.icon }}</v-icon>
              </v-list-item-icon>

              <v-list-item-content>
                <v-list-item-title>{{ countries.title }}</v-list-item-title>
                <v-select
                  outlined
                  :items="countries.categories"
                  item-text="country"
                  item-value="code"
                  v-model="country"
                >
                </v-select>
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
import { ref, onMounted, watchEffect } from "@vue/composition-api";
import axios from "axios";

import ArticleHolder from "./ArticleHolder";

export default {
  name: "NewsHome",
  components: {
    ArticleHolder
  },

  setup() {
    const urlKey = process.env.VUE_APP_API_KEY;
    let title = ref("News of the world!");
    let loadedArticles = ref();
    let category = ref("general");
    let country = ref("gb");
    let items = ref([
      {
        title: "Categories",
        icon: "mdi-view-dashboard",
        categories: [
          "general",
          "technology",
          "business",
          "entertainment",
          "health",
          "science",
          "sports"
        ]
      }
    ]);

    let countries = ref({
      title: "Countries",
      icon: "mdi-earth",
      categories: [
        { code: "us", country: "US" },
        { code: "gb", country: "UK" },
        { code: "ae", country: "UAE" },
        { code: "ar", country: "Argentina" },
        { code: "at", country: "Austria" },
        { code: "au", country: "Australia" },
        { code: "be", country: "Belgium" },
        { code: "bg", country: "Bulgaria" },
        { code: "br", country: "Brazil" },
        { code: "ca", country: "Canada" },
        { code: "ch", country: "Switzerland" },
        { code: "cn", country: "China" },
        { code: "co", country: "Colombia" },
        { code: "cu", country: "Cuba" },
        { code: "cz", country: "Czechia" },
        { code: "de", country: "Germany" }
      ]
    });

    onMounted(() => {
      axios
        .get(
          `http://newsapi.org/v2/top-headlines?country=gb&category=${category.value}&apiKey=${urlKey}`
        )
        .then(res => {
          const { articles } = res.data;
          loadedArticles.value = articles;
        })
        .catch(err => {
          console.log("Error: ", err);
        });
    });

    watchEffect(() => {
      console.log(
        `http://newsapi.org/v2/top-headlines?country=${country.value}&category=${category.value}&apiKey=${urlKey}`
      );
      axios
        .get(
          `http://newsapi.org/v2/top-headlines?country=${country.value}&category=${category.value}&apiKey=${urlKey}`
        )
        .then(res => {
          const { articles } = res.data;
          loadedArticles.value = articles;
        })
        .catch(err => {
          console.log("Error occured: ", err);
        });
    });

    return {
      title,
      loadedArticles,
      items,
      countries,
      category,
      country,
      urlKey
    };
  }
};
</script>
