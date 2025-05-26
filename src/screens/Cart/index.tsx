import { useNavigation } from '@react-navigation/native';
import AppBar from '@src/components/AppBar';
import { BaseLayout } from '@src/components/BaseLayout/BaseLayout';
import { Button } from '@src/components/Button';
import { Text } from '@src/components/Text';
import { RootState } from '@src/store';
import translations from '@src/translations';
import { scaleHeight, set_localize_content } from '@src/utils';
import React from 'react';
import { StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import { Screens } from '../../navigation/screens';

const Cart = () => {
  const navigation = useNavigation() as any;
  const { language } = useSelector((state: RootState) => state.language);

  return (
    <BaseLayout>
      <AppBar
        showBackButton={true}
        hideCartIcon={true}
        title={set_localize_content(translations.CART_ITEMS, language)}
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
