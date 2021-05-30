import React, {useState} from 'react'
import {Keyboard, View, Text, StyleSheet, Platform, TextInput, TouchableOpacity, KeyboardAvoidingView} from "react-native";

const NewTask = () => {
    const [task, setTask] = useState();

    const handleNewTask = () => {
        Keyboard.dismiss();
        console.log(task);
    }

    return (
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}
                              style={styles.createTask}>
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
        bottom: 10,
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