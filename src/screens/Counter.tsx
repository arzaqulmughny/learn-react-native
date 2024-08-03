/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/exhaustive-deps */
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useState, useEffect} from 'react';
import {Alert, SafeAreaView, View, Text, Button} from 'react-native';

/**
 * Counter screen
 */
const Counter = ({ navigation }) => {
  const [counter, setCounter] = useState<number>(0);
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  /**
   * Update counter state
   */
  const adjustCounter = (newValue: number) => {
    if (newValue >= 0) {
      setCounter(newValue);
    } else {
      Alert.alert('Mencapai Batas', 'Nilai tidak boleh kurangi dari 0');
    }
  };

  /**
   * Store data to storage
   */
  const storeData = async () => {
    try {
      await AsyncStorage.setItem('counter', `${counter}`);
    } catch (error) {
      Alert.alert('Terjadi Kesalahan', 'Gagal menyimpan data ke penyimpanan');
    }
  };

  /**
   * Fetch data from storage
   */
  const fetchData = async () => {
    try {
      const data = await AsyncStorage.getItem('counter');
      if (data) {
        setCounter(JSON.parse(data));
      }
    } catch (error) {
      Alert.alert('Terjadi Kesalahan', 'Gagal mengambil data dari penyimpanan');
    }
  };

  useEffect(() => {
    if (isInitialLoad) {
      fetchData();
      setIsInitialLoad(false);
    }

    storeData();
  }, [counter, isInitialLoad]);

  return (
    <SafeAreaView>
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          height: '100%',
          rowGap: 14,
        }}>
        <Text style={{fontSize: 100, color: 'black'}}>{counter}</Text>
        <View style={{flexDirection: 'row', columnGap: 12}}>
          <Button
            title="Kurangi"
            onPress={() => adjustCounter(counter - 1)}
            color="gray"
          />
          <Button title="Tambah" onPress={() => adjustCounter(counter + 1)} />
        </View>
        <Button title="Pengguna" onPress={() => navigation.navigate('Users')} />
      </View>
    </SafeAreaView>
  );
};

export default Counter;
