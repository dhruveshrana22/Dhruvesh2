import React, { useState } from 'react';
import { Image, View, Text, TouchableOpacity } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { DrawerContentScrollView, DrawerItem, DrawerItemList } from '@react-navigation/drawer';

const CustomDrawerItem = ({ label, onPress, isExpanded, showDropdown, items }) => {
    return (
        <>
            <DrawerItem
                label=""
                onPress={onPress}
                icon={({ color, size }) => (
                    <TouchableOpacity onPress={onPress} style={{ flexDirection: 'row', alignItems: 'center', padding: 10, }} >
                        <View style={{ justifyContent: 'space-between', flex: 1, flexDirection: 'row' }}>
                            <Text style={{ color: color || 'black', fontSize: 16, textAlign: 'center', marginRight: 5, fontWeight: 'bold' }}>{label}</Text>
                            <AntDesign name={isExpanded ? 'down' : 'up'} size={20} color="black" />
                        </View>
                    </TouchableOpacity>
                )}
            />

            {showDropdown && (
                <DrawerContentScrollView style={{ backgroundColor: '#eee', marginLeft: 16 }}>
                    {items.map((item, index) => (
                        <DrawerItem
                            key={index}
                            label={item.label}
                            onPress={item.onPress}
                            style={{ fontWeight: 'bold' }} // Apply bold font style
                        />
                    ))}
                </DrawerContentScrollView>
            )}
        </>
    );
};

const CustomDrawerContent = (props) => {
    const [isExpanded, setIsExpanded] = useState(true);
    const [isSaleExpanded, setIsSaleExpanded] = useState(true);
    const [isPurchaseExpanded, setIsPurchaseExpanded] = useState(true);
    const [showDropdown, setShowDropdown] = useState(false);
    const [showDropdownPurchases, setShowDropdownPurchases] = useState(false);

    const toggleAdditionalInfo = () => {

        setIsExpanded(!isExpanded);

    };

    const toggleDropdown = () => {
        setIsSaleExpanded(!isSaleExpanded);
        setShowDropdown(!showDropdown);

    };

    const toggleDropdownPurchases = () => {
        setIsPurchaseExpanded(!isPurchaseExpanded);
        setShowDropdownPurchases(!showDropdownPurchases);

    };

    const navigateToNewScreen = () => {
        props.navigation.navigate('Business_Profile');
    };

    const saleItems = [
        { label: 'Sale Invoice', onPress: () => { } },
        { label: 'Payment-In', onPress: () => { } },
        { label: 'Sale Order', onPress: () => { } },
        { label: 'Delivery Challan', onPress: () => { } },
    ];

    const purchaseItems = [
        { label: 'Purchase Bills', onPress: () => { } },
        { label: 'Paymant-Out', onPress: () => { } },
        { label: 'Purches Return (DebitNote)', onPress: () => { } },
        { label: 'Purches Order', onPress: () => { } },
    ];

    return (
        <View style={{ flex: 1, backgroundColor: '#E4F2FF' }}>
            <DrawerContentScrollView {...props}>
                <View style={{ backgroundColor: '#3498db', padding: 16, borderBottomWidth: 1, borderBottomColor: '#fff', alignItems: 'center', justifyContent: 'center' }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <TouchableOpacity onPress={navigateToNewScreen}>
                            <Image
                                source={{ uri: 'https://imgs.search.brave.com/kE6J0DriK5_lyLSn5Ft8PEsvvl6eK3v6V-Ia6mAB7SY/rs:fit:500:0:0/g:ce/aHR0cHM6Ly90My5m/dGNkbi5uZXQvanBn/LzAzLzE5LzE1Lzgw/LzM2MF9GXzMxOTE1/ODAyOV80SktYbTha/Snk3QmFhY2lSM1NC/Nlp1R3hMMW1WR1BS/QS5qcGc' }}
                                style={{ width: 50, height: 50, borderRadius: 25, marginRight: 10 }}
                            />
                        </TouchableOpacity>
                        <View style={{ alignItems: 'center' }}>
                            <Text style={{ color: '#fff', fontSize: 20, fontWeight: 'bold', marginBottom: 5 }}>MyCompany</Text>
                            <Text style={{ color: '#fff', fontSize: 16, marginBottom: 5 }}>8511587821</Text>
                            <TouchableOpacity onPress={toggleAdditionalInfo} style={{ flexDirection: 'row', alignItems: 'center', padding: 10 }} >
                                <Text style={{ color: '#fff', fontSize: 16, textAlign: 'center', marginRight: 5 }}>Change Company</Text>
                                <AntDesign name={isExpanded ? 'down' : 'up'} size={20} color="#fff" />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>

                <DrawerItemList {...props} />

                <CustomDrawerItem
                    label="Sale"
                    onPress={toggleDropdown}
                    isExpanded={isSaleExpanded}
                    showDropdown={showDropdown}
                    items={saleItems}
                    id="sale"
                />

                <CustomDrawerItem
                    label="Purchase"
                    onPress={toggleDropdownPurchases}
                    isExpanded={isPurchaseExpanded}
                    showDropdown={showDropdownPurchases}
                    items={purchaseItems}
                    id="purchase"
                />
            </DrawerContentScrollView>
            <View style={{ alignItems: 'center', bottom: 100 }}>
                <Text style={{ fontSize: 39, fontWeight: 'bold', color: 'gray' }}>Vyapar</Text>
                <Text style={{ fontSize: 14, color: 'grey', marginTop: 5 }}>Crafted by Simply Vyapar Apps Pvt Ltd.</Text>
            </View>
        </View>
    );
};

export default CustomDrawerContent;
