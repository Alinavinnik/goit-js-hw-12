import { getImagesByQuery } from './js/pixabay-api';
import {
  createGallery,
  clearGallery,
  showLoader,
  hideLoader,
  showLoadBtn,
  hideLoadBtn,
  showMessage,
} from './js/render-functions';

const form = document.querySelector('.form');
export const btnLoad = document.querySelector('.load');

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
  page = 1;
  clearGallery();
  showLoader();
  hideLoadBtn();
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
  showLoader();
  hideLoadBtn();
  try {
    const res = await getImagesByQuery(searchText, page);
    createGallery(res.hits);
    scrollPage();
    checkLastPage();
  } catch (error) {
    hideLoader();
    showMessage('Something went wrong!');
  } finally {
    hideLoader();
  }
}

function scrollPage() {
  const cardElem = document.querySelector('.photo-card');
  const heightCard = cardElem.getBoundingClientRect().height;
  window.scrollBy({
    top: heightCard * 2,
    behavior: 'smooth',
  });
}

function checkLastPage() {
  if (!totalPages) return;
  if (page >= totalPages) {
    showMessage(`We're sorry, but you've reached the end of search results.`);
    hideLoadBtn();
  } else {
    showLoadBtn();
  }
}
