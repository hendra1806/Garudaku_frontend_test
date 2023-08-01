<template>
    <div class="container">
      <div class="edit-berita-container">
        <input v-model="editedNews.thumbnail" type="text" :placeholder="editedNews.thumbnail" class="input-field" />
        <input v-model="editedNews.title" type="text" :placeholder="editedNews.title" class="input-field" />
        <ckeditor   :editor="editor" :config="config" v-model="editedNews.description" class="ckeditor"></ckeditor >
        <button @click="saveBerita" class="save-button">Simpan</button>
        <button @click="cancelEdit" class="cancel-button">Batal</button>
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
        config: {
        toolbar: ['heading', '|', 'bold', 'italic', '|', 'undo', 'redo'],
      },
      };
    },
    computed: {
    ...mapState(['berita']),
  },
    methods: {
      saveBerita() {
        const newData = this.editedNews
        newData.description= this.getPlainText(newData.description)
        console.log(newData.description)
          this.$store.commit('EDIT_BERITA',{newData, title: this.$route.query.title});
        this.$router.push('/')
      },
      cancelEdit() {
        this.$router.push(`/detail/${this.$route.params.idOrIndex}`);
      },
      getPlainText(html) {
      const parser = new DOMParser();
      const parsedDocument = parser.parseFromString(html, 'text/html');
      return parsedDocument.body.textContent;
    },
    },
  mounted(){
    const title = this.$route.query.title
    const filteredNews = this.berita.filter(el=>
      el.title==title
    )
    console.log(filteredNews)
    this.editedNews=filteredNews[0]

  },
  };
  </script>
  
  <style lang="scss">
  
  .container {
    display: flex;
    justify-content: center;
  }
  
  .edit-berita-container {
    padding: 20px;
    max-width: 600px;
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  
    .input-field {
      width: 100%;
      padding: 10px;
      margin-bottom: 10px;
      border: 1px solid #ccc;
      border-radius: 4px;
      font-size: 16px;
    }
  
    .ckeditor {
      margin-bottom: 20px;
    }
  
    .save-button,
    .cancel-button {
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
  
      &:not(:last-child) {
        margin-right: 10px;
      }
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
  
  .container {
    animation: fadeIn 1s;
  }
  </style>
  