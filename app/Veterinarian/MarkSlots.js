import React, { useState, useEffect } from 'react';
import { View, Text, Button, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { getDatabase, ref as dbRef, push, query, orderByChild, equalTo, get } from 'firebase/database';
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

  useEffect(() => {
    // Fetch veterinarian's UID from Firebase Authentication
    const user = FIREBASE_AUTH.currentUser;
    if (user) {
      setVetUID(user.uid);
      setVetName(user.displayName);
    }
  }, []);

  const handleDateChange = (event, date) => {
    if (date) {
      setSelectedDate(date);
      generateTimeSlots(date);
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
    console.log('Selected Date:', selectedDateTime.toDateString());
    console.log('Selected Time:', selectedDateTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));

    try {

      const user = FIREBASE_AUTH.currentUser;
      const databaseRef = dbRef(dbRealtime, `AvailableSlots/${user.uid}`);
      await push(databaseRef, {
        date: selectedDateTime.toDateString(),
        time: selectedDateTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        VeterinarianName: vetName
      });
      console.log('Data saved successfully');
    } catch (error) {
      console.error('Error saving data:', error);
    }
  };

  return (
    <View style={{ flex: 1, padding: 20, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 20 }}>Select Available Meeting Times</Text>
      <Button title="Select Date" onPress={() => setShowDatePicker(true)} />
      <Text style={{ fontSize: 16, marginVertical: 20 }}>Selected Date: {selectedDate.toDateString()}</Text>
      {showDatePicker && (
        <DateTimePicker
          value={selectedDate}
          mode="date"
          display="default"
          onChange={handleDateChange}
        />
      )}
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center' }}>
        {timeSlots.map((time, index) => (
          <View key={index} style={{ margin: 10 }}>
            <Button title={time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} onPress={() => handleSetTimeSlot(time)} />
          </View>
        ))}
      </View>
    </View>
  );
};

export default MarkSlots;
