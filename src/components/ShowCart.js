import { Divider, List } from '@material-ui/core';
import React from 'react';
import { CartItem } from './CartItem';
import { TemplateStepComponent } from './TemplateStep';
import { TotalItem } from './TotalItem';

export class ShowCart extends React.Component {
  render() {


    return (
      <TemplateStepComponent
        title={'Your Cart'}
        operationTitle={'Checkout'}
        renderDetails={step => {
          // console.log('[ShowCart].step', step);
          const { items, itemTotal } = step;

          return (
            <List>
              {items.map(item => (
                <CartItem key={item.title} item={item} />
              ))}
              <Divider />
              <TotalItem total={itemTotal} />
            </List>
          );
        }}
      />
    );
  }
}
