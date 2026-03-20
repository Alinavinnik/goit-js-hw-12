import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
const ulElem = document.querySelector('.gallery');
const loader = document.querySelector('.loader');

let lightbox = new SimpleLightbox('.gallery .photo-card a', {
  captionsData: 'alt',
  captionDelay: 250,
});
// створення розмітки
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

              <li class="info">
              <div class="info-item"><h2>Likes: <span>${likes}</span></h2></div>
              <div class="info-item"> <h2>Views: <span>${views}</span></h2></div>
              <div class="info-item"><h2>Comments: <span>${comments}</span></h2></div>
              <div class="info-item"><h2>Downloads: <span>${downloads}</span></h2></div>
            </li>
            `;
  }
  function imgsTemplate(imgs) {
    return imgs.map(imgTemplate).join('');
  }
  const markup = imgsTemplate(images);
  ulElem.innerHTML = markup;
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
