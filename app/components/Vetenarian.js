import React, { useState, useEffect } from "react";
import { View, Text, FlatList, TouchableOpacity, Alert,Image } from "react-native";
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
import * as Notifications from 'expo-notifications';

const dbRealtime = getDatabase(FIREBASE_APP);

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});


const Veterinarian = () => {// Defining the Veterinarian functional component
  const { post } = useRoute().params;
  const navigation = useNavigation();

  // Pass the post object to the AdoptMe component
  const goToScheduledMeeting = (post, slotData) => {
    navigation.navigate("components/ScheduledMeeting", { post, slotData });
  };

  const [availableSlots, setAvailableSlots] = useState([]);

  // Fetch available slots from Firebase Realtime Database
  useEffect(() => {
    const slotsRef = dbRef(dbRealtime, "AvailableSlots");// Creating a reference to the "AvailableSlots" node
    const slotsListener = onValue(slotsRef, (snapshot) => {// Listening for changes in the database
      const slotsData = snapshot.val(); // Extracting data from the snapshot
      if (slotsData) {
        const slotsArray = Object.values(slotsData).flatMap(Object.values);
        setAvailableSlots(slotsArray);// Updating state with available slots
      } else {
        setAvailableSlots([]);// If no slots available, setting state to empty array
      }
    });

    return () => {
      off(slotsRef, "value", slotsListener);// Cleanup function to remove the listener
    };
  }, []);

  // Handle booking a slot
  const handleSlotBooking = async (slot) => {
    // Generate a random 6-character key
    const randomKey = Math.random().toString(36).substring(2, 8);

    // Confirm booking slot
    Alert.alert(
      "Confirm Booking",
      `Do you want to book the slot with ${slot.VeterinarianName} on ${slot.date} at ${slot.time}?`,
      [
        {
          text: "Confirm",
          onPress: async () => {
            try {
              const user = FIREBASE_AUTH.currentUser;// Getting current user
              const vetUID = slot.VeterinarianUID;// Extracting veterinarian UID
              const bookedSlotRef = dbRef(// Creating a reference to booked slots
                dbRealtime,
                `BookedSlots/${vetUID}/${user.uid}`
              );
              // Create a new slot object
              const slotData = {
                date: slot.date,
                time: slot.time,
                veterinarian: slot.VeterinarianName,
                VeterinarianId: slot.VeterinarianUID,
                VeterinarianPhoto: slot.VeterinarianProfilePicture,
                VeterinarianLocation: slot.VeterinarianLocation,
                user: user.displayName,
                UserId: user.uid,
                postId: post.id,
                VeterinarianContact: slot.VeterinarianContact,
                randomKey: randomKey,
              };
              // Save the booked slot to the database
              await push(bookedSlotRef, slotData);
              // Removing the booked slot from available slots
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
                goToScheduledMeeting(post, slotData);

                 // Send push notification
                 sendPushNotification(slot.VeterinarianName);
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

  // Function to send Expo push notification
  const sendPushNotification = (vetName) => {
    Notifications.scheduleNotificationAsync({
      content: {
        title: 'Slot Booked Successfully!',
        body: `Your slot with ${vetName} has been booked successfully.`,
      },
      trigger: null,
    });
    console.log("Push notification sent successfully");
  };

  return (
    <View className=" flex-1 bg-gray-200 pt-10  ">
      <Text className=" text-lg font-bold  text-center text-blue-800 mt-2 mb-5 ">
        Available Slots
      </Text>
      <View className="flex items-center ">
          <Image
            source={require("../../assets/images/vet1.jpg")}
            className="justify-center w-40 h-40 rounded-lg mt-1"
          />
        </View>

      
      <FlatList
      
        data={availableSlots}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            className="bg-white  rounded-lg p-2 mb-4 border-blue-400 border shadow-md mr-3 ml-3  "
            onPress={() => handleSlotBooking(item)}
          >
            <Text className="font-normal  shadow-lg ">Date: {item.date}</Text>
            <Text className="font-semibold mb-2  text- mt-1 ">
              Veterinarian: {item.VeterinarianName}
            </Text>
            <Text className="font-semibold text-blue-950 ">
              Time: {item.time}
            </Text>
            <Text className="font-semibold">
              Location: {item.VeterinarianLocation}
            </Text>
            <Text className="font-semibold">
              Contact: {item.VeterinarianContact}
            </Text>
          </TouchableOpacity>

          
        )}
      />
    </View>
  );
};

export default Veterinarian;
