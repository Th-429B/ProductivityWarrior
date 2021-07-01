import React, {useState} from 'react';
import {View, Text, StyleSheet, LogBox, TouchableOpacity} from "react-native";
import Modal from 'react-native-modal';
import {saveModules} from "./storage";
import { useFonts } from '@expo-google-fonts/inter';
import AppLoading from "expo-app-loading";
import {Ionicons} from "@expo/vector-icons";
import Delete from "./deleteModal"

const Module = ({mod, modulesTaken, setModulesTaken, updateCAP, index}) => {

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
        'NA': 'Not Taken'
    }

    const [infoVisibility, setInfoVisibility] =useState(false);
    const [deleteVisibility, setDeleteVisibility] = useState(false);
    const [toShowDelete, setToShowDelete] = useState(false);

    const toggleInfoVisibility = () => {
        setInfoVisibility(!infoVisibility);
    }

    const toggleDeleteVisibility = () => {
        setDeleteVisibility(!deleteVisibility);
    }

    const toggleToShowDelete = () => {
        setToShowDelete(!toShowDelete);
    }

    const showDelete = () => {
        if (toShowDelete) {
            toggleDeleteVisibility();
            toggleToShowDelete();
        }
    }

    const deleteMod = () => {
        updateCAP(mod['moduleCredit'], mod['grade']);
        const newMods = [...modulesTaken];
        newMods.splice(index, 1);
        setModulesTaken(newMods);
        //saveData(newTodos);
    }

    const completeView = () => {
        return (
            <TouchableOpacity onPress={() => toggleInfoVisibility()}>
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
            </TouchableOpacity>
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
                {mod['grade'] === "NA" ? incompleteView(): completeView()}

                {/* Information Modal */}
                <Modal onBackButtonPress={() => toggleInfoVisibility()} onBackdropPress={() => toggleInfoVisibility()}
                       isVisible={infoVisibility} backdropOpacity={0.3} backdropColor={'#878787'} style={styles.modal} onModalHide={showDelete}>
                    <View style={styles.modalContainer}>
                        <View style={styles.infoHeader}>
                            <Text style={styles.infoHeaderText}>{mod['moduleCode']}</Text>
                            <TouchableOpacity onPress={() => {toggleInfoVisibility(); toggleToShowDelete()}}>
                                <Ionicons name="trash-bin-outline" size={24} color="red" />
                            </TouchableOpacity>
                        </View>
                        <View style={styles.textWrapper}>
                            <Text style={styles.infoText}>{mod['description']}</Text>
                        </View>
                    </View>
                </Modal>

                {/* Delete confirmation modal */}
                <Modal onBackButtonPress={() => toggleDeleteVisibility()} onBackdropPress={() => toggleDeleteVisibility()}
                       isVisible={deleteVisibility} backdropOpacity={0.3} backdropColor={'#878787'} style={styles.deleteModal}>
                    <Delete navigation={() => toggleDeleteVisibility()} deleteFunction={() => deleteMod()} deleteAll={false}/>
                </Modal>
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
        marginHorizontal: 20,
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
        justifyContent: 'center',
        alignItems: 'center'
    },
    modalContainer: {
        backgroundColor: 'white',
        marginVertical: 7,
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 10,
        opacity: 1,
    },
    infoHeader: {
      flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    infoHeaderText: {
        fontSize: 25,
        fontFamily: 'appleberry',
        paddingVertical: 10,
    },
    infoText: {
        textAlign: 'justify',
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
    },
    deleteModal: {
        margin: 0,
        justifyContent: 'flex-end',
    },
})

export default Module;