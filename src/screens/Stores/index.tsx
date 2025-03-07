import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from '@src/components/Text';
import AppBar from '@src/components/AppBar';

const Stores = () => {
  return (
    <View style={styles.container}>
      <AppBar />
      <Text preset="h1">Stores Screen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default React.memo(Stores);
