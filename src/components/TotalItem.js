import { ListItem, ListItemIcon, ListItemText, Typography } from '@material-ui/core';
import React from 'react';

export function TotalItem({ total }) {
  return (
    <ListItem>
      <ListItemIcon style={{ width: 64 }}>
        <Typography variant={'headline'}>Total</Typography>
      </ListItemIcon>
      <ListItemText primary={`$${total}`} />
    </ListItem>
  );
}
