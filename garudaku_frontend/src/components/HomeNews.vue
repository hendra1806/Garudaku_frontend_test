<template>
  <div :class="{ darkMode: darkMode }">
    <h1>Daftar Berita</h1>
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

<style lang="scss">
$primary-color: #007bff;
$secondary-color: #f0e68c;
$background-color: #fff;
$button-background-color: transparent;
$button-text-color: #333;
$button-hover-background-color: transparent;

div {
  padding: 20px;
  transition: background-color 0.3s ease-in-out;

  h1 {
    font-size: 36px;
    color: $primary-color;
    text-align: center;
    margin-bottom: 20px;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
  }

  img {
    max-width: 100%;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    margin-bottom: 10px;
  }

  h2 {
    font-size: 20px;
    margin-bottom: 10px;
    color: #333;
  }

  p {
    color: #666;
    margin-bottom: 15px;
  }

  router-link {
    display: inline-block;
    padding: 8px 16px;
    background-color: #007bff;
    color: #fff;
    text-decoration: none;
    border-radius: 4px;
    transition: background-color 0.2s ease-in-out;

    &:hover {
      background-color: #0056b3;
    }
  }

  &.darkMode {
    background-color: #333;
    color: #333;


    h1 {
      color: #fff;
    }

    h2,
    p,
    router-link {
      color: #333;
    }
  }

  .berita-container {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 20px;
  }

  .berita-item {
    padding: 20px;
    background-color: #ccc;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    color: #333;
  }

  .berita-thumbnail {
    width: 100%;
    height: auto;
    border-radius: 4px;
  }

  .berita-content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
  }
}

.dark-mode-button {
  background-color: transparent;
  border: none;
  cursor: pointer;
  position: relative;
  width: 40px;
  height: 40px;
  transition: transform 0.3s ease-in-out;

  &:hover {
    transform: scale(1.2);
  }
}

.moon-sun {
  position: absolute;
  top: 10px;
  left: 10px;
  width: 20px;
  height: 20px;
  transform-origin: center;
}

.moon,
.sun {
  position: absolute;
  width: 20px;
  height: 20px;
  border-radius: 50%;
}

.moon {
  background-color: #f0e68c;
  box-shadow: 4px 0 #333, 0 4px #333, -4px 0 #333, 0 -4px #333;
  animation: moonAnimation 2s infinite;
}

.sun {
  background-color: #f0e68c;
  box-shadow: 0 0 #333;
  animation: sunAnimation 2s infinite;
}

.dark-mode-button.darkMode .moon {
  transform: translateY(-20px);
  animation-play-state: paused;
}

.dark-mode-button.darkMode .sun {
  transform: translateY(-20px);
  animation-play-state: paused;
}

.toggle-switch {
  position: absolute;
  top: 16px;
  left: 5px;
  width: 30px;
  height: 8px;
  border-radius: 10px;
  background-color: #ccc;
  transition: background-color 0.3s ease-in-out;
}

// .dark-mode-button.darkMode .toggle-switch {
//   background-color: #007bff;
// }

@keyframes moonAnimation {
  0% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
  100% {
    transform: translateY(0);
  }
}

@keyframes sunAnimation {
  0% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
  100% {
    transform: translateY(0);
  }
}
</style>
