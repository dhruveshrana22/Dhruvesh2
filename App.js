import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import { View, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import 'react-native-gesture-handler';

import { createDrawerNavigator } from "@react-navigation/drawer";
import StackNavigation from './src/Screen/DrawerNavigator/CombinedNavigator';
import IntroductionScreen from './src/Componant/IntroductionScreen/IntroductionScreen1';
import { persistor, store } from './src/redux/Store/Store';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

function App() {
    const [isFirstLaunch, setIsFirstLaunch] = useState(null);

    useEffect(() => {
        // Check if the app is launched for the first time
        AsyncStorage.getItem('alreadyLaunched').then((value) => {
            if (value === null) {
                // App is launched for the first time
                AsyncStorage.setItem('alreadyLaunched', 'true'); // Set that the app has been launched
                setIsFirstLaunch(true);
            } else {
                // App has been launched before
                setIsFirstLaunch(false);
            }
        });
    }, []);

    if (isFirstLaunch === null) {
        // Still checking if the app is launched for the first time
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }

    return (
        <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
      <NavigationContainer>
            {/* <IntroductionScreen navigation={null} /> // Pass navigation={null} to prevent navigation in IntroductionScreen */}
            {isFirstLaunch ? (
                <IntroductionScreen navigation={null} /> // Pass navigation={null} to prevent navigation in IntroductionScreen
            ) : (
                <StackNavigation />
            )}
        </NavigationContainer>
      </PersistGate>
    </Provider>
    );
}

export default App;
