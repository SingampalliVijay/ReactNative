import { SafeAreaView, StyleSheet, Text, View, FlatList, Image } from 'react-native';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SET_PRODUCT_DATA } from '../../redux/CounterAction';

const Cart = () => {
    const cart = useSelector((state: any) => state.cart.cartList);
    const [refreshing, setRefreshing] = useState(false);
    const dispatch = useDispatch();

    console.log('Cart Data --> ', cart)
    const handleRefresh = () => {
        setRefreshing(true);
        dispatch({ type: SET_PRODUCT_DATA, data: cart })
        setRefreshing(false);
    };
    return (
        <SafeAreaView>
            <Text style={styles.cart}>Cart</Text>
            <FlatList
                data={cart}
                renderItem={({ item }) => {
                    return (
                        <View style={styles.card}>
                            <Image source={{ uri: item.images[0] }} style={styles.img} />
                            <View style={styles.list}>
                                <Text style={styles.title}>{item.title}</Text>
                                <Text style={{ margin: 10 }}>Qty : {item.quantity}</Text>
                                <Text style={{ fontSize: 25, marginLeft: 10, color: 'black' }}>${item.price}</Text>
                            </View>
                        </View>
                    )
                }
                }
                refreshing={refreshing} onRefresh={handleRefresh}
            />
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
        width: 130,
        borderTopLeftRadius: 15,
        borderBottomLeftRadius: 15
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
        borderTopLeftRadius: 15,
        borderBottomLeftRadius: 15
    },
    list: {
        marginTop: 20,
        marginLeft: 5,
        margin: '40%',
        marginBottom: 20
    },
});
