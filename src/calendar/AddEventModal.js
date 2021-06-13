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
import {AntDesign, Ionicons} from "@expo/vector-icons";
import {saveData} from "./eventData";
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from "moment";



//passing the closeModal prop to AddEventModal
const AddEventModal = ({closeModal, eventItems, setEventItems}) => {

// function to check if the date already has an event.
    const findDate = (date) => {
        let x;
        for (x in eventItems) {
            if (x === date) {
                return true;
            }
        }
        return false;
    }

    // states for adding events
    const [eventDate, setEventDate] = useState();
    const [event, setEvent] = useState();

    // states for datepicker
    const [show, setShow] = useState(false);
    const [date, setDate] = useState(new Date());


    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(Platform.OS === 'ios');
        setDate(currentDate);
        setEventDate(moment(currentDate).format("YYYY-MM-DD"));
    };

    const showDatepicker = () => {
        setShow(true)
    };

    const addEvent = () => {
        if (findDate(eventDate)) {
            eventItems[eventDate].push({name: event})
        } else {
            eventItems[eventDate] = [{name: event}]
        }
        setEventItems(eventItems)
        saveData(eventItems);
        setEventDate(null);
        setEvent(null);
        Keyboard.dismiss();
        alert('Event added!')

    }

    // const deleteAllEvents = () => {
    //     saveData({'2021-05-26': [{name: 'Family Dinner'}],
    //         '2021-05-27': [{name: 'React Native workshop'}]});
    //     console.log("all events deleted.. hopefully")
    // }

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.writeEvent}>
            <TouchableOpacity style={styles.closeButton} onPress={() => closeModal()}>
                <AntDesign name="close" size={24} color={'black'}/>
            </TouchableOpacity>
            {/*<TouchableOpacity style={styles.deleteAll} onPress={() => deleteAllEvents()}>*/}
            {/*    <Ionicons name="trash-bin-outline" size={24} color="red" />*/}
            {/*</TouchableOpacity>*/}
            <View style={{alignSelf: "stretch", marginHorizontal: 32}}>
                <Text style={styles.title}>Add an Event</Text>

                <TextInput style={styles.input} placeholder={"YYYY-MM-DD"}
                           value={eventDate} onChangeText={text => setEventDate(text)}/>
                <TextInput style={styles.input} placeholder={"Event!"}
                           value={event} onChangeText={text => setEvent(text)}/>
                <TouchableOpacity style={styles.add} onPress={showDatepicker}>
                    <Text style={{color: "white", fontWeight: 'bold', fontSize: 18}}>Pick a date!</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.add} onPress={() => {addEvent(); }}>
                    <Text style={{color: "white", fontWeight: 'bold', fontSize: 18}}>Add!</Text>
                </TouchableOpacity>
            </View>
            {show && (
                <DateTimePicker
                    value={date}
                    mode={'date'}
                    is24Hour={true}
                    display="default"
                    onChange={onChange}
                />
            )}

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
    },
    deleteAll: {
        position:"absolute",
        bottom: 32,
        right: 32
    }
})

export default AddEventModal