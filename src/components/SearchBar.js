import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text } from 'react-native';

const SearchBar = () => {
  const [searchText, setSearchText] = useState('');

  const handleSearch = () => {
    // Implement your search logic here
    console.log('Searching for:', searchText);
  };

  return (
    <View className="flex flex-row items-center bg-gray-200 p-2 rounded-lg">
      <TextInput
        style={{ flex: 1, height: 40, paddingHorizontal: 10 }}
        placeholder="Search..."
        value={searchText}
        onChangeText={setSearchText}
      />
      <TouchableOpacity onPress={handleSearch}>
        <Text className="text-blue-500 ml-2">Search</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SearchBar;
