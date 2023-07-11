import ViewPageVue from './pages/ViewPage.vue';
import HomePageVue from './pages/HomePage.vue';
import PageNotFoundVue from './pages/PageNotFound.vue';
import { reactive } from 'vue';

export const basePath = '/birthday';
const basePathRegex = /^(\/birthday)/;

const routes: {[key: string]: any} = {
    '/view': ViewPageVue,
    '/': HomePageVue,
};

const errors = {
    404: PageNotFoundVue
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

    if (errors[404] != null) store.currentPage = errors[404];
};

window.addEventListener('popstate', () => {
    getCurrentPage(window.location.pathname);
});

getCurrentPage(window.location.pathname);