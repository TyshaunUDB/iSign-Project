import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Stack } from 'expo-router';
import UserHeader from '../components/Userheader';
import Navbar from '../(tabs)/navbar';

export default function HistoryOff() {
  return (
    <View style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />

      <View style={styles.topBackground}>
        <View style={styles.middleBackground}>
          <UserHeader userName="History" greeting="Chat" />

          <View style={styles.contentBackground}>
            <ScrollView
              style={styles.scrollContainer}
              contentContainerStyle={styles.scrollContentContainer}
              showsVerticalScrollIndicator={false}
            >
              <View style={styles.centerMessageContainer}>
                <Text style={styles.centerMessage}>
                  To access and save your chat history, please enable chat history in your settings.
                </Text>
              </View>
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
  scrollContentContainer: { flexGrow: 1 },

  // 👇 new styles
  centerMessageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
  centerMessage: {
    textAlign: 'center',
    color: '#343434',
    opacity: 0.5,
    fontSize: 11,
    lineHeight: 20,
    paddingHorizontal: 30,
  },
});
