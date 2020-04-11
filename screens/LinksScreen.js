import { Ionicons } from '@expo/vector-icons';
import * as WebBrowser from 'expo-web-browser';
import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { RectButton, ScrollView } from 'react-native-gesture-handler';
import AvenirText from '../components/avenirText';
import Colors from '../constants/Colors'

export default function LinksScreen({navigation}) {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <View style={styles.headerBanner}>
        <View>
          <View style={styles.profilePic}>
            <Ionicons name={'md-person'} size={50} color="rgba(212,175,54,0.7)" />
          </View>
          <View style={styles.editIcon}>
            <Ionicons name={'ios-create'} size={16} color="rgba(212,175,54,0.7)" />
          </View>
        </View>
        <View style={styles.headerText}>
          <AvenirText style={{fontSize:40}} text={"Luke D."}/>
          <AvenirText style={{fontSize:18, color: "#d3d3d3"}} text={"lukesdaniels@gmail.com"}/>
        </View>
      </View>
      <OptionButton
        icon="ios-paper"
        label="My basic Info"
        onPress={() => navigation.navigate('BasicInfo')}
      />

      <OptionButton
        icon="ios-card"
        label="My card"
        onPress={() => navigation.navigate('CardDetails')}
      />

      <OptionButton
        icon="ios-log-out"
        label="Logout"
        onPress={() => alert("this will log you out")}
        isLastOption
      />

      <OptionButton
        icon="ios-trash"
        label="Delete account"
        onPress={() => alert("this will delete your account")}
        isLastOption
      />
    </ScrollView>
  );
}


function OptionButton({ icon, label, onPress, isLastOption }) {
  return (
    <RectButton style={[styles.option, isLastOption && styles.lastOption]} onPress={onPress}>
      <View style={styles.optionContainer}>
        <View style={styles.optionIconContainer}>
          <Ionicons name={icon} size={30} color={Colors.secondaryLight} />
        </View>
        <View style={styles.optionTextContainer}>
          <AvenirText style={styles.optionText} text={label}/>
        </View>
      </View>
    </RectButton>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  contentContainer: {
    padding: 15,
  },
  optionIconContainer: {
    marginRight: 12,
  },
  optionContainer: {
    flexDirection:"row",
    borderTopColor:"#d3d3d3",
    borderBottomColor:"#d3d3d3",
    borderTopWidth: .5,
    
    paddingHorizontal: 20,
    paddingVertical: 30,
    
  },
  option: {
    backgroundColor: '#fff',
    
    
  },
  lastOption: {
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  optionText: {
    fontSize: 18,
    alignSelf: 'flex-start',
    marginTop: 1,
    
  },
  headerBanner:{
    height:80,
    marginBottom:40,
    marginTop:20,
    padding: 15,
    display:"flex",
    justifyContent:"space-between",
    alignItems: "flex-start",
    flexDirection:"row"
  },
  profilePic:{
    position: "absolute",
    top: 0,
    left:0,
    width: 80,
    height: 80,
    borderRadius: 80/2,
    backgroundColor: "rgba(212,175,54,.2)",
    display:"flex",
    justifyContent:"center",
    alignItems:"center",
  },
  editIcon:{
    position:"absolute",
    top: 50,
    left:50,
    width: 30,
    height: 30,
    backgroundColor:"#fff",
    borderWidth: 1,
    borderColor:"rgba(212,175,54,1)",
    borderRadius: 30/2,
    display:"flex",
    justifyContent:"center",
    alignItems:"center",
  },
  headerText:{
    width:"70%"
  }
});
