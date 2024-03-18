import React, { useState, useEffect } from "react";
import { View, Text, FlatList } from "react-native";
import { ref as dbRef, onValue, off } from "firebase/database";
import { FIREBASE_REALTIME_DB, FIREBASE_AUTH } from "../../FirebaseConfig";

const dbRealtime = FIREBASE_REALTIME_DB;

const VetCalendar = () => {
  const [bookedSlots, setBookedSlots] = useState([]);
  const currentUserId = FIREBASE_AUTH.currentUser.uid;

  useEffect(() => {
    const slotsRef = dbRef(dbRealtime, "BookedSlots");
    const slotsListener = onValue(
      slotsRef,
      (snapshot) => {
        const slotsData = snapshot.val();
        if (slotsData) {
          const slotsArray = Object.entries(slotsData).flatMap(([key, value]) => {
            if (key === currentUserId) {
              return Object.values(value);
            } else {
              return [];
            }
          });
          setBookedSlots(slotsArray);
        } else {
          setBookedSlots([]);
        }
      },
      (error) => {
        console.error("Failed to fetch booked slots:", error);
      }
    );

    return () => {
      off(slotsRef, "value", slotsListener);
    };
  }, [currentUserId]);

  return (
    <View className="flex-1">
      <FlatList
        data={bookedSlots}
        keyExtractor={(item) => Object.keys(item)[0]} // Use the unique key of the booked slot
        renderItem={({ item }) => {
          const key = Object.keys(item)[0];
          const slot = item[key];
          return (
            <View
              style={{
                borderWidth: 1,
                borderColor: "gray",
                padding: 10,
                marginBottom: 10,
              }}
            >
              <Text>Date: {slot.date}</Text>
              <Text>Time: {slot.time}</Text>
              <Text>User: {slot.user}</Text>
              <Text>Veterinarian: {slot.veterinarian}</Text>
            </View>
          );
        }}
      />
    </View>
  );
};

export default VetCalendar;
