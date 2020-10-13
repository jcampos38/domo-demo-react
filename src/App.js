import React from 'react';
import Menu from './components/Menu'
import Container from './components/Container'
import './App.css';

const App = (props) => {
  const {
    children
  } = props;
  console.log(props)
  return (
    <div className="App">
      <Menu/>
      <Container content={children}/>
    </div>
  );
}

export default App;
