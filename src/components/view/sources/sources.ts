import { ISource } from '../../../types';
import './sources.css';

class Sources {
  draw(data: ISource[]): void {
    const fragment = document.createDocumentFragment();
    const sourceItemTemp = document.querySelector('#sourceItemTemp') as HTMLTemplateElement | null;

    if (!sourceItemTemp) {
      console.error('Template #sourceItemTemp not found');
      return;
    }

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

    const sourcesContainer = document.querySelector('.sources');

    if (sourcesContainer) {
      sourcesContainer.append(fragment);
    }
  }
}

export default Sources;
