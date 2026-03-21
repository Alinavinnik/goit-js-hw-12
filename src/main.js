import { getImagesByQuery } from './js/pixabay-api';
import {
  createGallery,
  clearGallery,
  showLoader,
  hideLoader,
  ulElem,
} from './js/render-functions';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

let lightbox = new SimpleLightbox('.gallery .photo-card a', {
  captionsData: 'alt',
  captionDelay: 250,
});

const form = document.querySelector('.form');
const btnLoad = document.querySelector('.load');

const perPage = 15;
let page;
let searchText;
let totalPages;

form.addEventListener('submit', handleFormSubmit);
//! ========================================

async function handleFormSubmit(e) {
  e.preventDefault();

  const formData = new FormData(form);
  searchText = formData.get('search-text').trim();

  if (searchText === '') {
    showMessage('Please enter a search term');
    return;
  }

  clearGallery();
  showLoader();

  try {
    const res = await getImagesByQuery(searchText, 1);
    totalPages = Math.ceil(res.totalHits / perPage);
    if (!res.hits.length) {
      hideLoader();
      hideLoadBtn();
      showMessage(
        `Sorry, there are no images matching your search query.Please try again!`
      );
    }
    const markup = createGallery(res.hits);
    ulElem.innerHTML = markup;
    lightbox.refresh();
  } catch (error) {
    hideLoader();
    hideLoadBtn();
    console.log(error);

    showMessage('Something went wrong!');
  }
  checkLastPage();
  hideLoader();
  form.reset();
}
//! ========================================message text

btnLoad.addEventListener('click', handleBtnLoadSubmit);

async function handleBtnLoadSubmit(e) {
  e.preventDefault();
  page++;

  checkLastPage();
  try {
    const result = await getImagesByQuery(searchText, page);
    const markup = createGallery(result.hits);
    ulElem.insertAdjacentHTML('beforeend', markup);
    lightbox.refresh();
  } catch (error) {
    hideLoader();
    showMessage('Something went wrong!');
  }

  hideLoader();
}

function checkLastPage() {
  if (page >= totalPages) {
    showMessage(`We're sorry, but you've reached the end of search results.`);
    hideLoadBtn();
  } else {
    showLoadBtn();
  }
}

function showMessage(message) {
  iziToast.show({
    message: message,
    position: 'topRight',
    backgroundColor: 'rgba(232, 13, 13, 0.8)',
    messageColor: 'white',
  });
}

function showLoadBtn() {
  btnLoad.classList.remove('is-hidden');
}
function hideLoadBtn() {
  btnLoad.classList.add('is-hidden');
}
