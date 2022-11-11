import { Text, View, StyleSheet, ScrollView, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { NavigationContainer} from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Gyroscope } from 'expo-sensors';

var setData;

const gyroscope = () => {
  Gyroscope.setUpdateInterval(100);
  Gyroscope.addListener(setData)
}

function UploadScreen() {
  return (
    <View>
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Home! dsfsdd</Text>
    </View>
    <View style={{ padding: 50 }}></View>
    <View style={{ paddingLeft: 10, paddingRight: 10 }}>
      <TextInput
        style={{
          height: 40,
          borderColor: 'gray',
          borderWidth: 2,
        }}
        defaultValue="You can type  me"
      />
    </View>
    </View>
  );
}

function RecordingScreen() { 
  gyroscope;
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Gyro: {setData}</Text>
    </View>
  );
}

function InformationScreen() {
  return (
    <View>
    <Text> dfkjdsf
    </Text>
    </View>
  )
}

const Tab = createBottomTabNavigator();


export default function App(){
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            if (route.name === 'Upload') {
              return (
                <Ionicons
                  name={ focused
                      ? 'ios-cloud-upload'
                      : 'ios-cloud-upload-outline'
                  }
                  size={size}
                  color={color}
                />
              );
            } else if (route.name === 'Recording') {
              return (
                <Ionicons
                  name={focused ? 'ios-navigate' : 'ios-navigate-outline'}
                  size={size}
                  color={color}
                />
              );
            } else if (route.name == 'Information') {
              return (
                <Ionicons
                  name={focused      
                    ? 'ios-information-circle'
                    : 'ios-information-circle-outline'}
                  size={size}
                  color={color}
                />
              );
            }
          },
          tabBarInactiveTintColor: 'gray',
          tabBarActiveTintColor: 'tomato',
        })}
        >
        <Tab.Screen name="Upload" component={UploadScreen} />
        <Tab.Screen name="Recording" component={RecordingScreen} />
        <Tab.Screen name="Information" component={InformationScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

