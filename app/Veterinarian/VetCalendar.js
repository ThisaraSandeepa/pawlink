import React from 'react';
import { View } from 'react-native';
import { Agenda } from 'react-native-calendars';

const VetCalendar = () => {

  return (
    <View className = "flex-1">
      <Agenda/>
    </View>
  );
};

export default VetCalendar;
