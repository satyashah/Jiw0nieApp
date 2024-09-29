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
            results.forEach(sample => {
                // startDate = new Date(sample.startDate).getTime();

                // const startDateTime = new Date(sample.startDate).getTime();
                // const endDateTime = new Date(sample.endDate).getTime();

                // console.log("start date ; ", sample.startDate);

                // const totalInbed = endDateTime - startDateTime; //  millisec

                // inbedHours = totalInbed / (1000 * 60 * 60); //  hours
                // inbedMins = (totalInbed % (1000 * 60 * 60)) / (1000 * 60); //  mins

                /* format date */
                // setInBedDate(new Date(sample.startDate).toLocaleString());
                // formattedDate = new Date(sample.startDate).toLocaleString(undefined, {
                //     month: 'numeric',
                //     day: 'numeric',
                //     hour: 'numeric',
                //     minute: 'numeric',
                //     hour12: true,
                // });
                // setInBedDate(formattedDate);

                console.log(`hrv-val: ${sample.value}`);
                hrvVal = sample.value;
                // setHrv(sample.value);

            });
            setHrv(hrvVal);

        });


    }, [hasPermissions, date]);

    return {
        hrv,
    };
};

export default useActivityMetrics;
