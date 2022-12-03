import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, ScrollView, TouchableOpacity, TextInput } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Gyroscope } from "expo-sensors";

import RNFetchBlob from 'react-native-fetch-blob';

const values = [
  ['build', '2017-11-05T05:40:35.515Z'],
  ['deploy', '2017-11-05T05:42:04.810Z']
];

// construct csvString
const headerString = 'event,timestamp\n';
const rowString = values.map(d => `${d[0]},${d[1]}\n`).join('');
const csvString = `${headerString}${rowString}`;

console.log(csvString);
// write the current list of answers to a local csv file
const pathToWrite = `${RNFetchBlob.fs.dirs.DocumentDir}/data.csv`;
console.log('pathToWrite', pathToWrite);
// pathToWrite /storage/emulated/0/Download/data.csv
RNFetchBlob.fs
  .writeFile(pathToWrite, csvString, 'utf8')
  .then(() => {
    console.log(`wrote file ${pathToWrite}`);
    // wrote file /storage/emulated/0/Download/data.csv
  })
  .catch(error => console.error(error));


 /*
import ReactNativeForegroundService from '@supersami/rn-foreground-service';
import RNLocation from 'react-native-location';

RNLocation.configure({
  distanceFilter: 100, // Meters
  desiredAccuracy: {
    ios: 'best',
    android: 'balancedPowerAccuracy',
  },
  // Android only
  androidProvider: 'auto',
  interval: 5000, // Milliseconds
  fastestInterval: 10000, // Milliseconds
  maxWaitTime: 5000, // Milliseconds
  // iOS Only
  activityType: 'other',
  allowsBackgroundLocationUpdates: false,
  headingFilter: 1, // Degrees
  headingOrientation: 'portrait',
  pausesLocationUpdatesAutomatically: false,
  showsBackgroundLocationIndicator: false,
});
let locationSubscription = null;
let locationTimeout = null;

ReactNativeForegroundService.add_task(
  () => {
    RNLocation.requestPermission({
      ios: 'whenInUse',
      android: {
        detail: 'fine',
      },
    }).then((granted) => {
      console.log('Location Permissions: ', granted);
      // if has permissions try to obtain location with RN location
      if (granted) {
        locationSubscription && locationSubscription();
        locationSubscription = RNLocation.subscribeToLocationUpdates(
          ([locations]) => {
            locationSubscription();
            locationTimeout && clearTimeout(locationTimeout);
            console.log(locations);
          },
        );
      } else {
        locationSubscription && locationSubscription();
        locationTimeout && clearTimeout(locationTimeout);
        console.log('no permissions to obtain location');
      }
    });
  },
  {
    delay: 1000,
    onLoop: true,
    taskId: 'taskid',
    onError: (e) => console.log('Error logging:', e),
  },
);
*/



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
          defaultValue="You can type me!"
        />
      </View>
    </View>
  );
}

function InformationScreen() {
  return (
    <View>
      <Text> dfkkjkj</Text>
    </View>
  );
}

const Tab = createBottomTabNavigator();

export default function App() {
  const [data, setData] = useState({
    x: 0,
    y: 0,
    z: 0,
  });

  const _gyroscope = () => {
    Gyroscope.setUpdateInterval(100);
    Gyroscope.addListener(setData);
  };  

  useEffect(() => {
    _gyroscope();    
  });


  const { x, y, z } = data;

  //_gyroscope();

  const RecordingScreen = () => {
    //_gyroscope();
    //console.log(data);
    return (
      <View style={styles.container}>
      <Text style={styles.text}>Gyroscope:</Text>
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
