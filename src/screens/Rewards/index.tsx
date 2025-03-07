import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from '@src/components/Text';
import AppBar from '@src/components/AppBar';

const Rewards = () => {
  return (
    <View style={styles.container}>
      <AppBar />
      <Text preset="p">Rewards Screen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default React.memo(Rewards);
