import React, {useState} from 'react';
import {View, Text, StyleSheet} from "react-native";
import Modal from 'react-native-modal';
import DeleteAll from "./deleteModal";
import {saveModules} from "./storage";
import AppLoading from 'expo-app-loading';
import { useFonts, Inter_900Black } from '@expo-google-fonts/inter';

const Module = ({task, state, setState, index}) => {

    let [fontsLoaded] = useFonts({
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

    const completeView = () => {
        return (
                <View style={[styles.item, {backgroundColor: '#c55b10'}]}>
                    <View style={styles.modInfo}>
                        <Text style={styles.header}>CS2040s</Text>
                        <Text style={styles.text}>Programming Methodology</Text>
                        <Text style={styles.text}>4MC</Text>
                    </View>
                    <View>
                        <Text style={styles.modGrade}>A</Text>
                    </View>
                </View>
        )
    }

    const incompleteView = () => {
        return (
            <View style={[styles.item, {backgroundColor: 'grey'}]}>
                <View style={styles.modInfo}>
                    <Text style={styles.header}>CS2040s</Text>
                    <Text style={styles.text}>Programming Methodology</Text>
                    <Text style={styles.text}>4MC</Text>
                </View>
                <View styles={styles.incomplete}>
                    <Text style={styles.notTaken}>Not</Text>
                    <Text style={styles.notTaken}>Taken</Text>
                </View>
            </View>
        )
    }

    if (!fontsLoaded) {
        return <AppLoading/>
    } else {
        return (
            <View>
                {task['completed'] === false ? incompleteView() : completeView()}

                {/* Delete confirmation modal */}
                <Modal onBackButtonPress={() => toggleDeleteVisibility()}
                       onBackdropPress={() => toggleDeleteVisibility()}
                       isVisible={deleteVisibility} backdropOpacity={0.3} backdropColor={'#878787'}
                       style={styles.modal}>
                    <DeleteAll navigation={() => toggleDeleteVisibility()} deleteFunction={() => deleteTask()}
                               deleteAll={false}/>
                </Modal>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    item: {
        marginVertical: 7,
        paddingHorizontal: 10,
        paddingVertical: 10,
        borderRadius: 10,
        flexDirection: 'row',
        justifyContent:'space-between',
        alignItems: 'center'
    },
    button: {
        width: 21,
        height: 21,
        borderRadius: 10.5,
        backgroundColor: 'white',
        borderColor: '#00adf5',
        borderWidth: 2
    },
    modInfo: {
        flexDirection: 'column',
        flex: 1,
        flexWrap: 'wrap',
        marginHorizontal: 15,
        alignItems: 'flex-start',
    },
    modGrade: {
        fontSize: 50,
        fontFamily: 'appleberry',
        color: 'white'
    },
    text: {
        fontSize: 14,
        fontFamily: 'appleberry',
        color: 'white'
    },
    header: {
        fontSize: 24,
        color: 'white',
        fontFamily: 'appleberry'
    },
    modal: {
        margin: 0,
        justifyContent: 'flex-end',
    },
    incomplete: {
        flexDirection: 'column',
        flex: 1,
        marginHorizontal: 15,
        alignItems: 'center',
        justifyContent: 'space-around'
    },
    notTaken: {
        fontSize: 28,
        fontFamily: 'appleberry',
        color: 'white',
        marginVertical: 0,
        flex: 1
    }
})

export default Module;