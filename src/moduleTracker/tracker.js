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
import {loadData, saveModules, saveMC, saveCAP} from "./storage";

function TrackerScreen() {

    // Loads information from async storage on startup
    useEffect(() => {
        loadData(setModulesTaken, setCapTotal, setTotalMC)
    }, []);

    const [capTotal, setCapTotal] = useState(0);
    const [totalMC, setTotalMC] = useState(0);
    /* Stores all the modules taken */
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

    // Delete all modules ever taken. Resets all states and storages
    const deleteAll = () => {
        moduleStateStorageHelper([]);
        capStateStorageHelper(0);
        mcStateStorageHelper(0);
    }

    // updates CAP when a module is deleted
    const updateCAP = (intMC, grade) => {
        const newTotalMC = totalMC - intMC
        const newCapTotal = capTotal - (intMC * gradeMap[grade])
        mcStateStorageHelper(newTotalMC)
        capStateStorageHelper(newCapTotal)
    }

    // updates CAP when a module is edited
    const editCAP = (intMC, grade, newGrade) => {
        const newCAPTotal = capTotal - (intMC * gradeMap[grade]) + (intMC * gradeMap[newGrade])
        capStateStorageHelper(newCAPTotal)
    }

    // Not used
    const refreshCAP = () => {
        let mc = 0;
        let cap = 0
        for (let i = 0; i < modulesTaken.length; i++) {
            mc += parseInt(modulesTaken[i].moduleCredit)
            cap += parseInt(gradeMap[modulesTaken[i].grade]) * parseInt(modulesTaken[i].moduleCredit)
        }

        setTotalMC(mc)
        setCapTotal(cap)
    }

    // Renders core mods that have been taken
    const showCoreModules = () => {
        return(
            modulesTaken.filter(item => item['grade'] !== 'NA' && item['type'] === 'core').map((item, index) => {
                return <Module mod={item} index={modulesTaken.indexOf(item)} modulesTaken={modulesTaken}
                               modulesStateStorageHelper={moduleStateStorageHelper} updateCAP={updateCAP} refreshCAP={editCAP} key={index}/>})
        )
    }

    // Renders core mods that has not been taken
    const showPresetCoreModules = () => {
        return(
            modulesTaken.filter(item => item['grade'] === 'NA' && item['type'] === 'core').map((item, index) => {
                return <Module mod={item} index={modulesTaken.indexOf(item)} modulesTaken={modulesTaken}
                               modulesStateStorageHelper={moduleStateStorageHelper} updateCAP={updateCAP} refreshCAP={editCAP} key={index}/>})
        )
    }

    // Renders UE mods that have been taken
    const showUEModules = () => {
        return(
            modulesTaken.filter(item => item['grade'] !== 'NA' && item['type'] === 'UE').map((item, index) => {
                return <Module mod={item} index={modulesTaken.indexOf(item)} modulesTaken={modulesTaken}
                               modulesStateStorageHelper={moduleStateStorageHelper} updateCAP={updateCAP} refreshCAP={editCAP} key={index}/>})
        )
    }

    // Renders UE mods that have not been taken
    const showPresetUEModules = () => {
        return(
            modulesTaken.filter(item => item['grade'] === 'NA' && item['type'] === 'UE').map((item, index) => {
                return <Module mod={item} index={modulesTaken.indexOf(item)} modulesTaken={modulesTaken}
                               modulesStateStorageHelper={moduleStateStorageHelper} updateCAP={updateCAP} refreshCAP={editCAP} key={index}/>})
        )
    }

    // Renders GE modules that have been taken
    const showGEModules = () => {
        return(
            modulesTaken.filter(item => item['type'] === 'GE').map((item, index) => {
                return <Module mod={item} index={modulesTaken.indexOf(item)} modulesTaken={modulesTaken}
                               modulesStateStorageHelper={moduleStateStorageHelper} updateCAP={updateCAP} refreshCAP={editCAP} key={index}/>})
        )
    }

    // Renders all modules accordingly
    const renderMods = () => {
        if (!modulesTaken.length) {
            return(
                <View style={styles.placeholder}>
                    <Text style={{fontSize: 15,}}>You have no modules taken</Text>
                </View>
            )
        } else {
            return (
                <ScrollView style={styles.scroll}>
                    <Text style={styles.subheading}>General Education Modules</Text>
                    {showGEModules()}
                    <Text style={styles.subheading}>Core Modules</Text>
                    {showCoreModules()}
                    {showPresetCoreModules()}
                    <Text style={styles.subheading}>Unrestricted Electives</Text>
                    {showUEModules()}
                    {showPresetUEModules()}
                </ScrollView>
            )
        }
    }

    // Helper that sets state and storage for modulesTaken
    const moduleStateStorageHelper = (mods) => {
        setModulesTaken(mods);
        saveModules(mods)
    }

    // Helper that sets state and storage for capTotal
    const capStateStorageHelper = (cap) => {
        setCapTotal(cap);
        saveCAP(cap);
    }

    // Helper that sets state and storage for totalMC
    const mcStateStorageHelper = (mc) => {
        setTotalMC(mc);
        saveMC(mc);
    }

    return (
        <SafeAreaView style = {styles.safe(paddingValue)}>
            <View style = {styles.container}>
                <View style={styles.headerRow}>
                    <Text style = {styles.headerText}>Module Tracker</Text>
                    <Text>CAP: {totalMC === 0 ? 'NA' : (capTotal/totalMC).toFixed(2)}</Text>
                    <TouchableOpacity onPress={() => toggleSettingVisibility()}>
                        <Ionicons name="ios-settings-outline" size={28} color="black" />
                    </TouchableOpacity>
                </View>
                <View style = {styles.tasks}>
                    {renderMods()}
                </View>
            </View>


            <TouchableOpacity onPress={() => toggleAddVisibility()} style={styles.addButton}>
                <Text style={styles.addButtonText}>+</Text>
            </TouchableOpacity>

            {/* Add modal */}
            <Modal onBackButtonPress={() => toggleAddVisibility()} onBackdropPress={() => toggleAddVisibility()}
                   isVisible={addVisibility} backdropOpacity={0.3} backdropColor={'#878787'} style={styles.modal}>
                <NewMod navigation={() => toggleAddVisibility()} modulesStateStorageHelper={moduleStateStorageHelper} modulesTaken={modulesTaken}
                        moduleList={moduleData} totalMC={totalMC} mcStateStorageHelper={mcStateStorageHelper} capTotal={capTotal} capStateStorageHelper={capStateStorageHelper} gradeMap={gradeMap}/>
            </Modal>

            {/* Settings modal */}
            <Modal onBackButtonPress={() => toggleSettingVisibility()} onBackdropPress={() => toggleSettingVisibility()}
                   isVisible={settingVisibility} backdropOpacity={0.3} backdropColor={'#878787'} style={styles.modal} onModalHide={() => showDelete()}>
                <Settings navigation={() => toggleSettingVisibility()} toggleDelete={() => toggleToShowDelete()}
                          modulesStateStoregeHelper={moduleStateStorageHelper} modulesTaken={modulesTaken} moduleList={moduleData} />
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

export default TrackerScreen