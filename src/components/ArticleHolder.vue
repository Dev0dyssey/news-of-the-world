<template>
  <v-container>
    <v-row>
      <v-col xs="1" md="4" v-for="(article, index) in articles" :key="index">
        <v-card height="100%" outlined>
          <v-card-text>
            <v-img :src="article.urlToImage"></v-img>
            <h1>{{ article.title }}</h1>
            <div class="text--primary">
              {{ article.description }}
            </div>
          </v-card-text>
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
      required: true,
    },
  },
  setup(props) {
    onMounted(() => {
      console.log("Articles: ", props);
    });
  },
};
</script>

<style lang="scss" scoped>
.artciles {
  width: 100%;
}
</style>
