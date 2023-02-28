import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { getMemoizedNumItems } from '../../features/cartSlice';
import { Fragment } from 'react';
import { Disclosure, Menu, Transition } from '@headlessui/react';
//import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faBars, faWindowClose } from '@fortawesome/free-solid-svg-icons';
import Logo from '../../logo.svg';
import User from '../../user.jpg';
import { IUser } from '../../features/userSlice';
import { useAppSelector } from '../../redux/hooks';
import { RootState } from '../../redux/store/store';
const navigation = [
    { name: 'eShop', href: '/', current: true },
    { name: 'Checkout', href: 'checkout', current: false }
];

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ');
}

type NavBarProps = {
    openCart: boolean;
    setOpenCart: React.Dispatch<React.SetStateAction<boolean>>;
};

const NavBar = ({ setOpenCart, openCart }: NavBarProps) => {
    //const numItems = useAppSelector(getMemoizedNumItems);
    const user: IUser = useAppSelector((state: RootState) => state.user);

    const cartTotalQuantity = useSelector(getMemoizedNumItems);
    const openCartDrawer = () => {
        setOpenCart(!openCart);
    };
    return (
        <Disclosure as="nav" className="bg-gradient-to-r from-slate-200 to-slate-100">
            {({ open }) => (
                <>
                    <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                        <div className="relative flex h-16 items-center justify-between">
                            <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                                {/* Mobile menu button*/}
                                <Disclosure.Button
                                    className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:b 
                                g-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                                >
                                    <span className="sr-only">Open main menu</span>
                                    {open ? (
                                        <FontAwesomeIcon icon={faWindowClose} />
                                    ) : (
                                        // <XMarkIcon className="block h-6 w-6" aria-hidden="true" /> : <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                                        <FontAwesomeIcon icon={faBars} />
                                    )}
                                </Disclosure.Button>
                            </div>
                            <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                                <div className="flex flex-shrink-0 items-center">
                                    <img className="block h-8 w-auto lg:hidden" src={Logo} alt="Judetec" />
                                    <img className="hidden h-8 w-auto lg:block" src={Logo} alt="Your Company" />
                                    <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">Easy Groceries</span>
                                </div>
                                <div className="hidden sm:ml-6 sm:block">
                                    <div className="flex space-x-4">
                                        {navigation.map((item) => (
                                            <NavLink
                                                key={item.name}
                                                to={item.href}
                                                className={({ isActive }): any => {
                                                    return 'px-3 py-2 rounded-md text-sm font-medium ' + (isActive ? 'bg-gray-900 text-white' : 'text-gray-900 hover:bg-gray-700 hover:text-white');
                                                }}
                                            >
                                                {item.name}
                                            </NavLink>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                                <button
                                    onClick={openCartDrawer}
                                    type="button"
                                    className="rounded-full bg-white p-1 text-gray-400 hover:text-black focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                                >
                                    <span className="sr-only">View notifications</span>
                                    <FontAwesomeIcon className="h-6 w-6" aria-hidden="true" icon={faShoppingCart} />{' '}
                                    {cartTotalQuantity > 0 ? <span className="font-bold text-red-600 origin-right text-lg"> {cartTotalQuantity} </span> : null}{' '}
                                </button>{' '}
                                {/* Profile dropdown */}
                                <Menu as="div" className="relative ml-3">
                                    <div>
                                        <Menu.Button className="flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 focus:ring-offset-gray-800">
                                            <span className="sr-only">Open user menu</span>
                                            <img className="h-8 w-8 rounded-full" src={User} alt="user icon" />
                                        </Menu.Button>
                                    </div>
                                    <Transition
                                        as={Fragment}
                                        enter="transition ease-out duration-100"
                                        enterFrom="transform opacity-0 scale-95"
                                        enterTo="transform opacity-100 scale-100"
                                        leave="transition ease-in duration-75"
                                        leaveFrom="transform opacity-100 scale-100"
                                        leaveTo="transform opacity-0 scale-95"
                                    >
                                        <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                            <Menu.Item>
                                                {({ active }) => (
                                                    <a href="/" className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}>
                                                        {user.name}
                                                    </a>
                                                )}
                                            </Menu.Item>
                                            <Menu.Item>
                                                {({ active }) => (
                                                    <a href="/" className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}>
                                                        Membership: {user.member.toString()}
                                                    </a>
                                                )}
                                            </Menu.Item>
                                            <Menu.Item>
                                                {({ active }) => (
                                                    <a href="#" className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}>
                                                        Sign out
                                                    </a>
                                                )}
                                            </Menu.Item>
                                        </Menu.Items>
                                    </Transition>
                                </Menu>
                            </div>
                        </div>
                    </div>

                    <Disclosure.Panel className="sm:hidden">
                        <div className="space-y-1 px-2 pt-2 pb-3">
                            {navigation.map((item) => (
                                <Disclosure.Button
                                    key={item.name}
                                    as="a"
                                    href={item.href}
                                    className={classNames(
                                        item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                                        'block px-3 py-2 rounded-md text-base font-medium'
                                    )}
                                    aria-current={item.current ? 'page' : undefined}
                                >
                                    {item.name}
                                </Disclosure.Button>
                            ))}
                        </div>
                    </Disclosure.Panel>
                </>
            )}
        </Disclosure>
    );
};

// <div className="nav-bar">
//     <Link to="/">
//         <h2>Easy Groceries</h2>
//     </Link>
//     <Link to="/cart">
//         <div className="nav-bag">
//             <FontAwesomeIcon icon={faShoppingCart} />
//             <span className="bag-quantity">
//                 <span>{cartTotalQuantity}</span>
//             </span>
//         </div>
//     </Link>
// </div>

export default NavBar;
