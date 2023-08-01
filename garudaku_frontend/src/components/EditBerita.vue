<template>
    <div class="container">
      <div class="edit-berita-container">
        <input v-model="thumbnail" type="text" :placeholder="thumbnailPlaceholder" class="input-field" />
        <input v-model="title" type="text" :placeholder="titlePlaceholder" class="input-field" />
        <CKEditor :editor="editor" v-model="isiBerita" class="ckeditor"></CKEditor>
        <button @click="saveBerita" class="save-button">Simpan</button>
        <button @click="cancelEdit" class="cancel-button">Batal</button>
      </div>
    </div>
  </template>
  
  <script>
  import CKEditor from 'vue-ckeditor2';
  
  export default {
    components: {
      CKEditor,
    },
    data() {
      return {
        thumbnail: '',
        title: '',
        description: '',
        editor: 'ClassicEditor',
        thumbnailPlaceholder: '',
        titlePlaceholder: '',
      };
    },
    computed: {
      beritaItem() {
        const idOrIndex = this.$route.params.idOrIndex;
        if (Number.isInteger(+idOrIndex)) {
          const index = parseInt(idOrIndex, 10);
          return this.$store.state.berita[index] || null;
        } else {
          return this.$store.state.berita.find(item => item.id === idOrIndex) || null;
        }
      },
    },
    methods: {
      saveBerita() {
        const idOrIndex = this.$route.params.idOrIndex;
        if (Number.isInteger(+idOrIndex)) {
          const index = parseInt(idOrIndex, 10);
          this.$store.commit('EDIT_BERITA', {
            index: index,
            thumbnial: this.thumbnial,
            title: this.title,
            description: this.description,
          });
        } else {
          this.$store.commit('EDIT_BERITA', {
            slug: idOrIndex,
            thumbnial: this.thumbnial,
            title: this.title,
            description: this.description,
          });
        }
        this.$router.push(`/detail/${this.$route.params.idOrIndex}`);
      },
      cancelEdit() {
        this.$router.push(`/detail/${this.$route.params.idOrIndex}`);
      },
    },
    created() {
    this.$store.dispatch('fetchBerita').then(() => {
      const beritaItem = this.beritaItem;
      if (beritaItem) {
        this.thumbnail = beritaItem.thumbnail;
        this.title = beritaItem.title;
        this.description = beritaItem.description;

        this.thumbnailPlaceholder = beritaItem.thumbnail;
        this.titlePlaceholder = beritaItem.title;
        this.isiBerita = beritaItem.description;
      }
    });
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
  