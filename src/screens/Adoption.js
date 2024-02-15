import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput,Image, TouchableOpacity, GestureResponderEvent,Button,Image } from 'react-native';

export default function Home() {

  const [searchQuery, setSearchQuery] = useState('');
  
  function handleSearch(event) {
      throw new Error('Function not implemented.');
  }

  return (
    <View style={styles.container}>
    <Image
        source={require('../../assets/images/pawlink1.png')} // Adjust the path to match your project structure
        style={styles.image}
      />
      <TextInput
        style={styles.searchBar}
        placeholder="Search..."
        onChangeText={text => setSearchQuery(text)}
        value={searchQuery}
      />
      
      <View style={styles.checkrectangle}>
        <Text
          style={styles.Text}>Check our animal lovers</Text>
          <TouchableOpacity
        style={styles.Button}
        onPress={handleSearch}
          >
        <Text style={styles.buttonText}>Check Out</Text>
      </TouchableOpacity>
      </View>
      
      <View style = {styles.rectangleContainer}>
      <View style={styles.rectangle}>
      <Image
        source={require('../../assets/images/dog1.jpg')} // Adjust the path to match your project structure
        style={styles.rectangleimage}
      />
        <Text style={styles.Text}> The dog found on near Nugegoda</Text>
      </View>
      <View style={styles.rectangle}>
      <Image
        source={require('../../assets/images/dog2.jpg')} // Adjust the path to match your project structure
        style={styles.rectangleimage}
      />
      <Text style={styles.Text}> The dog found on near Ambalangoda</Text>
      </View>
      <View style={styles.rectangle}>
      <Image
        source={require('../../assets/images/dog3.jpg')} // Adjust the path to match your project structure
        style={styles.rectangleimage}
      />
      <Text style={styles.Text}> The dog found on near Nugegoda</Text>
      </View>
      <View style={styles.rectangle}>
      <Image
        source={require('../../assets/images/dog4.jpg')} // Adjust the path to match your project structure
        style={styles.rectangleimage}
      />
      <Text style={styles.Text}> The dog found on near Kurunegala</Text>
    
      </View>
      <StatusBar style="auto" />
    </View>
    </View>
    
  );
}

const styles = StyleSheet.create({
  container: 'flex flex-1 bg-white items-center justify-center',
  input: 'w-80 border-1 border-gray-800 p-10 mb-20',
  searchBar: 'w-80 border-1 border-gray-800 p-10 mb-20 top-0 rounded flex-row',
  rectangleContainer: 'flex-row flex-wrap justify-between w-full p-10',
  rectangle: 'w-45 h-180 border-1 border-gray-800 mb-20 items-center justify-center resize-contain rounded',
  additionalTextInput: 'w-90 border-1 border-gray-800 p-10',
  image: 'w-55 h-150 mb-20 rounded',
  rectangleimage: 'w-full h-140 mb-20 rounded',
  checkrectangle: 'w-80 h-100 border-1 border-gray-800 mb-20 bg-gray-100 rounded top-0 flex justify-center items-center',
  checkrectangleimage: 'w-full h-100 rounded',
  Text: 'text-sm font-bold',
  Button: 'w-20 bg-blue-500 h-35 self-center p-10 rounded top-20',
  buttonText: 'text-white text-center text-sm font-bold',
});

