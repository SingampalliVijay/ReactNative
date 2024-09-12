import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useDispatch, useSelector } from 'react-redux'
import { Decrement, Increment, Reset } from './CounterAction'

const Counter = () => {
    const count = useSelector((state: any) => state.counter);
    const dispatch = useDispatch()

    return (
        <SafeAreaView style={styles.safearea}>
            <Text style={styles.container}>Counter</Text>
            <View style={styles.view}>
                <Text style={styles.circle}>{count}</Text>
                <View style={styles.viewContainer}>
                    <TouchableOpacity onPress={() => dispatch(Increment())} style={styles.button}>
                        <Text style={styles.textContainer}>Increment</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => dispatch(Decrement())} style={styles.button}>
                        <Text style={styles.textContainer}>Decrement</Text>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity onPress={() => dispatch(Reset())} style={styles.button}>
                    <Text style={styles.textContainer}>Reset</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

export default Counter

const styles = StyleSheet.create({

    safearea: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    container: {
        fontSize: 30,
        fontWeight: '900'
    },
    view: {
        margin: 'auto',
        marginTop: '50%',
        paddingTop: 30,
        justifyContent: 'center',
        alignItems: 'center'
    },
    viewContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    button: {
        backgroundColor: '#FF7777',
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: 'black',
        borderRadius: 7,
        borderWidth: 1,
        width: '30%',
        padding: 10,
        margin: 30,
    },
    circle: {
        width: '30%',
        borderWidth: 1,
        color: 'black',
        padding: 10,
        fontSize: 20,
        borderRadius: 30,
        backgroundColor: '#FFA823',
        marginBottom: 10
    },
    textContainer: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'black'
    }

})