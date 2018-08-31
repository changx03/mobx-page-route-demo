import { Typography } from '@material-ui/core';
import React, { Fragment } from 'react';

export function TrackOrderDescription() {
  return (
    <Fragment>
      <Typography color={'primary'} variant={'subheading'}>
        We are preparing your order. You can track its status here.
      </Typography>
      <Typography color={'primary'} style={{ marginTop: 20 }}>
        Oh! Why stop at just the purchased products. There is lot more goodness
        in the MobX shop. Continue the exploration.
      </Typography>
    </Fragment>
  );
}
