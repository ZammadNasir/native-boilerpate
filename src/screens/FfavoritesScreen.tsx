import { View, StyleSheet, FlatList } from "react-native"
import { Appbar, Card, Title, Paragraph, Chip, useTheme } from "react-native-paper"
import { Menu } from "lucide-react-native"
import { useNavigation } from "@react-navigation/native"

// Sample data
const favorites = [
  {
    id: "1",
    title: "Mountain Retreat",
    category: "Travel",
    date: "Feb 15, 2024",
    description: "A beautiful mountain cabin with amazing views.",
    image: "https://picsum.photos/seed/1/500/300",
  },
  {
    id: "2",
    title: "Seafood Pasta Recipe",
    category: "Food",
    date: "Mar 2, 2024",
    description: "Delicious seafood pasta with garlic and white wine sauce.",
    image: "https://picsum.photos/seed/2/500/300",
  },
  {
    id: "3",
    title: "Modern Workspace Setup",
    category: "Productivity",
    date: "Jan 20, 2024",
    description: "Ergonomic workspace design for maximum productivity.",
    image: "https://picsum.photos/seed/3/500/300",
  },
  {
    id: "4",
    title: "Sunset Beach",
    category: "Travel",
    date: "Dec 10, 2023",
    description: "Beautiful sunset view at the beach.",
    image: "https://picsum.photos/seed/4/500/300",
  },
]

const FavoritesScreen = () => {
  const theme = useTheme()
  const navigation = useNavigation()

  const openDrawer = () => {
    // @ts-ignore - drawer navigation is available
    navigation.getParent()?.openDrawer()
  }

  const renderItem = ({ item }: { item: (typeof favorites)[0] }) => (
    <Card style={styles.card} mode="outlined">
      <Card.Cover source={{ uri: item.image }} />
      <Card.Content style={styles.cardContent}>
        <View style={styles.cardHeader}>
          <Title>{item.title}</Title>
          <Chip mode="outlined" style={{ backgroundColor: theme.colors.surfaceVariant }}>
            {item.category}
          </Chip>
        </View>
        <Paragraph style={styles.date}>{item.date}</Paragraph>
        <Paragraph>{item.description}</Paragraph>
      </Card.Content>
    </Card>
  )

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Appbar.Header>
        <Appbar.Action icon={() => <Menu size={24} color={theme.colors.onSurface} />} onPress={openDrawer} />
        <Appbar.Content title="Favorites" />
      </Appbar.Header>

      <FlatList
        data={favorites}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
      />
    </View>
  )
}

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
  cardContent: {
    paddingTop: 16,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  date: {
    fontSize: 12,
    marginBottom: 8,
    opacity: 0.7,
  },
})

export default FavoritesScreen

