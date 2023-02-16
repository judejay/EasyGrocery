import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getMemoizedNumItems } from '../../features/cartSlice';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';

const NavBar = () => {
    const cartTotalQuantity = useSelector(getMemoizedNumItems);
    return (
        <div className="nav-bar">
            <Link to="/">
                <h2>Easy Groceries</h2>
            </Link>
            <Link to="/cart">
                <div className="nav-bag">
                    <FontAwesomeIcon icon={faShoppingCart} />
                    <span className="bag-quantity">
                        <span>{cartTotalQuantity}</span>
                    </span>
                </div>
            </Link>
        </div>
    );
};

export default NavBar;
