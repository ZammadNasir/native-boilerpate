import { Appearance } from 'react-native';

const colorScheme = Appearance.getColorScheme() as 'light' | 'dark';
const isDarkMode = colorScheme === 'dark';
const isLightMode = colorScheme === 'dark';

export { colorScheme, isDarkMode, isLightMode };
