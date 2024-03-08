import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, Alert, Image, TextInput, ScrollView } from "react-native";
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import { getStorage, ref, uploadBytes } from "firebase/storage";
import { getFirestore, addDoc,collection } from 'firebase/firestore';
import { FIREBASE_APP } from '../../FirebaseConfig';
import { router } from 'expo-router'; // Add this line

const dbStorage = getStorage(FIREBASE_APP);
const dbFirestore = getFirestore(FIREBASE_APP);

const UploadMediaFile = () => {
    const [image, setImage] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [contactInfo, setContactInfo] = useState("");
    const [location, setLocation] = useState("");
    const [age, setAge] = useState("");
    const [color, setColor] = useState("");
    const [description, setDescription] = useState("");

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });
        if (!result.cancelled) {
            setImage(result.assets[0].uri);
        }
    };
    const onCancel = () => {
        // Reset form values
        setContactInfo("");
        setLocation("");
        setAge("");
        setColor("");
        setDescription("");
        setImage(null);
    
       
        router.replace('./LandingPage');
    };
    
    
// Upload image to Firebase Storage
    const UploadMedia = async () => {
        setUploading(true);

        // Upload image to Firebase Storage
        try {
            const { uri } = await FileSystem.getInfoAsync(image);
            const blob = await FileSystem.readAsStringAsync(uri, { encoding: FileSystem.EncodingType.Base64 });

            const filename = image.substring(image.lastIndexOf('/') + 1);
            const storageRef = ref(dbStorage, filename);
            await uploadBytes(storageRef, blob, { contentType: 'image/jpeg/png ' });

            // Firestore data uploading
            const newDocRef = await addDoc(collection(dbFirestore, "strayPosts"),{
                contactInfo: contactInfo,
                location: location,
                age: age,
                color: color,
                description: description,
                image: filename
            });
            console.log("Document written with ID: ", newDocRef.id);  // Log the ID of the new document
            
            setUploading(false);
            Alert.alert('Photo Uploaded!!!'); // Alert to confirm photo upload
            
            setImage(null);
            router.replace('./LandingPage');

        } catch (error) {       
            console.error(error);      
            setUploading(false);
            Alert.alert('An error occurred while uploading the photo');   // Alert to confirm photo upload
           
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContainer}
             showsVerticalScrollIndicator={false}>

                <View style={styles.labelContainer}>
                    <Text style={styles.labelText}> Found Location</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={(text) => setLocation(text)}
                    />
                </View>

                <View style={styles.labelContainer}>
                    <Text style={styles.labelText}>Color</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={(text) => setColor(text)}
                    />
                </View>

                <View style={styles.labelContainer}>
                    <Text style={styles.labelText}>Age</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={(text) => setAge(text)}
                    />
                </View>

                <View style={styles.labelContainer}>
                    <Text style={styles.labelText}>Description</Text>
                    <TextInput
                        style={styles.descriptioninput}
                        multiline={true}
                        numberOfLines={4}
                        onChangeText={(text) => setDescription(text)}
                    />
                </View>
                
                <View style={styles.labelContainer}>
                    <Text style={styles.labelText}>Contact Info</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={(text) => setContactInfo(text)}
                    />
                </View>
                
                <TouchableOpacity style={styles.selectButton} onPress={pickImage}>
                    <Text style={styles.buttonText}>Pick an image</Text>
                </TouchableOpacity>
                <View style={styles.imageContainer}>
                    {image && <Image
                        source={{ uri: image }}
                        style={{ width: 300, height: 300 }}
                    />}
                    <View style={styles.buttonRow}>
                    <TouchableOpacity style={styles.cancelButton} onPress={onCancel}>
                        <Text style={styles.buttonText}>Cancel</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.uploadButton} onPress={UploadMedia}>
                        <Text style={styles.buttonText}> Post </Text>
                    </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    scrollContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingBottom: 20, 
    },
    input: {
        height: 40,
        width: 300,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
        paddingLeft: 10,
        borderRadius:5,
    },
    selectButton: {
        borderRadius: 10,
        width: 300,
        height: 40,
        backgroundColor: '#6391db',
        alignItems: 'center',
        justifyContent: 'center',
    },
    labelContainer: {
        marginBottom: 5,
    },

    descriptioninput:{
        height:100,
        width: 300,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
        paddingLeft: 10,
        borderRadius:5,

    },
    
    labelText: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
        
    },
    buttonRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: 300, // Adjust the width as needed
        marginTop: 20,
        
        
    },
    
    cancelButton: {
        borderRadius: 10,
        width: 140,
        height: 50,
        backgroundColor: '#c5cfde', // You can choose a different color
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 10,
        
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 18,
    },
    uploadButton: {
        borderRadius: 10,
        width: 140,
        height: 50,
        backgroundColor: '#2557a8',
        alignItems: 'center',
        justifyContent: 'center',
        
    },
    imageContainer: {
        marginTop: 30,
        marginBottom: 50,
        alignItems: 'center',
    },
});

export default UploadMediaFile;