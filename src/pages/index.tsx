import React, {useEffect, useRef} from 'react';
import {View} from 'react-native';
import AddArea from '../components/add_area';
import ErrorArea from '../components/error';
import TodoList from '../components/todo_list';
import useTodoStore from '../store';

export default function IndexPage(): React.JSX.Element {
  const renderCount = useRef(0);
  const init = useTodoStore(state => state.init);

  useEffect(() => {
    init();
  }, []);

  useEffect(() => {
    renderCount.current += 1;
  });

  return (
    <View>
      <AddArea />
      <ErrorArea />
      <TodoList />
    </View>
  );
}
