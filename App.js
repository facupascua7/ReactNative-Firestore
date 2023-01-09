import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Home from './screens/Home';
import TeamInfo from './screens/TeamInfo';
import CreateTeam from './screens/CreateTeam';

const Stack = createStackNavigator();

function MyStack () {
  return (
    <Stack.Navigator>
      <Stack.Screen name='Home' component={Home}/>
      <Stack.Screen name='CreateTeam' component={CreateTeam}/>
      <Stack.Screen name='TeamInfo' component={TeamInfo}/>
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <MyStack />
    </NavigationContainer>
  );
}