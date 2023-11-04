import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function Log(props) {

    const [ date, setDate ] = React.useState(new Date());
    const [ displayDate, setDisplayDate ] = React.useState('');

    React.useEffect(() => {

        const months = [ 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec' ]

        setDate(props.date);

        let d = new Date(date);
        let d_DateString = `${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()} ${d.getHours()}:${d.getMinutes()}`;

        setDisplayDate(d_DateString);

        console.log(d_DateString)

    }, [])

    return (
        <View style={styles.container}>
            <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                <MaterialCommunityIcons name="clock" size={24} color={'#2659ff'} />
                <Text style={[styles.textLight, styles.textBold, { color: '#2659ff', marginLeft: 7, }]}>Work</Text>
            </View>
            <Text style={[styles.textLight, styles.time]}>{props.workTime}</Text>
            <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                <MaterialCommunityIcons name="timer-sand-full" size={24} color={'#EA3546'} />
                <Text style={[styles.textLight, styles.textBold, { color: '#EA3546', marginLeft: 7, }]}>Break</Text>
            </View>
            <Text style={[styles.textLight, styles.time]}>{props.breakTime}</Text>
            <View style={{height: 25, flexDirection: 'row', marginVertical: 10, }}>
                <View style={{ backgroundColor: '#2659ff', flex: props.workSeconds, borderTopLeftRadius: 20, borderBottomLeftRadius: 20 }} />
                <View style={{ backgroundColor: '#EA3546', flex: props.breakSeconds, borderTopRightRadius: 20, borderBottomRightRadius: 20 }} />
            </View>
            <Text style={[styles.textLight]}>{displayDate}</Text>
        </View>
    )
}

const styles = StyleSheet.create({ 
    container: {
       backgroundColor: '#1e1e1e',
        padding: 20,
        margin: 10,
        borderRadius: 8,
    },
    textLight: {
        color: 'white',
    },
    time: {
        fontSize: 24,
    },
    textBold: {
        fontWeight: 'bold',
        fontSize: 24,
    }
})