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
import {AntDesign} from "@expo/vector-icons";

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

const deleteEvent = (name) => {
    // console.log(name)
    let date;
    let index = -1;
    let count;
    for (date in eventData) {
        count = 0;
        if (index > 0) {
            break;
        }
        eventData[date].forEach(function (event) {
            if(event.name === name) {
                index = count;
                eventData[date].splice(index, 1)
                return;
            }
            count += 1;
        })
    }

}

const paddingValue = Platform.OS === 'android' ? StatusBar.currentHeight : 0

const CalendarScreen = () => {

    const [modalVisible, setModalVisibility] = useState(false);

    const toggleModalVisibility = () => {
        setModalVisibility(!modalVisible);
    }

    const rowHasChanged = (r1, r2) => {
        return r1.name !== r2.name;
    }

    //render the time if time is added as another text prop.
    const renderItem = (item) => {
        return (
            <View style={{marginRight: 10, marginTop: 17}}>
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
                        <TouchableOpacity style={styles.closeButton} onPress={() => deleteEvent(item.name)}>
                            <AntDesign name="close" size={18} color={'black'}/>
                        </TouchableOpacity>
                    </Card.Content>

                </Card>
            </View>
        );
    };

    return (
        <SafeAreaView style={{paddingTop: paddingValue, backgroundColor: 'white', flex:1}}>
            <Modal
                animationType="slide"
                visible={modalVisible}
                onRequestClose={() => toggleModalVisibility()}
            >
                <AddEventModal closeModal={toggleModalVisibility}/>
            </Modal>
            <View style={{flex: 1}}>
                {/* added the margin to fix last event not showing but calendar on tops kinda gets fked*/}
                <Agenda
                    selected={'2021-05-26'}
                    items = {eventData}
                    renderItem={renderItem}
                    rowHasChanged={(r1, r2) => rowHasChanged(r1,r2)}
                    // shld fix the loading in ios
                    renderEmptyData={() => null}
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
        borderWidth: 0.5,
        backgroundColor: '#FFF',
        borderColor: 'blue',
    },
    addText: {
        fontSize:18
    },
    closeButton: {
        position:'absolute',
        top: 5,
        right: 5
    }
})


export default CalendarScreen;