import { useNavigation } from '@react-navigation/native';
import AppBar from '@src/components/AppBar';
import { BaseLayout } from '@src/components/BaseLayout/BaseLayout';
import { Button } from '@src/components/Button';
import { Text } from '@src/components/Text';
import translations from '@src/translations';
import { scaleHeight, set_localize_content } from '@src/utils';
import React from 'react';
import { StyleSheet } from 'react-native';
import { useTheme } from 'react-native-paper';
import { Screens } from '../../navigation/appNavigation';

const Cart = () => {
  const theme = useTheme();
  const navigation = useNavigation() as any;
  return (
    <BaseLayout>
      <AppBar
        showBackButton={true}
        hideCartIcon={true}
        title={set_localize_content(translations.CART_ITEMS, 'enMobile')}
      />
      <Text preset="p">Cart Screen</Text>
      <Button
        title={'Checkout'}
        buttonContainerStyle={styles.loginBtn}
        onPress={() => {
          navigation.navigate(Screens.ORDER_CONFIRMATION);
        }}
      />
    </BaseLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loginBtn: {
    marginTop: scaleHeight(15),
  },
});

export default React.memo(Cart);
