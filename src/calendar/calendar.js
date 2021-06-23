import React, {useEffect, useState} from 'react';
import {
    View,
    TouchableOpacity,
    SafeAreaView,
    Platform,
    StatusBar,
    StyleSheet,
    Modal
} from 'react-native';
import {Agenda} from 'react-native-calendars';
import {Card, Avatar, Text} from 'react-native-paper';
import {loadData} from "./eventData";
import AddEventModal from "./AddEventModal";
import {AntDesign} from "@expo/vector-icons";
import DeleteEventModal from "./DeleteEventModal";

const paddingValue = Platform.OS === 'android' ? StatusBar.currentHeight : 0

const CalendarScreen = () => {

    useEffect(() => {
        loadData((items) => setEventItems(items))
    }, []);

    const [modalDeleteVisible, setModalDeleteVisibility] = useState(false);
    const [modalAddVisible, setModalAddVisibility] = useState(false);

    const [eventName, setEventName] = useState("test");

    const [eventItems, setEventItems] = useState();

    const toggleModalAddVisibility = () => {
        setModalAddVisibility(!modalAddVisible);
    }

    const toggleModalDeleteVisibility = () => {
        setModalDeleteVisibility(!modalDeleteVisible);
    }

    const rowHasChanged = (r1, r2) => {
        return r1.name !== r2.name;
    }

    const test = () => {
        const date = "2021-05-28";
        // eventItems[date].push({name: "this is a test"})
        console.log(eventItems[date])
        console.log(eventItems)
    }

// function to check if the date already has an event.
    const findDate = () => {
        let x;
        for (x in eventItems) {
            console.log(x)
        }
        return false;
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
                <AddEventModal closeModal={() => toggleModalAddVisibility()}
                eventItems={eventItems} setEventItems={(items) => setEventItems(items)} />
            </Modal>
            <Modal
                animationType="slide"
                visible={modalDeleteVisible}
                onRequestClose={() => toggleModalDeleteVisibility()}
            >
                <DeleteEventModal closeModal={() => toggleModalDeleteVisibility()} name={eventName}
                eventItems={eventItems} setEventItems={(items) => setEventItems(items)}/>
            </Modal>

            <View style={{flex: 1}}>
                <Agenda
                    // selected={'2021-05-26'}
                    items = {eventItems}
                    renderItem={renderItem}
                    rowHasChanged={(r1, r2) => rowHasChanged(r1,r2)}
                    // should fix the loading in ios
                    renderEmptyData={() => null}z
                    renderEmptyDate={() => null}
                    pastScrollRange={12}
                    futureScrollRange={12}
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
        // borderColor: 'blue',
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