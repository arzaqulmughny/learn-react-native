/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {Alert, Button, SafeAreaView, Text, View} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

function App(): React.JSX.Element {
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
        }}>
        <Text style={{fontSize: 100, color: 'white'}}>{counter}</Text>
        <View style={{flexDirection: 'row', columnGap: 12}}>
          <Button
            title="Kurangi"
            onPress={() => adjustCounter(counter - 1)}
            color="gray"
          />
          <Button title="Tambah" onPress={() => adjustCounter(counter + 1)} />
        </View>
      </View>
    </SafeAreaView>
  );
}

export default App;
