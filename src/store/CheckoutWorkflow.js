import { action, autorun, observable, reaction, runInAction, when } from 'mobx';
import { delay } from '../utils';
import { HistoryTracker } from './history';
import { MockWorkflowStep } from './MockWorkflowStep';
import { ShowCartStep } from './ShowCartStep';

class ShoppingStep extends MockWorkflowStep {}

class PaymentStep extends MockWorkflowStep {}

class ConfirmStep extends MockWorkflowStep {}

class TrackStep extends MockWorkflowStep {
  async getMainOperation() {
    await delay(400);
    runInAction(() => (this.workflow.currentStep = 'shopping'));
  }
}

const routes = {
  shopping: '/',
  cart: '/cart',
  payment: '/payment',
  confirm: '/confirm',
  track: '/track',
};

export class CheckoutWorkflow {
  static steps = [
    { name: 'shopping', stepClass: ShoppingStep },
    { name: 'cart', stepClass: ShowCartStep },
    { name: 'payment', stepClass: PaymentStep },
    { name: 'confirm', stepClass: ConfirmStep },
    { name: 'track', stepClass: TrackStep },
  ];

  tracker = new HistoryTracker();
  nextStepPromise = null;

  @observable
  currentStep = null;
  
  @observable.ref
  step = null;

  constructor() {
    this.tracker.startListening(routes);
    this.currentStep = this.tracker.page;

    autorun(() => {
      const currentStep = this.currentStep;
      const stepIdx = CheckoutWorkflow.steps.findIndex(
        i => i.name === currentStep
      );
      if (stepIdx !== -1) {
        this.loadStep(stepIdx);
        this.tracker.page = CheckoutWorkflow.steps[stepIdx].name;
      }
    });

    reaction(
      () => this.tracker.page,
      page => {
        this.currentStep = page;
      }
    );
  }

  @action
  async loadStep(stepIdx) {
    if (this.nextStepPromise) {
      this.nextStepPromise.cancel();
    }

    const StepClass = CheckoutWorkflow.steps[stepIdx].stepClass;
    this.step = new StepClass();
    this.step.workflow = this;
    this.step.load();
    this.nextStepPromise = when(() => this.step.operationState === 'completed');

    await this.nextStepPromise;

    const nextStepIdx = stepIdx + 1;
    if (nextStepIdx >= CheckoutWorkflow.steps.length) {
      return;
    }

    this.currentStep = CheckoutWorkflow.steps[nextStepIdx].name;
  }
}
