import ViewPageVue from './pages/ViewPage.vue';
import HomePageVue from './pages/HomePage.vue';
import PageNotFoundVue from './pages/PageNotFound.vue';
import { reactive } from 'vue';

export const basePath = '/birthday';
const basePathRegex = /^(\/birthday)/;

export const routes: {[key: string]: any} = {
    '/view': ViewPageVue,
    '/': HomePageVue,
    'notfound': PageNotFoundVue // Only Used On Dev Server (For Now)
};

export const store = reactive({
    currentPage: null
} as { currentPage: any });

export const getCurrentPage = (newPath: string) => {
    if (Object.keys(routes).includes(`${newPath}/`.replace(basePathRegex, ""))) {
        store.currentPage = routes[`${newPath}/`.replace(basePathRegex, "")];
        return store.currentPage;
    }
    if (newPath[newPath.length - 1] == '/' && Object.keys(routes).includes(newPath.substring(0, newPath.length - 1).replace(basePathRegex, ""))) {
        store.currentPage = routes[newPath.substring(0, newPath.length - 1).replace(basePathRegex, "")];
        return store.currentPage;
    }
    if (Object.keys(routes).includes(newPath.replace(basePathRegex, ""))) {
        store.currentPage = routes[newPath.replace(basePathRegex, "")];
        return store.currentPage;
    }

    if (routes['notfound'] != null) store.currentPage = routes['notfound'];
    return store.currentPage;
};

getCurrentPage(window.location.pathname);