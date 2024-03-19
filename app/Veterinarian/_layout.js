import { View, Text } from "react-native";
import React from "react";
import { Tabs } from "expo-router";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const _layout = () => {

  return (

    <Tabs
      initialRouteName="Calendar"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color }) => {
          let iconName;
          if (route.name === "VetCalendar") {
            iconName = "calendar-month";
          } else if (route.name === "MarkSlots") {
            iconName = "calendar-plus";
          }
          return <Icon name={iconName} size={25} color={color} />;
        },
      })}
    >
      <Tabs.Screen name="VetCalendar" options={{title: " VetCalendar"}} />
      <Tabs.Screen name="MarkSlots" options={{title: "Mark Availability"}} />
    </Tabs>
  );
};

export default _layout;
