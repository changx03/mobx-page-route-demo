import Headset from '@material-ui/icons/Headset';
import Keyboard from '@material-ui/icons/Keyboard';
import LaptopMac from '@material-ui/icons/LaptopMac';
import { runInAction } from 'mobx';

export function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export async function doAsync(getPromise, setState) {
  setState('pending');
  try {
    await getPromise();
    runInAction(() => {
      setState('completed');
    });
  } catch (err) {
    runInAction(() => {
      setState('failed');
    });
  }
}

export async function getCartItems() {
  await delay(500);
  return [
    { title: 'Laptop', price: 999, icon: LaptopMac },
    { title: 'Headset', price: 99, icon: Headset },
    { title: 'Keyboard', price: 49, icon: Keyboard },
  ];
}
