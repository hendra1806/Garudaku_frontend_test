<template>
    <div class="berita-item">
      <img v-if="newsItem.thumbnail" :src="newsItem.thumbnail" alt="Thumbnail" class="berita-thumbnail">
      <div class="berita-content">
        <h2>{{ newsItem.title }}</h2>
        <button
          @click.prevent="goToDetailNews"
        >
          Baca Selengkapnya
      </button>
      </div>
    </div>
  </template>
  
  <script>

  export default {
    props: ['newsItem'],
    methods: {
    goToDetailNews() {
      const slug = this.newsItem.title.toLowerCase()
        .replace(/ /g, '-')
        .replace(/[^\w-]+/g, '');
      
      this.$router.push({path:`/detail/${slug}`,query:{title:this.newsItem.title}});
    },
    },
  };
  </script>