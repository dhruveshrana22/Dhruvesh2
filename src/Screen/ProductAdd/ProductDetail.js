import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal, TextInput } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { updateProduct, deleteProduct } from '../../redux/Productreducer';

const ProductDetail = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.products);

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [updatedName, setUpdatedName] = useState('');
  const [updatedPrice, setUpdatedPrice] = useState('');

  const handleUpdateProduct = (productId, newName, newPrice) => {
    setSelectedProduct({ productId, newName, newPrice });
    setUpdatedName(newName);
    setUpdatedPrice(newPrice.toString());
    setModalVisible(true);
  };

  const handleSaveUpdate = () => {
    dispatch(updateProduct(selectedProduct.productId, updatedName, parseFloat(updatedPrice)));
    setModalVisible(false);
    setSelectedProduct(null); // Reset selectedProduct after update
  };

  const handleCancelUpdate = () => {
    setModalVisible(false);
    setSelectedProduct(null); // Reset selectedProduct on cancel
  };

  const handleDeleteProduct = (productId) => {
    dispatch(deleteProduct(productId));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Product List</Text>
      {products.map((product) => (
        <View key={product.productId} style={styles.productContainer}>
          <Text style={styles.productName}>{product.productName}</Text>
          <Text style={styles.productPrice}>Rs{product.price}</Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              onPress={() => handleUpdateProduct(product.productId, product.productName, product.price)}
              style={[styles.button, { backgroundColor: 'green' }]}
            >
              <Text style={styles.buttonText}>Update</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => handleDeleteProduct(product.productId)}
              style={[styles.button, { backgroundColor: '#FF6347' }]}
            >
              <Text style={styles.buttonText}>Delete</Text>
            </TouchableOpacity>
          </View>
        </View>
      ))}

      {/* Modal for Update */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Update Product</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter updated name"
            value={updatedName}
            onChangeText={(text) => setUpdatedName(text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Enter updated price"
            value={updatedPrice}
            onChangeText={(text) => setUpdatedPrice(text)}
          />
          <View style={styles.modalButtonContainer}>
            <TouchableOpacity onPress={handleSaveUpdate} style={[styles.button, { backgroundColor: 'blue' }]}>
              <Text style={styles.buttonText}>Save</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleCancelUpdate} style={[styles.button, { backgroundColor: '#FF6347' }]}>
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

// Rest of the styles remain the same


// Add these styles for the Modal
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  productContainer: {
    marginBottom: 16,
    padding: 16,
    borderWidth: 2,
    borderColor: '#ddd',
    borderRadius: 10,
    backgroundColor: '#fff',
    elevation: 4, // For shadow on Android
    shadowColor: '#000', // For shadow on iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  productName: {
    fontSize: 18,
    marginBottom: 8,
    color: '#333',
    fontWeight: 'bold',
  },
  productPrice: {
    fontSize: 16,
    marginBottom: 8,
    color: '#666',
  },
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 8,
  },
  button: {
    marginRight: 8,
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },

  modalContainer: {
   flex:1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'gray', // Change modal background color to gray
  },
  modalTitle: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  input: {
    fontSize:25,
    height: 80,
    borderColor: 'black',
    borderWidth: 1,
    marginBottom: 16,
    padding: 8,
    width: '80%',
  },
  modalButtonContainer:{
    flexDirection:'row',
    justifyContent:"space-between"
  }
});

export default ProductDetail;
