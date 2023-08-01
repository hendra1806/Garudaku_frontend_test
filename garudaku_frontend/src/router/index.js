import Vue from 'vue';
import VueRouter from 'vue-router';
import HomeBerita from '@/components/HomeBerita.vue';
import DetailBerita from '@/components/DetailBerita.vue';
import EditBerita from '@/components/EditBerita.vue';

Vue.use(VueRouter);

const routes = [
  { path: '/', component: HomeBerita },
  { path: '/detail/:idOrIndex', component: DetailBerita },
  { path: '/edit/:idOrIndex', component: EditBerita }
];

const router = new VueRouter({
  routes
});

export default router;