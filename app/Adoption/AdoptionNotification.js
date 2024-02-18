import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Import Ionicons from Expo

const AdoptionPage = () => {
  return (
    <View style={styles.container}>
      {/* Logo centered */}
      <Image source={require("../../assets/images/pawlink1.png")} style={styles.logo}/>

      {/* Notification content */}
      <View style={styles.notificationContent}>
        <Text style={styles.mainTitle}>Notification</Text>
        <Text style={styles.subTitle}>Notification Title 1</Text>
        <Text style={styles.notificationText}>
          Here’s notification text. 
        </Text>
        <Text style={styles.subTitle}>Notification Title 2</Text>
        <Text style={styles.notificationText}>
          Here’s notification text. 
        </Text>
        <Text style={styles.subTitle}>Notification Title 3</Text>
        <Text style={styles.notificationText}>
          Here’s notification text. 
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems:"left",
    padding: 16,
  },
  logo: {
    width: 120,  
    height: 120,
    resizeMode: 'contain',
    marginBottom: 16,
    alignItems:'center',
    left:125,
  },
  notificationContent: {
    alignItems: 'flex-start',
  },
  mainTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'left',
    color: 'blue',
  },
  subTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'left',
    marginLeft: 29,
  },
  notificationText: {
    fontSize: 16,
    textAlign: 'left',
    marginLeft: 29,
  },
});


export default AdoptionPage;