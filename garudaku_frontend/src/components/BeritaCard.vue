<template>
    <div class="berita-item">
      <img v-if="beritaItem.thumbnail" :src="beritaItem.thumbnail" alt="Thumbnail" class="berita-thumbnail">
      <div class="berita-content">
        <h2>{{ beritaItem.title }}</h2>
        <p>{{ beritaItem.potonganArtikel }}</p>
        <button
          @click.prevent="goToDetailBerita"
        >
          Baca Selengkapnya
      </button>
      </div>
    </div>
  </template>
  
  <script>

  export default {
    props: ['beritaItem'],
    methods: {
    goToDetailBerita() {
      const slug = this.beritaItem.title.toLowerCase()
        .replace(/ /g, '-')
        .replace(/[^\w-]+/g, '');
      
      this.$router.push({path:`/detail/${slug}`,query:{title:this.beritaItem.title}});
    },
    },
  };
  </script>
  <style lang="scss">
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
  </style>