import { createRouter, createWebHashHistory } from "vue-router";
import MainPage from './MainPage.vue'

export default createRouter({
    history: createWebHashHistory(),
    scrollBehavior: function(to, from, savedPosition) {
        if (to.hash) {
            return {
                el: to.hash,
            }
        }
    },
    routes: [
        { path: '/home', component: MainPage, alias: '/' },
    ]
});