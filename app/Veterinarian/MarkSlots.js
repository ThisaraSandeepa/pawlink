import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Platform,
  Alert,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import {
  getDatabase,
  ref as dbRef,
  push,
  query,
  orderByChild,
  equalTo,
  get,
  remove,
} from "firebase/database";
import { FIREBASE_APP } from "../../FirebaseConfig"; // Adjust import as needed
import { FIREBASE_AUTH } from "../../FirebaseConfig"; // Adjust import as needed

const dbRealtime = getDatabase(FIREBASE_APP);

const MarkSlots = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [timeSlots, setTimeSlots] = useState([]);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [vetUID, setVetUID] = useState("");
  const [vetName, setVetName] = useState("");
  const [vetPhoto, setVetPhoto] = useState("");
  const [selectedSlots, setSelectedSlots] = useState([]);
  const [markedSlots, setMarkedSlots] = useState([]);

  // Fetch the Veterinarian data from the realtime Database
  const fetchVeterinarianData = async (uid) => {
    const databaseRef = dbRef(dbRealtime, `Veterinarians/${uid}`);
    const snapshot = await get(databaseRef);
    if (snapshot.exists()) {
      return snapshot.val();
    } else {
      console.log("No data found for veterinarian with the unique ID:", uid);
      return null;
    }
  };

  useEffect(() => {
    const user = FIREBASE_AUTH.currentUser;

    if (user) {
      setVetUID(user.uid);
      setVetName(user.displayName);
      setVetPhoto(user.photoURL);
      fetchMarkedSlots(user.uid);
    }
  }, []);

  useEffect(() => {
    generateTimeSlots(selectedDate);
    setSelectedSlots([]); // Reset selected slots when date changes
  }, [selectedDate]);

  const fetchMarkedSlots = async (uid) => {
    const databaseRef = dbRef(dbRealtime, `AvailableSlots/${uid}`);
    const snapshot = await get(databaseRef);
    if (snapshot.exists()) {
      const slots = Object.values(snapshot.val());
      setMarkedSlots(slots);
    }
  };

  const handleDateChange = (event, date) => {
    if (date) {
      setSelectedDate(date);
    }

    if (Platform.OS === "android") {
      setShowDatePicker(false); // Hide the date picker after a date is selected on Android
    }
  };

  const generateTimeSlots = (date) => {
    const hourSlots = [];
    const startHour = 9; // Start from 9 AM
    const endHour = 17; // End at 5 PM

    for (let hour = startHour; hour <= endHour; hour++) {
      const timeSlot = new Date(date);
      timeSlot.setHours(hour);
      timeSlot.setMinutes(0);
      hourSlots.push(timeSlot);
    }

    setTimeSlots(hourSlots);
  };

  const handleSetTimeSlot = async (time) => {
    const selectedDateTime = new Date(selectedDate);
    selectedDateTime.setHours(time.getHours());
    selectedDateTime.setMinutes(time.getMinutes());

    const formattedTime = selectedDateTime.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

    Alert.alert(
      "Confirm Availability",
      `Are you sure you want to mark ${selectedDateTime.toDateString()} at ${formattedTime} as available?`,
      [
        {
          text: "OK",
          onPress: async () => {
            try {
              const user = FIREBASE_AUTH.currentUser;
              const databaseRef = dbRef(
                dbRealtime,
                `AvailableSlots/${user.uid}`
              );
              const Vetdata = await fetchVeterinarianData(user.uid); // Fetch veterinarian data

              if (Vetdata) {
                await push(databaseRef, {
                  date: selectedDateTime.toDateString(),
                  time: formattedTime,
                  VeterinarianName: vetName,
                  VeterinarianUID: vetUID,
                  VeterinarianProfilePicture: vetPhoto,
                  VeterinarianLocation: Vetdata.location,
                  VeterinarianContact: Vetdata.phoneNumber,
                });

                console.log("Data saved successfully");
                setSelectedSlots([...selectedSlots, formattedTime]); // Add selected slot to state
                setMarkedSlots([
                  ...markedSlots,
                  {
                    date: selectedDateTime.toDateString(),
                    time: formattedTime,
                  },
                ]);
              } else {
                console.log("Error: Veterinarian data not found");
              }
            } catch (error) {
              console.error("Error saving data:", error);
            }
          },
        },
        {
          text: "Cancel",
        },
      ]
    );
  };

  const handleDeleteSlot = async (slot) => {
    // Get a confirmation from the user before deleting the slot
    Alert.alert(
      "Delete Slot",
      `Are you sure you want to delete ${slot.date} at ${slot.time}?`,
      [
        {
          text: "OK",
          onPress: async () => {
            try {
              const user = FIREBASE_AUTH.currentUser;
              const databaseRef = dbRef(
                dbRealtime,
                `AvailableSlots/${user.uid}`
              );
              const slotRef = query(
                databaseRef,
                orderByChild("time"),
                equalTo(slot.time)
              );
              const snapshot = await get(slotRef);
              if (snapshot.exists()) {
                const key = Object.keys(snapshot.val())[0];
                await remove(
                  dbRef(dbRealtime, `AvailableSlots/${user.uid}/${key}`)
                );
                setMarkedSlots(
                  markedSlots.filter(
                    (markedSlot) => markedSlot.time !== slot.time
                  )
                );
                console.log("Slot deleted successfully");
              }
            } catch (error) {
              console.error("Error deleting slot:", error);
            }
          },
        },
        {
          text: "Cancel",
        },
      ]
    );
  };

  return (
    <View className="flex-1 p-4 items-center justify-center bg-white">
      <ScrollView>
        <Image
          source={require("../../assets/images/time.jpg")}
          className="w-32 h-40 mb-2 rounded-lg ml-28 mt-1"
        />
        <Text className="text-lg font-semibold mb-4 mt-2 shadow-lg text-center">
          Select Available Meeting Times
        </Text>
        <TouchableOpacity
          onPress={() => setShowDatePicker(true)}
          className="bg-blue-800 rounded-lg py-2 px-2 mr-40 ml-20 left-10 items-center "
        >
          <Text className="text-md font-semibold text-white">Select Date</Text>
        </TouchableOpacity>
        <Text className="text-base my-4 font-bold mt-5 ">
          Selected Date: {selectedDate.toDateString()}
        </Text>
        {showDatePicker && (
          <DateTimePicker
            value={selectedDate}
            mode="date"
            display="default"
            onChange={handleDateChange}
          />
        )}
        <View className=" flex-row flex-wrap justify-center border border-gray-300 ">
          {timeSlots.map((time, index) => (
            <View key={index} className="m-3 ml-3 mr-3  ">
              <TouchableOpacity
                className={`p-2 rounded-md ${
                  selectedSlots.includes(
                    time.toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })
                  )
                    ? "bg-gray-300 cursor-not-allowed"
                    : "bg-blue-800  "
                }`}
                onPress={() => handleSetTimeSlot(time)}
                disabled={selectedSlots.includes(
                  time.toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })
                )}
              >
                <Text className=" text-base  text-white scale-90  font-semibold">
                  {time.toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
        <Text className="text-xl font-bold mt-4">Marked Slots</Text>
        {markedSlots.map((slot, index) => (
          <View key={index}>
            <View className="flex-row items-center mt-4 rounded-lg py-3 px-3 bg-slate-200 mr-2">
              <Text>
                {slot.date} at {slot.time}
              </Text>
            </View>
            <TouchableOpacity
              onPress={() => handleDeleteSlot(slot)}
              className = "absolute right-0 top-2"
            >
              <Text className="py-1 rounded-lg px-2 mr-4 mt-4 bg-red-800 text-xs text-white font-semibold">
                Delete
              </Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default MarkSlots;
