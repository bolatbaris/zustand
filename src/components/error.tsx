import React from 'react';
import {Text} from 'react-native';
import useTodoStore from '../store';

export default function ErrorArea() {
  const error = useTodoStore(state => state.error);
  if (!error) {
    return <></>;
  }

  return <Text style={{color: 'red'}}>{error}</Text>;
}
