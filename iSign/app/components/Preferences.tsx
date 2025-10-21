import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Switch,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Stack } from 'expo-router';
import UserHeader from '../components/Userheader';
import SettingsOption from '../componentsProfile/SettingsOption';
import Navbar from '../(tabs)/navbar';

export default function Preferences() {
  const [selectedFont, setSelectedFont] = useState<'Small' | 'Medium' | 'Large'>('Medium');
  const [chatHistoryEnabled, setChatHistoryEnabled] = useState(true);

  const handleFontSelect = (fontSize: 'Small' | 'Medium' | 'Large') => {
    setSelectedFont(fontSize);
  };

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
              {/* Title */}
              <Text style={styles.title}>Preferences</Text>

              {/* FONT SIZE SECTION */}
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Font Size</Text>
                <Text style={styles.sectionSubtitle}>Adjust Chat Bubble text size</Text>

                <View style={styles.fontOptions}>
                  {['Small', 'Medium', 'Large'].map((font) => (
                    <TouchableOpacity
                      key={font}
                      style={[
                        styles.fontButton,
                        selectedFont === font && styles.fontButtonSelected,
                      ]}
                      onPress={() => handleFontSelect(font as 'Small' | 'Medium' | 'Large')}
                    >
                      <Text
                        style={[
                          styles.fontButtonText,
                          selectedFont === font && styles.fontButtonTextSelected,
                          font === 'Small' && { fontSize: 11 },
                          font === 'Medium' && { fontSize: 12 },
                          font === 'Large' && { fontSize: 13 },
                        ]}
                      >
                        {font}
                      </Text>
                      {selectedFont === font && (
                        <Ionicons
                          name="checkmark"
                          size={14}
                          color="#343434"
                          style={styles.checkIcon}
                        />
                      )}
                    </TouchableOpacity>
                  ))}
                </View>
              </View>

              {/* CHAT HISTORY SECTION */}
              <View style={styles.section}>
                <View style={styles.sectionHeaderRow}>
                  {/* Left side (title + subtitle) */}
                  <View style={styles.textBlock}>
                    <Text style={styles.sectionTitle}>Chat History</Text>
                    <Text style={styles.sectionSubtitle}>
                      Automatically saves chats to the Conversation Tab.
                    </Text>
                  </View>

                  {/* Right side (toggle switch) */}
                  <View style={styles.switchContainer}>
                    <Switch
                      trackColor={{ false: '#ccc', true: '#343434' }}
                      thumbColor={chatHistoryEnabled ? '#fff' : '#f4f3f4'}
                      ios_backgroundColor="#3e3e3e"
                      onValueChange={() => setChatHistoryEnabled(!chatHistoryEnabled)}
                      value={chatHistoryEnabled}
                    />
                  </View>
                </View>
              </View>

              {/* Separator line */}
              <View style={styles.separator} />

              {/* SETTINGS OPTIONS BELOW SEPARATOR */}
<View style={styles.settingsSection}>
  <SettingsOption
    title="Recently Deleted"
    iconName="trash-outline"
    route="/componentsPreferences/RecentlyDeleted"
  />

  <SettingsOption
    title="Clear Chat History"
    iconName="refresh-outline"
    route="/Preferences"
  />

  <SettingsOption
    title="Help"
    iconName="help-circle-outline"
    route="/componentsPreferences/Help"
  />
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
  scrollContentContainer: { paddingBottom: 20, flexGrow: 1 },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#343434',
    marginVertical: 10,
    marginBottom: 30,
  },
  section: { marginBottom: 25 },
  sectionTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#343434',
    marginBottom: 1,
  },
  sectionSubtitle: {
    fontSize: 10,
    color: '#777',
    opacity: 0.8,
    marginBottom: 15,
    flexShrink: 1,
    flexWrap: 'wrap',
  },
  fontOptions: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 10,
    flexWrap: 'nowrap',
  },
  fontButton: {
    backgroundColor: '#fff',
    borderRadius: 30,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: '#ddd',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  fontButtonSelected: {
    borderColor: '#343434',
  },
  fontButtonText: {
    color: '#343434',
    fontWeight: '500',
  },
  fontButtonTextSelected: {
    fontWeight: 'bold',
  },
  checkIcon: {
    marginLeft: 4,
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 10,
  },
  textBlock: {
    flex: 1,
    paddingRight: 10,
  },
switchContainer: {
  transform: [{ scaleX: 1.3 }, { scaleY: 1.3 }], // ✅ makes it 30% larger
  flexShrink: 0,
},
  separator: {
    alignSelf: 'center',
    width: '90%',
    height: 1,
    backgroundColor: '#777',
    opacity: 0.3,
    marginTop: 15,
  },
  settingsSection: {
  marginTop: 10,
},

});
