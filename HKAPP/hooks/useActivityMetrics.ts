import AppleHealthKit, {
    HealthInputOptions,
    HealthValue
} from 'react-native-health';
import { useEffect, useState } from 'react';
import { Platform } from 'react-native';

import useHealthPermissions from './useHealthPermissions';

const useActivityMetrics = (date: Date) => {
    const hasPermissions = useHealthPermissions();

    const [steps, setSteps] = useState(0);
    const [flights, setFlights] = useState(0);
    const [distance, setDistance] = useState(0);

    useEffect(() => {
        if (!hasPermissions || Platform.OS !== 'ios') {
            return;
        }

    }, []);

    useEffect(() => {
        if (!hasPermissions) {
            return;
        }

        const options: HealthInputOptions = {
            date: date.toISOString(),
            includeManuallyAdded: true, // 
        };

        AppleHealthKit.getStepCount(options, (err, results) => {
            if (err) {
                console.log('Error getting the steps');
                return;
            }
            setSteps(results.value);
        });

        AppleHealthKit.getFlightsClimbed(options, (err, results) => {
            if (err) {
                console.log('Error getting the flights:', err);
                return;
            }
            setFlights(results.value);
        });

        AppleHealthKit.getDistanceWalkingRunning(options, (err, results) => {
            if (err) {
                console.log('Error getting the distance:', err);
                return;
            }
            setDistance(results.value);
        });

    }, [hasPermissions, date]);

    return {
        steps,
        flights,
        distance,
    };
};

export default useActivityMetrics;
