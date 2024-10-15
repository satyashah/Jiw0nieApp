import AppleHealthKit, {
    HealthInputOptions,
    HealthValue
} from 'react-native-health';
import { useEffect, useState } from 'react';
import { Platform } from 'react-native';

import useHealthPermissions from './useHealthPermissions';

const useActivityMetrics = (date: Date) => {
    const hasPermissions = useHealthPermissions();

    const [hrv, setHrv] = useState(0);

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

            // unit: 'bpm', // optional; default 'bpm'

            /* startDate is required in options for sleep */
            startDate: new Date(date.setHours(0, 0, 0, 0)).toISOString(), // Beginning of the day

            // endDate: new Date().toISOString(), // optional; default now
            endDate: new Date(date.setHours(23, 59, 59, 999)).toISOString(), // End of day

            // ascending: false, // optional; default false

        };

        AppleHealthKit.getHeartRateVariabilitySamples(options, (err, results) => {
            if (err) {
                console.log('Error getting the hrv');
                return;
            }
            console.log("hrv: " + results)

            // String(sample.value) === 'INBED');
            // console.log('InBed Data:', hrvData);

            // setHrv(results.value);

            let hrvVal = 0;

            let count = results.length;

            const totalHrv = results.reduce((sum: number, cur) => {
                const startDate = new Date(cur.startDate).getTime();
                const endDate = new Date(cur.endDate).getTime();
                return sum + cur.value
            }, 0);

            let averageHrv = 0;
            if (count > 0)
                averageHrv = Math.round(totalHrv / count * 1000)
            else averageHrv = 0;

            setHrv(averageHrv);

            // results.forEach(sample => {
            //     console.log(`hrv-val: ${sample.value}`);
            //     hrvVal = sample.value;
            // });

        });


    }, [hasPermissions, date]);

    return {
        hrv,
    };
};

export default useActivityMetrics;
