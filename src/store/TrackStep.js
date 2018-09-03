import { runInAction } from 'mobx';
import { delay } from '../utils';
import { MockWorkflowStep } from './MockWorkflowStep';

export class TrackStep extends MockWorkflowStep {
  async getMainOperation() {
    await delay(400);
    runInAction(() => (this.workflow.currentStep = 'shopping'));
  }
}
