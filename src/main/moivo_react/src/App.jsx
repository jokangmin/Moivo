import React from 'react';
import Main_index from './components/Main_index';
import MainProvider from './contexts/MainContext';

const App = () => {
  return (
    <div>

      <MainProvider>
      <Main_index />
      </MainProvider>
    </div>
  );
};

export default App;