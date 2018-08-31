import { Button, CircularProgress, Grid, Typography } from '@material-ui/core';
import { inject, Observer } from 'mobx-react';
import React, { Fragment } from 'react';
import { OperationStatus } from './index';

@inject(stores => ({ store: stores.store }))
export class TemplateStepComponent extends React.Component {
  static defaultProps = {
    title: 'Step Title',
    operationTitle: 'Operation',
    renderDetails: step => 'Some Description',
  };

  render() {
    const { title, operationTitle, renderDetails } = this.props;

    return (
      <Fragment>
        <Typography variant={'headline'} style={{ textAlign: 'center' }}>
          {title}
        </Typography>
        <Observer>
          {() => {
            const { step } = this.props.store;

            return (
              <OperationStatus
                state={step.loadState}
                render={() => (
                  <div style={{ padding: '2rem 0' }}>{renderDetails(step)}</div>
                )}
              />
            );
          }}
        </Observer>
        <Grid justify={'center'} container>
          <Observer>
            {() => {
              const { step } = this.props.store;
              return (
                <Button
                  variant={'raised'}
                  color={'primary'}
                  disabled={
                    step.loadState === 'pending' ||
                    step.operationState === 'pending'
                  }
                  onClick={step.perform}
                >
                  {operationTitle}
                  {step.operationState === 'pending' ? (
                    <CircularProgress
                      variant={'indeterminate'}
                      size={20}
                      style={{
                        color: 'black',
                        marginLeft: 10,
                      }}
                    />
                  ) : null}
                </Button>
              );
            }}
          </Observer>
        </Grid>
      </Fragment>
    );
  }
}
