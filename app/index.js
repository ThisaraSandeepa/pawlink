import React from 'react';
import { Link } from 'expo-router';
import { View, Image,StyleSheet } from 'react-native';

export default function index() {
  return (
    <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
      <Image
        source={require("../assets/images/pawlink1.png")}
        style={styles.image}
      />
      <Link
        href="./User/SignIn"
        style={{
          backgroundColor: '#3252a8',
          borderRadius: 8,
          color: 'white',
          paddingVertical:9,
          paddingHorizontal: 20,
          width: 170,
          textAlign: 'center',
          fontSize:20,
         
        }}
      >
        GET STARTED
      </Link>
      
    </View>
  );
}
const styles = StyleSheet.create({
  image: {
    width: '80%', // Adjust the width as needed
    height: '50%', // Adjust the height as needed
    resizeMode: 'contain', // Adjust the resizeMode as needed
    marginTop:-200,
    marginBottom: 100, // Adjust the marginBottom to move the button closer
  },
});
