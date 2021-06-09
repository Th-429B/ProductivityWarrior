import React, {useEffect, useState} from "react"
import {
    Platform,
    StatusBar,
    Text,
    View,
    SafeAreaView,
    StyleSheet, TouchableOpacity,
} from "react-native";
import {Ionicons} from "@expo/vector-icons";
import Modal from 'react-native-modal';
import Tasks from './tasks';
import NewTask from './newTask'
import Settings from './settingsModal'

function TodoListScreen() {
    const [taskList, setTaskList] = useState([])
    const [modalVisibility, setModalVisibility] = useState(false);

    const paddingValue = Platform.OS === 'android' ? StatusBar.currentHeight : 0

    const toggleModalVisibility = () => {
        setModalVisibility(!modalVisibility);
    }

    return (
        <SafeAreaView style = {styles.safe(paddingValue)}>
            <View style = {styles.container}>
                <View style={styles.headerRow}>
                    <Text style = {styles.headerText}>Today's Tasks</Text>
                    <TouchableOpacity onPress={() => toggleModalVisibility()}>
                        <Ionicons name="ios-settings-outline" size={28} color="black" />
                    </TouchableOpacity>
                </View>
                <View style = {styles.tasks}>
                    {taskList.filter((item) => item['completed'] === false).map((item, index) => {
                        return <Tasks task={item} state={taskList} setState={(newList) => setTaskList(newList)}
                                      index={taskList.indexOf(item)} key={index}/>})}
                    {taskList.filter((item) => item['completed'] === true).map((item, index) => {
                        return <Tasks task={item} state={taskList} setState={(newList) => setTaskList(newList)}
                                      index={taskList.indexOf(item)} key={index}/>})}
                </View>
            </View>
            <NewTask addTodos={(todo) => setTaskList([...taskList, todo])}/>

            <Modal onBackButtonPress={() => toggleModalVisibility()} onBackdropPress={() => toggleModalVisibility()}
                   isVisible={modalVisibility} backdropOpacity={0.3} backdropColor={'#878787'} style={styles.modal} >
                <Settings navigation={toggleModalVisibility}/>
            </Modal>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
        safe: (paddingValue) => ({
            paddingTop: paddingValue,
            flex: 1,
            backgroundColor: '#f2f4f5',
        }),
        container: {
            paddingTop: 20,
            paddingHorizontal: 20,
        },
        headerRow: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
        },
        headerText: {
            fontSize: 24,
            fontWeight: 'bold',
        },
        tasks: {
            marginTop: 20,
        },
        modal: {
            margin: 0,
            justifyContent: 'flex-end',
        }
    }
)

export default TodoListScreen