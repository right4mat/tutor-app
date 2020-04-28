import * as React from 'react';
import { Platform, StatusBar, StyleSheet, View , AsyncStorage} from 'react-native';
import { SplashScreen } from 'expo';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import useLinking from './navigation/useLinking';

import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import { Notifications } from 'expo';

import Provider from './context/Provider';

import AuthSwitch from './navigation/AuthSwitch';

import Loading from './components/Loading';



export default function App(props) {
  const [isLoadingComplete, setLoadingComplete] = React.useState(false);
  const [isRendering, setIsRendering] = React.useState(true);
  const [initialNavigationState, setInitialNavigationState] = React.useState();
  const containerRef = React.useRef();
  const { getInitialState } = useLinking(containerRef);


  // Load any resources or data that we need prior to rendering the app
  React.useEffect(() => {
    //Notifications.addListener((notification)=>console.log("triggered"));

    async function loadResourcesAndDataAsync() {
      try {
        SplashScreen.preventAutoHide();

        // Load our initial navigation state
        setInitialNavigationState(await getInitialState());

        // Load fonts
        await Font.loadAsync({
          ...Ionicons.font,
          'space-mono': require('./assets/fonts/SpaceMono-Regular.ttf'),
        });
      } catch (e) {
        // We might want to provide this error information to an error reporting service
        console.warn(e);
      } finally {
        setLoadingComplete(true);
        SplashScreen.hide();
        setTimeout(()=>setIsRendering(false), 500)
      }
    }

    loadResourcesAndDataAsync();
  }, []);

  

  if (!isLoadingComplete && !props.skipLoadingScreen) {
    return null;
  } else {
    return (
      <Provider>        
        <View style={styles.container}>
          {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
          <NavigationContainer ref={containerRef} initialState={initialNavigationState}>
            {isRendering ? <Loading/> : false}
            <AuthSwitch/>
          </NavigationContainer>
        </View>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
