import React, {useState} from 'react';
import {View, Text, TextInput, TouchableOpacity, FlatList} from 'react-native';

export default function components() {
  const [techs, setTechs] = useState([]);
  const [newTech, setNewTech] = useState('');

  function handleAdd() {
    setTechs([...techs, newTech]);
    setNewTech('');
  }

  return (
    <View>
      <TextInput
        testID="tech-input"
        value={newTech}
        onChangeText={setNewTech}
      />

      <FlatList
        data={techs}
        keyExtractor={tech => tech}
        renderItem={({item}) => <Text>{item}</Text>}
      />

      <TouchableOpacity onPress={handleAdd}>
        <Text>Adicionar</Text>
      </TouchableOpacity>
    </View>
  );
}
