/*import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, Alert, Image } from "react-native";
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
});*/
import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, Alert, Image, TextInput, ScrollView } from "react-native";
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import { getStorage, ref, uploadBytes } from "firebase/storage";
import { FIREBASE_APP } from '../../FirebaseConfig';

const dbStorage = getStorage(FIREBASE_APP);

const UploadMediaFile = () => {
    const [image, setImage] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [contactInfo, setContactInfo] = useState("");
    const [location, setLocation] = useState("");
    const [age, setAge] = useState("");
    const [color, setColor] = useState("");
    const [description, setDescription] = useState("");
    const [automaticAgePrediction, setAutomaticAgePrediction] = useState(false);

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

    const UploadMedia = async () => {
        setUploading(true);

        try {
            const { uri } = await FileSystem.getInfoAsync(image);
            const blob = await FileSystem.readAsStringAsync(uri, { encoding: FileSystem.EncodingType.Base64 });

            const filename = image.substring(image.lastIndexOf('/') + 1);
            const storageRef = ref(dbStorage, filename);

            // Access contactInfo, location, color, description, and automaticAgePrediction and include them in the database/storage upload process

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
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Contact Info"
                    onChangeText={(text) => setContactInfo(text)}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Location"
                    onChangeText={(text) => setLocation(text)}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Age"
                    onChangeText={(text) => setAge(text)}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Color"
                    onChangeText={(text) => setColor(text)}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Description"
                    onChangeText={(text) => setDescription(text)}
                />
                
                <TouchableOpacity style={styles.selectButton} onPress={pickImage}>
                    <Text style={styles.buttonText}>Pick an image</Text>
                </TouchableOpacity>
                <View style={styles.imageContainer}>
                    {image && <Image
                        source={{ uri: image }}
                        style={{ width: 300, height: 300 }}
                    />}
                    <TouchableOpacity style={styles.uploadButton} onPress={UploadMedia}>
                        <Text style={styles.buttonText}>Upload Image</Text>
                    </TouchableOpacity>
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
        paddingBottom: 20, // Adjust as needed
    },
    input: {
        height: 40,
        width: 300,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
        paddingLeft: 10,
    },
    checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    checkboxLabel: {
        marginLeft: 8,
        fontSize: 16,
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
        alignItems: 'center',
    },
});

export default UploadMediaFile;


