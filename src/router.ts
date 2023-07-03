import ViewPageVue from './pages/ViewPage.vue';
import HomePageVue from './pages/HomePage.vue';
import PageNotFoundVue from './pages/PageNotFound.vue';

export const basePath = '/birthday';
const basePathRegex = /^(\/birthday)/;

export const routes: {[key: string]: any} = {
    '/view': ViewPageVue,
    '/': HomePageVue,
    'notfound': PageNotFoundVue // Only Used On Dev Server (For Now)
};

export let currentPage: any;

export const getCurrentPage = (newPath: string) => {
    if (Object.keys(routes).includes(`${newPath}/`.replace(basePathRegex, ""))) {
        currentPage = routes[`${newPath}/`.replace(basePathRegex, "")];
        return currentPage;
    }
    if (newPath[newPath.length - 1] == '/' && Object.keys(routes).includes(newPath.substring(0, newPath.length - 1).replace(basePathRegex, ""))) {
        currentPage = routes[newPath.substring(0, newPath.length - 1).replace(basePathRegex, "")];
        return currentPage;
    }
    if (Object.keys(routes).includes(newPath.replace(basePathRegex, ""))) {
        currentPage = routes[newPath.replace(basePathRegex, "")];
        return currentPage;
    }

    if (routes['notfound'] != null) currentPage = routes['notfound'];
    return currentPage;
};

getCurrentPage(window.location.pathname);