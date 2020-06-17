import axios from "axios";
import { ref } from "@vue/composition-api";

export default function() {
  const key = process.env.VUE_APP_API_KEY;
  let responseArticles = ref();

  const callAPI = (country, category) => {
    axios
      .get(
        `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=${key}`
      )
      .then((res) => {
        const { articles } = res.data;
        responseArticles.value = articles;
      })
      .catch((err) => {
        console.log("An error has occurred: ", err);
      });
  };

  return {
    key,
    responseArticles,
    callAPI,
  };
}
