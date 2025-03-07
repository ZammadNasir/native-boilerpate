import { BaseLayout } from '@src/components/BaseLayout/BaseLayout';
import { Text } from '@src/components/Text';
import React from 'react';
import { StyleSheet } from 'react-native';

const Login = () => {
  return (
    <BaseLayout>
      <Text preset="p">Login Screen</Text>
    </BaseLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default React.memo(Login);
