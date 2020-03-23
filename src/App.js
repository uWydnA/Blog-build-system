import React from 'react';
import BlogRouter from './router/index'
import { Provider } from 'react-redux'
import store from './redux/store'
import './App.css';
function App() {
  return (
    <div className="App" style={{ height: '100%' }}>
      <Provider store={store}>
        <BlogRouter></BlogRouter>
      </Provider>
    </div>
  );
}

export default App;
