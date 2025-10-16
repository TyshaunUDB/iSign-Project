import React, { useState } from 'react';
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
import { Stack, router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import UserHeader from '../components/Userheader';

export default function ForgotPasswordNew() {
  const [newPassword, setNewPassword] = useState('');
  const [retypePassword, setRetypePassword] = useState('');
  const [error, setError] = useState('');
  const [showNew, setShowNew] = useState(false);
  const [showRetype, setShowRetype] = useState(false);

  const handleSubmit = () => {
    setError('');

    if (!newPassword || !retypePassword) {
      setError('Please fill out all fields.');
      return;
    }

    if (newPassword.length < 8) {
      setError('Password must be at least 8 characters long.');
      return;
    }

    if (newPassword !== retypePassword) {
      setError('Passwords do not match.');
      return;
    }

    // Temporary success message + redirect
    alert('Password reset successful! You can now log in.');
    router.push('/authentication/LogIn'); // navigate to your login screen
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
              <UserHeader userName="Password" greeting="Set New" />

              <View style={styles.contentBackground}>
                <ScrollView
                  style={styles.scrollContainer}
                  contentContainerStyle={styles.scrollContentContainer}
                  showsVerticalScrollIndicator={false}
                  keyboardShouldPersistTaps="handled"
                >
                  {/* Title */}
                  <Text style={styles.title}>Set Your New Password</Text>

                  {/* Password Fields */}
                  <View style={styles.fieldContainer}>
                    <Text style={styles.label}>Enter New Password</Text>
                    <View style={styles.inputWrapper}>
                      <TextInput
                        style={styles.input}
                        secureTextEntry={!showNew}
                        placeholder="New Password"
                        placeholderTextColor="#aaa"
                        value={newPassword}
                        onChangeText={setNewPassword}
                      />
                      <TouchableOpacity onPress={() => setShowNew(!showNew)}>
                        <Ionicons
                          name={showNew ? "eye-off" : "eye"}
                          size={20}
                          color="#555"
                        />
                      </TouchableOpacity>
                    </View>
                  </View>

                  <View style={styles.fieldContainer}>
                    <Text style={styles.label}>Re-Enter New Password</Text>
                    <View style={styles.inputWrapper}>
                      <TextInput
                        style={styles.input}
                        secureTextEntry={!showRetype}
                        placeholder="Re-enter New Password"
                        placeholderTextColor="#aaa"
                        value={retypePassword}
                        onChangeText={setRetypePassword}
                      />
                      <TouchableOpacity onPress={() => setShowRetype(!showRetype)}>
                        <Ionicons
                          name={showRetype ? "eye-off" : "eye"}
                          size={20}
                          color="#555"
                        />
                      </TouchableOpacity>
                    </View>
                  </View>

                  {/* Error Message */}
                  {error ? <Text style={styles.errorText}>{error}</Text> : null}

                  {/* Submit Button */}
                  <TouchableOpacity style={styles.buttonSub} onPress={handleSubmit}>
                    <Text style={styles.buttonText}>Submit</Text>
                  </TouchableOpacity>
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
  fieldContainer: {
    width: '80%',
    marginBottom: 20,
  },
  label: {
    fontSize: 12,
    color: '#555',
    marginBottom: 8,
    marginLeft: 5,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 30,
    borderWidth: 1,
    borderColor: '#ddd',
    paddingHorizontal: 12,
  },
  input: {
    flex: 1,
    height: 47,
    fontSize: 11,
    color: '#333',
  },
  buttonSub: {
    backgroundColor: '#343434',
    borderRadius: 30,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'stretch',
    marginHorizontal: 40,
    marginVertical: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  errorText: {
    color: '#e63946',
    fontSize: 11,
    marginBottom: 10,
    textAlign: 'center',
  },
});
