import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import Products from './components/Products/Products';
import Navbar from './components/Navbar/Navbar';
import CartDrawer from './components/cart/CartDrawer';
import Layout from './components/common/Layout';

function App() {
    return (
        <div className="App">
            <div className="container min-h-screen flex flex-col mx-auto">
                <Layout></Layout>
            </div>
        </div>
    );
}

export default App;
