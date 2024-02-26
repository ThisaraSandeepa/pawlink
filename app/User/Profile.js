import React from 'react';
import { Text, View, Image, TouchableOpacity, Alert } from 'react-native';

export default function Profile() {
  // Example user data
  const user = {
    name: "Rochana Godigamuwa",
    isPetOwner: true, 
    username: "roch_godi20",
    password: "hi@hi",
    pet: {
      name: "Vodka",
      age: 3
    }
  };

  // Function to handle back button press
  const handleBack = () => {
    // Handle navigation to the previous app page here
    
  };

  // Function to handle logout button press
  const handleLogout = () => {
    Alert.alert(
      "Are you Sure",
      "Are you sure you want to log out?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "Yes", onPress: () => logout() }
      ],
      { cancelable: false }
    );
  };

  // Function to perform logout action
  const logout = () => {
    // Perform logout action here
    console.log("Logged out");
  };
 
  //Body of the code where users name, layout and his password with image is given which is reterived from the database
  return (
    <View style={{ flex: 1, justifyContent: 'space-between', alignItems: 'center', paddingTop: 40, paddingLeft: 10 }}>
      <View>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
          <Image
            source={require('../../assets/images/first.png')}
            style={{ width: 50, height: 50, marginRight: 10 }} 
          />
          <View>
            <Text>{user.name}</Text>
            {user.isPetOwner && <Text style={{ color: 'green' }}>Pet Owner</Text>}
          </View>
        </View>
        <View style={{ alignItems: 'flex-start', backgroundColor: '#888', borderRadius: 10, padding: 10, marginTop: 20 }}>
          <Text style={{ fontSize: 18 }}>Username: {user.username}</Text>
        </View>
        <View style={{ alignItems: 'flex-start', backgroundColor: 'grey', borderRadius: 10, padding: 10, marginTop: 20 }}>
          <Text style={{ fontSize: 18 }}>Password: {user.password}</Text>
        </View>
        <Text style={{ fontSize: 24, fontWeight: 'bold', marginTop: 20 }}>Pet Information</Text>
        <View style={{ alignItems: 'flex-start', backgroundColor: 'lightblue', borderRadius: 10, padding: 10, marginTop: 10 }}>
          <Text style={{ fontSize: 18 }}>Pet Name: {user.pet.name}</Text>
          <Text style={{ fontSize: 18 }}>Pet Age: {user.pet.age}</Text>
        </View>
      </View>
      
      
          
      <TouchableOpacity onPress={handleLogout} style={{ backgroundColor: 'red', padding: 10, borderRadius: 5 }}>
        <Text style={{ color: 'white', fontSize: 18 }}>Log Out</Text>
      </TouchableOpacity>
    </View>
  );
}






//Rochana Godigamuwa