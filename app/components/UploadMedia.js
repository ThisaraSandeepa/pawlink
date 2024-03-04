import { View,Text, StyleSheet,TouchableOpacity,SafeAreaView,Alert,Image } from "react-native";
import * as ImagePicker from 'expo-image-picker';
import React, {useState} from "react";
import * as FileSystem from 'expo-file-system';
import { FIREBASE_STORAGE } from "../../FirebaseConfig";



const UploadMediaFile = () => {
    const[image,setImage]= useState(null);
    const[uploading,setUploading]= useState(false);

    const pickImage = async () => {
        //no permission is requested
        let result =  await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing:true,
            aspect: [4,3],
            quality:1,
        })
        if (!result.canceled){
            setImage(result.assets[0].uri)
        }
    };

    //upload media files
    const UploadMedia = async() =>{
        setUploading(true);

        try{
            const {uri} = await FileSystem.getInfoAsync(image);
            const blob = await new Promise((resolove,reject)=> {
                const xhr = new XMLHttpRequest();
                xhr.onload = () => {
                    resolove(xhr.response);
                };
                xhr.onerror = (e) => {
                    reject(new TypeError ('Network request Failed'));
                };
                xhr.responseType='blob';
                xhr.open('GET', uri, true);
                xhr.send(null);
            });
            
            const filename = image.substring(image.lastIndexOf('/')+ 1);
            const ref = firebase. storage().ref().child(filename);

            await ref.put(blob);
            setUploading(false);
            Alert.alert('Photo Uploaded!!!');
            setImage(null);

        } catch(error){
            console.error(error);
            setUploading(false);

    }
};



  return(
    <SafeAreaView style={styles.container}>
      <TouchableOpacity style={styles.selectButton} onPress={pickImage} >
        <Text style={styles.buttonText}>Pick an image </Text>
      </TouchableOpacity>
      <View style={styles.imageContainer}>
        {image && <Image
        source={{uri:image}}
        style={{width:300,height:300}}
        />}
        <TouchableOpacity style={styles.uploadButton} onPress={UploadMedia} >
        <Text style={styles.buttonText}>Upload Image</Text>
      </TouchableOpacity>

      </View>
    </SafeAreaView>
  )
}

export default UploadMediaFile

const styles = StyleSheet.create({
    container:{
      flex:1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent:'center'
    },
    selectButton:{
        borderRadius:5,
        width:200,
        height:50,
        backgroundColor:'blue',
        alignItems:'center',
        justifyContent:'center',
        
    },
    buttonText:{
        color:'#fff',
        fontWeight:'bold',
        fontSize:18,
    },

    uploadButton:{
        borderRadius:5,
        width:200,
        height:50,
        backgroundColor:'red',
        alignItems:'center',
        justifyContent:'center',
        marginTop:20,  
    },
    imageContainer:{
        marginTop:30,
        marginBottom:50,
        alignItems:'center'
    }

  });