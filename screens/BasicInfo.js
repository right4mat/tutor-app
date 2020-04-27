import {Ionicons} from '@expo/vector-icons';
import * as React from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity,
    AsyncStorage
} from 'react-native';
import {RectButton, ScrollView} from 'react-native-gesture-handler';
import AvenirText from '../components/avenirText';

import Context from '../context/Context';
import Colors from '../constants/Colors';

import {UpdateFamily} from '../services/UserData';

export default function BasicInfo({navigation}) {
    const {firstName, setFirstName} = React.useContext(Context);
    const {lastName, setLastName} = React.useContext(Context);
    const {phone, setPhone} = React.useContext(Context);
    const {email} = React.useContext(Context);
    const {address} = React.useContext(Context);

    const [firstNamePossible, setFirstNamePossible] = React.useState(firstName);
    const [lastNamePossible, setLastNamePossible] = React.useState(lastName);
    const [phonePossible, setPhonePossible] = React.useState(phone);


    const save = async () => {
        try {
            await AsyncStorage.setItem('firstName', firstNamePossible);
            await AsyncStorage.setItem('lastName', lastNamePossible);
            await AsyncStorage.setItem('phone', phonePossible);
            setFirstName(firstNamePossible);
            setLastName(lastNamePossible);
            setPhone(phonePossible);
            UpdateUser();
        } catch (error) {
            console.warn(error.message);
        }
        navigation.goBack()
    }

    return (<ScrollView style={
            styles.container
        }
        contentContainerStyle={
            styles.contentContainer
    }>
        <TextInput style={
                styles.textInput
            }
            onChangeText={
                text => setFirstNamePossible(text)
            }
            value={firstNamePossible}
            placeholder="First name"/>
        <TextInput style={
                styles.textInput
            }
            onChangeText={
                text => setLastNamePossible(text)
            }
            value={lastNamePossible}
            placeholder="Last name"/>
        <TextInput style={
                styles.textInput
            }
            onChangeText={
                text => setPhonePossible(text)
            }
            value={phonePossible}
            placeholder="Phone"/>
        <TouchableOpacity style={
                [
                    styles.textInput, {
                        display: "flex",
                        justifyContent: "flex-start",
                        alignItems: "center",
                        flexDirection: "row"
                    }
                ]
            }
            onPress={
                () => navigation.navigate("Location")
        }>
            <View style={
                styles.cardIcon
            }>
                <Ionicons name={'md-pin'}
                    size={22}
                    color={
                        Colors.secondaryLight
                    }/>
            </View>
            <AvenirText style={
                    {
                        fontSize: 18,
                        marginRight: 20
                    }
                }
                text={address}/>
        </TouchableOpacity>
        <TextInput style={
                styles.textInputDisabled
            }
            value={email}
            editable={false}/>

        <TouchableOpacity style={
                styles.button
            }
            onPress={save}>
            <Text style={
                styles.buttonText
            }>Save</Text>
        </TouchableOpacity>

    </ScrollView>);
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    contentContainer: {
        padding: 15,
        paddingTop: 15
    },
    textInput: {
        padding: 10,
        height: 50,
        borderColor: '#d3d3d3',
        borderWidth: 1,
        borderRadius: 5,
        marginBottom: 15,
        fontSize: 18
    },
    button: {
        marginTop: 40,
        padding: 15,
        width: 100,
        borderRadius: 30,
        overflow: "hidden",
        alignSelf: 'flex-end',
        backgroundColor: Colors.secondary
    },
    buttonText: {
        alignSelf: 'center',
        fontSize: 18,
        color: "#fff"
    },
    textInputDisabled: {
        padding: 10,
        height: 50,
        borderColor: '#d3d3d3',
        borderWidth: 1,
        borderRadius: 5,
        marginBottom: 15,
        backgroundColor: "#f3f3f3",
        fontSize: 18
    },
    cardIcon: {
        marginRight: 15
    }


});
