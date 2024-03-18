import React from "react";
import { StyleSheet, View, Image, Text, ScrollView, TouchableOpacity } from "react-native";
import { Link } from "expo-router";
import { useRoute, useNavigation } from "@react-navigation/native";

export default function AdoptionDetail() {
  const route = useRoute();
  const { post } = route.params;

  const navigation = useNavigation();

  const goToIdentifier = () => {
    navigation.navigate("components/Identifier", { post });
  };

  return (
    <ScrollView>
      <View className="flex-1 items-center justify-center ">
        <Image
          source={require("../../assets/images/pawlink1.png")}
          style={styles.logo}
        />

        <Image source={{ uri: post.image }} style={styles.additionalImage} />

        <View style={styles.buttonContainer}>
          <Text style={styles.Texts}>
            Do you want to have veterinarian assistance before adopting
            procedure?
          </Text>

          <Link
            href={"../components/Vetenarian"}
            className="bg-blue-700 py-3 rounded-lg px-10 mt-5 mb-3"
          >
            <Text style={styles.buttonText}>Yes I need</Text>
          </Link>
          <TouchableOpacity className="bg-red-700 py-3 rounded-lg px-10 mt-5 mb-3" onPress={goToIdentifier}>
            <Text style={styles.buttonText}>No I don't</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    width: 116,
    height: 96,
    top: 0,
    resizeMode: "contain",
    marginBottom: 10,
  },

  additionalImage: {
    flex: 1,
    width: 307,
    height: 273,
    resizeMode: "cover",
    borderRadius: 10,
  },
  Texts: {
    fontSize: 16,
    color: "black",
    textAlign: "center",
    marginBottom: 10,
    fontWeight: "bold",
    marginTop: 20,
  },

  buttonContainer: {
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
    padding: 10,
    borderColor: "#888",
    shadowColor: "#000",
    width: 362,
    height: 386,
    backgroundColor: "white",
    marginTop: 15,
    borderRadius: 10,
    elevation: 4,
  },
  button1: {
    width: 193,
    height: 47,
    borderRadius: 10,
    backgroundColor: "blue",
    justifyContent: "center",
    alignItems: "center",
    top: 40,
  },
  button2: {
    width: 193,
    height: 47,
    borderRadius: 10,
    backgroundColor: "red",
    justifyContent: "center",
    alignItems: "center",
    top: 80,
  },
  buttonText: {
    color: "white",
    textAlign: "center",
    fontSize: 15,
    fontWeight: "bold",
  },
});
