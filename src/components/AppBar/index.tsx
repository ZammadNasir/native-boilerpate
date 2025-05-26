import { useNavigation } from '@react-navigation/native';
import { Icons, Images } from '@src/assets';
import { screenWidth } from '@src/utils';
import { StatusBar, StyleSheet } from 'react-native';
import { Appbar, useTheme } from 'react-native-paper';
import { Screens } from '../../navigation/screens';
import { AppImage } from '../AppImage';
import { Text } from '../Text';

interface AppBarProps {
  title?: string;
  showBackButton?: boolean;
  hideCartIcon?: boolean;
}

const AppBar = (props: AppBarProps) => {
  const { title, showBackButton = false, hideCartIcon = false } = props;
  const theme = useTheme();
  const navigation = useNavigation() as any;

  const openDrawer = () => {
    // @ts-ignore - drawer navigation is available
    navigation?.getParent()?.openDrawer();
  };

  const goBack = () => {
    navigation.goBack();
  };

  return (
    <>
      <StatusBar
        barStyle="light-content"
        backgroundColor={theme.colors.primary}
      />
      <Appbar.Header
        style={{
          backgroundColor: theme.colors.primary,
        }}>
        {showBackButton ? (
          <Text preset="h3" onPress={goBack}>
            Back
          </Text>
        ) : (
          <Appbar.Action
            icon={() => (
              <AppImage
                source={Icons.MENU_ICON}
                style={{ width: 25, height: 25 }}
              />
            )}
            onPress={openDrawer}
          />
        )}

        <Appbar.Content
          style={{ alignItems: 'center', justifyContent: 'center' }}
          title={
            title ? (
              <Text preset="h3" style={styles.title}>
                {title}
              </Text>
            ) : (
              <AppImage
                source={Images.LOGO_LOGIN_IMAGE}
                style={{ width: screenWidth * 0.34, height: 40 }}
                resizeMode="contain"
              />
            )
          }
        />

        {!hideCartIcon && (
          <Appbar.Action
            onPress={() => {
              navigation.navigate(Screens.CART);
            }}
            icon={() => (
              <AppImage
                source={Icons.CART_ICON}
                style={{ width: 30, height: 30 }}
                resizeMode="contain"
              />
            )}
          />
        )}
      </Appbar.Header>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    color: 'white',
  },
});

export default AppBar;
