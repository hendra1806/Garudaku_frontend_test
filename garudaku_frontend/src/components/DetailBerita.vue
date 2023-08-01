<template>
    <div class="detail-berita-container" v-if="beritaItem">
      <h1>{{ beritaItem.title }}</h1>
      <img v-if="beritaItem.thumbnail" :src="beritaItem.thumbnail" alt="Thumbnail" class="berita-thumbnail">
      <div class="berita-content">
        <p class="berita-description">{{ beritaItem.description }}</p>
        <router-link :to="`/edit/${beritaItem.id || index}`" class="edit-button">Edit Berita</router-link>
      </div>
    </div>
    <div v-else>
      <p>Loading...</p>
    </div>
  </template>
  
  <script>
  import { mapState } from 'vuex';
  
  export default {
    computed: {
      ...mapState(['berita']),
      beritaItem() {
        const idOrIndex = this.$route.params.idOrIndex;
        if (Number.isInteger(+idOrIndex)) {
          const index = parseInt(idOrIndex, 10);
          return this.berita[index] || null;
        } else {
          return this.berita.find(item => item.id === idOrIndex) || null;
        }
      },
    },
    created() {
      this.$store.dispatch('fetchBerita');
    },
  };
  </script>
  
  <style lang="scss">

.detail-berita-container {
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;

  h1 {
    font-size: 28px;
    margin-bottom: 20px;
    color: #333;
    text-align: center;
  }

  .berita-thumbnail {
    max-width: 50%;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    margin-bottom: 20px;
  }

  .berita-content {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .berita-description {
    font-size: 18px;
    color: #666;
    margin-bottom: 30px;
    text-align: justify;
  }

  .edit-button {
    padding: 10px 20px;
    background-color: #007bff;
    color: #fff;
    border: none;
    border-radius: 4px;
    font-size: 16px;
    text-decoration: none;
    cursor: pointer;
    transition: background-color 0.2s ease-in-out;

    &:hover {
      background-color: #0056b3;
    }
  }

  div.v-else {
    text-align: center;
    font-size: 18px;
    color: #666;
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.detail-berita-container {
  animation: fadeIn 1s;
}
</style>