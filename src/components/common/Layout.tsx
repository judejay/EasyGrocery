import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import CartDrawer from '../cart/CartDrawer';
import Checkout from '../Checkout/Checkout';
import Navbar from '../Navbar/Navbar';
import Products from '../Products/Products';
import Footer from './Footer';

function Layout() {
    const [openCart, setOpenCart] = useState(false);
    return (
        <div>
            <Navbar openCart={openCart} setOpenCart={setOpenCart}></Navbar>
            <Routes>
                <Route path="/" element={<Products />} />
                <Route path="checkout" element={<Checkout />} />
            </Routes>{' '}
            <CartDrawer openCart={openCart} setOpenCart={setOpenCart}></CartDrawer>
            <Footer></Footer>
        </div>
    );
}

export default Layout;
