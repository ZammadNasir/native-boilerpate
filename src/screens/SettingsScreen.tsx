import { View, StyleSheet, ScrollView } from 'react-native';
import {
  List,
  Switch,
  Divider,
  Button,
  useTheme,
} from 'react-native-paper';
import { useTheme as useAppTheme } from '../theme/ThemeContext';
import { useDispatch } from 'react-redux';
import { logout } from '../store/slices/authSlice';
import { Menu } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';
import { AppDispatch } from '@src/store';
import AppBar from '@src/components/AppBar';

const SettingsScreen = () => {
  const theme = useTheme();
  const { toggleTheme, isDarkMode } = useAppTheme();
  const dispatch = useDispatch<AppDispatch>();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <View
      style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <AppBar />

      <ScrollView>
        <List.Section>
          <List.Subheader>Appearance</List.Subheader>
          <List.Item
            title="Dark Theme"
            right={() => (
              <Switch value={isDarkMode} onValueChange={toggleTheme} />
            )}
          />
          <Divider />
          <List.Item
            title="Font Size"
            description="Medium"
            onPress={() => {}}
          />
        </List.Section>

        <Divider />

        <List.Section>
          <List.Subheader>Notifications</List.Subheader>
          <List.Item
            title="Push Notifications"
            right={() => <Switch value={true} />}
          />
          <Divider />
          <List.Item
            title="Email Notifications"
            right={() => <Switch value={false} />}
          />
        </List.Section>

        <Divider />

        <List.Section>
          <List.Subheader>Privacy</List.Subheader>
          <List.Item
            title="Location Services"
            description="Allow app to access your location"
            right={() => <Switch value={true} />}
          />
          <Divider />
          <List.Item
            title="Data Collection"
            description="Help improve the app by sending anonymous usage data"
            right={() => <Switch value={false} />}
          />
        </List.Section>

        <View style={styles.buttonContainer}>
          <Button
            mode="contained"
            onPress={handleLogout}
            style={styles.logoutButton}>
            Logout
          </Button>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  buttonContainer: {
    padding: 16,
    marginTop: 16,
  },
  logoutButton: {
    marginTop: 8,
  },
});

export default SettingsScreen;
