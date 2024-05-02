import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; // You may need to install this library for the share icon

function MyComponent({ onSave }) {
    const handleSaveNew = () => {
        // Add logic for Save & New
        console.log('Save & New pressed');
    };

    const handleSave = () => {
        // Add logic for Save
        onSave();
        console.log('Save pressed');
    };

    const handleShare = () => {
        // Add logic for share
        console.log('Share pressed');
    };

    return (
        <View style={{ flexDirection: 'row', backgroundColor: 'white', }}>
            {/* Save & New Button */}
            <TouchableOpacity
                onPress={handleSaveNew}
                style={{ padding: 10, left: 0, width: "50%" }}
            >
                <Text style={{ color: 'black', textAlign: 'center' }}>Save & New</Text>
            </TouchableOpacity>

            {/* Save Button */}
            <TouchableOpacity
                onPress={handleSave}
                style={{ backgroundColor: 'blue', padding: 10, width: "40%" }}
            >
                <Text style={{ color: 'white', textAlign: 'center' }}>Save</Text>
            </TouchableOpacity>

            {/* Share Icon Button */}
            <TouchableOpacity
                onPress={handleShare}
                style={{ padding: 10, width: 40 }}
            >
                <Icon name="share" size={20} color="blue" />
            </TouchableOpacity>
        </View>
    );
}

export default MyComponent;
