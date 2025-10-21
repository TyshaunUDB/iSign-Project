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
import Navbar from '../(tabs)/navbar';
import SearchBar from '../components/SearchBar';
import HelpTab from './HelpTabs';

export default function Preferences() {
  const [selectedFont, setSelectedFont] = useState<'Small' | 'Medium' | 'Large'>('Medium');
  const [chatHistoryEnabled, setChatHistoryEnabled] = useState(true);

  const handleFontSelect = (fontSize: 'Small' | 'Medium' | 'Large') => {
    setSelectedFont(fontSize);

   
  };

   const termsContent = [
    '1. Acceptance of Terms\nBy downloading or using this app, you agree to these Terms and Conditions and our Privacy Policy. If you do not agree, please do not use the app.',
    '2. How the App Works\nThe app uses your device’s camera to detect and interpret sign language gestures. It processes visual data to provide real-time translations from FSL to text or speech. You must allow camera access for the app to function properly.',
    '3. User Responsibilities\nOnly use the app for lawful, respectful, and non-invasive purposes. Do not record or translate people without their consent. You are responsible for how you use the app’s translations and any decisions made based on them.',
    '4. Accuracy Disclaimer\nWhile we strive for accurate translations, the app may not always be 100% correct. Factors like lighting, camera angle, or unclear gestures can affect performance. We are continuously improving, but we cannot guarantee perfect results.',
    '5. Privacy and Data\nThe app may process visual data locally on your device or through secure servers (if applicable). We do not store videos or personal information unless explicitly stated and consented to. For full details, see our [Privacy Policy].',
    '6. Intellectual Property\nAll trademarks, content, and technology used in the app are the property of [Your Team/Company Name]. You may not copy, modify, or distribute the app or any part of it without permission.',
    '7. Limitation of Liability\nWe are not responsible for any harm, misunderstanding, or loss that may result from using the app. Use it at your own risk and always double-check important messages with human interpretation if needed.',
    '8. Changes to Terms\nWe may update these Terms at any time. Changes will be posted in the app or on our website. Continued use after changes means you accept the new Terms.',
    '9. Contact Us\nIf you have any questions or feedback, please reach out to us at [your email].',
  ];

  const privacyContent = [
    'This app values your privacy and ensures that any personal data collected is handled responsibly.',
    '1. Information Collection\nWe may collect minimal data to improve functionality, such as app usage analytics.',
    '2. Camera Usage\nThe app uses your camera solely for gesture detection. No recordings are stored or shared.',
    '3. Data Protection\nWe apply appropriate security measures to safeguard your data against unauthorized access.',
    '4. Consent\nBy using this app, you consent to our Privacy Policy. You may withdraw consent anytime by uninstalling the app.',
    '5. Updates\nOur Privacy Policy may change from time to time. Continued use indicates acceptance of any updates.',
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

               <HelpTab title="Terms and Conditions" content={termsContent} />
              <HelpTab title="Privacy" content={privacyContent} />
             

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
    marginVertical: 25,
  },

});
