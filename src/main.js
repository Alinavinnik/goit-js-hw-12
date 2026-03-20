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
function handleSubmit(e) {
  e.preventDefault();
  const formData = new FormData(form);
  const searchText = formData.get('search-text');
  if (searchText.trim() === '') {
    iziToast.show({
      message: 'Please enter a search term',
      position: 'topRight',
      color: 'rgba(232, 13, 13, 0.8)',
    });
    return;
  } else {
    clearGallery();
    showLoader();
    getImagesByQuery(searchText)
      .then(res => {
        if (!res.hits.length) {
          hideLoader();
          iziToast.show({
            message: `Sorry, there are no images matching your search query.Please try again!`,
            position: 'topRight',
          });
        } else {
          createGallery(res.hits);
        }
      })
      .catch(err => {
        hideLoader();

        iziToast.error({
          message: 'Something went wrong!',
          position: 'topRight',
        });
      })
      .finally(() => {
        hideLoader();
        form.reset();
      });
  }
}
