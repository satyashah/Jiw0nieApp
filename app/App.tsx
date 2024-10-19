import React, { useEffect, useState } from 'react';
import { Text } from 'react-native';
import { Stack } from 'expo-router';

import Sahha, { SahhaEnvironment, SahhaSensor } from 'sahha-react-native';


const sahhaSettings = {
    environment: SahhaEnvironment.sandbox,

    // sensors: [SahhaSensor.pedometor] // not worki

    // sensors: null,

    sensors: [
        SahhaSensor.heart_rate_variability_rmssd,
        SahhaSensor.active_energy_burned,
        SahhaSensor.sleep,
        // SahhaSensor.
    ],
}

function App(): JSX.Element {

    const [sahhaConfigured, setSahhaConfigured] = useState(false);

    useEffect(() => {
        Sahha.configure(sahhaSettings, (error, success) => {
            console.log(`SahhaConfig success: ${success}`);
            setSahhaConfigured(success);

            if (error) {
                console.log(`SahhaConfig error: ${error} `);
            }
        });
    }, []);
    if (!sahhaConfigured) return <></>;

    return (
        <Stack>
            <Text>HEllO</Text>
        </Stack>
    );
}

export default App;