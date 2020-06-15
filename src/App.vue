<template>
  <v-app>
    <v-content>
      <NewsHome />
    </v-content>
  </v-app>
</template>

<script>
import NewsHome from "@/components/NewsHome";

export default {
  name: "App",

  components: {
    NewsHome
  },

  data: () => ({
    //
  })
};
</script>
