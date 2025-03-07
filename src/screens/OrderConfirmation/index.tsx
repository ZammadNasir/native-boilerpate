import AppBar from '@src/components/AppBar';
  import { Text } from '@src/components/Text';
  import React from 'react';
  import { StyleSheet, View } from 'react-native';

const OrderConfirmation = () => {
  return (
    <View style={styles.container}>
      <AppBar showBackButton hideCartIcon/>
      <Text preset="p">OrderConfirmation Screen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default React.memo(OrderConfirmation);
