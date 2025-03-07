import React from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleProp,
  StyleSheet,
  ViewStyle,
} from 'react-native';

import { useTheme } from 'react-native-paper';

export type BaseLayoutProps = React.PropsWithChildren & {
  style?: StyleProp<ViewStyle>;
};

export const BaseLayout = React.memo(({ children, style }: BaseLayoutProps) => {
  const theme = useTheme();

  return (
    <SafeAreaView style={[styles.safeAreaStyle, style]}>
      <StatusBar
        // barStyle={appTheme === 'dark' ? 'light-content' : 'dark-content'}
        backgroundColor={theme.colors.primary}
      />
      {children}
    </SafeAreaView>
  );
});

const styles = StyleSheet.create({
  safeAreaStyle: {
    flex: 1,
  },
});
