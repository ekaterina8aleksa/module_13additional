import infiniteScroll from '../node_modules/infinite-scroll';
import * as basicLightbox from 'basiclightbox';
import '../node_modules/basiclightbox/dist/basicLightbox.min.css';
import PNotify from 'pnotify/dist/es/PNotify';
import 'pnotify/dist/es/PNotifyStyleMaterial.js';
import 'material-design-icons/iconfont/material-icons.css';
PNotify.defaults.styling = 'material';
PNotify.defaults.icons = 'material';

import { imageList, searchForm, btnSearch } from './js/refs';
import fetchItem from './js/fetchImg';
import imgItem from './tmpl/imgItem.hbs';
import './sass/styles.scss';

//const apiKey = '16137003-a99878a83e3cf9a5973a72148';

searchForm.addEventListener('submit', event => {
    event.preventDefault();

    const form = event.currentTarget;
    fetchItem.query = form.elements.query.value;

    fetchItem.reset();
    imageList.innerHTML = '';
    //infScroll.pageIndex = 1;
    btnSearch.classList.add('hidden');
    if (!fetchItem.query) {
        PNotify.error({ title: 'Oooopsy', text: 'input mistake' });
        return;
    }

    nextPageMarkup();
});

btnSearch.addEventListener('click', () => {
    nextPageMarkup();
});

/*window.addEventListener('scroll', () => {
    infScroll().then(nextPageMarkup());
});*/

/*imageList.addEventListener('click', event => {
    if (event.target.nodeName !== 'IMG') return;
    if (event.target.dataset.imgbig != null) {
        basicLightbox.create(`<img src="${event.target.dataset.imgbig}">`).show();
    }
});*/

function imgMarkup(hits) {
    const markup = imgItem(hits);
    imageList.insertAdjacentHTML('beforeend', markup);
}

function nextPageMarkup() {
    fetchItem.fetch().then(hits => {
        imgMarkup(hits);
        btnSearch.classList.remove('hidden');
        window.scrollTo({
            top: imageList.scrollHeight,
            behavior: 'smooth',
        });
    });
}

/*const infScroll = new infiniteScroll(imageList, {
    path: function () {
        return (
            'https://pixabay.com/api/?image_type=photo&orientation=horizontal&q=' +
            fetchItem.query +
            '&page=' +
            this.pageIndex +
            '&per_page=12&key=' +
            apiKey
        );
    },
    history: false,
    responseType: 'text',
});*/
