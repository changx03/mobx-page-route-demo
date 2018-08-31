import { ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import React from 'react';

export function CartItem({ item }) {
  return (
    <ListItem>
      <ListItemIcon>
        <item.icon
          style={{
            height: 64,
            width: 64,
          }}
        />
      </ListItemIcon>
      <ListItemText primary={item.title} secondary={`$${item.price}`} />
    </ListItem>
  );
}
