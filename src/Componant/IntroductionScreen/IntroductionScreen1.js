import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

const IntroductionScreen = () => {
    const navigation = useNavigation();
    const handleButtonPress = () => {
        navigation.navigate("HomeScreen");
    };

    return (
        <View style={styles.container}>
            <Image source={{ uri: 'https://startupcrow.com/wp-content/uploads/2022/10/vyapar.jpg' }} style={styles.image} />
            <Text style={styles.title}>Welcome to Your App</Text>
            <TouchableOpacity style={styles.button} onPress={handleButtonPress}>
                <Text style={styles.buttonText}>Get Started</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff', // Set your desired background color
    },
    image: {
        width: 200,
        height: 200,
        resizeMode: 'contain', // Adjust the image resizeMode based on your preference
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginVertical: 20,
    },
    button: {
        backgroundColor: '#3498db', // Set your desired button color
        paddingVertical: 15,
        paddingHorizontal: 30,
        borderRadius: 10,
        marginTop: 20,
    },
    buttonText: {
        color: '#fff', // Set your desired text color
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default IntroductionScreen;
