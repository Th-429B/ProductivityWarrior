import React, {useEffect, useState} from "react"
import {
    Platform,
    StatusBar,
    Text,
    View,
    SafeAreaView,
    StyleSheet,
    TouchableOpacity, ScrollView,
} from "react-native";
import {Ionicons} from "@expo/vector-icons";
import Modal from 'react-native-modal';
import Module from './module';
import NewMod from './newMod';
import Settings from './settingsModal';
import DeleteAll from "./deleteModal";
import moduleData from "./moduleInfo.json";
import {loadModules, saveModules} from "./storage";

function TodoListScreen() {

    /*
    useEffect(() => {
        loadData((tasks) => setModulesTaken(tasks))
    }, []);
    */
    const [capTotal, setCapTotal] = useState(0);
    const [totalMC, setTotalMC] = useState(0);
    /* Stores all the tasks */
    const [modulesTaken, setModulesTaken] = useState([])
    /* Tracks if add modal should be displayed */
    const [addVisibility, setAddVisibility] = useState(false)
    /* Tracks if setting modal should be displayed */
    const [settingVisibility, setSettingVisibility] = useState(false);
    /* Tracks if delete all confirmation model should be displayed */
    const [deleteVisibility, setDeleteVisibility] = useState(false);
    /* Messenger state to call the delete all confirmation modal */
    const [toShowDelete, setToShowDelete] = useState(false);

    const paddingValue = Platform.OS === 'android' ? StatusBar.currentHeight : 0

    const gradeMap = {
        'A+': 5.0,
        'A': 5.0,
        'A-': 4.5,
        'B+': 4.0,
        'B': 3.5,
        'B-': 3.0,
        'C+': 2.5,
        'C': 2.0,
        'D+': 1.5,
        'D': 1.0,
        'F': 0.0,
        'NA': 0,
    }

    const toggleAddVisibility = () => {
        setAddVisibility(!addVisibility);
    }

    const toggleSettingVisibility = () => {
        setSettingVisibility(!settingVisibility);
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

    const deleteAll = () => {
        setModulesTaken([]);
        setCapTotal(0);
        setTotalMC(0);
        //saveData([]);
    }

    const placeHolderText = () => {
        if (!modulesTaken.length) {
            return(
                <View style={styles.placeholder}>
                    <Text style={{fontSize: 15,}}>You have no modules taken</Text>
                </View>
            )
        }
    }

    const updateCAP = (intMC, grade) => {
        setTotalMC(totalMC - intMC);
        setCapTotal(capTotal - intMC * gradeMap[grade]);
    }

    const showTakenModules = () => {
        return(
            modulesTaken.filter(item => item['grade'] !== 'NA' && !item['moduleCode'].startsWith('GE')).map((item, index) => {
                return <Module mod={item} index={modulesTaken.indexOf(item)} modulesTaken={modulesTaken} setModulesTaken={setModulesTaken} updateCAP={updateCAP} key={index}/>})
        )
    }

    const showPresetModules = () => {
        return(
            modulesTaken.filter(item => item['grade'] === 'NA').map((item, index) => {
                return <Module mod={item} index={modulesTaken.indexOf(item)} modulesTaken={modulesTaken} setModulesTaken={setModulesTaken} updateCAP={updateCAP} key={index}/>})
        )
    }

    const showGEModules = () => {
        return(
            modulesTaken.filter(item => item['moduleCode'].startsWith('GE')).map((item, index) => {
                return <Module mod={item} index={modulesTaken.indexOf(item)} modulesTaken={modulesTaken} setModulesTaken={setModulesTaken} updateCAP={updateCAP} key={index}/>})
        )
    }

    return (
        <SafeAreaView style = {styles.safe(paddingValue)}>
            <View style = {styles.container}>
                <View style={styles.headerRow}>
                    <Text style = {styles.headerText}>Module Tracker</Text>
                    <Text>Current CAP: {totalMC === 0 ? 'NA' : (capTotal/totalMC).toFixed(2)}</Text>
                    <TouchableOpacity onPress={() => toggleSettingVisibility()}>
                        <Ionicons name="ios-settings-outline" size={28} color="black" />
                    </TouchableOpacity>
                </View>
                <View style = {styles.tasks}>
                    {placeHolderText()}
                    <ScrollView style={styles.scroll}>
                        <Text style={styles.subheading}>General Education Modules</Text>
                        {showGEModules()}
                        <Text style={styles.subheading}>Core Modules</Text>
                        {showTakenModules()}
                        {showPresetModules()}
                    </ScrollView>
                </View>
            </View>


            <TouchableOpacity onPress={() => toggleAddVisibility()} style={styles.addButton}>
                <Text style={styles.addButtonText}>+</Text>
            </TouchableOpacity>

            {/* Add modal */}
            <Modal onBackButtonPress={() => toggleAddVisibility()} onBackdropPress={() => toggleAddVisibility()}
                   isVisible={addVisibility} backdropOpacity={0.3} backdropColor={'#878787'} style={styles.modal}>
                <NewMod navigation={() => toggleAddVisibility()} setModulesTaken={setModulesTaken} modulesTaken={modulesTaken}
                        moduleList={moduleData} totalMC={totalMC} setTotalMC={setTotalMC} capTotal={capTotal} setCapTotal={setCapTotal} gradeMap={gradeMap}/>
            </Modal>

            {/* Settings modal */}
            <Modal onBackButtonPress={() => toggleSettingVisibility()} onBackdropPress={() => toggleSettingVisibility()}
                   isVisible={settingVisibility} backdropOpacity={0.3} backdropColor={'#878787'} style={styles.modal} onModalHide={() => showDelete()}>
                <Settings navigation={() => toggleSettingVisibility()} toggleDelete={() => toggleToShowDelete()}
                          setModulesTaken={setModulesTaken} modulesTaken={modulesTaken} moduleList={moduleData} />
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
            alignItems: 'baseline',
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
        addButton: {
            height: 50,
            width: 50,
            backgroundColor: 'white',
            borderRadius: 50,
            borderColor: '#C0C0C0',
            position: 'absolute',
            borderWidth: 1,
            justifyContent: 'center',
            flexDirection: 'row',
            alignItems: 'center',
            bottom: 10,
            right: 10,
            paddingHorizontal: 20,
        },
        addButtonText: {
            fontSize: 12,
        },
        scroll: {
            marginBottom: 65,
        },
        subheading: {
            paddingHorizontal: 20,
            paddingVertical: 10,
            fontWeight: 'bold',
            fontSize: 18,
        }
    }
)

export default TodoListScreen