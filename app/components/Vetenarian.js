import React, { useState, useEffect } from 'react';
import { View, Text, FlatList } from 'react-native';
import { getDatabase, ref as dbRef, onValue, off } from 'firebase/database';
import { FIREBASE_REALTIME_DB } from "../../FirebaseConfig";

const dbRealtime = FIREBASE_REALTIME_DB;

const Veterinarian = () => {
  const [availableSlots, setAvailableSlots] = useState([]);

  // Fetch available slots from Firebase Realtime Database
  useEffect(() => {
    const slotsRef = dbRef(dbRealtime, 'AvailableSlots');
    const slotsListener = onValue(slotsRef, (snapshot) => {
      const slotsData = snapshot.val();
      if (slotsData) {
        const slotsArray = Object.values(slotsData).flatMap(Object.values); // Flatten the array
        setAvailableSlots(slotsArray);
      } else {
        setAvailableSlots([]);
      }
    });

    return () => {
      off(slotsRef, 'value', slotsListener);
    };
  }, []);

  return (
    <View>
      <Text>Available Slots</Text>
      <FlatList
        data={availableSlots}
        keyExtractor={(item, index) => index.toString()} // Use a unique key
        renderItem={({ item }) => (
          <View style={{ borderWidth: 1, borderColor: 'gray', padding: 10, marginBottom: 10 }}>
            <Text>Date: {item.date}</Text>
            <Text>Time: {item.time}</Text>
            <Text>Veterinarian: {item.VeterinarianName}</Text>
          </View>
        )}
      />
    </View>
  );
};

export default Veterinarian;
