import React, {useState} from 'react';
import {
    View,
    TouchableOpacity,
    SafeAreaView,
    Platform,
    StatusBar,
    StyleSheet,
    TextInput,
    Keyboard, Modal
} from 'react-native';
import {Agenda} from 'react-native-calendars';
import {Card, Avatar, Text} from 'react-native-paper';
import eventData from "./eventData";
import AddEventModal from "./AddEventModal";
import {AntDesign} from "@expo/vector-icons";
import DeleteEventModal from "./DeleteEventModal";

const timeToString = (time) => {
    const date = new Date(time);
    return date.toISOString().split('T')[0];
};


// function to check if the date already has an event.
const findDate = (date) => {
    let x;
    for (x in eventData) {
        if ( x === date) {
            return true;
        }
    }
    return false;
}

const paddingValue = Platform.OS === 'android' ? StatusBar.currentHeight : 0

const CalendarScreen = () => {

    const [modalDeleteVisible, setModalDeleteVisibility] = useState(false);
    const [modalAddVisible, setModalAddVisibility] = useState(false);


    const [eventName, setEventName] = useState("test");

    const toggleModalAddVisibility = () => {
        setModalAddVisibility(!modalAddVisible);
    }

    const toggleModalDeleteVisibility = () => {
        setModalDeleteVisibility(!modalDeleteVisible);
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
                        <TouchableOpacity style={styles.closeButton}
                                          onPress={() => {toggleModalDeleteVisibility();
                                              setEventName(item.name);}}>
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
                visible={modalAddVisible}
                onRequestClose={() => toggleModalAddVisibility()}
            >
                <AddEventModal closeModal={() => toggleModalAddVisibility()}/>
            </Modal>
            <Modal
                animationType="slide"
                visible={modalDeleteVisible}
                onRequestClose={() => toggleModalDeleteVisibility()}
            >
                <DeleteEventModal closeModal={() => toggleModalDeleteVisibility()} name={eventName}/>
            </Modal>

            <View style={{flex: 1}}>
                <Agenda
                    selected={'2021-05-26'}
                    items = {eventData}
                    renderItem={renderItem}
                    rowHasChanged={(r1, r2) => rowHasChanged(r1,r2)}
                    // should fix the loading in ios
                    renderEmptyData={() => null}
                    renderEmptyDate={() => null}
                    // onDayLongPress={(day) => setEvent(day, text)}
                    // onDayPress={(day) => {findDate(day.dateString)}}
                    //onDayLongPress={(day) => {console.log(day.dateString)}}
                    // onDayLongPress={(day) => {setDate(day.dateString)}}

                />
            </View>
            <TouchableOpacity style={styles.addButton} onPress={() => {toggleModalAddVisibility()}}>
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