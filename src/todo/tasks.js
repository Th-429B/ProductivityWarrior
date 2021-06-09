import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from "react-native";
import {MaterialIcons} from "@expo/vector-icons";

const Tasks = ({task, state, setState, index}) => {
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
                    <TouchableOpacity>
                        <MaterialIcons name="info-outline" size={24} color={"#00adf5"}/>
                    </TouchableOpacity>
                </View>
        )
    }

    const completeView = () => {
        return (
            <View style={styles.item}>
                <TouchableOpacity onPress={() => setIncomplete()}>
                    <MaterialIcons name="check-circle" size={24} color='grey' />
                </TouchableOpacity>
                <View style={styles.textWrapper}>
                    <Text style={styles.complete}>{task['text']}</Text>
                </View>
                <MaterialIcons name="info-outline" size={24} color='grey'/>
            </View>
        )
    }

    return task['completed'] === false ? incompleteView() : completeView()
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
    }
})

export default Tasks;