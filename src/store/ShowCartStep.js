import { action, computed, observable } from 'mobx';
import { delay, getCartItems } from '../utils';
import { WorkflowStep } from './WorkflowStep';

export class ShowCartStep extends WorkflowStep {
  @observable.shallow
  items = [];

  @computed
  get itemTotal() {
    return this.items.reduce((acc, cur) => acc + cur.price, 0);
  }

  @action
  async getLoadOperation() {
    const items = await getCartItems();
    console.log(this);
    this.items = items;
  }

  @action
  async getMainOperation() {
    return await delay(600);
  }
}
