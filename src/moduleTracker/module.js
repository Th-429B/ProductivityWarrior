import React, {useState} from 'react';
import {View, Text, StyleSheet, LogBox} from "react-native";
import Modal from 'react-native-modal';
import {saveModules} from "./storage";
import { useFonts } from '@expo-google-fonts/inter';
import AppLoading from "expo-app-loading";


const Module = ({mod, index}) => {

    let [fontsLoaded] = useFonts({
        'appleberry': require('../../assets/fonts/appleberry.ttf')
    })

    const gradeMap = {
        'A+': 'S',
        'A': 'S',
        'A-': 'S',
        'B+': 'S',
        'B': 'S',
        'B-': 'S',
        'C+': 'S',
        'C': 'S',
        'D+': 'U',
        'D': 'U',
        'F': 'U',
    }

    const completeView = () => {
        return (
                <View style={styles.item}>
                    <View style={styles.modInfo}>
                        <Text style={styles.header}>{mod['moduleCode']}</Text>
                        <Text style={styles.text}>{mod['title']}</Text>
                        <Text style={styles.text}>{mod['moduleCredit']}MC</Text>
                    </View>
                    <View style={styles.gradeContainer}>
                        <Text style={styles.modGrade}>{mod['SU'] ? gradeMap[mod['grade']] : mod['grade']}</Text>
                    </View>
                </View>
        )
    }

    const incompleteView = () => {
        return (
            <View style={[styles.item, {backgroundColor: 'grey'}]}>
                <View style={styles.modInfo}>
                    <Text style={styles.header}>{mod['moduleCode']}</Text>
                    <Text style={styles.text}>{mod['title']}</Text>
                    <Text style={styles.text}>{mod['moduleCredit']}MC</Text>
                </View>
                <View styles={styles.incomplete}>
                    <Text style={styles.notTaken}>Not</Text>
                    <Text style={styles.notTaken}>Taken</Text>
                </View>
            </View>
        )
    }

    LogBox.ignoreLogs(['Possible Unhandled Promise Rejection']);

    if (!fontsLoaded) {
        return <AppLoading />;
    } else {
        return (
            <View>
                {completeView()}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    item: {
        marginVertical: 7,
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 10,
        flexDirection: 'row',
        justifyContent:'space-between',
        alignItems: 'center',
        backgroundColor: '#c55b10',
    },
    button: {
        width: 21,
        height: 21,
        borderRadius: 10.5,
        backgroundColor: 'white',
        borderColor: '#00adf5',
        borderWidth: 2
    },
    modInfo: {
        flexDirection: 'column',
        flex: 1,
        alignItems: 'flex-start',
    },
    modGrade: {
        fontSize: 50,
        fontFamily: 'appleberry',
        color: 'white'
    },
    text: {
        fontSize: 14,
        fontFamily: 'appleberry',
        color: 'white'
    },
    header: {
        fontSize: 24,
        color: 'white',
        fontFamily: 'appleberry'
    },
    modal: {
        margin: 0,
        justifyContent: 'flex-end',
    },
    incomplete: {
        flexDirection: 'column',
        flex: 1,
        marginHorizontal: 15,
        alignItems: 'center',
        justifyContent: 'space-around'
    },
    notTaken: {
        fontSize: 28,
        fontFamily: 'appleberry',
        color: 'white',
        marginVertical: 0,
        flex: 1
    },
    gradeContainer: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    }
})

export default Module;