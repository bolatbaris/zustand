import React, {useEffect, useRef} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import Todo from '../models/todo.model';
import useTodoStore from '../store';

export default function TodoList() {
  const todoList = useTodoStore(state => state.todoList);
  const renderCount = useRef(0);

  useEffect(() => {
    renderCount.current += 1;
  });

  return (
    <View style={{backgroundColor: 'white', padding: 10}}>
      {todoList
        .sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
        )
        .map(todo => (
          <TodoCard key={todo.id} todo={todo} />
        ))}
    </View>
  );
}

function TodoCard({todo}: {todo: Todo}) {
  const renderCount = React.useRef(0);
  const loading = useTodoStore(state => state?.loading);

  useEffect(() => {
    renderCount.current += 1;
  });

  const disabled = loading === todo.id;

  const toggleTodo = useTodoStore(state => state.toggleTodo);
  return (
    <TouchableOpacity
      onPress={() => toggleTodo(todo.id)}
      disabled={loading === todo.id}
      style={{
        backgroundColor: disabled ? 'gray' : 'white',
        padding: 10,
        margin: 10,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: disabled ? 'gray' : 'black',
      }}>
      <Text style={{color: todo.isDone ? 'green' : 'red'}}>
        {todo.title} {todo.isDone ? 'DONE' : 'OPEN'}
      </Text>
    </TouchableOpacity>
  );
}
