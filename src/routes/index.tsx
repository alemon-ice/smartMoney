import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { Main, NewEntry, Report, Welcome, Loading } from '../pages';

const Stack = createStackNavigator();

const Routes: React.FC = () => (
  <Stack.Navigator
    initialRouteName="Loading"
    screenOptions={{ headerShown: false }}
  >
    <Stack.Screen name="Main" component={Main} />
    <Stack.Screen name="NewEntry" component={NewEntry} />
    <Stack.Screen name="Report" component={Report} />
    <Stack.Screen name="Welcome" component={Welcome} />
    <Stack.Screen name="Loading" component={Loading} />
  </Stack.Navigator>
);

export default Routes;
