import React from 'react';
import { View, Text } from 'react-native';
import { Agenda } from 'react-native-calendars';

const VetCalendar = () => {
  // Get today's date
  const today = new Date().toISOString().split('T')[0];

  // Mock data: events for today
  const eventsForToday = [
    { name: 'Event 1', time: '10:00 AM' }, 
    { name: 'Event 2', time: '11:00 AM' },
    { name: 'Event 3', time: '12:00 PM' }
  ];

  return (
    <View style={{ height: 500 }}>
      <Agenda
        selectedDay={today}
        items={{
          [today]: eventsForToday,
        }}
        showOnlySelectedDayItems
        renderItem={(item) => (
          <View style={{ padding: 20 }}>
            <Text>{item.name} - {item.time}</Text>
          </View>
        )}
        renderEmptyDate={() => <View />}
      />
    </View>
  );
};

export default VetCalendar;
