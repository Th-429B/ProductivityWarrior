import React, {useEffect, useState} from "react"
import {
    Platform,
    StatusBar,
    Text,
    View,
    SafeAreaView,
    StyleSheet,
} from "react-native";
import Tasks from './tasks';
import NewTask from './newTask'

function TodoListScreen() {
    const [state, setState] = useState([])

    const paddingValue = Platform.OS === 'android' ? StatusBar.currentHeight : 0

    return (
        <SafeAreaView style = {styles.safe(paddingValue)}>
            <View style = {styles.container}>
                <Text style = {styles.header}>Today's Tasks</Text>
                <View style = {styles.tasks}>
                    {state.filter((item) => item['completed'] === false).map((item, index) => {
                        return <Tasks task={item} state={state} setState={(newList) => setState(newList)}
                                      index={state.indexOf(item)} key={index}/>})}
                    {state.filter((item) => item['completed'] === true).map((item, index) => {
                        return <Tasks task={item} state={state} setState={(newList) => setState(newList)}
                                      index={state.indexOf(item)} key={index}/>})}
                </View>
            </View>
            <NewTask addTodos={(todo) => setState([...state, todo])}/>
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
        header: {
            fontSize: 24,
            fontWeight: 'bold',
        },
        tasks: {
            marginTop: 20,
        }
    }
)

export default TodoListScreen