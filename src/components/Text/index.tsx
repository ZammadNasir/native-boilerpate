import {
  // eslint-disable-next-line no-restricted-imports
  Text as RNText,
  StyleProp,
  TextProps as TextProperties,
  TextStyle,
} from 'react-native';

import { isDarkMode } from '@src/constants/appearence';
import { scaledSize } from '@src/utils';

export enum Fonts {
  Poppins = 'Poppins',
  BebasBold = 'BebasNeue-Bold',
  BebasBook = 'BebasNeue-Book',
  BebasLight = 'BebasNeue-Light',
  BebasThin = 'BebasNeue-Thin',
  SansBold = 'OpenSans-Bold',
  SansLight = 'OpenSans-Light',
  SansRegular = 'OpenSans-Regular',
  SansSemiBold = 'OpenSans-Semi-Bold',
  PizzaPressFill = 'PizzaPress-Fill',
  PizzaPressRegular = 'PizzaPress-Regular',
  PizzaPressShadow = 'PizzaPress-Shadow',
}

const BASE_TEXT: TextStyle = {
  fontSize: scaledSize(7),
};

export const presets = {
  default: BASE_TEXT,
  font400: {
    ...BASE_TEXT,
    fontFamily: Fonts.PizzaPressRegular,
  } as TextStyle,
  font500: {
    ...BASE_TEXT,
    fontFamily: Fonts.PizzaPressRegular,
  } as TextStyle,
  font600: {
    ...BASE_TEXT,
    fontFamily: Fonts.PizzaPressRegular,
  } as TextStyle,
  font700: {
    ...BASE_TEXT,
    fontFamily: Fonts.PizzaPressRegular,
  } as TextStyle,
  span: {
    ...BASE_TEXT,
    fontFamily: Fonts.Poppins,
    fontSize: scaledSize(16),
    fontWeight: '500',
  } as TextStyle,
  p: {
    ...BASE_TEXT,
    // fontFamily: Fonts.Poppins,
    fontFamily: 'BebasNeue-Bold',
    fontSize: scaledSize(16),
    // fontWeight: '500',
    textTransform: 'uppercase',
  } as TextStyle,
  h1: {
    ...BASE_TEXT,
    fontFamily: Fonts.Poppins,
    fontSize: scaledSize(24),
    fontWeight: '700',
  } as TextStyle,
  h2: {
    ...BASE_TEXT,
    fontFamily: Fonts.Poppins,
    fontSize: scaledSize(21),
    fontWeight: '700',
  } as TextStyle,
  h3: {
    ...BASE_TEXT,
    // fontFamily: Fonts.Poppins,
    fontFamily: 'OpenSans-Bold',
    textTransform: 'uppercase',
    fontSize: scaledSize(18),
    fontWeight: '500',
  } as TextStyle,
  h4: {
    ...BASE_TEXT,
    fontFamily: Fonts.Poppins,
    fontSize: scaledSize(15),
    fontWeight: '500',
  } as TextStyle,
  h5: {
    ...BASE_TEXT,
    fontFamily: Fonts.Poppins,
    fontSize: scaledSize(12),
    fontWeight: '400',
  } as TextStyle,
  h6: {
    ...BASE_TEXT,
    fontFamily: Fonts.Poppins,
    fontSize: scaledSize(9),
    fontWeight: '400',
  } as TextStyle,
  small: {
    ...BASE_TEXT,
    fontFamily: Fonts.Poppins,
    fontSize: scaledSize(6),
    fontWeight: '300',
  } as TextStyle,
  title: {
    ...BASE_TEXT,
    fontFamily: Fonts.Poppins,
    fontSize: scaledSize(13),
    fontWeight: '700',
  } as TextStyle,
};

export type TextPresets = keyof typeof presets;

export interface TextProps extends TextProperties {
  style?: StyleProp<TextStyle>;
  preset?: TextPresets;
  color?: string;
  textAlign?: 'auto' | 'left' | 'right' | 'center' | 'justify';
}

export const Text = ({ children, ...props }: TextProps) => {
  const {
    color,
    preset = 'default',
    style: styleOverride,
    textAlign = 'auto',
    ...rest
  } = props;

  return (
    <RNText
      {...rest}
      style={[
        presets[preset] as TextProps,
        {
          color: isDarkMode ? '#fff' : color ? color : '#000',
          textAlign: textAlign,
        },
        styleOverride,
      ]}>
      {children}
    </RNText>
  );
};
