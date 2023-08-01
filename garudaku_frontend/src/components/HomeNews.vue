<template>
  <div :class="{ darkMode: darkMode }">
    <h1>Daftar Berita</h1>
    <p class="switch">Switch Mode</p>
    <button @click="toggleDarkMode" class="dark-mode-button">
      <span class="moon"></span>
      <span class="sun"></span>
    </button>
    <!-- <button @click="getNews" class="update-berita-button">
      <h2>Update Berita</h2>
    </button> -->
    <div v-if="news && news.length" class="berita-container">
      <NewsCard v-for="(newsItem, index) in news" :key="index" :newsItem="newsItem" />
    </div>
    <div v-else>
      <p>Tidak ada berita yang tersedia.</p>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
import NewsCard from './NewsCard.vue';

export default {
  name: 'HomeNews',
  components: {
    NewsCard,
  },
  computed: {
    ...mapState(['news', 'darkMode']),
  },
  methods: {
    ...mapMutations(['TOGGLE_DARK_MODE']),
    toggleDarkMode() {
      this.TOGGLE_DARK_MODE();
    },
    goToDetailNews(newsItem) {
      const slug = newsItem.title.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');
      this.$router.push(`/detail/${slug}`);
    },
    // getNews() {
    //   this.$store.dispatch('fetchNews');
    // },
  },
  mounted() {
    if (this.news.length === 0) {
      this.$store.dispatch('fetchNews');
    }
  },
};
</script>