import React, { useState, useEffect } from "react";
import { View, Text, FlatList, TouchableOpacity, Alert } from "react-native";
import {
  ref,
  ref as dbRef,
  onValue,
  off,
  remove,
  orderByChild,
  equalTo,
  get, 
  query
} from "firebase/database";
import { FIREBASE_REALTIME_DB, FIREBASE_AUTH } from "../../FirebaseConfig";
import { connectFirestoreEmulator } from "firebase/firestore";

const dbRealtime = FIREBASE_REALTIME_DB;

const VetCalendar = () => {
  const [bookedSlots, setBookedSlots] = useState([]);
  const currentUserDisplayName = FIREBASE_AUTH.currentUser.displayName;

  useEffect(() => {
    const slotsRef = dbRef(dbRealtime, "BookedSlots");
    const slotsListener = onValue(
      slotsRef,
      (snapshot) => {
        const slotsData = snapshot.val();
        if (slotsData) {
          const slotsArray = Object.values(slotsData).flatMap((nestedSlots) =>
            Object.values(nestedSlots).flatMap((slot) => Object.values(slot))
          );
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
  }, []);

  const filteredSlots = bookedSlots.filter(
    (slot) => slot.veterinarian === currentUserDisplayName
  );

  const deletePost = (postId) => {
    const postRef = dbRef(dbRealtime, `strayPosts/${postId}`);
    remove(postRef)
      .then(() => {
        console.log("Post deleted successfully");
      })
      .catch((error) => {
        console.error("Error deleting post:", error);
      });
  };

  const cancelMeeting = (item) => {
    const randomKey = item.randomKey;
    const slotsRef = ref(dbRealtime, `BookedSlots/${item.VeterinarianId}/${item.UserId}`);
  
    // Create a query to find the node with the specific randomKey
    const q = query(slotsRef, orderByChild("randomKey"), equalTo(randomKey));
  
    onValue(q, (snapshot) => {
      if (snapshot.exists()) {
        snapshot.forEach((childSnapshot) => {
          const nodeName = childSnapshot.key;
  
          // Display confirmation alert
          Alert.alert(
            "Confirm Cancel",
            `Are you sure you want to cancel the meeting on ${item.date} at ${item.time}?`,
            [
              {
                text: "Confirm",
                onPress: () => {
                  // Remove the node with the specified node
                  remove(ref(dbRealtime, `BookedSlots/${item.VeterinarianId}/${item.UserId}/${nodeName}`))
                    .then(() => {
                      console.log("Meeting cancelled successfully");
                    })
                    .catch((error) => {
                      console.error("Error cancelling meeting:", error);
                    });
                },
              },
              {
                text: "Cancel",
              },
            ],
            { cancelable: false }
          );
        });
      } else {
        console.log("Node with randomKey '" + randomKey + "' not found.");
      }
    });
  };
  
  
  return (
    <View className="flex-1">
      <FlatList
        data={filteredSlots}
        keyExtractor={(item) => item.time}
        renderItem={({ item, index }) => (
          <View
            key={index}
            style={{
              borderWidth: 1,
              borderColor: "gray",
              padding: 10,
              marginBottom: 10,
            }}
          >
            <Text>Date: {item.date}</Text>
            <Text>Time: {item.time}</Text>
            <Text>User: {item.user}</Text>
            <Text>Veterinarian: {item.veterinarian}</Text>

            <View className="flex-row gap-6">
              {/* Delete the adoption post */}
              <TouchableOpacity onPress={() => deletePost(item.postId)}>
                <Text className="text-blue-600"> Completed </Text>
              </TouchableOpacity>

              {/* Cancel the meeting */}
              <TouchableOpacity onPress={() => cancelMeeting(item)}>
                <Text className="text-red-600"> Cancel </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
};

export default VetCalendar;
