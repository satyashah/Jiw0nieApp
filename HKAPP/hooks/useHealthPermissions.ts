import AppleHealthKit, {
    HealthKitPermissions,
} from 'react-native-health';
import { useEffect, useState } from 'react';
import { Platform } from 'react-native';

import {
    initialize,
    requestPermission,
    readRecords,
} from 'react-native-health-connect';

const permissions: HealthKitPermissions = {
    permissions: {
        read: [
            AppleHealthKit.Constants.Permissions.Steps,
            AppleHealthKit.Constants.Permissions.FlightsClimbed,
            AppleHealthKit.Constants.Permissions.DistanceWalkingRunning,
            AppleHealthKit.Constants.Permissions.SleepAnalysis,
            AppleHealthKit.Constants.Permissions.HeartRate,
            AppleHealthKit.Constants.Permissions.HeartRateVariability,
        ],
        write: [],
    },
};

const useHealthPermissions = () => {
    const [hasPermissions, setHasPermissions] = useState(false);

    useEffect(() => {
        const requestPermissions = async () => {
            if (Platform.OS !== 'ios') {
                return;
            }
            // if (Platform.OS === 'ios') {
            AppleHealthKit.isAvailable((err, isAvailable) => {
                if (err || !isAvailable) {
                    console.log('Apple Health not available or error checking availability');
                    return;
                }
                AppleHealthKit.initHealthKit(permissions, (err) => {
                    if (err) {
                        console.log('Error getting permissions');
                        return;
                    }
                    setHasPermissions(true);
                });
            });
            // } else return;
            /**
            else if (Platform.OS === 'android') {
                const isInitialized = await initialize();
                if (isInitialized) {
                    await requestPermission([
                        { accessType: 'read', recordType: 'Steps' },
                        { accessType: 'read', recordType: 'Distance' },
                        { accessType: 'read', recordType: 'FloorsClimbed' },
                        { accessType: 'read', recordType: 'SleepSession' },
                    ]);
                    setHasPermissions(true);
                }
            }
            */
        };
        requestPermissions();
    }, []);

    return hasPermissions;
};

export default useHealthPermissions;