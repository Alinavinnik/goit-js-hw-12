const loader = document.querySelector('.loader');
export const ulElem = document.querySelector('.gallery');
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

  return images.map(imgTemplate).join('');
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
