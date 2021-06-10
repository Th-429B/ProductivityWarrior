import React, {useState} from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    TextInput,
    Platform,
    StatusBar,
    SafeAreaView, Keyboard, Alert
} from "react-native";
import {Ionicons} from "@expo/vector-icons";

const editTaskModal = ({navigation, index, setState, state, task}) => {

    const paddingValue = Platform.OS === 'android' ? StatusBar.currentHeight : 0
    const [text, setText] = useState(task['text']);

    const deleteTask = () => {
        const newTodos = [...state];
        newTodos.splice(index, 1);
        setState(newTodos);
    }

    const editTask = () => {
        if (!text) {
            Alert.alert('Task is empty!');
        } else if (text !== task['text'] && text) {
            const newTodos = [...state];
            task['text'] = text;
            newTodos[index] = task;
            setState(newTodos);
            Keyboard.dismiss();
            navigation();
        } else {
            Keyboard.dismiss();
            navigation();
        }
    }

    const cancel = () => {
        Keyboard.dismiss();
        navigation();
    }

    return(
        <SafeAreaView style = {styles.safe(paddingValue)}>
            <View style={styles.inner}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => cancel()}>
                        <View style={styles.innerButton}>
                            <Ionicons name="chevron-back" size={24} color="#00adf5" />
                            <Text style={{color: "#00adf5"}}>Cancel</Text>
                        </View>
                    </TouchableOpacity>
                    <Text style={styles.headerText}>Details</Text>
                    <TouchableOpacity onPress={() => editTask() }>
                        <View style={styles.innerButton}>
                            <Text style={{color: "#00adf5"}}>Done</Text>
                            <Ionicons name="checkmark" size={24} color="#00adf5" />
                        </View>
                    </TouchableOpacity>
                </View>
                <TextInput value={text} style={styles.textInput} multiline={true} onChangeText={text => setText(text)} />
                <TouchableOpacity style={styles.button} onPress={() => {deleteTask(); navigation()}}>
                    <View style={styles.innerButton}>
                        <Text style={{color: 'red'}}>Delete</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    safe: (paddingValue) => ({
        paddingTop: paddingValue,
        flex: 1,
        backgroundColor: '#f2f4f5',
    }),
    inner: {
        backgroundColor: '#f2f4f5',
        paddingBottom: 20,
        paddingTop: 20,
        paddingHorizontal: 15,
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        flex: 1,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    headerText: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    button: {
        backgroundColor: 'white',
        marginVertical: 7,
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 10,
        opacity: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    innerButton: {
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
    },
    textInput: {
        paddingHorizontal: 20,
        borderRadius: 10,
        backgroundColor: 'white',
        paddingTop: 10,
        paddingBottom: 10,
        marginVertical: 7,
    },
})

export default editTaskModal