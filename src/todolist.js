import React from "react"
import {Platform, StatusBar, Text, View, SafeAreaView, StyleSheet} from "react-native";

function TodoListScreen() {
    const paddingValue = Platform.OS === 'android' ? StatusBar.currentHeight : 0

    return (
        <SafeAreaView style = {styles.safe(paddingValue)}>
            <View style={styles.container}>
                <Text>Hello World!</Text>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
        safe: (paddingValue) => ({
            paddingTop: paddingValue,
            backgroundColor: 'white',
            flex: 1,
        }),
        container: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center'
        }
    }
)

export default TodoListScreen