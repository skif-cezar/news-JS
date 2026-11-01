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
    // Безопасно вешаем слушатель кликов на блок источников
    const sourcesContainer = document.querySelector('.sources');

    if (sourcesContainer) {
      sourcesContainer.addEventListener('click', (e) =>
        this.controller.getNews<INewsResponse>(e, (data) => this.view.drawNews(data))
      );
    } else {
      console.warn("Container '.sources' not found in the DOM");
    }

    // Загружаем список источников при старте приложения
    this.controller.getSources((data) => this.view.drawSources(data));
  }
}

export default App;
