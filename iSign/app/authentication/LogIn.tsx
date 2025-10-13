import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { router, Stack } from 'expo-router';
import { AntDesign } from '@expo/vector-icons';

import UserHeader from '../components/Userheader';

export default function Login() {
  return (
    <View style={styles.container}>
      <View style={styles.topBackground}>
        <View style={styles.middleBackground}>
          <UserHeader userName="Araw!" greeting="Magandang" />

          <View style={styles.contentBackground}>
            <ScrollView
              style={styles.scrollContainer}
              contentContainerStyle={styles.scrollContentContainer}
              showsVerticalScrollIndicator={false}
            >
              <Stack.Screen options={{ headerShown: false }} />

              <Text style={styles.title}>Login</Text>

              <TextInput
                style={styles.input}
                placeholder="Email"
                keyboardType="email-address"
                placeholderTextColor="#888"
              />
              <TextInput
                style={styles.input}
                placeholder="Password"
                secureTextEntry
                placeholderTextColor="#888"
              />

              <TouchableOpacity
                onPress={() => router.push('/authentication/ForgotPassword')}
                style={styles.forgotPasswordContainer}
              >
                <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.signUpButton}>
                <Text style={styles.signUpButtonText}>Login</Text>
              </TouchableOpacity>

              <Text style={styles.orText}>or Login with</Text>

              <TouchableOpacity style={styles.googleButton}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <AntDesign
                    name="google"
                    size={16}
                    color="#343434"
                    style={{ marginRight: 8 }}
                  />
                  <Text style={styles.googleButtonText}>Login with Google</Text>
                </View>
              </TouchableOpacity>

              <View style={styles.loginContainer}>
                <Text style={styles.haveAccountText}>Don’t have an account? </Text>
                <TouchableOpacity onPress={() => router.push('/authentication/SignUp')}>
                  <Text style={styles.loginText}>Sign Up</Text>
                </TouchableOpacity>
              </View>
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
    // marginBottom: 85,
  },
  scrollContainer: {
    flex: 1,
  },
  scrollContentContainer: {
    paddingBottom: 20,
    flexGrow: 1,
    alignItems: 'center',
  },
  title: {
    marginTop: 50,
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 40,
    color: '#343434',
  },
  input: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 30,
    padding: 14,
    fontSize: 10,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  signUpButton: {
    width: '100%',
    backgroundColor: '#343434',
    borderRadius: 30,
    paddingVertical: 14,
    marginTop: 10,
    marginBottom: 15,
    maxWidth: '60%',
  },
  signUpButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 10,
    fontWeight: 'bold',
  },
  orText: {
    fontSize: 10,
    color: '#777',
    opacity: 0.7,
    textAlign: 'center',
    marginBottom: 15,
  },
  googleButton: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 30,
    paddingVertical: 14,
    borderWidth: 1,
    borderColor: '#ddd',
    marginBottom: 20,
    maxWidth: '80%',
  },
  googleButtonText: {
    textAlign: 'center',
    fontSize: 10,
    color: '#343434',
    fontWeight: '500',
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
  forgotPasswordContainer: {
    alignSelf: 'flex-end',
    marginBottom: 10,
  },
  forgotPasswordText: {
    fontSize: 10,
    color: '#777',
    opacity: 0.7,
  },
});
