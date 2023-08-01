import Vue from 'vue';
import VueRouter from 'vue-router';
import HomeBerita from '@/components/HomeBerita.vue';
import DetailBerita from '@/components/DetailBerita.vue';
import EditBerita from '@/components/EditBerita.vue';

Vue.use(VueRouter);

const routes = [
  { path: '/', component: HomeBerita },
  { path: '/detail/:slug', component: DetailBerita, props: true},
  { path: '/edit/:slug', component: EditBerita }
];

const router = new VueRouter({
  routes
});

export default router;