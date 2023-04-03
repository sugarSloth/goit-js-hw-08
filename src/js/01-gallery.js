import SimpleLightbox from "simplelightbox/dist/simple-lightbox.esm";
import "simplelightbox/dist/simple-lightbox.min.css";
import { galleryItems } from './gallery-items';

const gallery = document.querySelector('.gallery');
const galleryMarkup = createGalleryMarkup(galleryItems);

gallery.insertAdjacentHTML('afterbegin', galleryMarkup);

function createGalleryMarkup(items) {
  return items.map(item => `
    <a class="gallery__item" href="${item.original}">
      <img class="gallery__image" src="${item.preview}" alt="${item.description}" />
    </a>
  `).join('');
}

document.addEventListener('DOMContentLoaded', () => {
  const lightbox = new SimpleLightbox('.gallery__item', {
    captionsData: "alt",
    captionDelay: 250,
  });
});
