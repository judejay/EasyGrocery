import React from 'react';
import logo from './logo.svg';
import './App.css';
import Products from './components/Products';
import Navbar from './components/Navbar/Navbar';

function App() {
    return (
        <div className="App">
            <Navbar></Navbar>
            <Products></Products>
        </div>
    );
}

export default App;
