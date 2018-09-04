import { action, autorun, observable, reaction, when } from 'mobx';
import { routes } from '../routes';
import { ConfirmStep } from './ConfirmStep';
import { HistoryTracker } from './history';
import { PaymentStep } from './PaymentStep';
import { ShoppingStep } from './ShoppingStep';
import { ShowCartStep } from './ShowCartStep';
import { TrackStep } from './TrackStep';

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
  currentStepName = null;

  @observable.ref
  step = null;

  constructor() {
    this.tracker.startListening(routes);
    this.currentStepName = this.tracker.page;

    autorun(() => {
      const currentStep = this.currentStepName;
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
        this.currentStepName = page;
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

    this.currentStepName = CheckoutWorkflow.steps[nextStepIdx].name;
  }
}
