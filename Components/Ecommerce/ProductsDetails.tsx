import { Alert, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch } from 'react-redux';
import { SET_PRODUCT_DATA } from '../redux/CounterAction';
import { useSelector } from 'react-redux';

const ProductDetails = ({ route }: any) => {
    const cart = useSelector((state: any) => state.cart.cartList || []);
    const { product } = route.params;
    const dispatch = useDispatch();

    const handleProducts = (product: any) => {
        console.log("This is Cart --- ", cart);
        const item = cart.find((item: { id: any }) => item.id === product.id);
        if (item) {
            const updatedCart = cart.map((item: { id: any; quantity: number }) => {
                if (item.id === product.id) {
                    return { ...item, quantity: item.quantity + 1 };
                }
                return item;
            });
            dispatch({ type: SET_PRODUCT_DATA, data: updatedCart });
        } else {
            const newProduct = { ...product, quantity: 1 };
            const updatedCart = [...cart, newProduct];
            dispatch({ type: SET_PRODUCT_DATA, data: updatedCart });
        }
        showAlert();
    };

    function showAlert() {
        Alert.alert('Cart', 'Product Added To Cart')
    }

    return (
        <SafeAreaView>
            <View style={styles.detailsContainer}>
                <Image source={{ uri: product.images[0] }} style={styles.detailImage} />
                <Text style={styles.detailTitle}>{product.title}</Text>
                <Text style={styles.detailPrice}>Price : ${product.price}</Text>
                <Text style={styles.detailText}>Description : {product.description}</Text>
                <Text style={styles.detailText}>Created: {product.creationAt}</Text>
                <View style={styles.cartBtn}>
                    <TouchableOpacity onPress={() => handleProducts(product)}>
                        <Text style={styles.cart}>Add To Cart</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>

    );
};

export default ProductDetails;

const styles = StyleSheet.create({
    detailsContainer: {
        marginTop: '15%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    detailImage: {
        height: 250,
        width: '100%',
        borderRadius: 4,
    },
    detailTitle: {
        fontSize: 24,
        fontWeight: '600',
        margin: 10,
        color: 'black',
    },
    detailText: {
        fontSize: 18,
        marginVertical: 5,
        paddingLeft: 20
    },
    detailPrice: {
        fontSize: 18,
        marginVertical: 5,
        color: 'black'
    },
    cartBtn: {
        borderWidth: 1,
        borderRadius: 10,
        borderColor: 'black',
        alignItems: 'center',
        width: 140,
        height: 30,
        marginTop: 20,
        marginLeft: 30,
        backgroundColor: '#FCDE70'
    },
    cart: {
        fontSize: 20,
        color: 'black'
    }
});
