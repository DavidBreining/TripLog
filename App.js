import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, ScrollView, TextInput } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Gyroscope } from "expo-sensors";

const gyroscope = () => {
  Gyroscope.setUpdateInterval(100);
  Gyroscope.addListener(setData);
};

function UploadScreen() {
  return (
    <View>
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Home! dsfsdd</Text>
      </View>
      <View style={{ padding: 50 }}></View>
      <View style={{ paddingLeft: 10, paddingRight: 10 }}>
        <TextInput
          style={{
            height: 40,
            borderColor: "gray",
            borderWidth: 2,
          }}
          defaultValue="You can type gjh me"
        />
      </View>
    </View>
  );
}

function InformationScreen() {
  return (
    <View>
      <Text> dfkjds kjkj</Text>
    </View>
  );
}

const Tab = createBottomTabNavigator();

export default function App() {
  const [{ x, y, z }, setData] = useState({
    x: 0,
    y: 0,
    z: 0,
  });

  function RecordingScreen() {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Gyro: {setData}</Text>
        <Text style={styles.text}>x: {x}</Text>
        <Text style={styles.text}>y: {y}</Text>
        <Text style={styles.text}>z: {z}</Text>
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            if (route.name === "Upload") {
              return (
                <Ionicons
                  name={
                    focused ? "ios-cloud-upload" : "ios-cloud-upload-outline"
                  }
                  size={size}
                  color={color}
                />
              );
            } else if (route.name === "Recording") {
              return (
                <Ionicons
                  name={focused ? "ios-navigate" : "ios-navigate-outline"}
                  size={size}
                  color={color}
                />
              );
            } else if (route.name == "Information") {
              return (
                <Ionicons
                  name={
                    focused
                      ? "ios-information-circle"
                      : "ios-information-circle-outline"
                  }
                  size={size}
                  color={color}
                />
              );
            }
          },
          tabBarInactiveTintColor: "gray",
          tabBarActiveTintColor: "tomato",
        })}
      >
        <Tab.Screen name="Upload" component={UploadScreen} />
        <Tab.Screen name="Recording" component={RecordingScreen} />
        <Tab.Screen name="Information" component={InformationScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

function round(n) {
  if (!n) {
    return 0;
  }
  return Math.floor(n * 100) / 100;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 10,
  },
  text: {
    textAlign: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    alignItems: "stretch",
    marginTop: 15,
  },
  button: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#eee",
    padding: 10,
  },
  middleButton: {
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: "#ccc",
  },
});
