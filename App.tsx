import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider as ReduxProvider } from 'react-redux';

import RootNavigator from './src/navigation';
import { store } from './src/store';
import { darkTheme, lightTheme } from './src/theme';
import { ThemeProvider } from './src/theme/ThemeContext';

const App = () => {
  return (
    <ReduxProvider store={store}>
      <ThemeProvider>
        {({ theme, isDarkMode }: any) => (
          <PaperProvider theme={isDarkMode ? darkTheme : lightTheme}>
            <NavigationContainer theme={isDarkMode ? darkTheme : lightTheme}>
              <SafeAreaProvider>
                <StatusBar
                  barStyle={isDarkMode ? 'light-content' : 'dark-content'}
                  backgroundColor={theme.colors.background}
                />
                <RootNavigator />
              </SafeAreaProvider>
            </NavigationContainer>
          </PaperProvider>
        )}
      </ThemeProvider>
    </ReduxProvider>
  );
};

export default App;
