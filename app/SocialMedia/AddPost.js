import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, Alert, Image, ScrollView, TextInput } from "react-native";
import * as ImagePicker from 'expo-image-picker';
import { getStorage, ref, uploadBytes } from "firebase/storage";
import { getFirestore, addDoc,collection } from 'firebase/firestore';
import { FIREBASE_APP } from '../../FirebaseConfig';
import * as FileSystem from 'expo-file-system'; // Import FileSystem

const dbStorage = getStorage(FIREBASE_APP);
const dbFirestore = getFirestore(FIREBASE_APP);

const UploadMediaFile = () => {
    const [image, setImage] = useState(null);
    const [description, setDescription] = useState('');
    const [uploading, setUploading] = useState(false);

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
        setImage(null);
        setDescription('');
    };
    
    const UploadMedia = async () => {
        setUploading(true);

        try {
            const { uri } = await FileSystem.getInfoAsync(image);
            const response = await fetch(uri);
            const blob = await response.blob();

            const filename = image.substring(image.lastIndexOf('/') + 1);
            const storageRef = ref(dbStorage, 'SocialMedia/' + filename);
            await uploadBytes(storageRef, blob);

            const newDocRef = await addDoc(collection(dbFirestore, "socialMediaPosts"),{
                image: filename,
                description: description,
                likes: "0",
                comments: "0",
            });
             
            console.log ("Photo Uploaded Successfully! ");
            setUploading(false);
            Alert.alert('Photo Uploaded!!!'); 
            
            setImage(null);
            setDescription('');

        } catch (error) {       
            console.error(error);      
            setUploading(false);
            Alert.alert('An error occurred while uploading the photo');   
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
                <View style={styles.imageContainer}>
                    {image ? (
                        <Image source={{ uri: image }} style={styles.selectedImage} />
                    ) : (
                        <View style={styles.placeholderImage} />
                    )}
                    <TextInput
                        style={styles.descriptionInput}
                        placeholder="Description"
                        multiline={true}
                        value={description}
                        onChangeText={(text) => setDescription(text)}
                    />
                    <TouchableOpacity style={styles.selectButton} onPress={pickImage}>
                        <Text style={styles.buttonText}>Add a Post</Text>
                    </TouchableOpacity>
                    <View style={styles.buttonRow}>
                        <TouchableOpacity style={styles.cancelButton} onPress={onCancel}>
                            <Text style={styles.buttonText}>Cancel</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.uploadButton} onPress={UploadMedia}>
                            <Text style={styles.buttonText}>Post</Text>
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
    selectButton: {
        borderRadius: 10,
        width: 300,
        height: 40,
        backgroundColor: '#6391db',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20,
    },
    buttonRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: 300, 
        marginTop: 20,
    },
    cancelButton: {
        borderRadius: 10,
        width: 140,
        height: 50,
        backgroundColor: '#c5cfde', 
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
    selectedImage: {
        width: 300,
        height: 300,
        resizeMode: 'cover',
        borderRadius: 10,
        marginBottom: 20,
    },
    placeholderImage: {
        width: 300,
        height: 300,
        backgroundColor: '#ccc', // Placeholder color
        borderRadius: 10,
        marginBottom: 20,
    },
    descriptionInput: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        width: '100%',
        height: 100,
        padding: 20,
        marginBottom: 20,
    },
});

export default UploadMediaFile;