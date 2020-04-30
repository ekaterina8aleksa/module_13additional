import infiniteScroll from '../node_modules/infinite-scroll';
import * as basicLightbox from 'basiclightbox';
import '../node_modules/basiclightbox/dist/basicLightbox.min.css';
import PNotify from 'pnotify/dist/es/PNotify';
import 'pnotify/dist/es/PNotifyStyleMaterial.js';
import 'material-design-icons/iconfont/material-icons.css';
PNotify.defaults.styling = 'material';
PNotify.defaults.icons = 'material';

import { imageList, searchForm } from './js/refs';
import imgItem from './tmpl/imgItem.hbs';
import './sass/styles.scss';

const apiKey = '16137003-a99878a83e3cf9a5973a72148';
const cors_api_host = 'https://cors-anywhere.herokuapp.com/';
let searchQuery;

searchForm.addEventListener('submit', event => {
    event.preventDefault();

    const form = event.currentTarget;
    searchQuery = form.elements.query.value;
    console.log(searchQuery);

    imageList.innerHTML = '';
    infScroll.pageIndex = 1;

    if (!searchQuery) {
        PNotify.error({ title: 'Oooopsy', text: 'input mistake' });
        return;
    }
    infScroll.loadNextPage();
});

imageList.addEventListener('click', event => {
    if (event.target.nodeName !== 'IMG') return;
    if (event.target.dataset.imgbig != null) {
        basicLightbox
            .create(`<img src="${event.target.dataset.imgbig}">`)
            .show();
    }
});

const infScroll = new infiniteScroll('.gallery', {
    path: function () {
        return (
            cors_api_host +
            'https://pixabay.com/api/?image_type=photo&orientation=horizontal&q=' +
            searchQuery +
            '&page=' +
            this.pageIndex +
            '&per_page=12&key=' +
            apiKey
        );
    },
    history: false,
    responseType: 'text',
    scrollThreshold: 100,
});

//const proxyFix = new Proxy();

infScroll.on('load', response => {
    const dataInfo = JSON.parse(response);
    const cards = dataInfo.hits;

    const markup = imgItem(cards);
    imageList.insertAdjacentHTML('beforeend', markup);
});
