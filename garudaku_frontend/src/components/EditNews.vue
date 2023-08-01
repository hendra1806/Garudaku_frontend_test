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
  
  <style lang="scss">
  /* ... Your existing styles ... */
  
  .container {
    display: flex;
    justify-content: center;
  }
  
  .edit-berita-container {
    padding: 30px;
    max-width: 600px;
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
  
  .edit-berita-title {
    font-size: 32px;
    font-weight: bold;
    color: #007bff;
    margin-bottom: 20px;
    text-align: center;
  }
  
  .edit-berita-form {
    margin-bottom: 30px;
  }
  
  .input-field-group {
    margin-bottom: 20px;
  }
  
  .input-label {
    font-size: 16px;
    color: #333;
    margin-bottom: 5px;
  }
  
  .input-field {
    width: 100%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 16px;
  }
  
  .ckeditor {
    margin-bottom: 20px;
  }
  
  .ck-editor__editable {
    min-height: 300px;
    min-width: 100%;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
  
  .button-container {
    display: flex;
    justify-content: center;
  }
  
  .save-button,
  .cancel-button {
    padding: 12px 20px;
    width: 120px;
    border: none;
    border-radius: 4px;
    font-size: 16px;
    cursor: pointer;
    transition: background-color 0.2s ease-in-out;
  }
  
  .save-button {
    background-color: #007bff;
    color: #fff;
  }
  
  .cancel-button {
    background-color: #ccc;
    color: #333;
    margin-left: 10px;
  }
  
  .save-button:hover,
  .cancel-button:hover {
    background-color: #0056b3;
  }
  
  </style>
  