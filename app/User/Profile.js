import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { getAuth } from 'firebase/auth';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { FIREBASE_APP } from '../../FirebaseConfig';
import { router } from 'expo-router';

const ProfileScreen = () => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const auth = getAuth(FIREBASE_APP);
      const db = getFirestore(FIREBASE_APP);

      const userId = auth.currentUser.uid;
      const userRef = doc(db, 'Users', userId);
      const userSnapshot = await getDoc(userRef);

      if (userSnapshot.exists()) {
        setUserData(userSnapshot.data());
      } else {
        console.log('User data not found');
      }
    } catch (error) {
      console.error('Error fetching user data:', error.message);
    }
  };

  const handleLogout = () => {
    Alert.alert(
      'Confirm Logout',
      'Are you sure you want to log out?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Yes', onPress: () => logout() },
      ]
    );
  };

  const logout = () => {
    router.replace("../User/SignIn")
  };

  return (
    <View style={styles.container}>
      <View style={styles.profileBox}>
        <Text style={styles.label}>Your Account Name:</Text>
        <Text style={styles.userData}>{userData?.firstName} {userData?.lastName}</Text>

        <Text style={styles.label}>Your Email:</Text>
        <Text style={styles.userData}>{userData?.email}</Text>

        <View style={styles.userTypeContainer}>
          <View style={styles.userTypeBox}>
            <Text style={styles.userType}>{userData?.UserType}</Text>
          </View>
        </View>
      </View>

      <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
        <Text style={styles.logoutButtonText}>Log Out</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#E0FFFF', // Light blue background color
  },
  profileBox: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
    width: '100%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
    color: '#333', // Dark gray text color
  },
  userData: {
    fontSize: 16,
    marginTop: 5,
    color: '#666', // Medium gray text color
  },
  userTypeContainer: {
    marginTop: 20,
  },
  userTypeBox: {
    backgroundColor: '#FFD700', // Gold color
    padding: 10,
    borderRadius: 5,
    marginTop: 5,
  },
  userType: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333', // Dark gray text color
  },
  logoutButton: {
    backgroundColor: '#FF6347',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    position: 'absolute',
    bottom: 20,
  },
  logoutButtonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default ProfileScreen;
