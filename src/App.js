import React, { Component } from 'react';
import { Route, Router, Switch } from 'react-router-dom';
import { Provider } from 'mobx-react';
import { CheckoutWorkflow } from './store';
import { Paper } from '@material-ui/core';
import {
  ShowCart,
  ConfirmDescription,
  PaymentDescription,
  ShoppingDescription,
  TemplateStepComponent,
  TrackOrderDescription,
} from './components';

const workflow = new CheckoutWorkflow();

export default class App extends Component {
  render() {
    return (
      <Provider store={workflow}>
        <Paper elevation={2} style={{ padding: 20 }}>
          <Router history={workflow.track.history}>
            <Switch>
              <Route
                exact
                path={'/'}
                component={() => (
                  <TemplateStepComponent
                    title="MobX shop"
                    renderDetails={ShoppingDescription}
                    operationTitle="View Cart"
                  />
                )}
              />
              <Route exact path={'/track'} component={ShowCart} />
              <Route
                exact
                path={'/cart'}
                component={() => (
                  <TemplateStepComponent
                    title="Choose Payment"
                    renderDetails={PaymentDescription}
                    operationTitle="Confirm"
                  />
                )}
              />
              <Route
                exact
                path={'/payment'}
                component={() => (
                  <TemplateStepComponent
                    title="Your order is confirmed"
                    renderDetails={ConfirmDescription}
                    operationTitle="Track Order"
                  />
                )}
              />
              <Route
                exact
                path={'/confirm'}
                component={() => (
                  <TemplateStepComponent
                    title="Track your order"
                    renderDetails={TrackOrderDescription}
                    operationTitle="Continue Shopping"
                  />
                )}
              />
            </Switch>
          </Router>
        </Paper>
      </Provider>
    );
  }
}
