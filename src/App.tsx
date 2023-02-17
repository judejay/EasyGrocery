import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import Products from './components/Products/Products';
import Navbar from './components/Navbar/Navbar';
import CartDrawer from './components/cart/CartDrawer';

function App() {
    const [openCart, setOpenCart] = useState(false);

    return (
        <div className="App">
            <Navbar openCart={openCart} setOpenCart={setOpenCart}></Navbar>
            <CartDrawer openCart={openCart} setOpenCart={setOpenCart}></CartDrawer>
            <Products></Products>
        </div>
    );
}

export default App;
