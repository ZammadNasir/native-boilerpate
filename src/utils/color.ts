import { ColorSchemeName } from 'react-native';

export const ThemeColors = {
  ORANGE: '#fa7816',
  BLUE: '#2c2d5b',
  BACKGROUND: '#ebebeb',
  WHITE: '#ffffff',
  BORDER: 'lightgray',
  DOMINOSred: '#D2112C',
  DOMINOSblue: '#0078AC',
  GREEN: '#629847',
  GREY: '#616161',
  LIGHTGREY: '#d0d0d0',
  YELLOW: '#EEBB00',
  WHEAT: '#fefefe',
  EXTRALIGHTGRAY: '#f2f2f2',
  EXTRALIGHTGRAY_2: '#f5f5f5',
  BLACK: '#000',
};

export const color = {
  dark: {
    backgroundColor: '#212121', // light grey
    primaryColor: ThemeColors.DOMINOSblue, // bright blue
    secondaryColor: ThemeColors.GREY, // dark grey
    textColor: '#fff', // off-white
  },
  light: {
    backgroundColor: '#f8f9fa', // grey
    primaryColor: ThemeColors.DOMINOSblue, // blue
    secondaryColor: '#fff', // off-white
    textColor: ThemeColors.GREY, // dark grey
  },
};

export type Palette = (typeof color)[keyof typeof color];

export type Theme = ColorSchemeName | keyof typeof color;
