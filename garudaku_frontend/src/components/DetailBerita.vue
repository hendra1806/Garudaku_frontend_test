<template>
  <div class="detail-berita-container" v-if="editNews">
    <h1>{{ editNews.title }}</h1>
    <img v-if="editNews.thumbnail" :src="editNews.thumbnail" alt="Thumbnail" class="berita-thumbnail">
    <div class="berita-content">
      <p class="berita-description">{{ editNews.description }}</p>
      <button
          @click.prevent="goToEditBerita"
        >
          Edit Berita
      </button>
    </div>
  </div>
  <div v-else>
    <p>Loading...</p>
  </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
  data(){
    return {editNews:{}}
  },
  computed: {
    ...mapState(['berita']),
  },
  methods: {
    goToEditBerita() {
      const slug = this.editNews.title.toLowerCase()
        .replace(/ /g, '-')
        .replace(/[^\w-]+/g, '');
      
      this.$router.push({path:`/edit/${slug}`,query:{title:this.editNews.title}});
    },
    },
  mounted(){
    const title = this.$route.query.title
    const filteredNews = this.berita.filter(el=>
      el.title==title
    )
    this.editNews=filteredNews[0]
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