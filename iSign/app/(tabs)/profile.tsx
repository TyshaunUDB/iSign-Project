import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';

import UserHeader from '../components/Userheader';
import Navbar from './navbar';
import EditProfileHeader from '../componentsProfile/EditProfileHeader';
import ProfileField from '../componentsProfile/ProfileField';
import ChangeInfoButton from '../componentsProfile/ChangeInfoButton';
import SettingsOption from '../componentsProfile/SettingsOption';
import LogOutButton from '../componentsProfile/LogOutButton';

import { router } from 'expo-router';  // Import router

export default function Profile() {
  return (
    <View style={styles.container}>
      <Navbar />
      <View style={styles.topBackground}>
        <View style={styles.middleBackground}>
          <UserHeader userName="Popoy" greeting="Kamusta," />

          <View style={styles.contentBackground}>
            <ScrollView
              style={styles.scrollContainer}
              contentContainerStyle={styles.scrollContentContainer}
              showsVerticalScrollIndicator={false}
            >
              <EditProfileHeader />

              <ProfileField
                              label="Full Name"
                              placeholder="Popoy"
                              editable={true} value={''}              />

              <ProfileField label="Email" placeholder="p***@gmail.com" editable={false} value={''} />

              <ProfileField
                label="Phone Number"
                placeholder="+63 915 362 8520"
                value={''}
              />

              <ChangeInfoButton
              buttonText='Change Info'
               />

              <SettingsOption
                title="Change Email"
                iconName="mail-outline"
                route="/componentsProfile/ChangeEmailOld"  // Correct path to ChangeEmail
              />

              <SettingsOption
                title="Change Password"
                iconName="lock-closed-outline"
                route="/componentsProfile/ChangePassword"  // Correct path to ChangePassword
              />

              <LogOutButton />
            </ScrollView>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
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
});
