import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Home } from 'lucide-react-native';
import { useTheme } from 'react-native-paper';
import { Icons } from '@src/assets/index.ts';
import AuthRequired from '@src/components/AuthRequired/index.tsx';
import Cart from '@src/screens/Cart/index.tsx';
import Login from '@src/screens/Login/index.tsx';
import Offers from '@src/screens/Offers/index.tsx';
import Stores from '@src/screens/Stores/index.tsx';
import Tracker from '@src/screens/Tracker/index.tsx';
import {
  Favorites,
  Notifications,
  OrderConfirmation,
  OrderHistory,
  Profile,
  Rewards,
} from '@src/screens/index.ts';
import { set_localize_content } from '@src/utils/helper.ts';
import { Image } from 'react-native';
import HomeScreen from '../screens/HomeScreen';
import translations from '../translations/index.tsx';
import CustomDrawerContent from './CustomDrawerContent';
import { Screens } from './appNavigation.ts';

// Define navigation types
export type RootStackParamList = {
  [Screens.MAIN]: undefined;
  [Screens.TRACKER]: undefined;
  [Screens.CART]: undefined;
  [Screens.OFFERS]: { itemId: number };
  [Screens.LOGIN]: { redirectTo?: string; redirectParams?: any };
  [Screens.ORDER_CONFIRMATION]: undefined;
};

export type BottomTabParamList = {
  Home: undefined;
  [Screens.OFFERS]: undefined;
  [Screens.TRACKER]: undefined;
  [Screens.STORES]: undefined;
};

export type DrawerParamList = {
  MainTabs: undefined;
  [Screens.PROFILE]: undefined;
  [Screens.TRACKER]: undefined;
  [Screens.ORDER_HISTORY]: undefined;
  [Screens.FAVORITES]: undefined;
  [Screens.REWARDS]: undefined;
  [Screens.NOTIFICATIONS]: undefined;
  [Screens.TERMS_AND_CONDITIONS]: undefined;
  [Screens.PRIVACY_POLICY]: undefined;
};

export const drawer_rows = [
  {
    icon: Icons.USER_ICON,
    label: translations.PROFILE,
    screen: Screens.PROFILE,
    component: Profile,
    requiresAuth: true,
  },
  {
    icon: Icons.ORDER_HISTORY_ICON,
    label: translations.ORDER_HISTORY,
    screen: Screens.ORDER_HISTORY,
    component: OrderHistory,
    requiresAuth: true,
  },
  {
    icon: Icons.FAVORITE_ICON,
    label: translations.FAVORITES_DRAWER,
    screen: Screens.FAVORITES,
    component: Favorites,
    requiresAuth: true,
  },
  {
    icon: Icons.REWARDS_ICON,
    label: translations.REWARDS,
    screen: Screens.REWARDS,
    component: Rewards,
    requiresAuth: true,
  },
  {
    icon: Icons.NOTIFICATION_ICON,
    label: translations.NOTIFICATIONS,
    screen: Screens.NOTIFICATIONS,
    component: Notifications,
    requiresAuth: true,
    showBadge: true,
  },
];

// Create navigators
const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<BottomTabParamList>();
const Drawer = createDrawerNavigator<DrawerParamList>();

// Bottom tabs navigator
const BottomTabs = () => {
  const theme = useTheme();

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: theme.colors.secondary,
        tabBarInactiveTintColor: theme.colors.onSurface,
        tabBarStyle: {
          backgroundColor: theme.colors.surface,
          height: 60,
          paddingBottom: 4,
        },
        tabBarLabelStyle: { fontSize: 13 },
        headerShown: false,
      }}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ focused }: any) => (
            <Image
              style={{ width: 28, height: 28 }}
              source={
                focused
                  ? Icons.MENU_ACTIVE_ICON
                  : (Icons.MENU_INACTIVE_ICON as any)
              }
            />
          ),
        }}
      />
      <Tab.Screen
        name={Screens.TRACKER}
        component={Tracker}
        options={{
          tabBarIcon: ({ focused }: any) => (
            <Image
              style={{ width: 30, height: 30 }}
              source={
                focused ? Icons.RIDER_ACTIVE_ICON : (Icons.RIDER_ICON as any)
              }
            />
          ),
        }}
      />
      <Tab.Screen
        name={Screens.STORES}
        component={Stores}
        options={{
          tabBarIcon: ({ focused }: any) => (
            <Image
              style={{ width: 30, height: 30 }}
              source={
                focused ? Icons.STORE_ACTIVE_ICON : (Icons.STORE_ICON as any)
              }
            />
          ),
        }}
      />
      <Tab.Screen
        name={Screens.OFFERS}
        component={Offers}
        options={{
          tabBarIcon: ({ focused }: any) => (
            <Image
              style={{ width: 28, height: 28 }}
              source={
                focused ? Icons.OFFERS_ACTIVE_ICON : (Icons.OFFERS_ICON as any)
              }
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

// Drawer navigator
const DrawerNavigator = () => {
  const theme = useTheme();

  return (
    <Drawer.Navigator
      drawerContent={(props: any) => <CustomDrawerContent {...props} />}
      screenOptions={{
        headerStyle: {
          backgroundColor: theme.colors.surface,
        },
        headerTintColor: theme.colors.onSurface,
        headerShown: false,
        drawerStyle: {
          backgroundColor: theme.colors.surface,
        },
        drawerActiveTintColor: theme.colors.primary,
        drawerInactiveTintColor: theme.colors.onSurface,
      }}>
      <Drawer.Screen
        name="MainTabs"
        component={BottomTabs}
        options={{
          title: 'Home',
          drawerIcon: ({ color, size }: any) => (
            <Home color={color} size={size} />
          ),
        }}
      />

      {drawer_rows.map((item, index) => (
        <Drawer.Screen
          key={index}
          name={item.screen as keyof DrawerParamList}
          options={{
            title: set_localize_content(item.label, 'enMobile'),
            drawerIcon: ({ color, size }: any) => (
              <Image
                source={item.icon}
                style={{ width: size, height: size, tintColor: color }}
              />
            ),
          }}>
          {() =>
            item.requiresAuth ? (
              <AuthRequired screenName={item.screen}>
                <item.component />
              </AuthRequired>
            ) : (
              <item.component />
            )
          }
        </Drawer.Screen>
      ))}
    </Drawer.Navigator>
  );
};

// Root stack navigator
const RootNavigator = () => {
  const theme = useTheme();

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: theme.colors.surface,
        },
        headerTintColor: theme.colors.onSurface,
        contentStyle: {
          backgroundColor: theme.colors.background,
        },
        headerShown: false,
      }}>
      <Stack.Screen
        name={Screens.MAIN}
        component={DrawerNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen name={Screens.CART} component={Cart} />
      <Stack.Screen name={Screens.ORDER_CONFIRMATION} component={OrderConfirmation} />
      <Stack.Screen name={Screens.LOGIN} component={Login} />
    </Stack.Navigator>
  );
};

export default RootNavigator;
