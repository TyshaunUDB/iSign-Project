import React from 'react';
import { View, StyleSheet, ScrollView } from "react-native";

import UserHeader from '../components/Userheader';
import Navbar from '../(tabs)/navbar';
import EditProfileHeader from '../componentsProfile/EditProfileHeader';
import ProfileField from '../componentsProfile/ProfileField';
import ChangeInfoButton from '../componentsProfile/ChangeInfoButton';
import SettingsOption from '../componentsProfile/SettingsOption';
import LogOutButton from '../componentsProfile/LogOutButton';

import { useRouter, Stack } from 'expo-router';

export default function ChangeEmail() {
  return (
    <View style={styles.container}>
      <Navbar />
      <Stack.Screen options={{ headerShown: false }} />
      <View style={styles.topBackground}>
        <View style={styles.middleBackground}>
          <UserHeader 
            userName="Popoy" 
            greeting="Kamusta," 
          />

          <View style={styles.contentBackground}>
            <ScrollView 
              style={styles.scrollContainer}
              contentContainerStyle={styles.scrollContentContainer}
              showsVerticalScrollIndicator={false}
            >
              {/* Add marginTop or paddingTop to move ProfileField down */}
              <View style={styles.profileFieldContainer}>
                <ProfileField
                                  label="Email"
                                  placeholder="p****@gmail.com"
                                  editable={true} value={''}                />
              </View>

              <ChangeInfoButton 
                buttonText='Change Email'
              />
            </ScrollView>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignContent: 'center',
    flex: 1,
    backgroundColor: '#a3a3a3',
  },
  topBackground: {
    flex: 1,
    backgroundColor: '#a3a3a3',
    paddingTop: 50,
  },
  middleBackground: {
    flex: 1,
    backgroundColor: '#e5e5e5',
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    paddingTop: 0,
    position: 'relative',
  },
  contentBackground: {
    zIndex: 3,
    flex: 1,
    backgroundColor: '#f6f6f6',
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    marginTop: -55,
    padding: 20,
    marginBottom: 85,
  },
  scrollContainer: {
    flex: 1,
  },
  scrollContentContainer: {
    paddingBottom: 20,
    flexGrow: 1,
  },
  // New style for ProfileField container
  profileFieldContainer: {
    marginTop: 200, // Adjust this to move it further down
  }
});
