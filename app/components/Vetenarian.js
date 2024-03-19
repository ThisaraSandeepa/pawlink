import React, { useState, useEffect } from "react";
import { View, Text, FlatList, TouchableOpacity, Alert } from "react-native";
import {
  getDatabase,
  ref as dbRef,
  onValue,
  off,
  push,
  remove,
  query,
  orderByChild,
  equalTo,
  get,
} from "firebase/database";
import { FIREBASE_APP } from "../../FirebaseConfig";
import { FIREBASE_AUTH } from "../../FirebaseConfig";
import { useRoute } from "@react-navigation/native";
import { useNavigation } from "expo-router";

const dbRealtime = getDatabase(FIREBASE_APP);

const Veterinarian = () => {
  const { post } = useRoute().params;
  const navigation = useNavigation();

  // Pass the post object to the AdoptMe component
  const goToScheduledMeeting = (post,slotData) => {
    navigation.navigate("components/ScheduledMeeting", { post,slotData });
  };

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
    // Generate a random 6-character key
    const randomKey = Math.random().toString(36).substring(2, 8);

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
                VeterinarianId: slot.VeterinarianUID,
                VeterinarianLocation: slot.VeterinarianLocation,
                user: user.displayName,
                UserId: user.uid,
                postId: post.id,
                VeterinarianContact: slot.VeterinarianContact,
                randomKey: randomKey,
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
                Alert.alert("Success", "Slot booked successfully!");
                goToScheduledMeeting(post,slotData);
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
            <Text>Contact: {item.VeterinarianContact}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default Veterinarian;
