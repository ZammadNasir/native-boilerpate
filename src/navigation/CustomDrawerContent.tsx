import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
} from '@react-navigation/drawer';
import { useNavigation } from '@react-navigation/native';
import { Icons, Images } from '@src/assets';
import { AppImage } from '@src/components/AppImage';
import { Button } from '@src/components/Button';
import { Text } from '@src/components/Text';
import translations from '@src/translations';
import { screenHeight, set_localize_content, ThemeColors } from '@src/utils';
import {
  Alert,
  Image,
  Linking,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import { Badge, Divider, useTheme } from 'react-native-paper';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { Screens } from './screens';
import { isIOS } from '@src/constants/platform';
import { drawer_rows } from '.';

const CustomDrawerContent = (props: DrawerContentComponentProps) => {
  const theme = useTheme();
  const { user } = useSelector((state: RootState) => state.auth);
  const { language } = useSelector((state: RootState) => state.language);
  const navigation = useNavigation() as any;

  const social_links = [
    {
      img: Icons.FB_ICON,
      url: 'https://www.facebook.com/Dominos.Azerbaijan/',
    },
    {
      img: Icons.INSTA_ICON,
      url: 'https://www.instagram.com/dominos_az',
    },
    {
      img: Icons.YOUTUBE_ICON,
      url: 'https://www.youtube.com/channel/UCZByvwhybrwYHLZUaf3L2hw',
    },
  ];

  const language_content = [
    {
      img: 'az',
      label: 'AZ',
      content: 'azMobile',
    },
    {
      img: 'en',
      label: 'EN',
      content: language,
    },
    {
      img: 'ru',
      label: 'RU',
      content: 'ruMobile',
    },
  ];

  return (
    <DrawerContentScrollView
      {...props}
      contentContainerStyle={styles.container}>
      {/* Logo and Phone Section */}
      <View style={styles.headerSection}>
        <View style={styles.logoContainer}>
          <View style={styles.logo}>
            <AppImage
              source={Images.PLACEHOLDER_USER_IMAGE}
              style={{ width: 100, height: 100, borderRadius: 50 }}
            />
          </View>
          {user && (
            <Text preset="p" style={styles.logoText}>
              USER
            </Text>
          )}
        </View>
        {user ? (
          <Text style={styles.phoneNumber} preset="span">
            +994 123456789
          </Text>
        ) : (
          <>
            <Text style={styles.phoneNumber} preset="span">
              {set_localize_content(
                translations.UNLOCK_NEW_FEATURES,
                language
              )}
            </Text>
            <View style={{ alignItems: 'center', marginTop: 4 }}>
              <Button
                title={set_localize_content(translations.LOGIN, language)}
                buttonContainerStyle={{ width: 100 }}
                titleStyle={{ fontSize: 18 }}
                onPress={() => {
                  navigation.navigate(Screens.LOGIN);
                }}
              />
            </View>
          </>
        )}
      </View>

      {user && (
        <View
          style={[
            styles.rewardsBar,
            { backgroundColor: theme.colors.surfaceVariant },
          ]}>
          <View style={styles.coinIcon} />
          <Text>Rewards: 8638 Points</Text>
        </View>
      )}

      {/* Navigation Items */}
      <View style={styles.navigationSection}>
        {drawer_rows.map((item, index) => (
          <TouchableOpacity
            style={styles.navItem}
            key={index}
            onPress={() => props.navigation.navigate(item.screen)}>
            <View style={styles.iconContainer}>
              {item.showBadge && (
                <Badge size={16} style={styles.badge}>
                  3
                </Badge>
              )}
              <Image
                source={item.icon}
                style={styles.navIcon}
                resizeMode="contain"
              />
            </View>
            <Text style={styles.navText}>
              {set_localize_content(item.label, language)}
            </Text>
          </TouchableOpacity>
        ))}
        <Divider style={styles.divider} />

        <View style={styles.navItem}>
          {language_content.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={{ marginLeft: index === 0 ? 0 : 10 }}>
              <Text preset="p" style={{ color: ThemeColors.GREY }}>
                {item.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <Divider style={styles.divider} />
      </View>

      <View
        style={{
          flexDirection: 'row',
          gap: 8,
          alignItems: 'center',
          marginTop: 'auto',
          justifyContent: 'space-between',
          padding: 16,
        }}>
        <View style={styles.socialSection}>
          {social_links.map((link, index) => (
            <TouchableOpacity
              key={index}
              style={styles.socialIcon}
              onPress={() => {
                Linking.openURL(link.url).catch(() => {
                  Alert.alert(
                    set_localize_content(
                      translations.LINK_NOT_AVAILABLE,
                      language
                    )
                  );
                });
              }}>
              <Image
                source={link.img as any}
                style={{ height: 25, width: 25 }}
              />
            </TouchableOpacity>
          ))}
        </View>
        <TouchableOpacity
          onPress={() => {
            Linking.openURL('tel://*6600').catch(() => {
              Alert.alert(
                set_localize_content(translations.LINK_NOT_AVAILABLE, language)
              );
            });
          }}>
          <AppImage
            source={Images.CALL_IMAGE}
            style={{ height: 35, width: 70 }}
          />
        </TouchableOpacity>
      </View>

      {user && (
        <TouchableOpacity style={styles.logoutButton}>
          <AppImage
            source={Icons.LOGOUT_ICON}
            style={{ width: 30, height: 30 }}
          />
          <Text style={styles.navText}>Logout</Text>
        </TouchableOpacity>
      )}
    </DrawerContentScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 0,
  },
  headerSection: {
    padding: 10,
    backgroundColor: 'white',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 8,
  },
  logo: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 8,
    marginTop: screenHeight > 700 ? (isIOS ? 30 : 0) : 0,
  },
  logoPart: {
    width: '50%',
    height: '100%',
  },
  logoRed: {
    backgroundColor: '#e31837',
  },
  logoBlue: {
    backgroundColor: '#006491',
  },
  logoText: {
    fontWeight: 'bold',
  },
  iconContainer: {
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  badge: {
    position: 'absolute',
    top: -5,
    right: -5,
    backgroundColor: ThemeColors.DOMINOSred,
    fontSize: 10,
    zIndex: 99,
  },
  navIcon: {
    width: 24,
    height: 24,
  },
  phoneNumber: {
    color: '#666',
    textAlign: 'center',
  },
  rewardsBar: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    marginVertical: 8,
  },
  coinIcon: {
    width: 20,
    height: 20,
    backgroundColor: '#ffd700',
    borderRadius: 10,
    marginRight: 8,
  },
  navigationSection: {
    paddingHorizontal: 16,
  },
  navItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
  },
  navText: {
    marginLeft: 18,
    fontSize: 14,
    color: ThemeColors.GREY,
  },
  divider: {
    marginVertical: 4,
    color: '#f2f2f2',
  },
  aboutSection: {
    padding: 16,
  },
  socialSection: {
    flexDirection: 'row',
    gap: 8,
  },
  socialIcon: {
    padding: 2,
  },
  contactButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    marginHorizontal: 16,
    borderRadius: 8,
    marginVertical: 16,
  },
  contactButtonText: {
    color: 'white',
    marginLeft: 8,
    fontSize: 16,
    fontWeight: 'bold',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 'auto',
    padding: 16,
  },
});

export default CustomDrawerContent;
