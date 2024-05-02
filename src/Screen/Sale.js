import React, { useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    TouchableWithoutFeedback,
} from 'react-native';
import { Modal, TextInput, Button } from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';
import Salecontent from '../Componant/IntroductionScreen/SaleInputcontent';
import Save_ShareButtoncomponant from '../Componant/IntroductionScreen/Save&NewButton';
import MyComponent from '../Componant/IntroductionScreen/Save&NewButton';
import { useDispatch } from 'react-redux';
import { addItem } from '../redux/SaleItemaction';

function Sale() {
    const [modalVisible, setModalVisible] = useState(false);
    const [invoiceNo, setInvoiceNo] = useState('');
    const [invoicePrefix, setInvoicePrefix] = useState('');
    const [selectedDate, setSelectedDate] = useState(new Date()); // Initialize with the current date
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [savedInvoiceNo, setSavedInvoiceNo] = useState('');
    const dispatch = useDispatch();



    const handleDatePress = () => {
        setShowDatePicker(true);
    };

    const handleDateChange = (event, date) => {
        setShowDatePicker(false);
        if (date) {
            setSelectedDate(date);
        }
    };
    const handleInvoicePress = () => {
        // Set the modalVisible state to true
        setModalVisible(true);

        // Generate or fetch the invoice number and update savedInvoiceNo
        // Replace this with your logic to get the invoice number
        setSavedInvoiceNo();
    };
    let invoiceCounter = 0;

    const generateOrFetchInvoiceNumber = () => {
        // Increment the counter
        invoiceCounter += 1;

        // Format the invoice number as needed
        const formattedInvoiceNumber = `INV-${invoiceCounter}`;

        return formattedInvoiceNumber;
    };




    return (
        <View style={{ flex: 1, backgroundColor: '#E4F2FF' }}>
            <View
                style={{
                    width: '100%',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: 10,
                    paddingHorizontal: 40,
                    backgroundColor: 'white',
                }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <TouchableOpacity onPress={handleInvoicePress}>
                        <Text style={{ fontWeight: 'bold', fontSize: 18, color: 'black' }}>
                            Invoice No.
                        </Text>
                        <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                            <Text style={{ fontSize: 20, marginRight: 10, color: 'black' }}>
                                {savedInvoiceNo}
                            </Text>
                            <Text style={{ fontSize: 20, color: 'black' }}>v</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <Text style={{ fontSize: 30 }}>|</Text>
                <View style={{ flexDirection: 'column' }}>
                    <Text
                        style={{
                            marginLeft: 10,
                            textAlign: 'center',
                            fontSize: 20,
                            color: 'black',
                        }}>
                        Date
                    </Text>
                    <Text
                        style={{
                            marginLeft: 10,
                            textAlign: 'center',
                            fontSize: 20,
                            color: 'black',
                        }}
                        onPress={handleDatePress}>
                        {selectedDate.toISOString().split('T')[0]}
                    </Text>
                </View>
            </View>

            {showDatePicker && (
                <DateTimePicker
                    style={{ width: 200 }}
                    value={selectedDate}
                    mode="date"
                    placeholder="Select date"
                    format="YYYY-MM-DD"
                    confirmBtnText="Confirm"
                    cancelBtnText="Cancel"
                    onChange={handleDateChange}
                />
            )}
            {/* Main Content */}
            <View style={{ flex: 1, padding: 25, }}>
                <Salecontent
                    invoicePrefix={invoicePrefix}
                    invoiceNo={invoiceNo}
                    selectedDate={selectedDate}
                    savedInvoiceNo={savedInvoiceNo}
                />
            </View>

            {/* Modal */}
            <Modal visible={modalVisible} onDismiss={() => setModalVisible(false)}>
                <View style={{ padding: 20, backgroundColor: 'white', borderRadius: 10 }}>
                    <TouchableOpacity
                        onPress={() => setModalVisible(false)}
                        style={{ alignSelf: 'flex-end' }}>
                        <Text style={{ marginLeft: 10, fontSize: 30 }}> X </Text>
                    </TouchableOpacity>

                    <View
                        style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
                        <Text style={{ fontWeight: 'bold', fontSize: 18 }}>Invoice No.</Text>
                        <Text style={{ fontSize: 20, marginLeft: 5, color: 'black' }}>
                            {invoicePrefix}
                            {invoiceNo}
                        </Text>
                    </View>

                    <TextInput
                        label="Invoice Prefix"
                        value={invoicePrefix}
                        onChangeText={text => setInvoicePrefix(text)}
                        style={{ marginVertical: 10 }}
                    />


                    <Button
                        mode="contained"
                        // onPress={handleSave}
                        style={{ backgroundColor: 'blue', color: 'white' }}>
                        Save
                    </Button>
                </View>
            </Modal>




        </View>
    );
}

export default Sale;
