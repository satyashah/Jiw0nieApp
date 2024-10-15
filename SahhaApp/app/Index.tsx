import React from 'react';
import { StatusBar } from 'react-native';
import { createNavigationContainerRef, NavigationContainer } from '@react-navigation/native';
import {
    NativeStackNavigationOptions,
    createNativeStackNavigator,
} from '@react-navigation/native-stack';

import Index from './Index';

import Sahha, { SahhaEnvironment, SahhaSensor } from 'sahha-react-native';

const Stack = createNativeStackNavigator();

const screenOptions: NativeStackNavigationOptions = {
    headerTitleAlign: 'center',
    headerBackTitleVisible: false,
}

const sahhaSettings = {
    environment: SahhaEnvironment.sandbox,

    // sensors: [SahhaSensor.pedometor] // not worki

    // sensors: null,

    sensors: [
        SahhaSensor.heart_rate_variability_rmssd,
        SahhaSensor.active_energy_burned,
        SahhaSensor.sleep,
    ],
}

function App(): JSX.Element {
    return (
        <NavigationContainer>
            <StatusBar barStyle={"dark-content"} />
            <Stack.Navigator screenOptions={screenOptions}>
                <Stack.Screen
                    name="Index"
                    component={Index}
                    options={{ headerShown: false }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default App;