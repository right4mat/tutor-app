import {Ionicons} from '@expo/vector-icons';
import * as React from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity,
    AsyncStorage,
    KeyboardAvoidingView,
    SafeAreaView
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview'
import {RectButton, ScrollView} from 'react-native-gesture-handler';
import AvenirText from '../components/avenirText';

import Context from '../context/Context';
import Colors from '../constants/Colors';

import {UpdateUser} from '../services/UserData';

export default function BasicInfo({navigation}) {
    const {firstName, setFirstName} = React.useContext(Context);
    const {lastName, setLastName} = React.useContext(Context);
    const {phone, setPhone} = React.useContext(Context);
    const {email} = React.useContext(Context);
    const {address} = React.useContext(Context);
    const {about, setAbout} = React.useContext(Context);

    const [firstNamePossible, setFirstNamePossible] = React.useState(firstName);
    const [lastNamePossible, setLastNamePossible] = React.useState(lastName);
    const [phonePossible, setPhonePossible] = React.useState(phone);
    const [aboutPossible, setAboutPossible] = React.useState(about);


    const save = async () => {
        try {
            await AsyncStorage.setItem('firstName', firstNamePossible);
            await AsyncStorage.setItem('lastName', lastNamePossible);
            await AsyncStorage.setItem('phone', phonePossible);
            await AsyncStorage.setItem('about', aboutPossible);
            setFirstName(firstNamePossible);
            setLastName(lastNamePossible);
            setPhone(phonePossible);
            setAbout(aboutPossible);
            UpdateUser();
            navigation.goBack()
        } catch (error) {
            console.warn(error.message);
        }
        
    }

    return (
        <SafeAreaView style={{flex:1}}>
        <KeyboardAwareScrollView
      style={styles.container}
    >
        <TextInput 
        returnKeyType='done'
        style={
                styles.textInput
            }
            onChangeText={
                text => setFirstNamePossible(text)
            }
            value={firstNamePossible}
            placeholder="First name"/>
        <TextInput returnKeyType='done' style={
                styles.textInput
            }
            onChangeText={
                text => setLastNamePossible(text)
            }
            value={lastNamePossible}
            placeholder="Last name"/>
        <TextInput returnKeyType='done' style={
                styles.textInput
            }
            onChangeText={
                text => setPhonePossible(text)
            }
            value={phonePossible}
            placeholder="Phone"
            keyboardType="numeric"/>
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
        <TextInput returnKeyType='done' style={
                styles.textInputDisabled
            }
            value={email}
            editable={false}/>

        <TextInput returnKeyType='done'
        style={
            [styles.textInput,{minHeight:100}]
        }
            multiline={true}
            numberOfLines={10}
            onChangeText={text => setAboutPossible(text)}
            maxLength={300}
            value={aboutPossible}
            placeholder="A bit about yourself..."
            />

        <TouchableOpacity style={
                styles.button
            }
            onPress={save}>
            <Text style={
                styles.buttonText
            }>Save</Text>
        </TouchableOpacity>
    </KeyboardAwareScrollView>
        </SafeAreaView>
        );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 15,
    },
    textInput: {
        padding: 15,
        minHeight: 40,
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
        backgroundColor: Colors.secondary,

        marginBottom:200
    },
    buttonText: {
        alignSelf: 'center',
        fontSize: 18,
        color: "#fff",
    },
    textInputDisabled: {
        padding: 15,
        minHeight: 40,
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
