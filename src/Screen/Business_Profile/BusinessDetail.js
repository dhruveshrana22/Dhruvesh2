import React, { useState } from 'react';
import {
    View,
    TextInput,
    Text,
    TouchableOpacity,
    StyleSheet,
    KeyboardAvoidingView,
    ScrollView,
    Platform,
    Modal,
    Image
} from 'react-native';
import SignaturePad from 'react-native-signature-canvas';
import { WebView } from 'react-native-webview';

const CustomTextInput = ({ placeholder, value, onChangeText, title, isActive }) => {
    return (
        <View style={{ position: 'relative' }}>
            <Text style={{
                position: 'absolute',
                top: 10,
                left: 20,
                backgroundColor: '#F2F2F2',
                paddingHorizontal: 10,
                zIndex: 2,
            }}>
                {title}
            </Text>
            <TextInput
                placeholder={placeholder}
                value={value}
                onChangeText={onChangeText}
                style={{
                    marginVertical: 15,
                    borderWidth: isActive ? 2 : 1,
                    borderColor: isActive ? 'blue' : 'black',
                    borderRadius: 5,
                    paddingHorizontal: 10,
                }}
            />
        </View>
    );
};

const ErrorText = ({ error }) => {
    return <Text style={{ color: 'red', marginTop: 5, marginBottom: 5 }}>{error}</Text>;
};

const BusinessCard = ({ data }) => {
    return (
        <View style={styles.card}>
            <Text style={styles.cardTitle}>{data.businessName}</Text>
            <Text style={styles.cardText}>{data.email}</Text>
            <Text style={styles.cardText}>{data.businessAddress}</Text>
            {/* Add more fields as needed */}
        </View>
    );
};

const BusinessDetail = () => {
    const [currentTab, setCurrentTab] = useState('Basic Detail');
    const [activeInput, setActiveInput] = useState(null);
    const [isSignatureModalVisible, setSignatureModalVisible] = useState(false);

    const [businessDetails, setBusinessDetails] = useState({});
    const [errors, setErrors] = useState({
        signature: '',
        businessName: '',
        GSTIN: '',
        email: '',
        businessAddress: '',
        description: '',
        pincode: '',
    });

    const handleInputChange = (field, value) => {
        setBusinessDetails({ ...businessDetails, [field]: value });
    };

    const handleSave = () => {
        const requiredFields = ['signature', 'businessName', 'GSTIN', 'email', 'businessAddress', 'description', 'pincode'];

        for (const field of requiredFields) {
            if (businessDetails[field] === '') {
                setErrors({ ...errors, [field]: `${field} is required` });
                return;
            } else {
                setErrors({ ...errors, [field]: '' });
            }
        }

        console.log('Saved successfully');
    };

    const sampleBusinessCards = [
        {
            businessName: 'Example Business 1',
            email: 'example1@example.com',
            businessAddress: '123 Main St, City, Country',
        },
        {
            businessName: 'Example Business 2',
            email: 'example2@example.com',
            businessAddress: '456 Oak St, Town, Country',
        },
        // Add more examples as needed
    ];

    const handleSignatureSave = (signature) => {
        setBusinessDetails({ ...businessDetails, signature });
        setSignatureModalVisible(false);
    };

    const signaturePadOptions = {
        onOK: handleSignatureSave,
        descriptionText: 'Sign here',
        clearText: 'Clear',
        confirmText: 'Save',
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={{ flex: 1 }}
        >
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                <View style={{ flex: 1 }}>
                    <View style={{ flex: 1, position: 'relative' }}>
                        {currentTab === 'Basic Detail' && (
                            <View style={{ padding: 20 }}>
                                <TouchableOpacity
                                    onPress={() => setSignatureModalVisible(true)}
                                >
                                    <View>
                                        <Text>Tap to sign</Text>
                                        <View style={{
                                            marginVertical: 15,
                                            borderWidth: activeInput === 'signature' ? 2 : 1,
                                            borderColor: activeInput === 'signature' ? 'blue' : 'black',
                                            borderRadius: 5,
                                            paddingHorizontal: 10,
                                            height: 8 * 20,
                                            justifyContent: 'center',
                                        }}>
                                            {businessDetails.signature ? (
                                                <Image
                                                    source={{ uri: businessDetails.signature }}
                                                    style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                                                />
                                            ) : (
                                                <Text style={{ textAlign: 'center' }}>Create Your Signature</Text>
                                            )}
                                        </View>
                                    </View>
                                </TouchableOpacity>
                                <ErrorText error={errors.signature} />
                            </View>
                        )}
                        {currentTab === 'Business Detail' && (
                            <View style={{ padding: 20 }}>
                                {sampleBusinessCards.map((cardData, index) => (
                                    <BusinessCard key={index} data={cardData} />
                                ))}
                            </View>
                        )}
                    </View>
                </View>

                <Modal
                    visible={isSignatureModalVisible}
                    animationType="slide"
                    transparent={true}
                >
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <View style={{ width: '80%', height: '60%' }}>
                            <SignaturePad {...signaturePadOptions} />
                            <TouchableOpacity
                                onPress={() => setSignatureModalVisible(false)}
                                style={{ marginTop: 10, padding: 30, alignSelf: 'center' }}
                            >
                                <Text>Cancel</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>


            </ScrollView>
        </KeyboardAvoidingView>
    );
};
const styles = StyleSheet.create({
    buttonContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    saveButton: {
        backgroundColor: 'red',
        padding: 20,
    },
    cancelButton: {
        backgroundColor: 'grey',
        padding: 20,
    },
    buttonText: {
        color: 'white',
    },
    cardContainer: {
        padding: 20,

        flex: 1,
    },
    card: {
        backgroundColor: '#FFFFFF',
        borderRadius: 10,
        padding: 20,
        marginBottom: 20,
        elevation: 3,
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    cardText: {
        fontSize: 16,
        marginBottom: 5,
    },
});

export default BusinessDetail;
