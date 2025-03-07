import React from 'react';
import { StyleSheet, View } from 'react-native';
import AppBar from '@src/components/AppBar';
import { Text } from '@src/components/Text';

const Favorites = () => {
  return (
    <View style={styles.container}>
      <AppBar />
      <Text preset="p">Favorites Screen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default React.memo(Favorites);
