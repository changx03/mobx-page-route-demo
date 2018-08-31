import { runInAction } from 'mobx';
import { delay } from '../utils';
import MockWorkflowStep from './MockWorkflowStep';

export { HistoryTracker } from './history';
export { ShowCartStep } from './ShowCartStep';
export { WorkflowStep } from './WorkflowStep';

export class ShoppingStep extends MockWorkflowStep {}

export class PaymentStep extends MockWorkflowStep {}

export class ConfirmStep extends MockWorkflowStep {}

export class TrackStep extends MockWorkflowStep {
  async getMainOperation() {
    await delay(400);
    runInAction(() => (this.workflow.currentStep = 'shopping'));
  }
}
