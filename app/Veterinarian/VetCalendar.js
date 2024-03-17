import React from 'react';
import { View, Text } from 'react-native';
import { Agenda } from 'react-native-calendars';

const VetCalendar = () => {

  // Get today's date
  const today = new Date().toISOString().split('T')[0];

  return (
    <View style={{ height: 500 }}>
      <Agenda/>
    </View>
  );
};

export default VetCalendar;
