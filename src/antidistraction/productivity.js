import React, {useEffect, useState} from "react"
import {Text, View, StyleSheet, TouchableOpacity, LogBox, TextInput, Keyboard} from "react-native";
import AppLoading from "expo-app-loading";


function ProductivityScreen() {

    // state for timer in seconds
    const [seconds, setSeconds] = useState(10);
    const [timerOn, setTimerOn] = useState(false);
    const [time, setTime] = useState(10);

    useEffect(() => {
        if (seconds > 0 && timerOn) {
            setTimeout(() => setSeconds(seconds - 1), 1000);
        }
        if (seconds === 0) {
            alert("done")
        }
    }, [seconds, timerOn]);

    const reset = () => {
        setSeconds(10);
    }

    const clock = () => {
        let hours = Math.floor(seconds / 60 / 60)
        let mins = Math.floor((seconds / 60) % 60)
        let second = Math.floor(seconds % 60)
        let displayHours = hours < 10 ? `0${hours}` : hours
        let displayMins = mins < 10 ? `0${mins}` : mins
        let displaySecs = second < 10 ? `0${seconds}` : second
        return {
            displayHours,
            displayMins,
            displaySecs,
        }
    }

    const startTime = () => {
        if (!timerOn) {
            if (time == null) {
                setTimerOn(!timerOn);
            } else {
                setTimerOn(!timerOn);
                setSeconds(time);
                setTime(null);
                Keyboard.dismiss();
            }

        } else {
            setTimerOn(!timerOn);
        }

    }

    return (
        <View style={styles.container}>
            <Text style={styles.time}>
                {clock().displayHours} : {clock().displayMins} : {clock().displaySecs}
            </Text>
            <TouchableOpacity style={styles.button} onPress={() => startTime()}>
                <Text>Start/Stop</Text>
            </TouchableOpacity>
            <TextInput style={styles.input} placeholder={"input time in seconds"}
                       keyboardType="number-pad"
                       onChangeText={text => setTime(text)}/>
        </View>
    );

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f2f4f5'
    },
    button: {
        marginTop: 24,
        height: 50,
        borderRadius: 6,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "grey",
        width: 100,
    },
    time: {
        fontSize: 50,
    },
    input: {
        marginTop: 24,
        height: 50,
        borderRadius: 6,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "grey",
        width: 100,
        textAlign: 'center',
    }
})
export default ProductivityScreen