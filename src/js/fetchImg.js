import PNotify from 'pnotify/dist/es/PNotify';

const apiKey = '16137003-a99878a83e3cf9a5973a72148';

export default {
    page: 1,
    searchQuery: '',
    fetch() {
        const url = `https://pixabay.com/api/?image_type=photo&orientation=horizontal&q=${this.query}&page=${this.page}&per_page=12&key=${apiKey}`;

        return fetch(url)
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error('Error fetching data');
            })
            .then(({ hits }) => {
                this.count();
                console.log(hits.length);
                console.log(this.count);
                if (hits.length === 0) {
                    PNotify.alert({
                        title: 'This is the end',
                        text: 'No more images or input mistake',
                    });
                }
                return hits;
            })
            .catch(error => console.error(error));
    },
    reset() {
        this.page = 1;
    },
    count() {
        this.page += 1;
    },
    get query() {
        return this.searchQuery;
    },
    set query(value) {
        this.searchQuery = value;
    },
};
