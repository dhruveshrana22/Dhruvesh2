import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, TouchableOpacity, View, Modal } from 'react-native';
import { TextInput, Button, Text } from 'react-native-paper';
import MyComponent from './Save&NewButton';
import { useDispatch, useSelector } from 'react-redux';
import { useSaleContext } from '../../Screen/Sale/SaleContext';
import { useNavigation } from '@react-navigation/native';

function Salecontent({ invoiceNo, selectedDate, savedInvoiceNo, invoicePrefix }) {
    const [customer, setCustomer] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null); 
    const [updatedItemName, setUpdatedItemName] = useState('');
    const [updatedQuantity, setUpdatedQuantity] = useState('');
    const [updatedUnit, setUpdatedUnit] = useState('');
    const [updatedRate, setUpdatedRate] = useState('');
    const [updatedTaxType, setUpdatedTaxType] = useState('');
    const [updatedDiscount, setUpdatedDiscount] = useState('');

    const navigation = useNavigation();
    const [items, setItems] = useState([]);
    const [totalAmount, setTotalAmount] = useState(0);
    const dispatch = useDispatch();
    const { saleDataList, clearSaleDataList, deleteSaleData, updateSaleData } = useSaleContext();

    const handleAddItems = () => {
        navigation.navigate("Add Items to Sale");
    };

    const handleSave = () => {
        console.log('Sale data saved successfully');
        setCustomer('');
        setPhoneNumber('');
        setItems([]);
        setTotalAmount(0);
        clearSaleDataList();
        navigation.goBack();
    };

    const handleDelete = (item) => {
        deleteSaleData(item);
    };

    const handleUpdate = () => {
        const updatedItem = {
            ...selectedItem,
            itemName: updatedItemName,
            quantity: updatedQuantity,
            unit: updatedUnit,
            rate: updatedRate,
            taxType: updatedTaxType,
            discount: updatedDiscount
        };

        // Update item in the saleDataList
        updateSaleData(updatedItem);

        // Close the modal
        setModalVisible(false);
    };

    useEffect(() => {
        setItems(saleDataList || []);
    }, [saleDataList]);

    const renderItem = ({ item }) => {
        return (
            <TouchableOpacity onPress={() => {
                setSelectedItem(item);
                setUpdatedItemName(item.itemName);
                setUpdatedQuantity(item.quantity);
                setUpdatedUnit(item.unit);
                setUpdatedRate(item.rate);
                setUpdatedTaxType(item.taxType);
                setUpdatedDiscount(item.discount);
                setModalVisible(true);
            }}>
                <View style={styles.cardContainer}>
                    <View style={styles.cardContent}>
                        <Text style={styles.itemName}>{item.itemName}:</Text>
                        <View style={styles.infoContainer}>
                            <Text style={styles.infoText}>Quantity: {item.quantity}</Text>
                            <Text style={styles.infoText}>Unit: {item.unit}</Text>
                        </View>
                        <View style={styles.infoContainer}>
                            <Text style={styles.infoText}>Rate: {item.rate}</Text>
                            <Text style={styles.infoText}>Tax Type: {item.taxType}</Text>
                        </View>
                        <View style={styles.infoContainer}>
                            <Text style={styles.infoText}>Discount: {item.discount}</Text>
                        </View>
                        <View style={styles.infoContainer}>
                            <Text style={styles.TotalinfoText}>Total Amount: {item.totalAmount}</Text>
                        </View>
                    </View>
                    <View style={styles.deleteButtonContainer}>
                        <TouchableOpacity onPress={() => handleDelete(item)} style={styles.deleteButtonContainer}>
                            <Text style={styles.deleteButtonText}>Delete</Text>
                        </TouchableOpacity>
                        <Button onPress={() => {
                            setSelectedItem(item);
                            setUpdatedItemName(item.itemName);
                            setUpdatedQuantity(item.quantity);
                            setUpdatedUnit(item.unit);
                            setUpdatedRate(item.rate);
                            setUpdatedTaxType(item.taxType);
                            setUpdatedDiscount(item.discount);
                            setModalVisible(true);
                        }}>Update</Button>
                    </View>
                </View>
            </TouchableOpacity>
        );
    };

    const calculateTotalAmount = () => {
        const totalAmount = items.reduce((acc, item) => {
            const rate = parseFloat(item.rate) || 0;
            const quantity = parseFloat(item.quantity) || 0;
            const itemTotal = rate * quantity;
            return acc + itemTotal;
        }, 0);

        return totalAmount.toFixed(2);
    };

    return (
        <>
            <View style={{ padding: 20, backgroundColor: 'white', height: "auto" }}>
                <TextInput
                    label="Customer"
                    value={customer}
                    onChangeText={text => setCustomer(text)}
                    style={{ marginBottom: 10 }}
                />
                <TextInput
                    label="Phone Number"
                    value={phoneNumber}
                    onChangeText={text => setPhoneNumber(text)}
                    style={{ marginBottom: 10 }}
                />
                <Button
                    mode="contained"
                    onPress={handleAddItems}
                    style={{ backgroundColor: '#2196F3', marginBottom: 20 }}
                >
                    Add Items
                </Button>
            </View>
            {saleDataList && (
                <FlatList
                    data={saleDataList}
                    keyExtractor={(item) => item.uniqueIdentifier}
                    renderItem={renderItem}
                />
            )}
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <TextInput
                            label="Item Name"
                            value={updatedItemName}
                            onChangeText={text => setUpdatedItemName(text)}
                            style={styles.inputField}
                        />
                        <TextInput
                            label="Quantity"
                            value={updatedQuantity}
                            onChangeText={text => setUpdatedQuantity(text)}
                            style={styles.inputField}
                        />
                        <TextInput
                            label="Unit"
                            value={updatedUnit}
                            onChangeText={text => setUpdatedUnit(text)}
                            style={styles.inputField}
                        />
                        <TextInput
                            label="Rate"
                            value={updatedRate}
                            onChangeText={text => setUpdatedRate(text)}
                            style={styles.inputField}
                        />
                        <TextInput
                            label="Tax Type"
                            value={updatedTaxType}
                            onChangeText={text => setUpdatedTaxType(text)}
                            style={styles.inputField}
                        />
                        <TextInput
                            label="Discount"
                            value={updatedDiscount}
                            onChangeText={text => setUpdatedDiscount(text)}
                            style={styles.inputField}
                        />
                        <Button onPress={handleUpdate}>Update</Button>
                        <Button onPress={() => setModalVisible(false)}>Cancel</Button>
                    </View>
                </View>
            </Modal>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 30, padding: 40 }}>
                <Text style={{ fontWeight: 'bold', fontSize: 18, marginRight: 10 }}>Total Amount</Text>
                <Text style={{ fontSize: 18 }}>Rs.{calculateTotalAmount()}</Text>
            </View>
            <MyComponent onSave={handleSave} />
        </>
    );
}

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        elevation: 5,
        minWidth: 300,
    },
    inputField: {
        marginBottom: 10,
    },
    cardContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        borderRadius: 10,
        padding: 15,
        marginVertical: 8,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
    },
    deleteButtonContainer: {
        flexDirection: 'column',
        alignItems: 'center',
    },
    deleteButtonText: {
        color: 'white',
        fontWeight: 'bold',
        backgroundColor: 'red',
        padding: 10,
        borderRadius: 5,
        marginRight: 10,
    },
    itemName: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    infoContainer: {
        width: '80%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 5,
    },
    infoText: {
        fontSize: 16,
    },
    TotalinfoText: {
        fontSize: 20,
        fontWeight: '900',
    }
});

export default Salecontent;
