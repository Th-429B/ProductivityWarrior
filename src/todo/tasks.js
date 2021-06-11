import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity,} from "react-native";
import {MaterialIcons} from "@expo/vector-icons";
import Modal from 'react-native-modal';
import EditTask from './editTaskModal'
import DeleteAll from "./deleteModal";

const Tasks = ({task, state, setState, index}) => {
    const [infoVisibility, setInfoVisibility] =useState(false);
    const [deleteVisibility, setDeleteVisibility] = useState(false);
    const [toShowDelete, setToShowDelete] = useState(false);

    const toggleInfoVisibility = () => {
        setInfoVisibility(!infoVisibility);
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
    }

    const setComplete = () => {
        if (task['completed'] === false) {
            const newTodos = [...state];
            task['completed'] = true;
            newTodos[index] = task;
            setState(newTodos);
        }
    }

    const setIncomplete = () => {
        if (task['completed'] === true) {
            const newTodos = [...state];
            task['completed'] = false;
            newTodos[index] = task;
            setState(newTodos);
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
                    <TouchableOpacity onPress={() => toggleInfoVisibility()}>
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
                <TouchableOpacity onPress={() => toggleInfoVisibility()}>
                    <MaterialIcons name="info-outline" size={24} color={'grey'} />
                </TouchableOpacity>
            </View>
        )
    }

    return (
        <View>
            {task['completed'] === false ? incompleteView() : completeView()}

            {/* Info modal */}
            <Modal onBackButtonPress={() => toggleInfoVisibility()} onBackdropPress={() => toggleInfoVisibility()}
                   isVisible={infoVisibility} backdropOpacity={0.3} backdropColor={'#878787'} style={styles.modal} onModalHide={() => showDelete()}>
                <EditTask navigation={() => toggleInfoVisibility()} index={index} state={state} setState={setState} task={task} deleteTask={() => toggleToShowDelete()}/>
            </Modal>

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

export default Tasks;