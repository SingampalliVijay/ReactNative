import { FlatList, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Icon from 'react-native-vector-icons/FontAwesome'
import { useDispatch, useSelector } from 'react-redux';
const List = () => {
    // const dispatch = useDispatch();
    // const data = useSelector((state: any) => state.list.data);
    // const status = useSelector((state: any) => state.list.status);
    const [data, setData] = useState<any[]>([])
    const [filteredData, setFilteredData] = useState<any[]>([])
    const [filter, setFilter] = useState('All')
    const [searchQuery, setSearchQuery] = useState('');
    const [refreshing, setRefreshing] = useState(false);
    const [isAll, setIsAll] = useState(false);
    const [isApproved, setIsApproved] = useState(false)
    const [isInProgress, setIsInProgress] = useState(false)
    const [isClosed, setIsClosed] = useState(false)
    const url = 'https://jsonplaceholder.typicode.com/posts?_limit=21';
    const fetchData = async () => {
        console.log('__api_call');
        const users_data = await fetch(url);
        let data = await users_data.json();
        data = data.map((item: any, index: number) => ({
            ...item,
            status: index % 3 === 0 ? 'approved' : index % 3 === 1 ? 'inprogress' : 'closed',
        }));
        setData(data);
        setFilteredData(data);
    };
    useEffect(() => {
        setTimeout(() => {
            fetchData();
        });
    }, [])
    const applyFilter = (status: string) => {
        setFilter(status);
        let filtered = data;
        if (status !== 'All') {
            filtered = filtered.filter((item) => item.status === status.toLowerCase());
        }
        if (searchQuery) {
            filtered = filtered.filter((item) =>
                item.title.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }
        setFilteredData(filtered);
        handleFilter(status)
    };
    const handleSearch = (query: string) => {
        setSearchQuery(query);
        applyFilter(filter);
    };
    const handleRefresh = () => {
        setRefreshing(true)
        setSearchQuery('')
        fetchData().then(() => {
            applyFilter(filter);
            setRefreshing(false);
        });
    }
    const handleFilter = (status: string) => {
        setIsAll(status === 'All');
        setIsApproved(status === 'Approved')
        setIsInProgress(status === 'InProgress')
        setIsClosed(status === 'Closed')
    }
    return (
        <View style={styles.container} >
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button} onPress={() => applyFilter('All')}>
                    <Text style={isAll ? styles.buttonActive : styles.buttonDef}>All</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={() => applyFilter('InProgress')}>
                    <Text style={isInProgress ? styles.buttonActive : styles.buttonDef}>InProgess</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={() => applyFilter('Approved')}>
                    <Text style={isApproved ? styles.buttonActive : styles.buttonDef}>Approved</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={() => applyFilter('Closed')}>
                    <Text style={isClosed ? styles.buttonActive : styles.buttonDef}>Closed</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.search}>
                <Icon name="search" size={20} color="#000" style={styles.searchIcon} />
                <TextInput
                    style={styles.input}
                    placeholder="Search Here..."
                    value={searchQuery}
                    onChangeText={handleSearch}
                    placeholderTextColor="#ccc"
                />
            </View>
            <FlatList
                data={filteredData}
                style={styles.listContainer}
                renderItem={({ item }) => {
                    return (
                        <View style={styles.viewContainer}>
                            <Image style={styles.image} source={require('../profile3.jpeg')} />
                            <View style={styles.list}>
                                <Text style={styles.title}> {item.id}. {item.title.slice(0, 20)}</Text>
                                <Text style={styles.body}>{item.body.slice(0, 10)}</Text>
                                <Text style={styles.status}>Status :{item.status}</Text>
                            </View>

                        </View>
                    )
                }}
                refreshing={refreshing}
                onRefresh={handleRefresh}
            />
        </View>
    )
}
export default List
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
        marginBottom: 20,
        paddingTop: 10
    },
    button: {
        backgroundColor: 'transparent',
        borderRadius: 5,
        borderColor: 'black',
        borderWidth: 1,
    },
    buttonActive: {
        backgroundColor: '#6A9C89',
        color: 'black',
        padding: 10
    },
    buttonDef: {
        color: 'black',
        fontWeight: 'bold',
        padding: 10
    },
    listContainer: {
        width: '100%',
        backgroundColor: '#FFFFFF',
        padding: 20,
        borderRadius: 15,
        shadowRadius: 3,
    },
    viewContainer: {
        borderWidth: 2,
        borderRadius: 10,
        padding: 5,
        margin: 5,
        flexDirection: 'row'
    },
    title: {
        fontSize: 20,
        fontWeight: '400',
        color: 'black',

    },
    body: {
        padding: 5,
        fontSize: 18,
        color: 'gray'
    },
    status: {
        padding: 10,
        fontSize: 18,
        fontWeight: '400',
        color: '#31304D',
    },
    search: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 10,
        paddingHorizontal: 10,
        marginVertical: 10,
        width: '90%'
    },
    searchIcon: {
        marginRight: 10,
    },
    input: {
        flex: 1,
        height: 40,
        color: '#000',
    },
    image: {
        height: 120,
        width: 110,
        borderRadius:15,
        margin:5
    },
    list:{
        flexDirection:'column',
        marginTop:20,
        marginLeft:5
    }
})




