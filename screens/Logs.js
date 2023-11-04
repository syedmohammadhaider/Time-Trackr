import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, ScrollView, Text, StyleSheet, Alert } from 'react-native';
import Log from '../components/LogCard';
import Button from '../components/Button';

import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';

export default function Logs() { 

    const [ data, setData ] = React.useState(null);

    const [ refreshToggle, setRefreshToggle ] = React.useState(false);


    const StoreData = async (value) => {
        try {
            const jsonValue = JSON.stringify(value);
            await AsyncStorage.setItem('data', jsonValue);
        } catch (e) { 
            console.log('error');
        }
    };

    const GetData = async () => {
        try {
            const jsonValue = await AsyncStorage.getItem('data');
            return jsonValue != null ? JSON.parse(jsonValue) : null;
        } catch (e) {
            console.log('error');
        }
    }

    React.useEffect(() => {
        GetData()
            .then(res => {
                let a = res.map(i => JSON.parse(JSON.stringify(i)))
                setData(a)
            })
    }, [refreshToggle])

    return (
        <View style={styles.container}>
            <ScrollView>
                <View style={styles.controlBar}>
                    <Button onPress={() => Alert.alert('Confirm', 'Are you sure you want to delete all stored data?', [{ text: 'Confirm', onPress: () => {StoreData([]); setRefreshToggle(!refreshToggle)}}], { cancelable: true })} backgroundColor='#EA3546'><MaterialIcons name="delete" color='white' size={24} /></Button>
                    <Button onPress={() => setRefreshToggle(!refreshToggle)} backgroundColor='#2659ff'><MaterialIcons name="refresh" color='white' size={24} /></Button>
                </View>
                { data != null ? data.map((index, d) => <Log key={d} workSeconds={index.counter_seconds} breakSeconds={index.b_counter_seconds} workTime={`${index.d_hours}h ${index.d_minutes}m ${index.d_seconds}s`} breakTime={`${index.b_d_hours}h ${index.b_d_minutes}m ${index.b_d_seconds}s`} date={index.sessionEnded}/>) : null }
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1, 
        backgroundColor: '#000',
    },
    textLight: {
        color: 'white',
    },
    controlBar: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
    }
})