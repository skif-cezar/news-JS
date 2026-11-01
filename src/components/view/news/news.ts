import { INewsItem } from '../../../types';
import './news.css';

class News {
  draw(data: INewsItem[]) {
    const news = data.length >= 10 ? data.filter((_item, idx) => idx < 10) : data;

    const fragment = document.createDocumentFragment();
    const newsItemTemp = document.querySelector('#newsItemTemp') as HTMLTemplateElement | null;

    if (!newsItemTemp) {
      console.error('Template #newsItemTemp not found');
      return;
    }

    news.forEach((item, idx) => {
      const newsClone = newsItemTemp.content.cloneNode(true) as DocumentFragment;
      const photoElem = newsClone.querySelector('.news__meta-photo') as HTMLElement | null;
      const authorElem = newsClone.querySelector('.news__meta-author');
      const dateElem = newsClone.querySelector('.news__meta-date');
      const titleElem = newsClone.querySelector('.news__description-title');
      const sourceElem = newsClone.querySelector('.news__description-source');
      const contentElem = newsClone.querySelector('.news__description-content');
      const linkElem = newsClone.querySelector('.news__read-more a');

      if (idx % 2) {
        const newsItemElem = newsClone.querySelector('.news__item');

        if (newsItemElem) {
          newsItemElem.classList.add('alt');
        }
      }

      if (photoElem) {
        photoElem.style.backgroundImage = `url(${item.urlToImage || 'img/news_placeholder.jpg'})`;
      }

      if (authorElem) {
        authorElem.textContent = item.author || item.source.name;
      }

      if (dateElem) {
        dateElem.textContent = item.publishedAt.slice(0, 10).split('-').reverse().join('-');
      }

      if (titleElem) {
        titleElem.textContent = item.title;
      }

      if (sourceElem) {
        sourceElem.textContent = item.source.name;
      }

      if (contentElem) {
        contentElem.textContent = item.description;
      }

      if (linkElem) {
        linkElem.setAttribute('href', item.url);
      }

      fragment.append(newsClone);
    });

    const newsContainer = document.querySelector('.news');

    if (newsContainer) {
      newsContainer.innerHTML = '';
      newsContainer.appendChild(fragment);
    }
  }
}

export default News;
