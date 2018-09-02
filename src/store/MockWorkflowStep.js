import { delay } from '../utils';
import { WorkflowStep } from './WorkflowStep';

export class MockWorkflowStep extends WorkflowStep {
  getLoadOperation() {
    return delay(800);
  }

  getMainOperation() {
    return delay(800);
  }
}
