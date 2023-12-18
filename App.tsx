import React from 'react';
import {SafeAreaView} from 'react-native';
import MMKVInstance from './src/db/mmkv';
import IndexPage from './src/pages';

export const mmkvInstance = new MMKVInstance();

export default function App() {
  return (
    <SafeAreaView>
      <IndexPage />
    </SafeAreaView>
  );
}
