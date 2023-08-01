<template>
  <div class="container">
    <div class="edit-berita-container">
      <h1 class="edit-berita-title">Edit Berita</h1>
      <div class="edit-berita-form">
        <div class="input-field-group">
          <label class="input-label">Thumbnail URL</label>
          <input v-model="editedNews.thumbnail" type="text" :placeholder="editedNews.thumbnail" class="input-field" />
        </div>
        <div class="input-field-group">
          <label class="input-label">Judul</label>
          <input v-model="editedNews.title" type="text" :placeholder="editedNews.title" class="input-field" />
        </div>
        <label class="input-label">Deskripsi</label>
        <ckeditor :editor="editor" v-model="editedNews.description" class="ckeditor"></ckeditor>
      </div>
      <div class="button-container">
        <button @click="cancelEdit" class="cancel-button">Batal</button>
        <button @click="saveNews" class="save-button">Simpan</button>
      </div>
    </div>
  </div>
</template>
  
  <script>
  import { mapState } from 'vuex';
  import CKEditor from '@ckeditor/ckeditor5-vue2';
  import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
  import Vue from 'vue';
  
  Vue.use( CKEditor );
  
  export default {
    name:"editNews",
    // components: {
    //   CKEditor ,
    // },
    data() {
      return {
        editedNews:{
          thumbnail: '',
          title: '',
          description: '',
        },
        editor:ClassicEditor ,
      //   config: {
      //   toolbar: ['heading', '|', 'bold', 'italic', '|', 'undo', 'redo'],
      // },
      };
    },
    computed: {
    ...mapState(['news']),
  },
    methods: {
      saveNews() {
        const newData = this.editedNews
        newData.description= this.getPlainText(newData.description)
        // console.log(newData.description)
          this.$store.commit('EDIT_NEWS',{newData, title: this.$route.query.title});
        this.$router.push('/')
      },
      cancelEdit() {
        this.$router.push('/')
      },
      getPlainText(html) {
      const parser = new DOMParser();
      const parsedDocument = parser.parseFromString(html, 'text/html');
      return parsedDocument.body.textContent;
    },
    },
  mounted(){
    const title = this.$route.query.title
    const filteredNews = this.news.filter(el=>
      el.title==title
    )
    // console.log(filteredNews)
    this.editedNews=filteredNews[0]

  },
  };
  </script>