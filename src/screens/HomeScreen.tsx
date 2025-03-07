import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import AppBar from '@src/components/AppBar';
import { FlatList, StyleSheet, View } from 'react-native';
import { Button, Card, Paragraph, Title, useTheme } from 'react-native-paper';
import type { RootStackParamList } from '../navigation';
import { Screens } from '../navigation/appNavigation';

type HomeScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  Screens.MAIN
>;

const items = Array.from({ length: 10 }, (_, i) => ({
  id: i + 1,
  title: `Item ${i + 1}`,
  description: `This is the description for item ${i + 1}`,
}));

const HomeScreen = () => {
  const theme = useTheme();
  const navigation = useNavigation<HomeScreenNavigationProp>();

  const navigateToDetails = (itemId: number) => {
    navigation.navigate(Screens.OFFERS, { itemId });
  };

  const renderItem = ({ item }: { item: (typeof items)[0] }) => (
    <Card style={styles.card} mode="outlined">
      <Card.Content>
        <Title>{item.title}</Title>
        <Paragraph>{item.description}</Paragraph>
      </Card.Content>
      <Card.Actions>
        <Button onPress={() => navigateToDetails(item.id)}>
          View Details
        </Button>
      </Card.Actions>
    </Card>
  );

  return (
    <View
      style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <AppBar />

      <FlatList
        data={items}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listContent: {
    padding: 16,
  },
  card: {
    marginBottom: 16,
  },
});

export default HomeScreen;
