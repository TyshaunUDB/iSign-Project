import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import { Stack } from 'expo-router';
import UserHeader from '../components/Userheader';
import { router } from 'expo-router';

export default function Login() {
  const [showOTPFields, setShowOTPFields] = useState(false);
  const [otp, setOtp] = useState<string[]>(['', '', '', '']);
  const otpRefs = useRef<Array<TextInput | null>>([]);

  const handleSendOTP = () => {
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
          <View style={styles.topBackground}>
            <View style={styles.middleBackground}>
              <UserHeader userName="Password" greeting="Forgot" />

              <View style={styles.contentBackground}>
                <ScrollView
                  style={styles.scrollContainer}
                  contentContainerStyle={styles.scrollContentContainer}
                  showsVerticalScrollIndicator={false}
                  keyboardShouldPersistTaps="handled"
                >
                  <Stack.Screen options={{ headerShown: false }} />

                  <Text style={styles.title}>Enter OTP sent to your Email</Text>

                  {/* Email input */}
                  <TextInput
                    placeholder="Enter Email"
                    placeholderTextColor="#999"
                    style={styles.input}
                  />

                  {/* Send OTP button */}
                  <TouchableOpacity style={styles.button} onPress={handleSendOTP}>
                    <Text style={styles.buttonText}>Send OTP</Text>
                  </TouchableOpacity>

                  {/* Countdown */}
                  <Text style={styles.countdownText}>Resend OTP after 59 sec</Text>

                  {/* OTP Section */}
                  {showOTPFields && (
                    <View style={styles.otpSection}>
                      <View style={styles.otpContainer}>
                        {otp.map((digit, index) => (
                          <TextInput
                            key={index}
                            ref={(ref) => {
                              otpRefs.current[index] = ref;
                            }}
                            style={styles.otpBox}
                            keyboardType="numeric"
                            maxLength={1}
                            value={digit}
                            onChangeText={(text) => handleOtpChange(text, index)}
                            onKeyPress={(e) => handleKeyPress(e, index)}
                          />
                        ))}
                      </View>

                      {/* ✅ Submit button now correctly scales */}
                      <View style={{ width: '100%', alignItems: 'center' }}>
                        <TouchableOpacity onPress={() => router.push('/authentication/ForgotPasswordNew')} style={styles.buttonSub}>
                          <Text style={styles.buttonText}>Submit</Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  )}

                   <View style={styles.loginContainer}>
                                  <Text style={styles.haveAccountText}>Have an account? </Text>
                                  <TouchableOpacity onPress={() => router.push('/authentication/LogIn')}>
                                    <Text style={styles.loginText}>Log in</Text>
                                  </TouchableOpacity>
                                </View>
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
  // 🔧 Removed alignItems: 'center' to fix width scaling issues
  scrollContentContainer: {
    paddingBottom: 20,
    flexGrow: 1,
  },
  title: {
    width: 250,
    marginTop: 50,
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 40,
    color: '#343434',
    alignSelf: 'center',
  },
  input: {
    width: '90%',
    backgroundColor: '#fff',
    borderRadius: 30,
    padding: 12,
    fontSize: 11,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#ddd',
    alignSelf: 'center',
  },
  button: {
    backgroundColor: '#343434',
    borderRadius: 30,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
    width: '60%',
    marginVertical: 10,
    alignSelf: 'center',
  },
  buttonSub: {
    backgroundColor: '#343434',
    borderRadius: 30,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
    width: '50%',
    marginVertical: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
  },
  countdownText: {
    fontSize: 10,
    color: '#777',
    opacity: 0.7,
    marginTop: 10,
    textAlign: 'center',
  },
  otpSection: { alignItems: 'center', marginTop: 30 },
  otpContainer: { flexDirection: 'row', justifyContent: 'center', marginBottom: 20 },
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

   loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
  },
  haveAccountText: {
    color: '#777',
    opacity: 0.7,
    fontSize: 10,
  },
  loginText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#343434',
  },

});
