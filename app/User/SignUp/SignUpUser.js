import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
} from "react-native";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { router } from "expo-router";
import { getAuth, updateProfile } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import { getDatabase, ref, set } from "firebase/database";
import { FIREBASE_APP } from "../../../FirebaseConfig";
import { MaterialIcons } from "@expo/vector-icons";

// Initialize Firebase authentication, Firestore, and Realtime Database
const auth = getAuth(FIREBASE_APP);
const dbFirestore = getFirestore(FIREBASE_APP);
const dbRealtime = getDatabase(FIREBASE_APP);

const SignupScreen = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSignup = async () => {
    // Check if any of the required fields are empty
    if (!firstName || !lastName || !email || !password || !confirmPassword) {
      alert("All fields are required");
      return;
    }

    // Check if passwords match
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    // Check if the username contains only alphabetic characters
    if (!/^[a-zA-Z]+$/.test(firstName) || !/^[a-zA-Z]+$/.test(lastName)) {
      alert("Username can only contain alphabetic characters");
      return;
    }

    try {
      const profilePicture =
        "https://firebasestorage.googleapis.com/v0/b/pawlink-9dcc9.appspot.com/o/men.png?alt=media&token=c96a8222-0c67-49d5-a0b0-6cfd1e6b8521";

      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      const user = userCredential.user;
      console.log("Successfully Signed Up!");
      await updateProfile(user, {
        displayName: `${firstName} ${lastName}`,
        photoURL: profilePicture,
      });

      // Save user data to Firestore
      await setDoc(doc(dbFirestore, "Users", user.uid), {
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password,
        UserType: "Pet Owner",
        profilePicture: profilePicture,
      });

      // Save user data to Realtime Database
      await set(ref(dbRealtime, "Users/" + user.uid), {
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password,
        UserType: "Pet Owner",
        profilePicture: profilePicture,
      });

      Alert.alert("", "successfully signed up!");
      router.replace("./SignIn");

    } catch (error) {
      // Check for specific errors
      switch (error.code) {
        case "auth/invalid-email":
          alert("Invalid email address!");
          break;
        case "auth/invalid-credential":
        case "auth/wrong-password":
          alert("Invalid email or password!");
          break;
        case "auth/missing-password":
          alert("Password is required.");
          break;
        case "auth/weak-password":
          alert("Atleast 6 characters required for password!");
          break;
        case "auth/email-already-in-use":
          alert("Email already in use!");
          break;
        default:
          alert(error.message);
      }
    }
  };

  return (
    <View className="flex-1 items-center justify-center">
      <View>
        <Image
          className="w-36 h-36"
          source={require("../../../assets/images/pawlink1.png")}
        />
      </View>

      <Text className="font-thin text-2xl mt-3 mb-6">
        Pet Owners Are Welcome!
      </Text>

      <TextInput
        style={styles.input}
        placeholder="First Name"
        onChangeText={(text) => setFirstName(text)}
      />

      <TextInput
        style={styles.input}
        placeholder="Last Name"
        onChangeText={(text) => setLastName(text)}
      />

      <TextInput
        style={styles.input}
        placeholder="Email"
        onChangeText={(text) => setEmail(text)}
        keyboardType="email-address"
      />

      <View style={styles.passwordContainer}>
        <TextInput
          style={styles.passwordInput}
          placeholder="Password"
          secureTextEntry={!showPassword}
          onChangeText={(text) => setPassword(text)}
        />
        <TouchableOpacity
          onPress={() => setShowPassword(!showPassword)}
          style={styles.icon}
        >
          <MaterialIcons
            name={showPassword ? "visibility-off" : "visibility"}
            size={24}
            color="gray"
          />
        </TouchableOpacity>
      </View>

      <View style={styles.passwordContainer}>
        <TextInput
          style={styles.passwordInput}
          placeholder="Confirm Password"
          secureTextEntry={!showConfirmPassword}
          onChangeText={(text) => setConfirmPassword(text)}
        />
        <TouchableOpacity
          onPress={() => setShowConfirmPassword(!showConfirmPassword)}
          style={styles.icon}
        >
          <MaterialIcons
            name={showConfirmPassword ? "visibility-off" : "visibility"}
            size={24}
            color="gray"
          />
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.signupButton} onPress={handleSignup}>
        <Text style={styles.signupButtonText}>Sign Up as User</Text>
      </TouchableOpacity>
    </View>
  );
};

// Define styles
const styles = StyleSheet.create({
  input: {
    height: 40,
    width: "80%",
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 10,
    borderRadius: 10,
  },

  passwordContainer: {
    position: "relative",
    width: "80%",
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    borderRadius: 10,
  },
  passwordInput: {
    height: 40,
    width: "100%",
    paddingLeft: 10,
  },
  icon: {
    position: "absolute",
    right: 10,
    top: 10,
  },
  signupButton: {
    backgroundColor: "#1340b0",
    padding: 10,
    borderRadius: 10,
    width: "50%",
    marginTop: 20,
  },
  signupButtonText: {
    color: "white",
    textAlign: "center",
  },
});

export default SignupScreen;
