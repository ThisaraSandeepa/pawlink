// Import necessary dependencies and Firebase SDK
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { router } from 'expo-router';
import { getAuth } from 'firebase/auth';
import { getFirestore, collection, doc, setDoc } from 'firebase/firestore';
import { FIREBASE_APP } from '../../FirebaseConfig';
import { CheckBox } from 'react-native-elements';

// Initialize Firebase authentication and Firestore
const auth = getAuth(FIREBASE_APP);
const db = getFirestore(FIREBASE_APP);

const SignupScreen = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [vetCheckbox, setVetCheckbox] = useState(false);
  const [petOwnerCheckbox, setPetOwnerCheckbox] = useState(false);

  const handleSignup = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      console.log("Successfully Signed Up!");

      // Save user data to Firestore
      await setDoc(doc(db, 'Users', user.uid), {
        firstName: firstName,
        lastName: lastName,
        email: email,
        password:password,
        //confirmPassword: confirmPassword,
        vet: vetCheckbox,
        petOwner: petOwnerCheckbox,

        // Add other user data as needed
      });

      router.replace('./SignIn');

    
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/images/pawlink1.png')} // Replace with the actual path to your logo
        style={styles.logo}
      />

      <TextInput
        style={styles.input}
        placeholder="First Name"
        onChangeText={text => setFirstName(text)}
      />

      <TextInput
        style={styles.input}
        placeholder="Last Name"
        onChangeText={text => setLastName(text)}
      />

      <TextInput
        style={styles.input}
        placeholder="Email"
        onChangeText={text => setEmail(text)}
        keyboardType="email-address"
      />

      <View style={styles.passwordContainer}>
        <TextInput
          style={styles.passwordInput}
          placeholder="Password"
          secureTextEntry={!showPassword}
          onChangeText={text => setPassword(text)}
        />
      </View>

      <TextInput
        style={styles.input}
        placeholder="Confirm Password"
        secureTextEntry
        onChangeText={text => setConfirmPassword(text)}
      />

      <View style={styles.checkboxContainer}>
        <CheckBox
          title="Veterinarian"
          checked={vetCheckbox}
          onPress={() => setVetCheckbox(!vetCheckbox)}
        />
        <CheckBox
          title="Pet Owner/Adopter"
          checked={petOwnerCheckbox}
          onPress={() => setPetOwnerCheckbox(!petOwnerCheckbox)}
        />
      </View>

      <TouchableOpacity style={styles.signupButton} onPress={handleSignup}>
        <Text style={styles.signupButtonText}>Sign Up</Text>
      </TouchableOpacity>
    </View>
  );
};

// Define styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: '80%', 
    height: '20%', 
    resizeMode: 'contain', 
    marginBottom: 20,
  },
  input: {
    height: 40,
    width: '80%',
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 10,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '80%',
    marginBottom: 10,
  },
  passwordInput: {
    flex: 1,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingLeft: 10,
  },
  checkboxContainer: {
    justifyContent: 'space-between',
    width: '60%', 
    marginBottom: 20, 
  },
  signupButton: {
    backgroundColor: '#263c9e',
    padding: 10,
    borderRadius: 10,
    width: '50%',
    marginTop: 20, 
  },
  signupButtonText: {
    color: 'white',
    textAlign: 'center',
  },
});

export default SignupScreen;
