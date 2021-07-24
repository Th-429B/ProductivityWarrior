import React, {useEffect, useState} from "react"
import {Text, View, StyleSheet, TouchableOpacity, LogBox, TextInput, Keyboard} from "react-native";
import * as Brightness from 'expo-brightness';



function ProductivityScreen() {

    // state for timer in seconds
    const [seconds, setSeconds] = useState(10);
    const [timerOn, setTimerOn] = useState(false);
    const [time, setTime] = useState(10);
    const [bright, setBright] = useState();

    useEffect(() => {
        if (seconds > 0 && timerOn) {
            setTimeout(() => setSeconds(seconds - 1), 1000);
        }
        if (seconds === 0) {
            Brightness.setBrightnessAsync(0.5)
            alert("done")
        }
    }, [seconds, timerOn]);

    useEffect(() => {
        (async () => {
            const { status } = await Brightness.requestPermissionsAsync();
            if (status === 'granted') {
                // console.log("Permission granted")
                const {brightness} = await Brightness.getBrightnessAsync();
                if (brightness <= 1) {
                    setBright(brightness)
                    // console.log(bright)
                }
            }
        })();
    }, []);

    useEffect(() => {
        (async () => {
            const {brightness} = await Brightness.getBrightnessAsync();
            console.log(brightness)
            // this is an attempt to get the original screen brightness
            if (brightness <= 1) {
                console.log("Brightness obtained")
                setBright(brightness)
                console.log(bright)
            }

        })();
    }, [bright]);

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

        if (!timerOn) {  // start the timer
            if (time == null) {  // check if start or pause [pause]
                setTimerOn(!timerOn);
                Brightness.setBrightnessAsync(0)
            } else {  // [start]
                setTimerOn(!timerOn);
                setSeconds(time);
                setTime(null);
                Keyboard.dismiss();
                Brightness.setBrightnessAsync(0)
            }

        } else {  // pause the timer
            setTimerOn(!timerOn);
            Brightness.setBrightnessAsync(0.5)
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