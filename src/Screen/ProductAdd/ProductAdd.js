import React, { useState } from 'react';
import { View, Text, Button, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { useDispatch } from 'react-redux';
import { addProduct } from '../../redux/Productreducer';

const ProductList = () => {
  const dispatch = useDispatch();

  const [newProductName, setNewProductName] = useState('');
  const [newProductPrice, setNewProductPrice] = useState('');

  const handleAddProduct = () => {
    // Validate input fields before adding
    if (newProductName && newProductPrice) {
      dispatch(addProduct(newProductName, parseFloat(newProductPrice)));
      setNewProductName('');
      setNewProductPrice('');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add New Product:</Text>
      <TextInput
        style={styles.input}
        placeholder="Product Name"
        value={newProductName}
        onChangeText={(text) => setNewProductName(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Product Price"
        value={newProductPrice}
        onChangeText={(text) => setNewProductPrice(text)}
        keyboardType="numeric"
      />
      <TouchableOpacity onPress={handleAddProduct} style={styles.addButton}>
        <Text style={styles.buttonText}>Add Product</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    top:"20%",
    padding: 16,
    justifyContent:'center',

  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  input: {
    height: 60,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 16,
    paddingLeft: 8,
    borderRadius: 8,
  },
  addButton: {
    backgroundColor: '#4CAF50', // Green color
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ProductList;
