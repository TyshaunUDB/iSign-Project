import React, { useState, useRef } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Platform
} from "react-native";

import UserHeader from '../components/Userheader';
import ProfileField from '../componentsProfile/ProfileField';
import ChangeInfoButton from '../componentsProfile/ChangeInfoButton';
import { Stack } from 'expo-router';

export default function ChangeEmail() {
  const [showOTPFields, setShowOTPFields] = useState(false);
  const [otp, setOtp] = useState<string[]>(['', '', '', '']);
  const otpRefs = useRef<Array<TextInput | null>>([]);

  const handleChangeEmail = () => {
    setShowOTPFields(true);
    setTimeout(() => otpRefs.current[0]?.focus(), 100);
  };

  const handleOtpChange = (text: string, index: number) => {
    if (text.length > 1) return;
    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);

    if (text && index < otp.length - 1) {
      otpRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (e: any, index: number) => {
    if (e.nativeEvent.key === 'Backspace' && otp[index] === '' && index > 0) {
      otpRefs.current[index - 1]?.focus();
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
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
                  keyboardShouldPersistTaps="handled"
                >
                  {/* Title */}
                  <Text style={styles.title}>Enter your new Email</Text>

                  {/* Email Field */}
                  <View style={{ width: '80%' }}>
                    <ProfileField
                      label="Email"
                      placeholder="p****@gmail.com"
                      editable={true}
                      value={''}
                    />
                  </View>

                  {/* Change Email Button */}
                  <TouchableOpacity style={styles.button} onPress={handleChangeEmail}>
                    <Text style={styles.buttonText}>Change Email</Text>
                  </TouchableOpacity>

                  {/* OTP Section */}
                  {showOTPFields && (
                    <View style={styles.otpSection}>
                      <Text style={styles.subtitle}>Enter the OTP sent to your new Email</Text>
                      <View style={styles.otpContainer}>
                        {otp.map((digit, index) => (
                          <TextInput
                            key={index}
                            ref={(ref) => (otpRefs.current[index] = ref)}
                            style={styles.otpBox}
                            keyboardType="numeric"
                            maxLength={1}
                            value={digit}
                            onChangeText={(text) => handleOtpChange(text, index)}
                            onKeyPress={(e) => handleKeyPress(e, index)}
                          />
                        ))}
                      </View>

                      <TouchableOpacity style={styles.buttonSub}>
                        <Text style={styles.buttonText}>Submit</Text>
                      </TouchableOpacity>
                       <Text style={styles.countdownText}>Resend OTP after 59 sec</Text>
                      
                    </View>

                    
                    
                  )}
                </ScrollView>
              </View>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
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

    countdownText: {
    fontSize: 10,
    color: '#777',
    opacity: 0.7,
    marginTop: 10,
    textAlign: 'center',
  },

  contentBackground: {
    zIndex: 3,
    flex: 1,
    backgroundColor: '#f6f6f6',
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    marginTop: -55,
    padding: 20,
    marginBottom: 0,
  },
  scrollContainer: { flex: 1 },
  scrollContentContainer: {
    paddingBottom: 20,
    flexGrow: 1,
    alignItems: 'center',
  },
  title: {
    width: 250,
    marginTop: 50,
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 40,
    color: '#343434',
  },
  subtitle: {
    fontSize: 12,
    color: '#555',
    marginBottom: 15,
  },
  profileFieldContainer: {
  width: '100%', // ✅ fills the whole content width properly
  alignItems: 'center',
  paddingHorizontal: 20, // ✅ gives a little side breathing room
  marginTop: 0,
},

  button: {
    backgroundColor: '#343434',
    borderRadius: 30,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
    width: '60%',
    marginVertical: 20,
  },
 buttonSub: {
  backgroundColor: '#343434',
  borderRadius: 30,
  paddingVertical: 14,
  alignItems: 'center',
  justifyContent: 'center',
  alignSelf: 'stretch', // ✅ makes it stretch full width of parent
  marginHorizontal: 40, // ✅ adds nice spacing from edges
  marginVertical: 10,
},
buttonText: {
  color: '#fff',
  fontSize: 10, // ✅ larger, easier to read
  fontWeight: 'bold',
  textAlign: 'center',
},
  otpSection: { alignItems: 'center', marginTop: 30 },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  otpBox: {
    width: 50,
    height: 60,
    backgroundColor: '#fff',
    borderRadius: 10,
    textAlign: 'center',
    fontSize: 15,
    marginHorizontal: 8,
    borderWidth: 1,
    borderColor: '#ddd',
  },
});

