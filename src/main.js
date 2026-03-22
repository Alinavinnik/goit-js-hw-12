import { getImagesByQuery } from './js/pixabay-api';
import {
  createGallery,
  clearGallery,
  showLoader,
  hideLoader,
  showLoadBtn,
  hideLoadBtn,
  checkLastPage,
  showMessage,
} from './js/render-functions';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

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
  showLoader();
  if (searchText === '') {
    showMessage('Please enter a search term');
    return;
  }
  page = 1;
  clearGallery();
  showLoader();

  try {
    const res = await getImagesByQuery(searchText, page);
    totalPages = Math.ceil(res.totalHits / perPage);
    if (!res.hits.length) {
      showMessage(
        `Sorry, there are no images matching your search query.Please try again!`
      );
      return;
    }
    createGallery(res.hits);
    checkLastPage();
    showLoadBtn();
  } catch (error) {
    console.log(error);
    showMessage('Something went wrong!');
  } finally {
    hideLoader();
    form.reset();
  }
}
//! ========================================

btnLoad.addEventListener('click', handleBtnLoadSubmit);

async function handleBtnLoadSubmit(e) {
  e.preventDefault();
  page += 1;
  try {
    const res = await getImagesByQuery(searchText, page);
    createGallery(res.hits);
    checkLastPage();
    scrollPage();
  } catch (error) {
    hideLoader();
    showMessage('Something went wrong!');
  }

  hideLoader();
}

function scrollPage() {
  const cardElem = document.querySelector('.photo-card');
  const heightCard = cardElem.getBoundingClientRect().height;
  window.scrollBy({
    top: heightCard * 2,
    behavior: 'smooth',
  });
}
