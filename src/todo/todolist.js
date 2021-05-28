import React from "react"
import {Platform, StatusBar, Text, View, SafeAreaView, StyleSheet} from "react-native";
import Tasks from './tasks';

function TodoListScreen() {
    const paddingValue = Platform.OS === 'android' ? StatusBar.currentHeight : 0

    return (
        <SafeAreaView style = {styles.safe(paddingValue)}>
            <View style = {styles.container}>
                <Text style = {styles.header}>Today's Tasks</Text>
                <View style = {styles.tasks}>
                    <Tasks text={'Text1'}/>
                    <Tasks text={'Text2: Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'}/>
                    <Tasks text={'Hello my name is bob and i am a person that is amazing, please do not leave your belongings unattended.'}/>
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
        safe: (paddingValue) => ({
            paddingTop: paddingValue,
            flex: 1,
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
            marginTop: 7,
        }
    }
)

export default TodoListScreen