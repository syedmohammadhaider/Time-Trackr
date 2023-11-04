import { TouchableOpacity, Text, StyleSheet } from 'react-native';

export default function Button(props) {
    return ( 
        <TouchableOpacity style={[styles.container, { backgroundColor: props.backgroundColor }]} onPress={props.onPress}>
            <Text style={styles.text}>{props.children}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        marginTop: 30,
        marginHorizontal: 10,
        paddingHorizontal: 10,
        paddingVertical: 10,
        borderRadius: 100,
    },
    text: {
        color: 'white',
        fontSize: 24,
    }
})