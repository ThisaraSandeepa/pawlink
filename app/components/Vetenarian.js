import React, { useState, useEffect } from "react";
import { View, Text, FlatList, TouchableOpacity, Alert } from "react-native";
import {getDatabase,ref as dbRef,onValue,off,push,remove,query,orderByChild,equalTo,get} from "firebase/database";
import { FIREBASE_APP } from "../../FirebaseConfig";
import { FIREBASE_AUTH } from "../../FirebaseConfig";

// Firebase database instance
const dbRealtime = getDatabase(FIREBASE_APP);

// Veterinarian component
const Veterinarian = () => {
  // State variable to store available slots
  const [availableSlots, setAvailableSlots] = useState([]);

  // Fetch available slots from Firebase Realtime Database
  useEffect(() => {
    const slotsRef = dbRef(dbRealtime, "AvailableSlots");
    const slotsListener = onValue(slotsRef, (snapshot) => {
      const slotsData = snapshot.val();
      if (slotsData) {
        const slotsArray = Object.values(slotsData).flatMap(Object.values);
        setAvailableSlots(slotsArray);
      } else {
        setAvailableSlots([]);
      }
    });

    return () => {
      off(slotsRef, "value", slotsListener);
    };
  }, []);

  // Handle booking a slot
  const handleSlotBooking = async (slot) => {

    Alert.alert(
      "Confirm Booking",
      `Do you want to book the slot with ${slot.VeterinarianName} on ${slot.date} at ${slot.time}?`,
      [
        {
          text: "Confirm",
          onPress: async () => {
            try {
              const user = FIREBASE_AUTH.currentUser;
              const vetUID = slot.VeterinarianUID;
              const bookedSlotRef = dbRef(
                dbRealtime,
                `BookedSlots/${vetUID}/${user.uid}`
              );
              const slotData = {
                date: slot.date,
                time: slot.time,
                veterinarian: slot.VeterinarianName,
                user: user.displayName,
              };
              await push(bookedSlotRef, slotData);

              const slotsRef = dbRef(dbRealtime, `AvailableSlots/${vetUID}`);
              const slotRef = query(
                slotsRef,
                orderByChild("time"),
                equalTo(slot.time)
              );
              const snapshot = await get(slotRef);
              if (snapshot.exists()) {
                const key = Object.keys(snapshot.val())[0];
                await remove(
                  dbRef(dbRealtime, `AvailableSlots/${vetUID}/${key}`)
                );
                setAvailableSlots(
                  availableSlots.filter(
                    (availableSlot) => availableSlot.time !== slot.time
                  )
                );
                console.log("Slot booked successfully");
              }

            } catch (error) {
              console.error("Error booking slot:", error);
              Alert.alert("Error", "Failed to book slot. Please try again.");
            }
          },
        },
        {
          text: "Cancel",
        },
      ],
      { cancelable: false }
    );
  };

  return (
    <View>
      <Text>Available Slots</Text>
      <FlatList
        data={availableSlots}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => handleSlotBooking(item)}
            style={{
              borderWidth: 1,
              borderColor: "gray",
              padding: 10,
              marginBottom: 10,
            }}
          >
            <Text>Date: {item.date}</Text>
            <Text>Time: {item.time}</Text>
            <Text>Veterinarian: {item.VeterinarianName}</Text>
            <Text>Location: {item.VeterinarianLocation}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default Veterinarian;
