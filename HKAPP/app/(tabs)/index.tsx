
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import Value from '../../components/Value';
import RingProgress from '../../components/RingProgress';
import { useState } from 'react';
import useActivityMetrics from '../../hooks/useActivityMetrics';
import useSleepMetrics from '../../hooks/useSleepMetrics';
import { AntDesign } from '@expo/vector-icons';

const STEPS_GOAL = 10_000;

const HomeScreen: React.FC = () => {

  const [date, setDate] = useState(new Date());
  const { steps, flights, distance } = useActivityMetrics(date);
  const { sleepHours, sleepMinutes, inBedHours, inBedMinutes, inBedDate } = useSleepMetrics(date);

  const changeDate = (numDays: any) => {
    const currentDate = new Date(date); //  copy  current date
    currentDate.setDate(currentDate.getDate() + numDays); // update the date ( + or - numDays) 
    setDate(currentDate);
  };

  return (

    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.container}>

        <View style={styles.datePicker}>
          <AntDesign
            onPress={() => changeDate(-1)} // move backward
            name="left"
            size={20}
            color="#597be3"
          />

          <Text style={styles.date}>{date.toDateString()}</Text>

          <AntDesign
            onPress={() => changeDate(1)} // forward
            name="right"
            size={20}
            color="#597be3"
          />
        </View>

        <RingProgress
          radius={100}
          strokeWidth={33}
          progress={steps / STEPS_GOAL}
        />

        <View style={styles.values}>
          <Value label="Steps" value={steps.toString()} />
          <Value label="Distance" value={`${(distance / 1000).toFixed(2)} km`} />
          <Value label="Flights Climbed" value={flights.toString()} />
          <Value label="Sleep " value={`${sleepHours.toString()} hrs ${sleepMinutes.toString()} min`} />
          <Value label="inBed Hours" value={`${inBedHours.toString()} hrs ${inBedMinutes.toString()} min`} />
          <Value label="inBed Date" value={`${inBedDate.toString()} `} />

        </View>

        <StatusBar style="auto" />
      </ScrollView>
    </View>
    // </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: 'black',
    justifyContent: 'center',
    padding: 12,
  },
  values: {
    flexDirection: 'row',
    gap: 25,
    flexWrap: 'wrap',
    marginTop: 100,
  },
  datePicker: {
    alignItems: 'center',
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  date: {
    color: 'white',
    fontWeight: '500',
    fontSize: 20,
    marginHorizontal: 40,
  },
});

export default HomeScreen;

