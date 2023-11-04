import React from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import Button from '../components/Button';

import AsyncStorage from '@react-native-async-storage/async-storage';

import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';

export default function Timer() { 

    /* Define a state for the timer */
    const [ timerRunning, setTimerRunning ] = React.useState(false);

    /* Define a state for timing breaks */
    const [ breakRunning, setBreakRunning ] = React.useState(false);

    /* Define a counter variable */
    const [ timerCounter, setTimerCounter ] = React.useState(0);
    const [ breakTimerCounter, setBreakTimerCounter ] = React.useState(0);

    /* Define hour, minute and second states for the timer */
    const [ hours, setHours ] = React.useState(0);
    const [ minutes, setMinutes ] = React.useState(0);
    const [ seconds, setSeconds ] = React.useState(0);

    /* Define hour, minute and second states for the break timer */
    const [ breakHours, setBreakHours ] = React.useState(0);
    const [ breakMinutes, setBreakMinutes ] = React.useState(0);
    const [ breakSeconds, setBreakSeconds ] = React.useState(0);

    /* Define a state for fetching data */
    const [ fetchedData, setFetchedData ] = React.useState([]);

    /* Function to fetch data */
    const GetData = async () => {
        try {
            const jsonValue = await AsyncStorage.getItem('data');
            return jsonValue != null ? JSON.parse(jsonValue) : null;
        } catch (e) {
            console.log('error');
        }
    }

    /* Specify data to save data */
    const StoreData = async (value) => {
        try {
            const jsonValue = JSON.stringify(value);
            await AsyncStorage.setItem('data', jsonValue);
        } catch (e) { 
            console.log('error');
        }
    };

    /* Fetch data and set fetchedData to that data */
    const fetchOldData = () => {
        GetData()
            .then(res => setFetchedData(res))
    }

    /* Refresh Timer function */
    const RefreshTimer = () => {
        
        setTimerRunning(false);
        setBreakRunning(false);
        
        setTimerCounter(0);
        setBreakTimerCounter(0);

        setSeconds(0);
        setMinutes(0);
        setHours(0);

        setBreakSeconds(0);
        setBreakMinutes(0);
        setBreakHours(0);

    }

    /* End Session function */
    const EndSession = () => {
        const date = new Date()
        const data = {
            sessionEnded: date.toString(),
            
            counter_seconds: timerCounter,
            d_hours: hours,
            d_minutes: minutes,
            d_seconds: seconds,

            b_counter_seconds: breakTimerCounter,
            b_d_hours: breakHours, 
            b_d_minutes: breakMinutes,
            b_d_seconds: breakSeconds,

        }
        let array = fetchedData;

        /* Reset the Timers */

        setTimerRunning(false);
        setBreakRunning(false);
        
        setTimerCounter(0);
        setBreakTimerCounter(0);

        setSeconds(0);
        setMinutes(0);
        setHours(0);

        setBreakSeconds(0);
        setBreakMinutes(0);
        setBreakHours(0);

        if (Array.isArray(array)) {
            array.push(data);
        } else {
            array = []
            array.push(data);
        }
        console.log(array);
        StoreData(array);

        return array;
    }

    /* Define a function for the functioning of the timer */
    React.useEffect(() => {
        fetchOldData();
        if (timerRunning == true) {
            if (breakRunning === false) {
                setTimeout(() => {
                    setTimerCounter(timerCounter+1)

                    let s = (timerCounter%60);
                    let m = ((timerCounter-(timerCounter%60))/60)%60;
                    let h = ((m-(m%60))/60);

                    setSeconds(s);
                    setMinutes(m);
                    setHours(h);
                }, 1000)
            } else if (breakRunning == true) {
                setTimeout(() => {
                    setBreakTimerCounter(breakTimerCounter+1)

                    let s = (breakTimerCounter%60);
                    let m = ((breakTimerCounter-(breakTimerCounter%60))/60)%60;
                    let h = ((m-(m%60))/60);

                    setBreakSeconds(s);
                    setBreakMinutes(m);
                    setBreakHours(h);
                }, 1000)
            }
        }
    }, [timerCounter, timerRunning, breakTimerCounter, breakRunning])

    return (
        <View style={styles.container}>
            <Text style={styles.timerBreak}>
                <Text>{breakHours}</Text>
                <Text>h </Text>
                <Text>{breakMinutes}</Text>
                <Text>m </Text>
                <Text>{breakSeconds}</Text>
                <Text>s</Text>
            </Text>
            <Text style={styles.timerMain}>
                <Text>{hours}</Text>
                <Text>h </Text>
                <Text>{minutes}</Text>
                <Text>m </Text>
                <Text>{seconds}</Text>
                <Text>s</Text>
            </Text>

            <View style={styles.buttonContainer}>
                <Button backgroundColor="#1f1f1f" onPress={() => Alert.alert('Confirm', 'Are you sure you want to end the session?', [{text:'Confirm', onPress: () => EndSession()}], { cancelable: true })}><MaterialIcons name="stop" color="white" size={24} /></Button>
                <Button backgroundColor="#1f1f1f" onPress={() => Alert.alert('Confirm', 'Are you sure you want to refresh the timer?', [{text:'Confirm', onPress: () => RefreshTimer()}], { cancelable: true })}><MaterialIcons name='refresh' color='white' size={24} /></Button>
                <Button backgroundColor="#EA3546" onPress={() => {setBreakRunning(!breakRunning)}}>{breakRunning === true ? <MaterialCommunityIcons name="timer-sand-full" color="white" size={24} /> : <MaterialCommunityIcons name="timer-sand-empty" color="white" size={24} />}</Button>
                <Button backgroundColor="#2659ff" onPress={() => setTimerRunning(!timerRunning)}>{timerRunning === true ? <MaterialCommunityIcons name="timer" color="white" size={24} /> : <MaterialIcons name="timer" color="white" size={24} />}</Button>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
        alignItems: 'center',
        justifyContent: 'center',
    },
    timerMain: {
        fontSize: 48,
        color: 'white',
    },
    timerBreak: {
        fontSize: 24,
        color: 'white',
        opacity: 0.5,
    },
    buttonContainer: {
        display: 'flex',
        flexDirection: 'row',
    }
})