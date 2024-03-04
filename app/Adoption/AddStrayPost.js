import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, Alert, Image } from "react-native";
import * as ImagePicker from 'expo-image-picker';
import React, { useState } from "react";
import * as FileSystem from 'expo-file-system';
import { FIREBASE_APP } from '../../FirebaseConfig';
import { getStorage, ref, uploadBytes } from "firebase/storage";

const dbStorage = getStorage(FIREBASE_APP);

const UploadMediaFile = () => {
    const [image, setImage] = useState(null);
    const [uploading, setUploading] = useState(false);

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        })
        if (!result.cancelled) {
            setImage(result.assets[0].uri)
        }
    };

    const UploadMedia = async () => {
        setUploading(true);

        try {
            const { uri } = await FileSystem.getInfoAsync(image);
            const blob = await FileSystem.readAsStringAsync(uri, { encoding: FileSystem.EncodingType.Base64 });

            const filename = image.substring(image.lastIndexOf('/') + 1);
            const storageRef = ref(dbStorage, filename);

            await uploadBytes(storageRef, blob, { contentType: 'image/jpeg/png ' });

            setUploading(false);
            Alert.alert('Photo Uploaded!!!');
            setImage(null);

        } catch (error) {
            console.error(error);
            setUploading(false);
            Alert.alert('An error occurred while uploading the photo');
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <TouchableOpacity style={styles.selectButton} onPress={pickImage} >
                <Text style={styles.buttonText}>Pick an image </Text>
            </TouchableOpacity>
            <View style={styles.imageContainer}>
                {image && <Image
                    source={{ uri: image }}
                    style={{ width: 300, height: 300 }}
                />}
                <TouchableOpacity style={styles.uploadButton} onPress={UploadMedia} >
                    <Text style={styles.buttonText}>Upload Image</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

export default UploadMediaFile;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center'
    },
    selectButton: {
        borderRadius: 5,
        width: 200,
        height: 50,
        backgroundColor: 'blue',
        alignItems: 'center',
        justifyContent: 'center',

    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 18,
    },

    uploadButton: {
        borderRadius: 5,
        width: 200,
        height: 50,
        backgroundColor: 'red',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
    },
    imageContainer: {
        marginTop: 30,
        marginBottom: 50,
        alignItems: 'center'
    }
});
