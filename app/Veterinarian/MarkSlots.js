import React, { useState, useEffect } from 'react';
import { View, Text, Platform, Alert, TouchableOpacity } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { getDatabase, ref as dbRef, push, query, orderByChild, equalTo, get, remove } from 'firebase/database';
import { FIREBASE_APP } from '../../FirebaseConfig'; // Adjust import as needed
import { FIREBASE_AUTH } from '../../FirebaseConfig'; // Adjust import as needed

const dbRealtime = getDatabase(FIREBASE_APP);

const MarkSlots = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [timeSlots, setTimeSlots] = useState([]);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [vetUID, setVetUID] = useState('');
  const [vetSlots, setVetSlots] = useState([]);
  const [vetName, setVetName] = useState('');
  const [selectedSlots, setSelectedSlots] = useState([]);
  const [markedSlots, setMarkedSlots] = useState([]);

  useEffect(() => {
    // Fetch veterinarian's UID from Firebase Authentication
    const user = FIREBASE_AUTH.currentUser;
    if (user) {
      setVetUID(user.uid);
      setVetName(user.displayName);
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

    if (Platform.OS === 'android') {
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

    const formattedTime = selectedDateTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    Alert.alert(
      'Confirm Availability',
      `Are you sure you want to mark ${selectedDateTime.toDateString()} at ${formattedTime} as available?`,
      [
        {
          text: 'OK',
          onPress: async () => {
            try {
              const user = FIREBASE_AUTH.currentUser;
              const databaseRef = dbRef(dbRealtime, `AvailableSlots/${user.uid}`);
              await push(databaseRef, {
                date: selectedDateTime.toDateString(),
                time: formattedTime,
                VeterinarianName: vetName
              });
              console.log('Data saved successfully');
              setSelectedSlots([...selectedSlots, formattedTime]); // Add selected slot to state
              setMarkedSlots([...markedSlots, { date: selectedDateTime.toDateString(), time: formattedTime }]);
            } catch (error) {
              console.error('Error saving data:', error);
            }
          },
        },
        {
          text: 'Cancel'
        },
      ]
    );
  };

  const handleDeleteSlot = async (slot) => {
    // Get a confirmation from the user before deleting the slot
    Alert.alert(
      'Delete Slot',
      `Are you sure you want to delete ${slot.date} at ${slot.time}?`,
      [
        {
          text: 'OK',
          onPress: async () => {
            try {
              const user = FIREBASE_AUTH.currentUser;
              const databaseRef = dbRef(dbRealtime, `AvailableSlots/${user.uid}`);
              const slotRef = query(databaseRef, orderByChild('time'), equalTo(slot.time));
              const snapshot = await get(slotRef);
              if (snapshot.exists()) {
                const key = Object.keys(snapshot.val())[0];
                await remove(dbRef(dbRealtime, `AvailableSlots/${user.uid}/${key}`));
                setMarkedSlots(markedSlots.filter((markedSlot) => markedSlot.time !== slot.time));
                console.log('Slot deleted successfully');
              }
            } catch (error) {
              console.error('Error deleting slot:', error);
            }
          }
        },
        {
          text: 'Cancel'
        },
      ]
    );  
  }
  
  return (
    <View className="flex-1 p-4 items-center justify-center">
      <Text className="text-2xl font-bold mb-4">Select Available Meeting Times</Text>
      <TouchableOpacity onPress={() => setShowDatePicker(true)} className="bg-blue-800 rounded-lg py-2 px-8">
        <Text className="text-lg text-white">Select Date</Text>
      </TouchableOpacity>
      <Text className="text-lg my-4">Selected Date: {selectedDate.toDateString()}</Text>
      {showDatePicker && (
        <DateTimePicker
          value={selectedDate}
          mode="date"
          display="default"
          onChange={handleDateChange}
        />
      )}
      <View className="flex-row flex-wrap justify-center">
        {timeSlots.map((time, index) => (
          <View key={index} className="m-2">
            <TouchableOpacity
              className={`p-2 rounded-md ${selectedSlots.includes(time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })) ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-500'}`}
              onPress={() => handleSetTimeSlot(time)}
              disabled={selectedSlots.includes(time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }))}
            >
              <Text className="text-lg text-white scale-90">{time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>
      <Text className="text-2xl font-bold mt-4">Marked Slots</Text>
      {markedSlots.map((slot, index) => (
        <View key={index} className="flex-row items-center mt-2">
          <Text>{slot.date} at {slot.time}</Text>  
          <TouchableOpacity onPress={() => handleDeleteSlot(slot)}>
            <Text style={{ color: 'red', marginLeft: 10 }}>Delete</Text>
          </TouchableOpacity>
        </View>
      ))}
    </View>
  );
};

export default MarkSlots;
