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
import {saveData} from "./eventData";
import {AntDesign} from "@expo/vector-icons";

//passing the closeModal prop to DeleteEventModal
const DeleteEventModal = ({closeModal, name, eventItems, setEventItems}) => {

    const deleteEvent = () => {

        let date;
        let removed = false;

        for (date in eventItems) {

            if (removed) {
                break;
            }
            for (let i = 0, l = eventItems[date].length; i < l; i++) {
                if (eventItems[date][i].name === name) {
                    if (l === 1) {
                        delete eventItems[date]
                    } else {
                        eventItems[date].splice(i, 1)
                    }
                    removed = true;
                    break;
                }
            }
        }
        setEventItems(eventItems)
        saveData(eventItems)
    }

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.writeEvent}>
            <TouchableOpacity style={styles.closeButton} onPress={() => closeModal()}>
                <AntDesign name="close" size={24} color={'black'}/>
            </TouchableOpacity>
            <View style={{alignSelf: "stretch", marginHorizontal: 32}}>
                <Text style={styles.title}>Are you sure you want to delete the event </Text>

                <TouchableOpacity style={styles.add} onPress={() => {deleteEvent(); closeModal();}}>
                    <Text style={{color: "white", fontWeight: 'bold', fontSize: 18}}>Yes!</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.add} onPress={() => {closeModal(); }}>
                    <Text style={{color: "white", fontWeight: 'bold', fontSize: 18}}>No!</Text>
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

export default DeleteEventModal