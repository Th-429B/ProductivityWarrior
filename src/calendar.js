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
    Keyboard
} from 'react-native';
import {Agenda} from 'react-native-calendars';
import {Card, Avatar, Text} from 'react-native-paper';

const timeToString = (time) => {
    const date = new Date(time);
    return date.toISOString().split('T')[0];
};

let x;
// function to check if the date already has an event.
const findDate = (date) => {
    for (x in items) {
        if ( x === date) {
            return true;
        }
    }
    return false;
}

// can add time here as another text. Sample json events
const items = {
    '2021-05-26': [{name: 'Family Dinner'}],
    '2021-05-27': [{name: 'React Native workshop'}],
    '2021-05-28': [],
    '2021-05-29': [{name: 'Sample event text'}, {name: 'More sample event text'}]
};

const paddingValue = Platform.OS === 'android' ? StatusBar.currentHeight : 0

const CalendarScreen = () => {

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
            items[date].push({name: event})
        } else {
            items[date] = [{name: event}]
        }
        Keyboard.dismiss();
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
            <View style={{flex: 1}}>
                <Agenda
                    items = {items}
                    renderItem={renderItem}
                    // onDayLongPress={(day) => setEvent(day, text)}
                    // onDayPress={(day) => {findDate(day.dateString)}}
                    //onDayLongPress={(day) => {console.log(day.dateString)}}
                    // onDayLongPress={(day) => {setDate(day.dateString)}}

                />
            </View>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={styles.writeEvent}>
                <TextInput style={styles.dateInput} placeholder={"YYYY-MM-DD"}
                           value={date} onChangeText={text => setDate(text)}/>
                <TextInput style={styles.eventInput} placeholder={"Event!"}
                           value={event} onChangeText={text => setEvent(text)}/>

                <TouchableOpacity onPress={() => {addEvent()}}>
                    <View style={styles.addButton}>
                        <Text style={styles.addText}>+</Text>
                    </View>
                </TouchableOpacity>

            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    writeEvent: {
        position: 'absolute',
        bottom: 10,
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
    },
    addButton: {
        width: 50,
        height: 50,
        backgroundColor: '#FFF',
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: '#C0C0C0',
        borderWidth: 1,
    }
})


export default CalendarScreen;