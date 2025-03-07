import AppBar from '@src/components/AppBar';
import { ScrollView, StyleSheet, View } from 'react-native';
import {
  Avatar,
  Button,
  Card,
  Divider,
  List,
  Text,
  useTheme,
} from 'react-native-paper';
import { useSelector } from 'react-redux';
import type { RootState } from '../store';

const ProfileScreen = () => {
  const theme = useTheme();
  const { user } = useSelector((state: RootState) => state.auth);

  return (
    <View
      style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <AppBar />

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.profileHeader}>
          <Avatar.Image
            size={100}
            source={{
              uri:
                user?.avatar ||
                'https://ui-avatars.com/api/?name=User&background=random',
            }}
          />
          <Text style={[styles.userName, { color: theme.colors.onSurface }]}>
            {user?.name || 'Guest User'}
          </Text>
          <Text
            style={[
              styles.userEmail,
              { color: theme.colors.onSurfaceVariant },
            ]}>
            {user?.email || 'guest@example.com'}
          </Text>
          <Button mode="outlined" style={styles.editButton}>
            Edit Profile
          </Button>
        </View>

        <Card style={styles.statsCard}>
          <Card.Content style={styles.statsContainer}>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>24</Text>
              <Text style={styles.statLabel}>Posts</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>148</Text>
              <Text style={styles.statLabel}>Followers</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>256</Text>
              <Text style={styles.statLabel}>Following</Text>
            </View>
          </Card.Content>
        </Card>

        <Card style={styles.infoCard}>
          <Card.Content>
            <List.Section>
              <List.Subheader>Personal Information</List.Subheader>
              <List.Item title="Location" description="New York, USA" />
              <Divider />
              <List.Item title="Joined" description="January 2023" />
              <Divider />
              <List.Item title="Website" description="www.example.com" />
            </List.Section>
          </Card.Content>
        </Card>

        <Card style={styles.activityCard}>
          <Card.Content>
            <Text style={styles.sectionTitle}>Recent Activity</Text>
            <List.Item
              title="Updated profile picture"
              description="2 days ago"
              left={props => <List.Icon {...props} icon="image" />}
            />
            <Divider />
            <List.Item
              title="Added a new post"
              description="1 week ago"
              left={props => <List.Icon {...props} icon="post" />}
            />
            <Divider />
            <List.Item
              title="Commented on a post"
              description="2 weeks ago"
              left={props => <List.Icon {...props} icon="comment" />}
            />
          </Card.Content>
        </Card>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
  },
  profileHeader: {
    alignItems: 'center',
    marginBottom: 24,
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 12,
  },
  userEmail: {
    fontSize: 16,
    marginTop: 4,
    marginBottom: 16,
  },
  editButton: {
    marginTop: 8,
  },
  statsCard: {
    marginBottom: 16,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 8,
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  statLabel: {
    fontSize: 14,
    marginTop: 4,
  },
  infoCard: {
    marginBottom: 16,
  },
  activityCard: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },
});

export default ProfileScreen;
