import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, GestureResponderEvent,Button,Image, ScrollView } from 'react-native';
import { Link } from 'expo-router';

export default function Home() {

  const [searchQuery, setSearchQuery] = useState('');
  

  return (
    <ScrollView>
      <View style={styles.container}>
      <Image
        source={require("../../assets/images/pawlink1.png")} 
        style={styles.image}
      />
      <TextInput
        style={styles.searchBar}
        placeholder="Search..."
        onChangeText={(text) => setSearchQuery(text)}
        value={searchQuery}
      />

      <View style={styles.checkrectangle}>
        <Image source={require("../../assets/images/Component.png")} style={styles.checkrectangleimage}></Image>
      </View>
      <TouchableOpacity style={styles.Button}> 
      <Link href = {"../SocialMedia/LandingPage"}>
        <Text style={styles.buttonText}>Check out</Text>
        </Link>
      </TouchableOpacity>

      <Text style={styles.Text1}>Adopt Pets </Text>
      <Link href = "../Adoption/LandingPage">
      <Text style={{ fontSize: 16, color: 'blue', top:20,marginBottom:20,marginRight:100 }}>See all</Text>
      </Link>

      <View style={styles.rectangleContainer}>
        <Link href="../Adoption/AdoptMe">
          <View style={styles.rectangle}>
              <Image
                source={require("../../assets/images/dog1.jpg")} 
                style={styles.rectangleimage}
              ></Image>
              <Text style={styles.Text}> The dog found on Kottawa towns  </Text>
            </View>
        </Link> 
        
        <View style={styles.rectangle}>
          <Image
            source={require("../../assets/images/dog2.jpg")} 
            style={styles.rectangleimage}
          />
          <Text style={styles.Text}> Ambalangoda</Text>
        </View>
        <View style={styles.rectangle}>
          <Image
            source={require("../../assets/images/dog3.jpg")} 
            style={styles.rectangleimage}
          />
          <Text style={styles.Text}> Nugegoda</Text>
        </View>
        <View style={styles.rectangle}>
          <Image
            source={require("../../assets/images/dog4.jpg")} 
            style={styles.rectangleimage}
          />
          <Text style={styles.Text}> Kurunegala</Text>
        </View>
        <StatusBar style="auto" />
      </View>
      
    </View>
    </ScrollView>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    width: '80%',
    borderWidth: 1,
    borderColor: '#888',
    padding: 10,
    marginBottom: 20,
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
    width: '25%',
    height: 100,
    marginBottom: 20,
    borderRadius: 10,
    
  },
  rectangleimage: {
    width: '102%',
    height: 146,
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
    marginBottom:10
  },
  
  Button: {
    width: 90,
    backgroundColor:'white',
    height:25,
    borderRadius: 5,
    top:-60,
    right:100,
    paddingHorizantal:20 
  },
  buttonText: {
    textAlign: 'center',
    fontSize: 12,
    fontWeight: 'bold',
    marginTop:3,
    marginLeft:10,
    backgroundcolor:'black'
  },
  Text1:{
    fontSize: 16,
    fontWeight: 'bold',
    marginRight:220
  },
  Text2:{
    fontSize: 18,
    fontWeight: 'bold',
    color:'#67bcd4',
    marginRight:220,
    marginTop:10,

  },
    
});


