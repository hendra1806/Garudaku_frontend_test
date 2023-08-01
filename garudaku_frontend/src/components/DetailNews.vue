<template>
  <div class="detail-berita-container" v-if="editNews">
    <h1 class ="head">Detail Berita</h1>
    <h1>{{ editNews.title }}</h1>
    <img v-if="editNews.thumbnail" :src="editNews.thumbnail" alt="Thumbnail" class="berita-thumbnail">
    <div class="berita-content">
      <p class="berita-description">{{ editNews.description }}</p>
      <button class="edit-button"
          @click.prevent="goToEditNews"
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
  name:"detailNews",
  data(){
    return {editNews:{}}
  },
  computed: {
    ...mapState(['news']),
  },
  methods: {
    goToEditNews() {
      const slug = this.editNews.title.toLowerCase()
        .replace(/ /g, '-')
        .replace(/[^\w-]+/g, '');
      
      this.$router.push({path:`/edit/${slug}`,query:{title:this.editNews.title}});
    },
    },
  mounted(){
    const title = this.$route.query.title
    const filteredNews = this.news.filter(el=>
      el.title==title
    )
    this.editNews=filteredNews[0]
    console.log(this.news)
  },
    
  };
</script>