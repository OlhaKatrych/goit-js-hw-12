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

form.addEventListener('submit', handleSearch);
loader.classList.remove('loader');

const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

async function handleSearch(e) {
  e.preventDefault();
  const form = e.currentTarget;
  const query = form.elements.query.value.trim();
  loader.classList.add('loader');
  try {
    const { data } = await searchPhotos(query);
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
    list.innerHTML = markup;
    loader.classList.remove('loader');
    lightbox.refresh();
  } catch (err) {
    console.log(err);
  } finally {
    form.reset();
  }
}

async function searchPhotos(query) {
  try {
    const response = await axios.get(`${BASE_URL}/?`, {
      params: {
        key: API_KEY,
        q: query,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        page: 1,
        per_page: 40,
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
