import React, {useState} from 'react'
import {Keyboard, View, Text, StyleSheet, Platform, TextInput, TouchableOpacity, KeyboardAvoidingView} from "react-native";
import uuid from 'react-native-uuid'
import {saveData} from "./storage";

const NewTask = ({taskList, setTaskList}) => {
    const [task, setTask] = useState("");

    // Adds new task to state and updates asyncstorage
    const addTask = (newTask) => {
        const newTodos = [...taskList, newTask];
        setTaskList(newTodos);
        saveData(newTodos)
    }

    // Creates new task
    const handleNewTask = () => {
        if (task !== "") {
            const ID = uuid.v4();
            const newTodo = {
                id: ID,
                created: new Date(),
                text: task,
                completed: false,
            }
            addTask(newTodo);
            setTask("");
        }
        Keyboard.dismiss();
    }

    return (
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.createTask}>
            <TextInput style={styles.input} placeholder={"Write a new task"} value={task} onChangeText={text => setTask(text)}/>
            <TouchableOpacity onPress={() => handleNewTask()}>
                <View style={styles.submit}>
                    <Text style={styles.text}>+</Text>
                </View>
            </TouchableOpacity>
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    createTask: {
        position: 'absolute',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        bottom: 5,
        width: '100%',
    },
    input: {
        paddingVertical: 15,
        paddingHorizontal: 15,
        width: '80%',
        height: 50,
        backgroundColor: 'white',
        borderRadius: 50,
        borderColor: '#C0C0C0',
        borderWidth: 1,
    },
    submit: {
        height: 50,
        width: 50,
        backgroundColor: 'white',
        borderRadius: 50,
        borderColor: '#C0C0C0',
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {},
})

export default NewTask