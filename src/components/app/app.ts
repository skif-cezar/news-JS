import { INewsResponse } from '../../types';
import AppController from '../controller/controller';
import { AppView } from '../view/appView';

class App {
  controller: AppController;
  view: AppView;

  constructor() {
    this.controller = new AppController();
    this.view = new AppView();
  }

  start(): void {
    const sourcesContainer = document.querySelector('.sources');

    if (sourcesContainer) {
      sourcesContainer.addEventListener('click', (e) =>
        this.controller.getNews<INewsResponse>(e, (data) => this.view.drawNews(data))
      );
    } else {
      console.warn("Container '.sources' not found in the DOM");
    }

    this.controller.getSources((data) => {
      this.view.drawSources(data);

      this.initSourcesScroll();
    });
  }

  private initSourcesScroll(): void {
    const scrollContainer = document.querySelector('.sources.buttons') as HTMLElement | null;
    const btnLeft = document.getElementById('scroll-left') as HTMLButtonElement | null;
    const btnRight = document.getElementById('scroll-right') as HTMLButtonElement | null;

    if (!scrollContainer || !btnLeft || !btnRight) {
      return;
    }

    const scrollAmount: number = 300;

    btnLeft.addEventListener('click', (): void => {
      scrollContainer.scrollBy({
        left: -scrollAmount,
        behavior: 'smooth',
      });
    });

    btnRight.addEventListener('click', (): void => {
      scrollContainer.scrollBy({
        left: scrollAmount,
        behavior: 'smooth',
      });
    });
  }
}

export default App;
