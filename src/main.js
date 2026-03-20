import { getImagesByQuery } from './js/pixabay-api';
import {
  createGallery,
  clearGallery,
  showLoader,
  hideLoader,
} from './js/render-functions';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.form');
form.addEventListener('submit', handleSubmit);
//! ========================================

async function handleSubmit(e) {
  e.preventDefault();

  const formData = new FormData(form);
  const searchText = formData.get('search-text').trim();

  if (searchText === '') {
    showMessage('Please enter a search term');
    return;
  }

  clearGallery();
  showLoader();

  try {
    const res = await getImagesByQuery(searchText);

    if (!res.hits.length) {
      hideLoader();
      showMessage(
        `Sorry, there are no images matching your search query.Please try again!`
      );
    }
    createGallery(res.hits);
  } catch (error) {
    hideLoader();
    showMessage('Something went wrong!');
  }

  hideLoader();
  form.reset();
}
//! ========================================message text

function showMessage(message) {
  iziToast.show({
    message: message,
    position: 'topRight',
    backgroundColor: 'rgba(232, 13, 13, 0.8)',
    messageColor: 'white',
  });
}

//! ========================================
