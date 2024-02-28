import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { FIREBASE_AUTH } from '../../FirebaseConfig';
import { createUserWithEmailAndPassword} from 'firebase/auth';
import { CheckBox, Icon } from 'react-native-elements';

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
      const userCredential = await createUserWithEmailAndPassword(FIREBASE_AUTH, email, password);
      const user = userCredential.user;
      console.log("Successfully Signed Up!");

      // Navigate to the home screen or perform other actions upon successful sign-up
    
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
{/* 
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
      </View> */}

      <TouchableOpacity style={styles.signupButton} onPress={handleSignup}>
        <Text style={styles.signupButtonText}>Sign Up</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: '80%', // Adjust the width as needed
    height: '20%', // Adjust the height as needed
    resizeMode: 'contain', // Adjust the resizeMode as needed
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
    width: '60%', // Adjust the width as needed
    marginBottom: 20, // Increase the marginBottom for more space
  },
  signupButton: {
    backgroundColor: '#263c9e',
    padding: 10,
    borderRadius: 10,
    width: '50%',
    marginTop: 20, // Increase the marginTop for more space
  },
  signupButtonText: {
    color: 'white',
    textAlign: 'center',
  },
});

export default SignupScreen;