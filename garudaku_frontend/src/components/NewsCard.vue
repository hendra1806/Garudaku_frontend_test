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
  <style lang="scss">
  .berita-item {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
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
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
}

  button {
  padding: 10px 20px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;

  &:hover {
    background-color: #0056b3;
  }
}
  </style>