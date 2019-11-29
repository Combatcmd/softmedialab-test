import React, {useState, useEffect} from 'react';
import {Platform, View, Text, Dimensions} from 'react-native';
import styles from './styles'

import CustomFlatList from './CustomFlatList';

function randomColor() {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  return `rgb(${r}, ${g}, ${b})`;
}

const {height} = Dimensions.get('window');

export default function MainScreen() {
  const [mock, setData] = useState(null);

  useEffect(() => {
    const _mock = Array.from({length: 50}).map((e, i) => ({
      index: i,
      text: Platform.OS === 'ios' ? 'ios' : 'android',
      backgroundColor: randomColor(),
    }));
    setData(_mock);
  }, []);

  function renderItem({item}) {
    const {index, text, backgroundColor} = item;
    return (
      <View style={[styles.item, {backgroundColor}]}>
        <Text>{`${index + 1} ${text}`}</Text>
      </View>
    );
  }

  return (
    <CustomFlatList
      stickyIndex={19}
      itemHeight={height / 5}
      data={mock}
      renderItem={renderItem}
      keyExtractor={item => item.index.toString()}
    />
  );
}

