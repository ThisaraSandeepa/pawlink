import React, { useState , useEffect } from "react";
import {
  View,
  Text,
  Image,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Modal,
  Button,
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

const SignUpVet = () => {


  // Define state variables
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [location, setLocation] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [code, setCode] = useState("");

  const [shown, setShown] = useState(false);

  //Only render one time
  useEffect(() => {
    if (!shown) {
      Alert.alert(
        "\b\b\b\b\b\b\b\b\bWelcome to PawLink!",
        "We are excited to have you on board.\n\nNote: You need a secret code to sign up as a Veterinarian.\n\nInstruction to obtain the secret code:\n\n1. Contact the Us through this Email and \b\b\bVerify yourself as a Veterenaian. \n\n\t\t\t• Email - contact@pawlink.blog \n\t\t\t• Phone - 0710939389 \n\n2. You will be then provided with an Key \b\b\b\bto Register as a Veterenaian.\n\n3. If you have done the above Instruction \b\b\bthen proceed to Sign up and complete \b\b\bthe form\n\n 04. Be ready to enter the Key when \b\b\basked for!\n\n\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\bThank you!"
      );
      setShown(true);
    }
  }, [shown]);
  
  // Define handleSignup function
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

    // Check if the phone number contains only numeric characters
    if (!/^[0-9]+$/.test(phoneNumber)) {
      alert("Phone number can only contain numeric characters");
      return;
    }

    // Check if the phone number is 10 digits
    if (phoneNumber.length !== 10) {
      alert("Phone number should be contains 10 digits");
      return;
    }

    // Check if the password is at least 6 characters long
    try {
      const profilePicture =
        "https://firebasestorage.googleapis.com/v0/b/pawlink-9dcc9.appspot.com/o/9193824.png?alt=media&token=70cbfbea-976d-4bd0-950c-4839095f13b9";

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
      await setDoc(doc(dbFirestore, "Veterinarians", user.uid), {
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password,
        UserType: "Veterinarian",
        profilePicture: profilePicture,
        location: location,
        phoneNumber: phoneNumber,
      });

      // Save user data to Realtime Database
      await set(ref(dbRealtime, "Veterinarians/" + user.uid), {
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password,
        UserType: "Veterinarian",
        profilePicture: profilePicture,
        location: location,
        phoneNumber: phoneNumber,
      });

      Alert.alert("", "successfully signed up!");

      // Redirect to the Sign In page
      router.replace("../SignIn");
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

  const alertSignUp = () => {
    setModalVisible(true);
  };

  // Function to handle modal submit
  const handleModalSubmit = () => {
    if (code === "pawlinkVet") {
      handleSignup();
      setModalVisible(false);
    } else {
      Alert.alert("Password is incorrect");
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
        Veterinarians Are Welcome!
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

      <TextInput
        style={styles.input}
        placeholder="Location"
        onChangeText={(text) => setLocation(text)}
      />

      <TextInput
        style={styles.input}
        placeholder="Phone Number"
        onChangeText={(text) => setPhoneNumber(text)}
        keyboardType="phone-pad"
        maxLength={10}
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

      <TouchableOpacity style={styles.signupButton} onPress={alertSignUp}>
        <Text style={styles.signupButtonText}>Sign Up as Veterinarians </Text>
      </TouchableOpacity>

      <Modal visible={modalVisible} animationType="slide">
        <View style={styles.modalContainer}>
          <Text className="mb-4">
            {" "}
            Enter the secret code to sign up as a Veterinarian:{" "}
          </Text>
          <TextInput
            style={styles.input}
            value={code}
            onChangeText={setCode}
            placeholder="Secret Code"
          />
          <View style={styles.buttonContainer}>
            <Button title="Cancel" onPress={() => setModalVisible(false)} />
            <Button title="Submit" onPress={handleModalSubmit} />
          </View>
        </View>
      </Modal>
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
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "80%",
  },
});

export default SignUpVet;
