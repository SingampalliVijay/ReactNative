import { FlatList, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Icon from 'react-native-vector-icons/FontAwesome'

const Categories = () => {
  const [category, setCategory] = useState<any[]>([])
  const [filteredData, setFilteredData] = useState<any[]>([])
  const [searchQuery, setSearchQuery] = useState('');
  const [refreshing, setRefreshing] = useState(false);
  const url = 'https://api.escuelajs.co/api/v1/categories';
  const fetchData = async () => {
    const users_data = await fetch(url);
    let data = await users_data.json();
    setCategory(data);
    setFilteredData(data);
  };
  useEffect(() => {
    setTimeout(() => {
      fetchData();
    });
  }, [])
  const applyFilter = () => {
    let filtered = category;
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
            <View style={styles.card}>
              <Image source={{ uri: item.image }} style={styles.img} />
              <View style={styles.list}>
                <Text style={styles.title}>{item.name}</Text>
                <Text style={{ margin: 10 }}>{item.creationAt}</Text>
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
export default Categories
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FCDE70'
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
    padding: 15,
    borderRadius: 15,
    shadowRadius: 3,
  },
  img: {
    height: 200,
    width: '40%',
    borderTopLeftRadius: 15,
    borderBottomLeftRadius: 15
  },
  card: {
    borderWidth: 0.7,
    borderRadius: 15,
    margin: 5,
    flexDirection: 'row',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    backgroundColor: 'white',
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    fontStyle: 'italic',
    color: 'black',
    margin: 10
  },
  body: {
    padding: 5,
    fontSize: 18,
    color: 'gray'
  },
  input: {
    flex: 1,
    height: 40,
    color: '#000',
  },
  list: {
    marginTop: 20,
    marginLeft: 5,
    width: '60%',
    marginBottom: 20
  },
})