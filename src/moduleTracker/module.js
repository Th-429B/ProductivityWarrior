import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity,} from "react-native";
import {MaterialIcons} from "@expo/vector-icons";
import Modal from 'react-native-modal';
import DeleteAll from "./deleteModal";
import {saveModules} from "./storage";
import AppLoading from 'expo-app-loading';
import { useFonts, Inter_900Black } from '@expo-google-fonts/inter';

const Module = ({task, state, setState, index}) => {

    let [fontsLoaded, error] = useFonts({
        'appleberry': require('../../assets/fonts/appleberry.ttf')
    })

    const [editVisibility, setEditVisibility] =useState(false);
    const [deleteVisibility, setDeleteVisibility] = useState(false);
    const [toShowDelete, setToShowDelete] = useState(false);

    const toggleEditVisibility = () => {
        setEditVisibility(!editVisibility);
    }

    const toggleDeleteVisibility = () => {
        setDeleteVisibility(!deleteVisibility);
    }

    const toggleToShowDelete = () => {
        setToShowDelete(!toShowDelete);
    }

    const showDelete = () => {
        if (toShowDelete) {
            toggleDeleteVisibility();
            toggleToShowDelete();
        }
    }

    const deleteTask = () => {
        const newTodos = [...state];
        newTodos.splice(index, 1);
        setState(newTodos);
        //saveData(newTodos);
    }

    const setComplete = () => {
        if (task['completed'] === false) {
            const newTodos = [...state];
            task['completed'] = true;
            newTodos[index] = task;
            setState(newTodos);
            //saveData(newTodos);
        }
    }

    const setIncomplete = () => {
        if (task['completed'] === true) {
            const newTodos = [...state];
            task['completed'] = false;
            newTodos[index] = task;
            setState(newTodos);
            //saveData(newTodos);
        }
    }

    const incompleteView = () => {
        return (
                <View style={styles.item}>
                    <TouchableOpacity onPress={() => setComplete()}>
                        <MaterialIcons name="radio-button-unchecked" size={24} color={"#00adf5"} />
                    </TouchableOpacity>
                    <View style={styles.textWrapper}>
                        <Text style={styles.text}>{task['text']}</Text>
                    </View>
                    <TouchableOpacity onPress={() => toggleEditVisibility()}>
                        <MaterialIcons name="info-outline" size={24} color={"#00adf5"}/>
                    </TouchableOpacity>
                </View>
        )
    }

    const completeView = () => {
        return (
            <View style={styles.item}>
                <TouchableOpacity onPress={() => setIncomplete()}>
                    <MaterialIcons name="check-circle" size={24} color={'grey'} />
                </TouchableOpacity>
                <View style={styles.textWrapper}>
                    <Text style={styles.complete}>{task['text']}</Text>
                </View>
                <TouchableOpacity onPress={() => toggleEditVisibility()}>
                    <MaterialIcons name="info-outline" size={24} color={'grey'} />
                </TouchableOpacity>
            </View>
        )
    }

    if (!fontsLoaded) {
        return <AppLoading/>
    }

    return (
        <View>
            {task['completed'] === false ? incompleteView() : completeView()}

            {/* Delete confirmation modal */}
            <Modal onBackButtonPress={() => toggleDeleteVisibility()} onBackdropPress={() => toggleDeleteVisibility()}
                   isVisible={deleteVisibility} backdropOpacity={0.3} backdropColor={'#878787'} style={styles.modal} >
                <DeleteAll navigation={() => toggleDeleteVisibility()} deleteFunction={() => deleteTask()} deleteAll={false}/>
            </Modal>
        </View>
    )
}

const styles = StyleSheet.create({
    item: {
        backgroundColor: 'white',
        marginVertical: 7,
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 10,
        flexDirection: 'row',
        justifyContent:'space-between',
        alignItems: 'center',
    },
    button: {
        width: 21,
        height: 21,
        borderRadius: 10.5,
        backgroundColor: 'white',
        borderColor: '#00adf5',
        borderWidth: 2,
    },
    textWrapper: {
        flexDirection: 'row',
        flex: 1,
        flexWrap: 'wrap',
        marginHorizontal: 15,
        alignItems: 'center',
    },
    text: {
        fontSize: 14,
        fontFamily: 'appleberry'
    },
    complete: {
        fontSize: 14,
        color: 'grey'
    },
    modal: {
        margin: 0,
        justifyContent: 'flex-end',
    },
})

export default Module;