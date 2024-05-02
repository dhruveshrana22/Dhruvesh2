import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useRef, useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Button } from 'react-native-paper';
import * as Animatable from 'react-native-animatable';
import { useSelector } from 'react-redux';

function HomeScreen() {
    const navigation = useNavigation();
    const [saleAdded, setSaleAdded] = useState(false);
    const sales = useSelector(state => state.sales.sales);
    console.log("salesdata" ,sales);
    const textRef = useRef(null);

    useEffect(() => {
        const intervalId = setInterval(() => {
            if (textRef.current) {
                textRef.current.bounceIn(1000);
            }
        }, 5000);

        return () => {
            clearInterval(intervalId); // Cleanup interval on component unmount
        };
    }, []);

    const handleGoto = () => {
        navigation.navigate("Sale");
    };

    const handleAddTransaction = () => {

        setSaleAdded(true);
        console.log('Add New Sale button pressed');
    };

    return (
        <View style={{ flex: 1, backgroundColor: "#E4F2FF", justifyContent: 'center', alignItems: 'center' }}>
            {saleAdded ? (
                <View style={{ padding: 20 }}>
                    <Text style={{ textAlign: 'center', fontSize: 18 }}>
                        Sale added successfully!
                    </Text>
                </View>
            ) : (
                <Animatable.View style={{ padding: 20 }} ref={textRef}>
                    <Animatable.Text style={{ textAlign: 'center', fontSize: 18 }}>
                        Hey! You have not added any transactions yet. Add your first transaction now.
                    </Animatable.Text>
                    <Button
                        mode="contained"
                        color="red"
                        onPress={handleGoto}
                        style={{
                            borderRadius: 30,
                            marginTop: 20,
                            padding: 5
                        }}
                    >
                        Add New Sale
                    </Button>
                </Animatable.View>
            )}

        </View>
    );
}

export default HomeScreen;
