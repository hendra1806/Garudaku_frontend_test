import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    news: JSON.parse(localStorage.getItem("news_data")) || [],
    darkMode: false
  },
  mutations: {
    SET_NEWS(state, data) {
      state.news = data;
      localStorage.setItem("news_data", JSON.stringify(data))
    },
    EDIT_NEWS(state, {newData, title}) {
      const indexToReplace = state.news.findIndex(el => el.title === title)
      state.news[indexToReplace]= newData
    },
    TOGGLE_DARK_MODE(state) {
      state.darkMode = !state.darkMode;
    }
  },
  actions: {
    fetchNews(context) {
      if(this.news.length===0){
        axios.get('https://api-berita-indonesia.vercel.app/cnn/terbaru')
        .then(response => {
          const newsData = response.data.data.posts;
          localStorage.setItem('news', JSON.stringify(newsData));
          context.commit('SET_NEWS', newsData);
          console.log("fecthheht")
        })
        .catch(error => {
          console.error(error);
        });
      }
    },
    toggleDarkMode(context) {
      context.commit('TOGGLE_DARK_MODE');
    }
  },
  getters: {
    getNews: state => state.news,
  },
  
});
