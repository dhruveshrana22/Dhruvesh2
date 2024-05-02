// Import the necessary dependencies
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { Button, Menu, Divider, Provider, TextInput } from 'react-native-paper';
import { useDispatch } from 'react-redux';
import { addSaleItem } from '../redux/itemaction';
import { useNavigation } from '@react-navigation/native';
import { useSaleContext } from './Sale/SaleContext';

function Item() {
    const [itemName, setItemName] = useState('');
    const [quantity, setQuantity] = useState('');
    const [unit, setUnit] = useState('');
    const [rate, setRate] = useState('');
    const [taxType, setTaxType] = useState('');
    const [isUnitMenuVisible, setUnitMenuVisible] = useState(false);
    const [isTaxMenuVisible, setTaxMenuVisible] = useState(false);
    const [discount, setDiscount] = useState('');
    const { addSaleData } = useSaleContext();
    // Use the useNavigation hook to get the navigation object
    const navigation = useNavigation();
    const dispatch = useDispatch();

    const calculateSubtotal = () => {
        // Ensure rate and quantity are valid numbers
        const rateValue = parseFloat(rate) || 0;
        const quantityValue = parseFloat(quantity) || 0;

        // Calculate Subtotal
        const subtotal = rateValue * quantityValue;

        return `₹${subtotal.toFixed(2)}`; // Format subtotal to display as currency
    };

    const calculateTotalAmount = () => {
        // Ensure rate, quantity, and discount are valid numbers
        const rateValue = parseFloat(rate) || 0;
        const quantityValue = parseFloat(quantity) || 0;
        const discountValue = parseFloat(discount) || 0;

        // Calculate Subtotal   
        const subtotal = rateValue * quantityValue;

        // Calculate the discount amount based on the percentage
        const discountAmount = (subtotal * discountValue) / 100;

        // Calculate Total Amount after applying the discount
        const totalAmount = subtotal - discountAmount;

        return `₹${totalAmount.toFixed(2)}`; // Format totalAmount to display as currency
    };

    const handleUnitMenuOpen = () => setUnitMenuVisible(true);
    const handleTaxMenuOpen = () => setTaxMenuVisible(true);

    const handleUnitSelect = (selectedUnit) => {
        setUnit(selectedUnit);
        setUnitMenuVisible(false);
    };

    const handleTaxSelect = (selectedTax) => {
        setTaxType(selectedTax);
        setTaxMenuVisible(false);
    };

    const handleSave = () => {
        const saleData = {
            itemName,
            quantity,
            unit,
            rate,
            taxType,
            discount,
            totalAmount: calculateTotalAmount(),
        };

        addSaleData(saleData);
        console.log('Saved successfully');
        navigation.goBack();
    };
    return (
        <Provider>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={{ flex: 1 }}
            >
                <View style={{ flex: 1, padding: 20, backgroundColor: '#E4F2FF' }}>
                    {/* Item Name */}
                    <TextInput
                        label="Item Name"
                        value={itemName}
                        onChangeText={(text) => setItemName(text)}
                        onFocus={() => console.log('Item Name Input Focused')}
                        style={{ marginBottom: 10 }}
                    />

                    {/* Quantity and Unit Row */}
                    <View style={{ flexDirection: 'row', marginBottom: 10, width: '100%', alignItems: "center" }}>
                        <TextInput
                            label="Quantity"
                            value={quantity}
                            onChangeText={(text) => setQuantity(text)}
                            onFocus={() => console.log('Quantity Input Focused')}
                            style={{ marginRight: 10, width: '50%' }}
                        />

                        <View style={{ width: '50%', height: 'auto', backgroundColor: '#E7E0EC' }}>
                            <Menu
                                visible={isUnitMenuVisible}
                                onDismiss={() => setUnitMenuVisible(false)}
                                anchor={
                                    <TouchableOpacity onPress={handleUnitMenuOpen}>
                                        <View
                                            style={{
                                                width: '50%',
                                                padding: 10,
                                                borderRadius: 5,
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                            }}
                                        >
                                            <Text>{unit ? unit : 'Select Unit'}</Text>
                                        </View>
                                    </TouchableOpacity>
                                }
                                style={{ marginTop: 40 }}
                            >
                                <Menu.Item onPress={() => handleUnitSelect('Unit 1')} title="Unit 1" />
                                <Menu.Item onPress={() => handleUnitSelect('Unit 2')} title="Unit 2" />
                                {/* Add more units as needed */}
                            </Menu>
                        </View>
                    </View>

                    {/* Rate and Tax Dropdown Row */}
                    <View style={{ flexDirection: 'row', marginBottom: 10 }}>
                        <TextInput
                            label="Rate"
                            value={rate}
                            onChangeText={(text) => setRate(text)}
                            onFocus={() => console.log('Rate Input Focused')}
                            style={{ flex: 1, marginRight: 10 }}
                        />
                    </View>

                    <ScrollView>
                        <View style={{ flex: 1, backgroundColor: '#E4F2FF', gap: 50, padding: 30 }}>
                            {/* Subtotal Row */}
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <Text style={{ marginTop: 8, fontWeight: 'bold', fontSize: 18, color: 'blue' }}>Subtotal:</Text>
                                <View style={{ borderWidth: 1, borderRadius: 10, padding: 8, borderColor: 'blue', marginLeft: 10 }}>
                                    <Text style={{ fontSize: 18 }}>{calculateSubtotal()}</Text>
                                </View>
                            </View>

                            {/* Discount Row */}
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: "center" }}>
                                <Text style={{ marginRight: 10, fontWeight: 'bold', fontSize: 18, color: 'blue' }}>Discount:</Text>
                                <TextInput
                                    value={discount}
                                    onChangeText={(text) => setDiscount(text)}
                                    onFocus={() => console.log('Discount Input Focused')}
                                    style={{ width: "22%", borderWidth: 1, borderRadius: 10, borderColor: 'blue', }}
                                />
                            </View>

                            {/* Total Amount Row */}
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <Text style={{ fontWeight: 'bold', fontSize: 18, color: 'blue' }}>Total Amount:</Text>
                                <View style={{ borderWidth: 1, borderRadius: 10, padding: 8, borderColor: 'blue', marginLeft: 10 }}>
                                    <Text style={{ fontSize: 18 }}>{calculateTotalAmount()}</Text>
                                </View>
                            </View>
                        </View>
                    </ScrollView>

                    <View style={styles.buttonContainer}>
                        <TouchableOpacity
                            onPress={() => console.log('Cancelled')}
                            style={{ flex: 1 }}
                        >
                            <View style={styles.cancelButton}>
                                <Text style={[styles.buttonText, { textAlign: 'center' }]}>
                                    Save & New
                                </Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={handleSave} style={{ flex: 1 }}>
                            <View style={styles.saveButton}>
                                <Text style={[styles.buttonText, { textAlign: 'center' }]}>
                                    Save
                                </Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </KeyboardAvoidingView>
        </Provider>
    );
}

const styles = StyleSheet.create({
    buttonContainer: {
        position: 'relative',
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    saveButton: {
        backgroundColor: 'red',
        padding: 20,
    },
    cancelButton: {
        backgroundColor: 'gray',
        padding: 20,
    },
    buttonText: {
        color: 'white',
    },
});

export default Item;
