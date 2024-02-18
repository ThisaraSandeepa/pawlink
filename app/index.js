import { Link } from 'expo-router';
import { View, Image } from 'react-native';

const logoImage = require("../assets/images/pawlink1.png")

export default function index() {
  return (
    <View className = "items-center">
      <Image source={logoImage} className = "scale-50"/>
      <Link href="./User/SignIn" className ="bg-blue-700 rounded text-white p-2"> Get Started </Link>
    </View> 
  );
}

