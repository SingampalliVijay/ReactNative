import { SafeAreaView, StyleSheet, Text, View, FlatList, Image, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { REMOVE_PRODUCT_DATA, SET_PRODUCT_DATA } from '../../redux/CounterAction';

const Cart = () => {
    const cartList = useSelector((state: any) => state.cart.cartList);
    const [refreshing, setRefreshing] = useState(false);
    const [count, setCount] = useState(0)
    const [totalPrice, setTotalPrice] = useState(0)
    const [discount, setDiscount] = useState(0)
    const [totalAmount, setTotalAmount] = useState(0)
    const dispatch = useDispatch();

    useEffect(() => {
        let price = 0;
        console.log('Array ----- ', cartList)
        if (cartList !== undefined) {
            setCount(cartList.length)
            for (let i = 0; i < cartList.length; i++) {
                price = price + cartList[i].price
                if (cartList[i].quantity > 1) {
                    setTotalPrice(cartList[i].quantity * price)
                    setDiscount(totalPrice * 0.1)
                } else {
                    setTotalPrice(price)
                    setDiscount(price * 0.1)
                }
            }
            setTotalAmount(totalPrice - discount)
        }
    });

    console.log('Cart Data --> ', cartList)
    const handleRefresh = () => {
        setRefreshing(true);
        dispatch({ type: SET_PRODUCT_DATA, data: cartList })
        setRefreshing(false);
    };

    const handleRemove = (product: any) => {
        const updatedCart = cartList.filter((item: any) => item.id !== product);
        console.log(' From Cart _____ Updatedcart', updatedCart)
        dispatch({ type: REMOVE_PRODUCT_DATA, data: updatedCart })
    };

    return (
        <SafeAreaView>
            <Text style={styles.cart}>Cart</Text>
            <FlatList
                data={cartList}
                renderItem={({ item }) => {
                    return (
                        <SafeAreaView>
                            <View style={styles.card}>
                                <Image source={{ uri: item.images[0] }} style={styles.img} />
                                <View style={styles.list}>
                                    <Text style={styles.title}>{item.title}</Text>
                                    <Text style={{ margin: 10 }}>Qty : {item.quantity}</Text>
                                    <View style={{ flexDirection: 'row' }}>
                                        <Text style={{ fontSize: 25, marginLeft: 10, color: 'black' }}>${item.price}</Text>
                                        <TouchableOpacity style={styles.remove} onPress={() => handleRemove(item.id)} >
                                            <Text style={styles.removeText}>Remove</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        </SafeAreaView>
                    )
                }
                }
                refreshing={refreshing} onRefresh={handleRefresh}
            />
            <View style={styles.detailsCard}>
                <View style={{ borderBottomWidth: 0.2 }}>
                    <Text style={styles.cartDetails}>Product Details</Text>
                    <Text style={styles.price}> Price ({count} items)                        - $ {totalPrice}</Text>
                    <Text style={styles.price}> Discount                                  - $ {Math.round(discount)}</Text>
                </View>
                <View>
                    <Text style={styles.totalAmount}> Total Amount                          - $ {Math.round(totalAmount)}</Text>
                    <Text style={styles.saving}> You will save $ {Math.round(discount)} on this Order</Text>
                </View>
            </View>
        </SafeAreaView>
    );
};


export default Cart;

const styles = StyleSheet.create({
    cart: {
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 30,
        margin: 10,
        color: '#16325B'
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginLeft: 10,
        color: '#125B9A'
    },
    cartItem: {
        padding: 10,
        marginVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    img: {
        height: 180,
        width: 130
    },
    card: {
        borderWidth: 0.7,
        margin: 5,
        flexDirection: 'row',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        backgroundColor: 'white',
    },
    list: {
        marginTop: 20,
        marginLeft: 5,
        margin: '40%',
        marginBottom: 20
    },
    remove: {
        borderWidth: 1,
        borderRadius: 10,
        borderColor: 'black',
        justifyContent: 'center',
        alignItems: 'center',
        width: 140,
        height: 30,
        marginTop: 5,
        marginLeft: 40,
        backgroundColor: '#FCDE70'
    },
    removeText: {
        fontSize: 20,
        fontWeight: '400',
        color: 'black'
    },
    detailsCard: {
        borderRadius: 0.7,
        borderColor: 'black',
        borderWidth: 1,
        padding: 10,
        margin: 13,
        width: '93%',
        marginTop: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        backgroundColor: 'white',
    },
    cartDetails: {
        fontSize: 25,
        color: '#16325B',
        padding: 10
    },
    price: {
        fontSize: 20,
        color: 'black',
        fontWeight: '300',
        marginLeft: 10
    },
    totalAmount: {
        fontSize: 20,
        color: 'black',
        fontWeight: '300',
        margin: 10,
        borderBottomWidth: 0.2
    },
    saving: {
        fontSize: 20,
        color: 'green',
        fontWeight: '300',
        margin: 10
    }
}
);
