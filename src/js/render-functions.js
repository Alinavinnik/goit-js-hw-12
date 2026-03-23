const loader = document.querySelector('.loader');
export const ulElem = document.querySelector('.gallery');
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { btnLoad } from '../main';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
let lightbox = new SimpleLightbox('.gallery .photo-card a', {
  captionsData: 'alt',
  captionDelay: 250,
});
export function createGallery(images) {
  function imgTemplate(img) {
    const {
      webformatURL,
      tags,
      likes,
      views,
      comments,
      downloads,
      largeImageURL,
    } = img;

    return `<li class="photo-card">
              <a href=${largeImageURL}><img src="${webformatURL}" alt="${tags}"/></a>

              <div class="info">
              <div class="info-item"><h2>Likes: <span>${likes}</span></h2></div>
              <div class="info-item"> <h2>Views: <span>${views}</span></h2></div>
              <div class="info-item"><h2>Comments: <span>${comments}</span></h2></div>
              <div class="info-item"><h2>Downloads: <span>${downloads}</span></h2></div>
            </div>
            </li>
            `;
  }

  function imgsTemplate(imgs) {
    return imgs.map(imgTemplate).join('');
  }
  const markup = imgsTemplate(images);
  ulElem.insertAdjacentHTML('beforeend', markup);
  lightbox.refresh();
}

export function clearGallery() {
  ulElem.innerHTML = '';
}
export function showLoader() {
  loader.classList.remove('is-hidden');
}
export function hideLoader() {
  loader.classList.add('is-hidden');
}

export function showLoadBtn() {
  btnLoad.classList.remove('is-hidden');
}
export function hideLoadBtn() {
  btnLoad.classList.add('is-hidden');
}

export function showMessage(message) {
  iziToast.show({
    message: message,
    position: 'topRight',
    backgroundColor: 'rgba(232, 13, 13, 0.8)',
    messageColor: 'white',
  });
}
