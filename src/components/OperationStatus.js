import { CircularProgress, Typography } from '@material-ui/core';
import React from 'react';

export function OperationStatus({ state, render }) {
  switch (state) {
    case 'pending':
      return <CircularProgress variant={'indeterminate'} />;
    case 'completed':
      return render();
    case 'failed':
      return <Typography color={'accent'}>Operation Failed</Typography>;
    default:
      return null;
  }
}
