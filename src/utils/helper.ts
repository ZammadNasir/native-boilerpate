import NetInfo from '@react-native-community/netinfo';

import { scaledSize } from './dimensions';
import { Language } from '@src/types';

export const isNetworkConnected = async () => {
  const state = await NetInfo.refresh();
  return state.isConnected || false;
};

export function isEmpty(obj: object) {
  return Object.keys(obj).length === 0;
}

export const logger = (...args: any) => {
  if (__DEV__) {
    // eslint-disable-next-line no-console
    console.log(...args);
  }
};

export const set_localize_content = (obj: any, language: Language) => {
  return obj?.[language];
};

export const scaled = (value: number) => {
  return {
    height: scaledSize(value),
    width: scaledSize(value),
  };
};

export function boxShadow(
  color: string,
  offset = { height: 2, width: 2 },
  radius = 8,
  opacity = 0.2
) {
  return {
    elevation: radius,
    shadowColor: color,
    shadowOffset: offset,
    shadowOpacity: opacity,
    shadowRadius: radius,
  };
}

export function delay(ms: number) {
  return new Promise(resolve => setTimeout(resolve as () => void, ms));
}

export const getTrimmedOrderNumber = (orderNumber: any): string => {
  try {
    const orderNumberLength = 16;
    if ((`${orderNumber}` || '').length > 8) {
      return `${orderNumber}`.substring(8, orderNumberLength);
    } else {
      return `${orderNumber}`;
    }
  } catch (error) {
    console.error('Error in getTrimmedOrderNumber:', error);
    return '';
  }
};
