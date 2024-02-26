import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native';
import { Link } from 'expo-router';

export default function UserProfile() {
    return (
        <View style={styles.container}>
        
            {/* Profile Content */}
            <View style={styles.profileContainer}>
            <Image source={require("../../assets/images/Vet.jpg")} style={styles.profilePicture}></Image>
             </View>

                {/* User Information */}
                <View style={styles.userInfo}>
                    <Text style={styles.userName}>Jessica Athens</Text>
                    <Text style={styles.identifierText}>Veterinarian</Text>
                    <Text style={styles.Contact}>Contact Information</Text>
                </View>
                <View style={styles.rectangle1}></View>
                <View style={styles.rectangle2}></View>

                <Text style={styles.location}>Meeting Time</Text>
                <View style={styles.rectangle3}></View>

                <Text style={styles.location2}>Meeting Location</Text>
                <View style={styles.rectangle4}></View>
                
            {/* Call to Action Button */}
             
            <View>
            <TouchableOpacity style={styles.ctaButton}>
            <Link href={'../Adoption/LandingPage'}>
                <Text style={styles.ctaLabel}>Confirm and Return To Main Menu</Text>
                </Link>
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
        backgroundColor: '#F5F5F5', 
    },
 
    profileContainer: {
        position: 'relative',
        marginTop:20,
        width: 370,
        height: 800,
        borderRadius: 20,
        backgroundColor: '#FFFFFF',
        marginBottom: 20,
        shadowColor: '#000000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    profilePicture: {
        borderRadius: 10,
        backgroundColor: '#E5E5E5',
        height:62,
        width:63,
        top:250,
        left:30
    },
    userInfo: {
        position: 'absolute',
        bottom: 20,
        left: 20,
    },
    userName: {
        fontWeight: 'bold',
        fontSize: 18,
        color: '#1D1D28',
        marginBottom: 10,
        top:-500,
        left:120
    },
  
    identifierText: {
        fontWeight: 'bold',
        fontSize: 14,
        color: '#A4A4B2',
        top:-502,
        left:120
    },
    Contact: {
        fontWeight: 'bold',
        fontSize: 16,
        color: '#1D1D28',
        top:-440,
        left:110
    },

    ctaButton: {
        top:-310,
        width: 230,
        height: 40,
        backgroundColor: '#004AAD',
        borderRadius: 10,
        paddingHorizontal:20
    },
    ctaLabel: {
        fontWeight: 'bold',
        fontSize: 14,
        color: 'white',
        textAlign: 'center',
        lineHeight: 40,
        right:10,


    },
    rectangle1: {
        width: 265,
        height: 30,
        borderRadius: 10,
        backgroundColor: 'gray',
        marginTop: 15,
        shadowColor: '#000',
        top:-420,
       
    },
    rectangle2: {
        width: 265,
        height: 30,
        borderRadius: 10,
        backgroundColor: 'gray',
        marginTop: 20,
        shadowColor: '#000',
        top:-415,
       
    },
    location: {
        fontWeight: 'bold',
        fontSize: 16,
        color: '#1D1D28',
        top:-380,
        left:0
    },
    rectangle3: {
        width: 265,
        height: 30,
        borderRadius: 10,
        backgroundColor: 'gray',
        marginTop: 20,
        shadowColor: '#000',
        top:-380,
       
    },
    location2: {
        fontWeight: 'bold',
        fontSize: 16,
        color: '#1D1D28',
        top:-358,
        left:0
    },
    rectangle4: {
        width: 265,
        height: 30,
        borderRadius: 10,
        backgroundColor: 'gray',
        marginTop: 20,
        shadowColor: '#000',
        top:-358,
       
    },
});