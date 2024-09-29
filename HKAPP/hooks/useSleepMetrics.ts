import AppleHealthKit, {
    HealthInputOptions,
    HealthValue
} from 'react-native-health';
import { useEffect, useState } from 'react';
import { Platform } from 'react-native';

import useHealthPermissions from './useHealthPermissions';

const useSleepMetrics = (date: Date) => {
    const hasPermissions = useHealthPermissions();

    // const [sleep, setSleep] = useState(0);
    const [sleepHours, setSleepHours] = useState(0);
    const [sleepMinutes, setSleepMinutes] = useState(0);

    const [inBedHours, setInBedHours] = useState(0);
    const [inBedMinutes, setInBedMinutes] = useState(0);

    const [inBedDate, setInBedDate] = useState("");

    // iOS (HealthKit)
    useEffect(() => {
        if (!hasPermissions || Platform.OS !== 'ios') {
            return;
        }

        const options: HealthInputOptions = {
            date: date.toISOString(),
            includeManuallyAdded: true, // 

            /* startDate is required in options for sleep */
            startDate: new Date(date.setHours(0, 0, 0, 0)).toISOString(), // Beginning of the day
            endDate: new Date(date.setHours(23, 59, 59, 999)).toISOString(), // End of day
        };

        AppleHealthKit.getSleepSamples(options, (err, results) => {
            if (err) {
                console.log('Error getting the sleep:', err);
                return;
            }
            console.log(results);
            // console.log(results.values);

            const totalSleep = results.reduce((sum: number, cur) => {
                const startDate = new Date(cur.startDate).getTime();
                const endDate = new Date(cur.endDate).getTime();
                return sum + (endDate - startDate);
            }, 0);

            const totalSleepInHours = totalSleep / (1000 * 60 * 60);  // millisec to hrs 
            const totalSleepInMinutes = (totalSleep % (1000 * 60 * 60)) / (1000 * 60);

            setSleepHours(Math.floor(totalSleepInHours));
            setSleepMinutes(Math.round(totalSleepInMinutes));

            /*
            results.forEach(sample => {
                // console.log(sample.value); 
                // if (String(sample.value) === "INBED") {
                if (sample.value as unknown as String === "INBED") {
                    console.log('test----INBED')
                }
            });
            */

            /**
             * INBED
             */
            const inBedData = results.filter(sample => String(sample.value) === 'INBED');
            console.log('InBed Data:', inBedData);

            let inbedHours = 0, inbedMins = 0;
            let startDate;
            let formattedDate = "";

            inBedData.forEach(sample => {
                // const startDate = new Date(sample.startDate).getTime();
                startDate = new Date(sample.startDate).getTime();

                const startDateTime = new Date(sample.startDate).getTime();
                const endDateTime = new Date(sample.endDate).getTime();

                console.log("start date ; ", sample.startDate);

                // setInBedDate(startDate as unknown as string);
                const totalInbed = endDateTime - startDateTime; //  millisec

                inbedHours = totalInbed / (1000 * 60 * 60); //  hours
                inbedMins = (totalInbed % (1000 * 60 * 60)) / (1000 * 60); //  mins

                /* format date */
                // setInBedDate(new Date(sample.startDate).toLocaleString());
                formattedDate = new Date(sample.startDate).toLocaleString(undefined, {
                    month: 'numeric',
                    day: 'numeric',
                    hour: 'numeric',
                    minute: 'numeric',
                    hour12: true,
                });
                // setInBedDate(formattedDate);

                console.log(`in-val: ${sample.value}`);
                console.log(`in-hours: ${inbedHours}`);
                console.log(`in-mins: (${inbedMins} minutes)`);

            });

            // setInBedHours(inbedHours);
            setInBedHours(Math.floor(inbedHours));
            setInBedMinutes(inbedMins);
            setInBedDate(formattedDate);

            // console.log(`Set inbed ::  ${inbedHours}`);
        });

    }, [hasPermissions, date]);

    return {
        // sleep,
        sleepHours,
        sleepMinutes,
        inBedHours,
        inBedMinutes,
        inBedDate,
    };
};

export default useSleepMetrics;
