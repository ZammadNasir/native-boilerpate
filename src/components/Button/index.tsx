import React from 'react';
import {
  StyleProp,
  StyleSheet,
  TextStyle,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
  ViewStyle,
} from 'react-native';

import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';

import { moderateScale, Palette, scaleHeight } from '@src/utils';

import { Text } from '../Text';
import { useTheme } from 'react-native-paper';

const AnimatedButtonComponent =
  Animated.createAnimatedComponent(TouchableOpacity);

interface ExtraButtonProps {
  buttonContainerStyle?: StyleProp<ViewStyle>;
  titleContainerStyle?: StyleProp<ViewStyle>;
  titleStyle?: StyleProp<TextStyle>;
  title?: React.ReactNode;
  rightIcon?: JSX.Element;
  leftIcon?: JSX.Element;
}

export type AnimatedButtonProps = Omit<
  TouchableOpacityProps,
  'onPressIn' | 'onPressOut' | 'style'
> & {
  containerStyle?: StyleProp<ViewStyle>;
};

export type ButtonProps = AnimatedButtonProps & ExtraButtonProps;

export const AnimatedTouchableOpacity = React.memo(
  (props: AnimatedButtonProps) => {
    const { containerStyle } = props;
    const scaleValue = useSharedValue(1);

    const animatedButtonStyle = useAnimatedStyle(() => {
      return {
        transform: [{ scale: scaleValue.value }],
      };
    });

    return (
      <AnimatedButtonComponent
        style={[containerStyle, animatedButtonStyle]}
        onPressIn={() => (scaleValue.value = withSpring(0.9))}
        onPressOut={() => (scaleValue.value = withSpring(1))}
        activeOpacity={0.8}
        {...props}>
        {props.children}
      </AnimatedButtonComponent>
    );
  }
);

export const Button = React.memo((props: ButtonProps) => {
  const { buttonContainerStyle, title, titleContainerStyle, titleStyle } =
    props;

  const theme = useTheme() as any;

  const styles = StyleSheet.create({
    buttonContainer: {
      alignItems: 'center',
      backgroundColor: theme.colors.primary,
      borderRadius: moderateScale(4),
      height: scaleHeight(45),
      width: '100%',
    },
    titleContainer: {
      alignItems: 'center',
      flexDirection: 'row',
      height: '100%',
      justifyContent: 'center',
      width: '100%',
    },
  });

  return (
    <AnimatedTouchableOpacity
      containerStyle={[styles.buttonContainer, buttonContainerStyle]}
      {...props}>
      <View style={[styles.titleContainer, titleContainerStyle]}>
        {props.leftIcon}
        <Text preset="h3" color={theme.colors.surface} style={titleStyle}>
          {title}
        </Text>
        {props.rightIcon}
      </View>
    </AnimatedTouchableOpacity>
  );
});
