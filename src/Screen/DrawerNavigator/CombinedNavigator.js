// CombinedNavigator.js
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Sale from '../Sale';
import Business_Profile from '../Business_Profile/BusinessProfile';
import CustomDrawerContent from './CustomDrawerContent';
import HomeScreen from '../HomeScreen';
import item from '../item';
import Item from '../item';
import ProductList from '../ProductAdd/ProductAdd';
import ProductDetail from '../ProductAdd/ProductDetail';
import { SaleProvider } from '../Sale/SaleContext';


const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();
const CombinedNavigator = () => {
    return (
        <Drawer.Navigator
            initialRouteName="HomeStack"
            drawerContent={(props) => <CustomDrawerContent {...props} />}

        >
            <Drawer.Screen name="HomeScreen" component={HomeScreen} />
            <Drawer.Screen name="ProducAdd" component={ProductList} />
            <Drawer.Screen name="ProductDetail" component={ProductDetail} />
        </Drawer.Navigator>
    );
};

const StackNavigation = () => {
    return (<SaleProvider>
        <Stack.Navigator
            screenOptions={{
                ...TransitionPresets.SlideFromRightIOS,
            }}>
            <Stack.Screen
                name="Home"
                component={CombinedNavigator}
                options={{ headerShown: false }}
            />



            <Stack.Screen
                name="Sale"
                component={Sale}
            />

            <Stack.Screen
                name="Add Items to Sale"
                component={Item}
            />
            <Stack.Screen
                name="Business_Profile"
                component={Business_Profile}
            />
        </Stack.Navigator>
    </SaleProvider>
    );
};

// const CustomTabNavigator = () => {
//     return (
//         <Tab.Navigator
//             screenOptions={({ route }) => ({
//                 tabBarIcon: ({ focused, color, size }) => {
//                     let iconName;

//                     if (route.name === 'Home') {
//                         iconName = focused ? 'home' : 'home-outline';
//                     } else if (route.name === 'Detail') {
//                         iconName = focused ? 'list' : 'list-outline';
//                     }

//                     return <Icon name={iconName} size={size} color={color} />;
//                 },
//             })}
//             tabBarOptions={{
//                 activeTintColor: 'tomato',
//                 inactiveTintColor: 'gray',
//             }}>
//             <Tab.Screen name="Home" component={StackNavigation} />
//             <Tab.Screen name="Detail" component={Detail} />
//         </Tab.Navigator>
//     );
// };



export default StackNavigation;
