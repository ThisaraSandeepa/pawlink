import { Link } from 'expo-router';
import { View, Image } from 'react-native';

export default function index() {
  return (
    <View className = "items-center flex-1 mt-16">
      <Image source={require("../assets/images/pawlink.png")} className = "scale-75 "/>
      <Link href="./User/SignIn" className ="bg-blue-700 rounded-lg text-white p-2 scale-150 font-medium"> Get Started </Link>
    </View> 
  );
}