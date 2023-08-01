import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    berita: [],
    editedNews:[],
    darkMode: false
  },
  mutations: {
    SET_BERITA(state, data) {
      state.berita = data;
    },
    EDIT_BERITA(state, {newData, title}) {
      const indexToReplace = state.berita.findIndex(el => el.title === title)
      state.berita[indexToReplace]= newData
    },
    TOGGLE_DARK_MODE(state) {
      state.darkMode = !state.darkMode;
    }
  },
  actions: {
    fetchBerita(context) {
      axios.get('https://api-berita-indonesia.vercel.app/cnn/terbaru')
        .then(response => {
          const beritaData = response.data.data.posts;
          context.commit('SET_BERITA', beritaData);
        })
        .catch(error => {
          console.error(error);
        });
    },
    toggleDarkMode(context) {
      context.commit('TOGGLE_DARK_MODE');
    }
  },
  getters: {
    getBerita: state => state.berita,
  },
  
});
