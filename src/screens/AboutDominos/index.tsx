import React from 'react';
import { StyleSheet, View } from 'react-native';
import AppBar from '@src/components/AppBar';
import { Text } from '@src/components/Text';

const AboutDominos = () => {
  return (
    <View style={styles.container}>
      <AppBar />
      <Text preset="p">AboutDominos Screen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default React.memo(AboutDominos);
