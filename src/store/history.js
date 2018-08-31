import createHistory from 'history/createHashHistory';
import { action, observable, reaction } from 'mobx';

export class HistoryTracker {
  unsubscribe = null;
  history;
  routes;

  @observable
  page = null;

  constructor() {
    this.history = createHistory();
    reaction(
      () => this.page,
      page => {
        const route = this.routes[page];
        if (route) {
          this.history.push(route);
        }
      }
    );
  }

  startListening(routes) {
    this.routes = routes;
    this.unsubscribe = this.history.listen(location => {
      this.identifyRoute(location);
    });
    this.identifyRoute(this.history.location);
  }

  stopListening() {
    this.unsubscribe && this.unsubscribe();
  }

  @action
  setPage(key) {
    if (!this.routes[key]) {
      throw new Error(`Invalid page: ${key}`);
    }
    this.page = key;
  }

  @action
  identifyRoute(location) {
    const { pathname } = location;
    const routes = this.routes;
    this.page = Object.keys(routes).find(key => {
      const path = routes[key];
      return path.startWith(pathname);
    });
  }
}
