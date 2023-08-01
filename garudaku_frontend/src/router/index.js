import Vue from 'vue';
import VueRouter from 'vue-router';
import HomeNews from '@/components/HomeNews.vue';
import DetailNews from '@/components/DetailNews.vue';
import EditNews from '@/components/EditNews.vue';

Vue.use(VueRouter);

const routes = [
  { path: '/', component: HomeNews },
  { path: '/detail/:slug', component: DetailNews, props: true},
  { path: '/edit/:slug', component: EditNews }
];

const router = new VueRouter({
  routes
});

export default router;