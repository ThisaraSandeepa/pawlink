import React, { useState } from 'react';
import { Link, router } from 'expo-router';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { FIREBASE_AUTH } from '../../FirebaseConfig';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Sign in with email and password
  const handleSignIn = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(FIREBASE_AUTH, email, password);
      
      // Signed in
      const user = userCredential.user;
      console.log("Logged In!");
  
      // Redirect to the landing page
      router.replace('../SocialMedia/LandingPage');
  
    } catch (error) {
      // Check for specific errors
      switch (error.code) {
        case 'auth/invalid-email':
          alert('Invalid email address!');
          break;
        case 'auth/invalid-credential':
        case 'auth/wrong-password':
          alert('Invalid email or password!');
          break;
        case 'auth/missing-password':
          alert('Password is required.');
          break;
        case 'auth/weak-password':
          alert('Atleast 6 characters required for password!');
          break;
        default:
          alert(error.message);
      }
    }
  };

  // Render the SignIn component
  return (
    <View className="justify-center items-center pt-36 gap-24">
      <Text className="font-thin text-6xl"> Welcome! </Text>
      <View className="gap-6 mr-5 items-center">
        <TextInput
          placeholder="Email"
          className="border border-gray-800 rounded w-72 p-2"
          autoCapitalize='none'
          value={email}
          onChangeText={text => setEmail(text)}
        />
        <TextInput                             // Add TextInput for password
          placeholder="Password"
          secureTextEntry
          className="border border-gray-800 rounded w-72 p-2"
          autoCapitalize='none'
          value={password}
          onChangeText={text => setPassword(text)}    
        />

        <TouchableOpacity                                  // Add TouchableOpacity for sign in
          className="bg-blue-700 rounded text-white p-2 w-20 text-center"
          onPress={handleSignIn}> 
          <Text className = "text-white ml-2"> Log In </Text> 
        </TouchableOpacity>

      </View>
      <Link href="./SignUp" className="rounded text-blue-600 p-2 pt-24">
        Don't Have An Account?{' '}
        <Text className="text-blue-700 font-bold">Sign Up Now! </Text>
      </Link>
    </View>
  );
};

export default SignIn;
