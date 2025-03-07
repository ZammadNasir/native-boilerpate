import { View, StyleSheet, ScrollView } from "react-native"
import { useRoute, type RouteProp } from "@react-navigation/native"
import { Card, Title, Paragraph, Divider, List, useTheme } from "react-native-paper"
import {  Screen } from "../navigation/appNavigation"
import { RootStackParamList } from "@src/navigation"

type DetailsScreenRouteProp = RouteProp<RootStackParamList, Screen.DETAILS>

const DetailsScreen = () => {
  const theme = useTheme()
  const route = useRoute<DetailsScreenRouteProp>()
  const { itemId } = route.params

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Card style={styles.card}>
          <Card.Cover source={{ uri: `https://picsum.photos/seed/${itemId}/500/300` }} />
          <Card.Content style={styles.cardContent}>
            <Title>Item {itemId} Details</Title>
            <Paragraph>
              This is a detailed view of item {itemId}. Below you can find more information about this item.
            </Paragraph>
          </Card.Content>
        </Card>

        <Card style={styles.card}>
          <Card.Content>
            <List.Section>
              <List.Subheader>Item Information</List.Subheader>
              <List.Item title="ID" description={`#${itemId}`} />
              <Divider />
              <List.Item title="Created At" description="March 6, 2024" />
              <Divider />
              <List.Item title="Category" description="Sample Category" />
              <Divider />
              <List.Item title="Status" description="Active" />
            </List.Section>
          </Card.Content>
        </Card>

        <Card style={styles.card}>
          <Card.Content>
            <Title>Description</Title>
            <Paragraph>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam eget felis eget urna ultricies accumsan.
              Proin egestas, nunc eu vehicula finibus, nisi odio tincidunt enim, ac ultricies nisl sem vel sapien. Donec
              sagittis libero in tellus rutrum, sit amet dignissim lacus condimentum.
            </Paragraph>
          </Card.Content>
        </Card>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
  },
  card: {
    marginBottom: 16,
  },
  cardContent: {
    paddingTop: 16,
  },
})

export default DetailsScreen

