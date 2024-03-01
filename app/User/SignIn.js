import React, { useState } from 'react';
import { Link, useNavigation } from 'expo-router';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { FIREBASE_AUTH } from '../../FirebaseConfig';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const navigation = useNavigation(); // Assuming useNavigation is used from expo-router

  // Sign in with email and password
  const handleSignIn = async () => {
    if (!email || !password) {
      setEmailError(email ? '' : 'Required field');
      setPasswordError(password ? '' : 'Required field');
      return;
    }

    try {
      const userCredential = await signInWithEmailAndPassword(FIREBASE_AUTH, email, password);

      // Signed in
      const user = userCredential.user;
      console.log("Logged In!");
      navigation.replace('../SocialMedia/LandingPage'); // Fix the navigation method

    } catch (error) {
      alert(error.message);
    }
  };

  const handleEmailChange = (email) => {
    setEmail(email);
    setEmailError(
      email.trim() === '' // Check if the email field is empty
        ? 'Required Field'
        : !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) // Check if the email format is invalid
        ? 'Invalid email format'
        : '' // No error
    );
  };

  const handlePasswordChange = (password) => {
    setPassword(password);
    setPasswordError(
      password.trim() === '' // Check if the password field is empty
        ? 'Required field'
        : '' // No error
    );
  };

  return (
    <View style={{ justifyContent: 'center', alignItems: 'center', paddingTop: 36, gap: 24 }}>
      <Text style={{ fontWeight: 'thin', fontSize: 60 }}> Welcome! </Text>
      <View style={{ gap: 6, marginRight: 5, alignItems: 'center' }}>
        <TextInput
          placeholder="Email"
          style={{ border: 1, borderColor: '#888', borderRadius: 8, width: 300, padding: 10 }}
          autoCapitalize='none'
          value={email}
          onChangeText={handleEmailChange}
        />
        {emailError ? <Text style={{ color: 'red' }}>{emailError}</Text> : null}

        <TextInput
          placeholder="Password"
          secureTextEntry
          style={{ border: 1, borderColor: '#888', borderRadius: 8, width: 300, padding: 10 }}
          autoCapitalize='none'
          value={password}
          onChangeText={handlePasswordChange}
        />
        {passwordError ? <Text style={{ color: 'red' }}>{passwordError}</Text> : null}

        <TouchableOpacity
          style={{ backgroundColor: '#3252a8', borderRadius: 8, color: 'white', padding: 10, width: 120, textAlign: 'center' }}
          onPress={handleSignIn}
        >
          <Text style={{ color: 'white', marginLeft: 2 }}> Log In </Text>
        </TouchableOpacity>
      </View>

      <Link href="./SignUp" style={{ borderRadius: 8, color: '#3252a8', padding: 10, paddingTop: 24 }}>
        Don't Have An Account?{' '}
        <Text style={{ color: '#3252a8', fontWeight: 'bold' }}>Sign Up Now! </Text>
      </Link>
    </View>
  );
};

export default SignIn;

