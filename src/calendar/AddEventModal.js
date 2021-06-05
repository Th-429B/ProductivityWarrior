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
import {AntDesign} from "@expo/vector-icons";

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

//passing the closeModal prop to AddEventModal
const AddEventModal = ({closeModal}) => {

    const [date, setDate] = useState();
    const [event, setEvent] = useState();

    const handleDate = () => {
        console.log(date);
    }
    const handleEvent = () => {
        console.log(event);
    }

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
            <TouchableOpacity style={styles.closeButton} onPress={() => closeModal()}>
                <AntDesign name="close" size={24} color={'black'}/>
            </TouchableOpacity>
            <View style={{alignSelf: "stretch", marginHorizontal: 32}}>
                <Text style={styles.title}>Add an Event</Text>

            <TextInput style={styles.input} placeholder={"YYYY-MM-DD"}
                       value={date} onChangeText={text => setDate(text)}/>
            <TextInput style={styles.input} placeholder={"Event!"}
                       value={event} onChangeText={text => setEvent(text)}/>

            <TouchableOpacity style={styles.add} onPress={() => {addEvent(); }}>
                <Text style={{color: "white", fontWeight: 'bold', fontSize: 18}}>Add!</Text>
            </TouchableOpacity>
            </View>

        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    writeEvent: {
        flex:1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 28,
        fontWeight: "bold",
        color:'black',
        alignSelf: "center",
        marginBottom: 16

    },
    input: {
        paddingHorizontal: 15,
        backgroundColor: '#FFF',
        borderRadius: 6,
        borderColor: 'blue',
        borderWidth: 1,
        height: 50,
        marginBottom: 15,
        fontSize: 18
    },
    add: {
        marginTop: 24,
        height: 50,
        borderRadius: 6,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "blue"
    },
    closeButton: {
        position:"absolute",
        top: 32,
        right: 32
    }
})

export default AddEventModal