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
  query,
} from "firebase/database";
import { FIREBASE_REALTIME_DB, FIREBASE_AUTH } from "../../FirebaseConfig";

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

  const cancelMeetingAndDeletePost = (postId, item) => {
    const postRef = dbRef(dbRealtime, `strayPosts/${postId}`);
    const randomKey = item.randomKey;
    const slotsRef = ref(
      dbRealtime,
      `BookedSlots/${item.VeterinarianId}/${item.UserId}`
    );

    // Create a query to find the node with the specific randomKey
    const q = query(slotsRef, orderByChild("randomKey"), equalTo(randomKey));

    // Display confirmation alert
    Alert.alert(
      "Confirm",
      "Are you sure you want to complete this meeting and delete the post?",
      [
        {
          text: "Confirm",
          onPress: () => {
            // Delete the post and cancel the meeting
            remove(postRef)
              .then(() => {
                console.log("Post deleted successfully");

                // Check if the meeting exists
                onValue(q, (snapshot) => {
                  if (snapshot.exists()) {
                    snapshot.forEach((childSnapshot) => {
                      const nodeName = childSnapshot.key;

                      // Remove the node with the specified node
                      remove(
                        ref(
                          dbRealtime,
                          `BookedSlots/${item.VeterinarianId}/${item.UserId}/${nodeName}`
                        )
                      )
                        .then(() => {
                          console.log("Meeting cancelled successfully");
                        })
                        .catch((error) => {
                          console.error("Error cancelling meeting:", error);
                        });
                    });
                  } else {
                    console.log(
                      "Node with randomKey '" + randomKey + "' not found."
                    );
                  }
                });
              })
              .catch((error) => {
                console.error("Error deleting post:", error);
              });
          },
        },
        {
          text: "Cancel",
        },
      ],
      { cancelable: false }
    );
  };

  const cancelMeeting = (item) => {
    const randomKey = item.randomKey;
    const slotsRef = ref(
      dbRealtime,
      `BookedSlots/${item.VeterinarianId}/${item.UserId}`
    );

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
                  remove(
                    ref(
                      dbRealtime,
                      `BookedSlots/${item.VeterinarianId}/${item.UserId}/${nodeName}`
                    )
                  )
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
    <View className="flex-1 bg-white">
      <FlatList
        data={filteredSlots}
        keyExtractor={(item) => item.time}
        renderItem={({ item, index }) => (
          <View
            className="border border-gray-400 rounded-md p-3 mb-2 bg-white  mt-2 mr-3 ml-3  "
            key={index}
          >
            <Text className=" text-md font-medium">Date: {item.date}</Text>
            <Text className="font-medium mb-2 ">Time: {item.time}</Text>
            <Text className="font-medium  ">User: {item.user}</Text>
            <Text className="font-medium ">
              Veterinarian: {item.veterinarian}
            </Text>

            <View className="flex-row gap-6">
              {/* Delete the adoption post */}
              <TouchableOpacity
                onPress={() => cancelMeetingAndDeletePost(item.postId, item)}
              >
                <Text className="text-white font-semibold mt-2 py-2 rounded-lg px-2 bg-blue-800 text-xs">
                  Completed
                </Text>
              </TouchableOpacity>

              {/* Cancel the meeting */}
              <TouchableOpacity onPress={() => cancelMeeting(item)}>
                <Text className="text-white font-semibold mt-2  py-2 rounded-lg px-4 bg-red-800 text-xs">
                  {" "}
                  Cancel{" "}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
};

export default VetCalendar;
