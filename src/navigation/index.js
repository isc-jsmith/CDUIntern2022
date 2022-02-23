import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ScanScreen from '../screens/scanScreen';
import ObservationEntry from '../screens/observationEntry';
import VitalSignInput from '../screens/vitalSignInput';
import ObsnConfirmation from '../screens/observationConfirmation';

const Stack = createNativeStackNavigator();

const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="Scan" component={ScanScreen} />
        <Stack.Screen name="VitalSign" component={VitalSignInput} />
        <Stack.Screen name="ObsnConfirmation" component={ObsnConfirmation} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;