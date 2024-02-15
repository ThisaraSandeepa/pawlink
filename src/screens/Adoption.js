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
  container: 'flex-1 bg-white items-center justify-center',
  input: 'w-80 border-2 border-gray-800 p-4 mb-8',
  searchBar: 'w-80 border-2 border-gray-800 p-4 mb-8 top-0 rounded flex-row',
  rectangleContainer: 'flex-row flex-wrap',
});

