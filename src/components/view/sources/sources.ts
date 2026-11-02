import { ISource } from '../../../types';
import './sources.css';

type OnSourceClickCallback = (sourceId: string) => void;

class Sources {
  private sourcesContainer: HTMLElement | null;
  private activeItem: HTMLElement | null = null;
  private onSourceClick?: OnSourceClickCallback;

  constructor(onSourceClick?: OnSourceClickCallback) {
    this.sourcesContainer = document.querySelector('.sources');
    this.onSourceClick = onSourceClick;
    this.initListeners();
  }

  private initListeners(): void {
    if (!this.sourcesContainer) return;

    this.sourcesContainer.addEventListener('click', (event) => {
      const sourceItem = (event.target as HTMLElement).closest(
        '.source__item'
      ) as HTMLElement | null;

      if (!sourceItem) return;

      const sourceId = sourceItem.getAttribute('data-source-id');
      if (!sourceId) return;

      if (this.activeItem) {
        this.activeItem.classList.remove('active');
      }

      sourceItem.classList.add('active');
      this.activeItem = sourceItem;

      if (this.onSourceClick) {
        this.onSourceClick(sourceId);
      }
    });
  }

  public draw(data: ISource[]): void {
    if (!this.sourcesContainer) return;

    const sourceItemTemp = document.querySelector('#sourceItemTemp') as HTMLTemplateElement | null;

    if (!sourceItemTemp) {
      console.error('Template #sourceItemTemp not found');
      return;
    }

    const fragment = document.createDocumentFragment();

    data.forEach((item) => {
      const sourceClone = sourceItemTemp.content.cloneNode(true) as DocumentFragment;
      const itemNameElem = sourceClone.querySelector('.source__item-name');
      const sourceItemElem = sourceClone.querySelector('.source__item');

      if (itemNameElem) {
        itemNameElem.textContent = item.name;
      }

      if (sourceItemElem) {
        sourceItemElem.setAttribute('data-source-id', item.id);
      }

      fragment.append(sourceClone);
    });

    this.sourcesContainer.innerHTML = '';
    this.sourcesContainer.append(fragment);
    this.activeItem = null;
  }
}

export default Sources;
