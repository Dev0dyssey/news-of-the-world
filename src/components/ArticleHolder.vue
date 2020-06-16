<template>
  <v-container>
    <v-row>
      <v-col xs="1" md="4" v-for="(article, index) in articles" :key="index">
        <v-card
          height="100%"
          outlined
          class="d-flex flex-column"
          style="justify-content: space-between"
        >
          <v-card-text>
            <a :href="article.url" style="color: black">
              <v-img :src="article.urlToImage"></v-img>
              <h1>
                {{ article.title }}
              </h1>
            </a>
            <div class="text--primary" style="text-align: left">
              {{ article.description }}
            </div>
          </v-card-text>
          <v-card-subtitle>
            Published: {{ article.publishedAt }}
          </v-card-subtitle>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { onMounted } from "@vue/composition-api";

export default {
  name: "ArticleHolder",
  props: {
    articles: {
      required: true
    }
  },
  setup(props) {
    onMounted(() => {
      console.log("Articles: ", props);
    });
  }
};
</script>

<style lang="scss" scoped>
a {
  text-decoration: none;
}
</style>
