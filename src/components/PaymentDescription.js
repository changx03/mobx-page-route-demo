import { Typography } from '@material-ui/core';
import React from 'react';

export function PaymentDescription() {
  return (
    <Typography color={'primary'} component={'div'}>
      You can pay in <strong>kind</strong> or <strong>cash</strong>.
      <ul>
        <li>For cash payments, we accept Credit/Debit Cards</li>
        <li>If paying in kind, just spread the MobX lifestyle</li>
      </ul>
    </Typography>
  );
}
