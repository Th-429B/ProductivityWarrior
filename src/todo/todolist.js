import React, {useEffect, useState} from "react"
import {
    Platform,
    StatusBar,
    Text,
    View,
    SafeAreaView,
    StyleSheet, TouchableOpacity, ScrollView,
} from "react-native";
import {Ionicons} from "@expo/vector-icons";
import Modal from 'react-native-modal';
import Tasks from './tasks';
import NewTask from './newTask'
import Settings from './settingsModal'
import DeleteAll from "./deleteModal";
import {loadData, saveData} from "./storage";

function TodoListScreen() {

    // Loads tasks from asyncstorage
    useEffect(() => {
        loadData((tasks) => setTaskList(tasks))
    }, []);

    /* Stores all the tasks */
    const [taskList, setTaskList] = useState([])
    /* Tracks if setting modal should be displayed */
    const [settingVisibility, setSettingVisibility] = useState(false);
    /* Tracks if completed tasks should be displayed */
    const [completedVisibility, setCompletedVisibility] = useState(false);
    /* Tracks if delete all confirmation model should be displayed */
    const [deleteVisibility, setDeleteVisibility] = useState(false);
    /* Messenger state to call the delete all confirmation modal */
    const [toShowDelete, setToShowDelete] = useState(false);

    const paddingValue = Platform.OS === 'android' ? StatusBar.currentHeight : 0

    const toggleSettingVisibility = () => {
        setSettingVisibility(!settingVisibility);
    }

    const toggleCompletedVisibility = () => {
        setCompletedVisibility(!completedVisibility);
    }

    const toggleDeleteVisibility = () => {
        setDeleteVisibility(!deleteVisibility);
    }

    const toggleToShowDelete = () => {
        setToShowDelete(!toShowDelete);
    }

    // Shows delete confirmation modal
    const showDelete = () => {
        if (toShowDelete) {
            toggleDeleteVisibility();
            toggleToShowDelete();
        }
    }

    // Delete all tasks
    const deleteAll = () => {
        setTaskList([]);
        saveData([]);
    }

    // Renders all incomplete tasks
    const showIncompleteTask = () => {
        return(
            taskList.filter((item) => item['completed'] === false).map((item, index) => {
                return <Tasks task={item} state={taskList} setState={(newList) => setTaskList(newList)}
                              index={taskList.indexOf(item)} key={index}/>})
        )
    }

    // Renders all completed tasks
    const showCompletedTask = () => {
        return(
            taskList.filter((item) => item['completed'] === true).map((item, index) => {
                return <Tasks task={item} state={taskList} setState={(newList) => setTaskList(newList)}
                              index={taskList.indexOf(item)} key={index}/>})
        )
    }

    // Placeholder text when there are no tasks
    const placeHolderText = () => {
        const hasIncompleteTask = taskList.filter((item) => item['completed'] === false).length
        if (!taskList.length || !hasIncompleteTask) {
            return(
                <View style={styles.placeholder}>
                    <Text style={{fontSize: 15,}}>You have no pending tasks</Text>
                </View>
            )
        }
    }

    // Marks all tasks as complete
    const markAllComplete = () => {
        const newToDos = [...taskList];
        newToDos.map((item) => item['completed'] = true);
        setTaskList(newToDos);
        saveData(newToDos);
    }

    return (
        <SafeAreaView style = {styles.safe(paddingValue)}>
            <View style = {styles.container}>
                <View style={styles.headerRow}>
                    <Text style = {styles.headerText}>Today's Tasks</Text>
                    <TouchableOpacity onPress={() => toggleSettingVisibility()}>
                        <Ionicons name="ios-settings-outline" size={28} color="black" />
                    </TouchableOpacity>
                </View>
                <View style = {styles.tasks}>
                    {placeHolderText()}
                    <ScrollView style={styles.scroll}>
                        {showIncompleteTask()}
                        {completedVisibility && showCompletedTask()}
                    </ScrollView>
                </View>
            </View>
            <NewTask taskList={taskList} setTaskList={(newList) => setTaskList(newList)}/>

            {/* Settings modal */}
            <Modal onBackButtonPress={() => toggleSettingVisibility()} onBackdropPress={() => toggleSettingVisibility()}
                   isVisible={settingVisibility} backdropOpacity={0.3} backdropColor={'#878787'} style={styles.modal} onModalHide={() => showDelete()}>
                <Settings navigation={() => toggleSettingVisibility()} toggleCompleted={() => toggleCompletedVisibility()}
                          completedVisibility={completedVisibility} toggleDelete={() => toggleToShowDelete()} markAllComplete={() => markAllComplete()}/>
            </Modal>

            {/* Delete all confirmation modal */}
            <Modal onBackButtonPress={() => toggleDeleteVisibility()} onBackdropPress={() => toggleDeleteVisibility()}
                   isVisible={deleteVisibility} backdropOpacity={0.3} backdropColor={'#878787'} style={styles.modal} >
                <DeleteAll navigation={() => toggleDeleteVisibility()} deleteFunction={() => deleteAll()} deleteAll={true}/>
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
        },
        headerRow: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingHorizontal: 20,
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
        },
        placeholder: {
            marginBottom: 20,
            alignItems: 'center'

        },
        scroll: {
            marginBottom: 115,
        }
    }
)

export default TodoListScreen