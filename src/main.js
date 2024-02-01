import axios from 'axios';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import simpleLightbox from 'simplelightbox';

import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const BASE_URL = 'https://pixabay.com/api';
const API_KEY = '42087776-9136d7523d21dc11bf8e1a72d';

const form = document.querySelector('.form');
const list = document.querySelector('.gallery');
const loader = document.querySelector('.loader');
const loadMoreBtn = document.querySelector('.button');

form.addEventListener('submit', handleSearch);
loader.classList.remove('loader');

const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

const queryParams = {
  query: '',
  page: 1,
  per_page: 40,
  maxPage: 0,
};

async function handleSearch(e) {
  e.preventDefault();
  list.innerHTML = '';
  const form = e.currentTarget;
  queryParams.query = form.elements.query.value.trim();
  loader.classList.add('loader');
  loadMoreBtn.classList.add('is-hidden');
  if (!queryParams.query) {
    return;
  }
  try {
    const { data } = await searchPhotos(queryParams);
    console.log(data);
    let markup = '';
    const datas = data.hits;
    for (const item of datas) {
      markup += createMarkup(item);
    }
    if (datas.length === 0) {
      iziToast.error({
        message: `Sorry, there are no images matching your search query. Please try again!`,
        position: 'topRight',
      });
    }
    const totalResults = data.totalHits;
    queryParams.maxPage = Math.ceil(totalResults / queryParams.per_page);
    list.innerHTML = markup;
    loader.classList.remove('loader');
    if (datas.length > 0 && datas.length !== totalResults) {
      loadMoreBtn.addEventListener('click', handleLoadMore);
      loadMoreBtn.classList.remove('is-hidden');
    } else {
      loadMoreBtn.classList.add('is-hidden');
    }
    lightbox.refresh();
  } catch (err) {
    console.log(err);
  } finally {
    form.reset();
  }
}

async function handleLoadMore() {
  queryParams.page += 1;
  loader.classList.add('loader');
  loadMoreBtn.classList.add('is-hidden');
  try {
    const { data } = await searchPhotos(queryParams);
    console.log(data);
    let markup = '';
    const datas = data.hits;
    for (const item of datas) {
      markup += createMarkup(item);
    }
    list.innerHTML += markup;
  } catch (err) {
    console.log(err);
  } finally {
    loader.classList.remove('loader');
    loadMoreBtn.classList.remove('is-hidden');
  }

  if (queryParams.page === queryParams.maxPage) {
    loadMoreBtn.classList.add('is-hidden');
    iziToast.info({
      message: `We're sorry, but you've reached the end of search results.`,
      position: 'topRight',
    });
    loadMoreBtn.removeEventListener('click', handleLoadMore);
  }
}

async function searchPhotos({ query, page = 1, per_page }) {
  try {
    const response = await axios.get(`${BASE_URL}/?`, {
      params: {
        key: API_KEY,
        q: query,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        page,
        per_page,
      },
    });
    return response;
  } catch (err) {
    console.log(err);
  }
}

function createMarkup({
  webformatURL,
  largeImageURL,
  tags,
  likes,
  views,
  comments,
  downloads,
}) {
  const markup = ` <li class="gallery-item">
    <a class="gallery-link" href=${largeImageURL}>
      <img
        class="gallery-image"
        src=${webformatURL}
        alt=${tags}
        >
  
        <p>Likes<br> ${likes}</p>
        <p>Views<br> ${views}</p>
        <p>Comments<br> ${comments}</p>
        <p>Downloads<br> ${downloads}</p>   
    </a>
  </li>`;

  return markup;
}
