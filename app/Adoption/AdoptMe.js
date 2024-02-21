import { Link } from 'expo-router';
import { StyleSheet,Image, Button, TouchableOpacity,View,Text } from 'react-native';

export default function Adoptme() {

  return (
    <View style={styles.container}>
      {/* Displaying the image from assets */}
      <Image
        source={require('../../assets/images/pawlink1.png')} // Adjust the path to match your project structure
        style={styles.image}

      />
      {/* Displaying the rectangle */}
      <View style={styles.rectangle}>
      <Image
        source={require('../../assets/images/dog3.jpg')} // Adjust the path to match your project structure
        style={styles.rectangleimage}
      />
       
        <Text style={styles.Text}> The dog found on near Nugegoda</Text>
      </View>
      <Link href="../components/Details" className='bg-blue-700 rounded text-white p-2 w-25 text-center' > Adopt Me! </Link>
    </View>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
 
  rectangle: {
    width: '85%',
    height: 250,
    borderWidth: 1,
    borderColor: '#888',
    marginBottom: 20,
    backgroundColor:'#f6f7fb',
    borderRadius:10,
    top:10,
  },
  image:{
    width: '25%',
    height: 100,
    top:-70,
    borderRadius:10,
  },
  rectangleimage:{
    width: '100%',
    height: 230,
    borderRadius:10,
  },
  Text:{
    fontSize:12,
    fontWeight:'bold',
    textAlign:'center',
    top:0,
  },
  Button:{
    width: '85%',
    height: 40,
    borderRadius:10,
    backgroundColor:'#f6f7fb',
    justifyContent: 'center',
    alignItems: 'center',
    top:20,
  },
  buttonText:{
    
  }

});