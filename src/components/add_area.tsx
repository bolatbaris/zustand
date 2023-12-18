import React, {useEffect, useRef} from 'react';
import {Button, TextInput, View} from 'react-native';
import useTodoStore from '../store';

export default function AddArea() {
  const inputText = useTodoStore(state => state.inputText);
  const setInputText = useTodoStore(state => state.setInputText);
  const addTodo = useTodoStore(state => state.addTodo);
  const loading = useTodoStore(state => state?.loading);

  const renderCount = useRef(0);

  useEffect(() => {
    renderCount.current += 1;
  });

  return (
    <View style={{backgroundColor: 'white', padding: 10}}>
      <TextInput
        style={{
          width: '100%',
          borderWidth: 1,
        }}
        value={inputText}
        onChangeText={setInputText}
      />
      <Button
        disabled={inputText.length === 0 || !!loading}
        title="Add TODO"
        onPress={addTodo}
      />
    </View>
  );
}
