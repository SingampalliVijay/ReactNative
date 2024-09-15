import { FlatList, Image, Pressable, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Icon from 'react-native-vector-icons/FontAwesome'
import productsData from '../../assets/products.json';

const Products = ({ navigation }: any) => {
  const [products, setProducts] = useState<any[]>([])
  const [filteredData, setFilteredData] = useState<any[]>([])
  const [searchQuery, setSearchQuery] = useState('');
  const [refreshing, setRefreshing] = useState(false);
  const url = 'https://api.escuelajs.co/api/v1/products';
  const fetchData = async () => {
    const users_data = await fetch(url);
    // let data = await users_data.json();
    // // console.log('___json', data);
    // setProducts(data)
    // setFilteredData(data)

    // Local Data
    setProducts(productsData);
    setFilteredData(productsData);
  };
  useEffect(() => {
    setTimeout(() => {
      fetchData();
    });
  }, [])
  const applyFilter = () => {
    let filtered = products;
    if (searchQuery) {
      filtered = filtered.filter((item) =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    setFilteredData(filtered);
  };
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    applyFilter();
  };
  const handleRefresh = () => {
    setRefreshing(true)
    setSearchQuery('')
    fetchData().then(() => {
      setRefreshing(false);
    });
  }

  const handleProducts = (product: any) => {
    navigation.navigate('ProductsDetails', { product });
  };

  return (
    <View style={styles.container} >
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
            <Pressable onPress={() => handleProducts(item)}>
              <View style={styles.card}>
                <Image source={{ uri: item.images[0] }} style={styles.img} />
                <View style={styles.list}>
                  <Text style={styles.title}>{item.title}</Text>
                  <Text style={{ margin: 10, paddingTop: 10 }}>{item.creationAt}</Text>
                  <Text style={{ fontSize: 25, marginLeft: 10, color: 'black' }}>${item.price}</Text>
                </View>
              </View>
            </Pressable>
          )
        }}
        refreshing={refreshing}
        onRefresh={handleRefresh}
      />
    </View>
  )
}
export default Products
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ECDFCC'
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
  textContainer: {
    fontSize: 20,
    fontWeight: '600',
    color: 'black'
  },
  listContainer: {
    width: '100%',
    padding: 20,
    borderRadius: 15,
    shadowRadius: 3,
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
  title: {
    fontSize: 20,
    fontWeight: '600',
    fontStyle: 'italic',
    color: 'black',
    marginLeft: 5
  },
  input: {
    flex: 1,
    height: 40,
    color: '#000',
  },
  list: {
    marginTop: 20,
    marginLeft: 5,
    margin: '40%',
    marginBottom: 20
  },
  detailsContainer: {
    padding: 20,
    alignItems: 'center',
  },
  detailImage: {
    height: 200,
    width: '80%',
    borderRadius: 15,
  },
  detailTitle: {
    fontSize: 24,
    fontWeight: '600',
    margin: 10,
  },
  detailText: {
    fontSize: 18,
    marginVertical: 5,
  },
  backButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#2196F3',
    borderRadius: 5,
  },
  backButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  footer: {
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ddd',
  },
});
