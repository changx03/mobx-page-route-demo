import { action, observable } from 'mobx';
import { doAsync } from '../utils';
export class WorkflowStep {
  workflow = null;

  @observable loadState = 'none'; // none | pending | completed | failed;
  @observable operationState = 'none'; // none | pending | completed | failed;

  async getLoadOperation() {}

  async getMainOperation() {}

  @action.bound
  async load() {
    doAsync(
      () => this.getLoadOperation(), 
      state => (this.loadState = state)
    );
  }

  @action.bound
  async perform() {
    doAsync(
      () => this.getMainOperation(),
      state => (this.operationState = state)
    );
  }
}
