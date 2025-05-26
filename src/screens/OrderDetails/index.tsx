import AppBar from '@src/components/AppBar';
import { BaseLayout } from '@src/components/BaseLayout/BaseLayout';
import { Text } from '@src/components/Text';
import React from 'react';
import { StyleSheet } from 'react-native';

const OrderDetails = () => {
  return (
    <BaseLayout>
      <AppBar />
      <Text preset="p">OrderDetails Screen</Text>
    </BaseLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default React.memo(OrderDetails);
