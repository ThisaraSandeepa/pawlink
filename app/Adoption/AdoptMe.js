import { Link } from 'expo-router';
import { StyleSheet,Image, Button, TouchableOpacity,View,Text,ScrollView } from 'react-native';

export default function Adoptme() {

  return (
    <ScrollView>
    <View style={styles.container}>
      {/* Displaying the image from assets */}
      <Image
        source={require('../../assets/images/pawlink1.png')} 
        style={styles.image}
      />      
      <Image
        source={require('../../assets/images/dog3.jpg')}
        style={styles.dogimage}
      />
      
      <View style={styles.RectangleContainer}>
        <View style={styles.rectangle}>
          <Text style={styles.Text1}>Black </Text>
          <Text style={styles.Text}>Colour </Text>
          </View>

          <View style={styles.rectangle}>
          <Text style={styles.Text1}>Undefied </Text>
          <Text style={styles.Text}>Breed </Text>
         
          </View>

          <View style={styles.rectangle}>
          <Text style={styles.Text1}>Adult</Text>
          <Text style={styles.Text}>Age </Text>
          </View>

          <View>
          <Text style={styles.Text2}>Location</Text>
          <Text style={styles.Text3}>Lorem ipsum dolor sit amet, coetur adipiscing elit ut aliquam, purus sit amluctus Lorem ipsum dolor sit lorem as it ipsum just is fill to ipsum fit la la bit sa sa agenama mama ipsum di lala kes doni kes bs thirty.</Text>
          </View>
          
          <Link
            href="../components/Details"
            className='bg-blue-800 rounded text-white p-2 w-25 text-center'
            style={styles.link}
          >
            Adopt Me!
          </Link>



        </View>

    </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image:{
    marginTop:10,
    width: '25%',
    height: 100,
    top:-10,
    borderRadius:10,
  },
  dogimage:{
    width: 310,
    height: 270,
    borderRadius:10,
    top:-10,
  },
  Text:{
    color:'B4AEAE',
    fontSize:10,
    textAlign:'center',
    top:5,
  },
  Text1:{
    color:"blue",
    fontSize:11,
    fontWeight:'bold',
    textAlign:'center',
    top:5,
  },
  Text2:{
    color:"blue",
    fontSize:17,
    fontWeight:'bold',
    textAlign:'center',
    top:30,
    right:5
  },
  Text3:{
    fontSize:13,
    fontWeight:'bold',
    textAlign:'justify',
    top:50,
    marginLeft:10,
    marginRight:10,
    
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
  RectangleContainer:{
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    width: '100%',
    padding: 10,
    borderColor:'#888',
    shadowColor: "#000",
    width:362,
    height:386,
    backgroundColor:'white',
    marginTop:15,
    borderRadius:10,
    elevation:5,
    backgroundColor:'white'
 
  },
  rectangle: {
    width: 64,
    height: 62,
    borderWidth: 1,
    borderColor: '#888',
    marginBottom: 20,
    margin:20,
    justifyContent: 'center',
    resizeMode:'contain',
    borderRadius:10,
    shadowColor: "#000",

  },
  
  link: {
    left:110,
    marginTop:100,
    borderRadius:5,
    width:100,
    fontWeight:'bold'
  }
});

