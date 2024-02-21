import React from 'react';
import { StyleSheet, View, Image, TouchableOpacity, Text } from 'react-native';

export default function AdoptionDetail() {
  const handleAdopt = (option) => {
    console.log('Adopting option:', option);
    // Add logic for adoption
  };

  return (
    <View style={styles.container}>
      <Image source={require('../../assets/images/pawlink1.png')} style={styles.logo} />
      <View style={styles.imageContainer}>
        {/* Add your additional image here */}
        <Image source={require('../../assets/images/dog3.jpg')} style={styles.additionalImage} />
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button1} onPress={() => handleAdopt('option1')}>
          <Text style={styles.buttonText}>Yes I need</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button2} onPress={() => handleAdopt('option2')}>
          <Text style={styles.buttonText}>No I'don't</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 120,
    height: 120,
    top: -20,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  imageContainer: {
    width: '80%',
    aspectRatio: 1, 
    borderWidth: 1,
    borderColor: '#888',
    marginBottom: 20,
  },
  additionalImage: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: 'cover',
  },
  buttonContainer: {
    flexDirection: 'row',
  },
  button1: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    marginHorizontal: 10,
  },
  button2: {
        backgroundColor: 'red',
        padding: 10,
        borderRadius: 5,
        marginHorizontal: 10,
    },
  buttonText: {
    color: 'white',
    textAlign: 'center',
  },
});