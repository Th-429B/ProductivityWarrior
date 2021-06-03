import React, {useState} from 'react';
import {
    View,
    TouchableOpacity,
    SafeAreaView,
    Platform,
    StatusBar,
    KeyboardAvoidingView,
    StyleSheet,
    TextInput,
    Keyboard, Modal
} from 'react-native';
import {Agenda} from 'react-native-calendars';
import {Card, Avatar, Text} from 'react-native-paper';
import eventData from "./eventData";
import AddEventModal from "./AddEventModal";

const timeToString = (time) => {
    const date = new Date(time);
    return date.toISOString().split('T')[0];
};

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

const paddingValue = Platform.OS === 'android' ? StatusBar.currentHeight : 0

const CalendarScreen = () => {

    const [date, setDate] = useState();
    const [event, setEvent] = useState();
    const [modalVisible, setModalVisibility] = useState(false);

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

    const rowHasChanged = (r1, r2) => {
        return r1.name !== r2.name;
    }

    //render the time if time is added as another text prop.
    const renderItem = (item) => {
        return (
            <TouchableOpacity style={{marginRight: 10, marginTop: 17}}>
                <Card>
                    <Card.Content>
                        <View
                            style={{
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                            }}>
                            <Text style = {{textTransform: 'capitalize',}}>
                                {item.name}
                            </Text>
                            <Avatar.Text labelStyle = {{textTransform: 'capitalize'}} label = {item.name.charAt(0)}/>
                        </View>
                    </Card.Content>
                </Card>
            </TouchableOpacity>
        );
    };

    return (
        <SafeAreaView style={{paddingTop: paddingValue, backgroundColor: 'white', flex:1}}>
            <Modal
                animationType="slide"
                visible={modalVisible}
                onRequestClose={() => {setModalVisibility(!modalVisible);}}
            >
                <AddEventModal/>
            </Modal>
            <View style={{flex: 1}}>
                {/* added the margin to fix last event not showing but calendar on tops kinda gets fked*/}
                <Agenda
                    selected={'2021-05-26'}
                    items = {eventData}
                    renderItem={renderItem}
                    rowHasChanged={(r1, r2) => {return r1.text !== r2.text}}
                    // onDayLongPress={(day) => setEvent(day, text)}
                    // onDayPress={(day) => {findDate(day.dateString)}}
                    //onDayLongPress={(day) => {console.log(day.dateString)}}
                    // onDayLongPress={(day) => {setDate(day.dateString)}}

                />
            </View>
            <TouchableOpacity style={styles.addButton} onPress={() => {setModalVisibility(!modalVisible)}}>
                <Text style={styles.addText}>+</Text>
            </TouchableOpacity>
        </SafeAreaView>
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
    addButton: {
        position:'absolute',
        width: 50,
        height: 50,
        borderRadius: 50,
        bottom:10,
        left:10,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        backgroundColor: '#FFF',
        borderColor: '#C0C0C0',
    },
    addText: {
        fontSize:18
    }
})


export default CalendarScreen;