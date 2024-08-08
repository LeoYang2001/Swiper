import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Welcome from './screens/Welcome';
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack';
import Main from './screens/Main';

export default function App() {

  const Stack = createStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator 
         initialRouteName="Welcome">
            <Stack.Screen name="Welcome" options={{headerShown: false}} component={Welcome}/>
            <Stack.Screen name="Main" options={{headerShown: false, animationEnabled: false}} component={Main}/>
        </Stack.Navigator>
    </NavigationContainer>
  );
}

