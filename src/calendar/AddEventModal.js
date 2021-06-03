import React, {useState} from "react"
import {
    Keyboard,
    KeyboardAvoidingView,
    Platform,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from "react-native";
import eventData from "./eventData";

let x;
// function to check if the date already has an event.
const findDate = (date) => {
    for (x in eventData) {
        if ( x === date) {
            return true;
        }
    }
    return false;
}

const AddEventModal = () => {

    const [date, setDate] = useState();
    const [event, setEvent] = useState();

    const addEvent = () => {
        if (findDate(date)) {
            eventData[date].push({name: event})
        } else {
            eventData[date] = [{name: event}]
        }
        Keyboard.dismiss();
    }

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.writeEvent}>
            <TextInput style={styles.dateInput} placeholder={"YYYY-MM-DD"}
                       value={date} onChangeText={text => setDate(text)}/>
            <TextInput style={styles.eventInput} placeholder={"Event!"}
                       value={event} onChangeText={text => setEvent(text)}/>
            <TouchableOpacity onPress={() => {addEvent(); }}>
                <View style={styles.addButton}>
                    <Text style={styles.addText}>+</Text>
                </View>
            </TouchableOpacity>


        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    writeEvent: {
        flex:1,
        position: 'absolute',
        bottom: 0,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        backgroundColor: '#f3f4f6'

    },
    dateInput: {
        paddingVertical: 15,
        paddingHorizontal: 15,
        backgroundColor: '#FFF',
        borderRadius: 50,
        borderColor: '#C0C0C0',
        borderWidth: 1,
        height: 50,
        width: 130,
    },
    eventInput: {
        paddingVertical: 15,
        paddingHorizontal: 15,
        backgroundColor: '#FFF',
        borderRadius: 50,
        borderColor: '#C0C0C0',
        borderWidth: 1,
        width: 200,
        height: 50,
    }
})

export default AddEventModal