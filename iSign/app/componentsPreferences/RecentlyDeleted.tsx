import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Stack } from 'expo-router';
import UserHeader from '../components/Userheader';
import Navbar from '../(tabs)/navbar';
import SearchBar from '../components/SearchBar';
import RecentlyDeletedItems from './RecentlyDeletedItems';
export default function RecentlyDeleted() {
  const deletedConversations = [
    {
      id: '1',
      title: 'Title of Conversation 1',
      subtitle: 'Chat from November 6, 2025',
    },
    {
      id: '2',
      title: 'Title of Conversation 2',
      subtitle: 'Chat from October 30, 2025',
    },
  ];

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />
      <View style={styles.topBackground}>
        <View style={styles.middleBackground}>
          <UserHeader userName="Popoy" greeting="Kamusta," />
          <View style={styles.contentBackground}>
            <ScrollView
              style={styles.scrollContainer}
              contentContainerStyle={styles.scrollContentContainer}
              showsVerticalScrollIndicator={false}
            >
              <SearchBar />

              {/* ✅ Recently Deleted List */}
              <RecentlyDeletedItems
                data={deletedConversations}
                onRestore={(id) => console.log('Restore:', id)}
                onDelete={(id) => console.log('Delete:', id)}
              />

            </ScrollView>
            <Navbar />
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#a3a3a3' },
  topBackground: { flex: 1, backgroundColor: '#a3a3a3', paddingTop: 50 },
  middleBackground: {
    flex: 1,
    backgroundColor: '#e5e5e5',
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
  },
  contentBackground: {
    zIndex: 3,
    flex: 1,
    backgroundColor: '#f6f6f6',
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    marginTop: -55,
    padding: 20,
  },
  scrollContainer: { flex: 1 },
  scrollContentContainer: { paddingBottom: 20, flexGrow: 1 },
});
