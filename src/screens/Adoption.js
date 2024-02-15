import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput,Image, TouchableOpacity, GestureResponderEvent,Button } from 'react-native';

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
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  searchBar: {
    width: '80%',
    borderWidth: 1,
    borderColor: '#888',
    padding: 10,
    marginBottom: 20,
    top:0,
    borderRadius:10,
    flexDirection:"row",
  },

  rectangleContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    width: '100%',
    padding: 10,

  },

  rectangle: {
    width: '45%',
    height: 180,
    borderWidth: 1,
    borderColor: '#888',
    marginBottom: 20,
    alignItems: 'center',
    justifyContent: 'center',
    resizeMode:'contain',
    borderRadius:10,
  },

  additionalTextInput: {
    width: '90%',
    borderWidth: 1,
    borderColor: '#888',
    padding: 10,
  },

  image: {
    width: '55%',
    height: 150,
    marginBottom: 20,
    borderRadius: 10,
    
  },

  rectangleimage: {
    width: '100%',
    height: 140,
    marginBottom: 20,
    borderRadius: 10,
  },

  checkrectangle: {
    width: '80%',
    height: 100,
    borderWidth: 1,
    borderColor: '#888',
    marginBottom: 20,
    backgroundColor:'#f6f7fb',
    borderRadius:10,
    top:0,
    justifyContent: 'center',
    alignItems: 'center',
  },

  checkrectangleimage:{
    width: '100%',
    height: 100,
    borderRadius:10,
  },

  Text:{
    fontSize: 10,
    fontWeight: 'bold',
  },
  
  Button: {
    width: '20%',
    backgroundColor: '#67bcd4',
    height:35,
    alignSelf:"center",
    padding: 10,
    borderRadius: 5,
    top:20,
  },

  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 12,
    fontWeight: 'bold',
    fontFamily: 'Arial',
  },

});

