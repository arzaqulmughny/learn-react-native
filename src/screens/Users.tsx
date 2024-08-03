/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/react-in-jsx-scope */
import {useState} from 'react';
import {
  Alert,
  Button,
  FlatList,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import UserItem from '../components/UserItem';

type UserType = {
  name: string;
  age: number;
};

const Users = () => {
  const [newUserFields, setNewUserFields] = useState({
    name: '',
    age: '',
  });

  const [users, setUsers] = useState<null | UserType[]>(null);

  /**currentUsers
   */

  const onChangeNewUserField = ({
    name,
    value,
  }: {
    name: string;
    value: string;
  }) => {
    setNewUserFields(currentValue => ({...currentValue, [name]: value}));
  };

  /**
   * Create user
   */
  const createUser = () => {
    if (newUserFields.name.length === 0 || newUserFields.age.length === 0) {
      Alert.alert(
        'Data tidak benar',
        'Pastikan Anda mengisi semua data yang diperlukan',
      );

      return;
    }

    const {name, age} = newUserFields;
    if (users) {
      const currentUsers = users || [];
      setUsers([...currentUsers, {name, age: Number(age)}]);
    } else {
      setUsers([{name, age: Number(age)}]);
    }

    // Clear state
    setNewUserFields({name: '', age: ''});
    Alert.alert('Berhasil', 'Pengguna baru ditambahkan');
    return;
  };

  return (
    <SafeAreaView>
      <View style={{padding: 24, rowGap: 48}}>
        <View style={styles.container}>
          <Text style={styles.title}>Tambah Pengguna</Text>
          <TextInput
            value={newUserFields.name}
            onChangeText={text =>
              onChangeNewUserField({name: 'name', value: text})
            }
            placeholderTextColor="gray"
            style={styles.textInput}
            placeholder="Nama Pengguna"
          />
          <TextInput
            keyboardType="numeric"
            value={newUserFields.age}
            onChangeText={text =>
              onChangeNewUserField({name: 'age', value: text})
            }
            placeholderTextColor="gray"
            style={styles.textInput}
            placeholder="Usia"
          />
          <Button title="Tambah" onPress={createUser} />
        </View>
        <View style={{rowGap: 24}}>
          <Text style={styles.title}>Daftar</Text>
          {!users && <Text style={{color: 'gray'}}>Data belum tersedia</Text>}

          {users && users.length > 0 && (
            <ScrollView style={{height: 250}}>
              <View style={{rowGap: 14}}>
                {users.map((user, index) => (
                  <UserItem
                    index={index + 1}
                    name={user.name}
                    age={user.age}
                    key={index}
                  />
                ))}
              </View>
            </ScrollView>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  textInput: {
    borderWidth: 1,
    color: 'black',
    paddingHorizontal: 12,
  },
  container: {
    rowGap: 24,
  },
  title: {
    color: 'black',
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default Users;
