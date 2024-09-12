import { FlatList, StyleSheet, Text, View, TextInput, TouchableOpacity} from 'react-native';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserList } from './CounterAction';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';

const User = () => {
  const dispatch = useDispatch();
  const userList = useSelector((state: any) => state.data.userList);
  const [filteredData, setFilteredData] = useState(userList);
  const [filterKey, setFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [refreshing, setRefreshing] = useState(false);
  const [isAll, setIsAll] = useState(true);
  const [isApproved, setIsApproved] = useState(false);
  const [isInProgress, setIsInProgress] = useState(false);
  const [isClosed, setIsClosed] = useState(false);

  useEffect(() => {
    dispatch(getUserList());
  }, []);

  useEffect(() => {
    applyFilter(filterKey);
  }, [userList,isAll,isApproved,isInProgress,isClosed,searchQuery]);

  const applyFilter = (status: string) => {
    setFilter(status);
    let filtered = userList;
    if (status !== 'All') {
      filtered = filtered.filter((item: any) => item.status === status)
    }
    if (searchQuery) {
      filtered = filtered.filter((item: any) =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    setFilteredData(filtered);
    handleFilter(status);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    applyFilter(filterKey);
  };

    const handleRefresh = () => {
      setRefreshing(true);
      setSearchQuery('');
      // dispatch(getUserList())
      applyFilter(filterKey)
      setRefreshing(false);
    };

  const handleFilter = (status: string) => {
    setIsAll(status === 'All');
    setIsApproved(status === 'Approved');
    setIsInProgress(status === 'InProgress');
    setIsClosed(status === 'Closed');
  };

  return (
    <SafeAreaView>
      <Text style={styles.text}>UserList</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={() => applyFilter('All')}>
          <Text style={isAll ? styles.buttonActive : styles.buttonDef}>All</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => applyFilter('Approved')}>
          <Text style={isApproved ? styles.buttonActive : styles.buttonDef}>Approved</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => applyFilter('InProgress')}>
          <Text style={isInProgress ? styles.buttonActive : styles.buttonDef}>InProgress</Text>
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
        renderItem={({ item }) => (
          <View style={styles.viewContainer}>
            <Text style={styles.title}>{item.id}. {item.title}</Text>
            <Text style={styles.body}>{item.body}</Text>
            <Text style={styles.status}>status : {item.status}</Text>
          </View>
        )}
        // keyExtractor={(item) => item.id.toString()}
       refreshing={refreshing} onRefresh={handleRefresh}
      />
    </SafeAreaView>
  );
};

export default User;

const styles = StyleSheet.create({
  viewContainer: {
    borderWidth: 2,
    borderRadius: 10,
    padding: 5,
    margin: 5,
  },
  text: {
    fontSize: 20,
    fontWeight: '400',
  },
  title: {
    fontSize: 20,
    fontWeight: '400',
    color: '#994D1C',
  },
  body: {
    padding: 5,
    fontSize: 18,
    color: '#31304D',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 10,
  },
  button: {
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#ccc',
  },
  buttonDef: {
    color: '#000',
  },
  buttonActive: {
    color: '#fff',
    fontWeight: 'bold',
  },
  search: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderRadius: 10,
  },
  searchIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
  },
  status: {
    padding: 10,
    fontSize: 18,
    fontWeight: '300',
    color: 'gray',
},
});
