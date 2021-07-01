import React, {useState} from "react";
import {View, Text, StyleSheet, TouchableOpacity} from "react-native";
import {Ionicons} from "@expo/vector-icons";
import Modal from "react-native-modal";
import Preset from './presetModal';

const settingsModal = ({navigation, toggleDelete,}) => {

    /* Tracks if preset modal should be displayed */
    const [presetVisibility, setPresetVisibility] = useState(false)

    const togglePresetVisibility = () => {
        setPresetVisibility(!presetVisibility);
    }

    return(
        <View style={styles.inner}>

            <TouchableOpacity style={styles.button} onPress={() => {navigation(); toggleDelete()}}>
                <View style={styles.innerButton}>
                    <Text style={{color: 'red'}}>Delete All</Text>
                    <Ionicons name="trash-bin-outline" size={24} color="red" />
                </View>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={() => {togglePresetVisibility()}}>
                <View style={styles.innerButton}>
                    <Text>Load Preset</Text>
                    <Ionicons name="add-circle-outline" size={24} color="black" />
                </View>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={() => navigation()}>
                <View style={styles.innerButton}>
                    <Text>Cancel</Text>
                    <Ionicons name="close-circle-outline" size={24} color="black" />
                </View>
            </TouchableOpacity>

            <Modal onBackButtonPress={() => togglePresetVisibility()} onBackdropPress={() => togglePresetVisibility()}
                   isVisible={presetVisibility} backdropOpacity={0.3} backdropColor={'#878787'} style={styles.modal}>
                <Preset navigation={() => togglePresetVisibility()} />
            </Modal>

        </View>
    )
}

const styles = StyleSheet.create({
    inner: {
        backgroundColor: '#f2f4f5',
        paddingBottom: 20,
        paddingTop: 10,
        paddingHorizontal: 15,
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
    },
    button: {
        backgroundColor: 'white',
        marginVertical: 7,
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 10,
        opacity: 1,
    },
    innerButton: {
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
    },
    modal: {
        margin: 0,
        justifyContent: 'flex-end',
    },
})

export default settingsModal;