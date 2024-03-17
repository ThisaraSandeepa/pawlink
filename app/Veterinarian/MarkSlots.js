import React, { useState } from 'react';
import { View, Text, Button, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

const MarkSlots = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [timeSlots, setTimeSlots] = useState([]);
  const [showDatePicker, setShowDatePicker] = useState(false);

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

  const handleSetTimeSlot = (time) => {
    const selectedDateTime = new Date(selectedDate);
    selectedDateTime.setHours(time.getHours());
    selectedDateTime.setMinutes(time.getMinutes());
    console.log('Selected Date:', selectedDateTime.toDateString());
    console.log('Selected Time:', selectedDateTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
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
