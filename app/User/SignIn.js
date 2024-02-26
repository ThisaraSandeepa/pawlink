import React from 'react';
import { useState } from 'react';
import { View, Text, TextInput } from 'react-native';
import { Link } from 'expo-router';
import auth from '@react-native-firebase/auth';

const SignIn = () => {
   const [username, setUsername] = useState('');
   const [password, setPassword] = useState('');

  // const handleSignIn = () => {
  //   // Send username and password to Firebase
  //   auth()
  //     .signInWithEmailAndPassword(username, password)
  //     .then(() => {
  //       console.log('Signed in successfully!');
  //       // Add your navigation logic here
  //     })
  //     .catch(error => {
  //       console.error('Error signing in:', error);
  //     });
  // };

  return (
    <View className="justify-center items-center pt-36 gap-24">
      <Text className="font-thin text-6xl"> Welcome! </Text>
      <View className="gap-6 mr-5 items-center">
        <TextInput
          placeholder="UserName"
          className="border border-gray-800 rounded w-72 p-2"
          // value={username}
          // onChangeText={text => setUsername(text)}
        />
        <TextInput
          placeholder="Password"
          secureTextEntry
          className="border border-gray-800 rounded w-72 p-2"
          // value={password}
          // onChangeText={text => setPassword(text)}
        />
        <Link
          href="../SocialMedia/LandingPage"
          className="bg-blue-700 rounded text-white p-2 w-20 text-center"
          // onPress={handleSignIn}
        >
          Log In
        </Link>
      </View>
      <Link href="./SignUp" className="rounded text-blue-600 p-2 pt-24">
        Don't Have An Account?{' '}
        <Text className="text-blue-700 font-bold">Sign Up Now! </Text>
      </Link>
    </View>
  );
};

export default SignIn;
