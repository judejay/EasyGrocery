import { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { faShoppingCart, faBars, faWindowClose } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';

import Cart from './Cart';
import { addMembership, IUser } from '../../features/userSlice';
import { RootState } from '../../redux/store/store';
import { IProduct } from '../../redux/api/products/productsSlice';
import { NavLink } from 'react-router-dom';
type CartDrawerProps = {
    openCart: boolean;
    setOpenCart: React.Dispatch<React.SetStateAction<boolean>>;
};

const CartDrawer = ({ openCart, setOpenCart }: CartDrawerProps) => {
    const user: IUser = useAppSelector((state: RootState) => state.user);
    const dispatch = useAppDispatch();
    const items: IProduct[] = useAppSelector((state: RootState) => state.cart.items);
    let noItems = items.length === 0;
    return (
        <Transition.Root show={openCart} as={Fragment}>
            <Dialog as="div" className="relative z-10 " onClose={setOpenCart}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-in-out duration-500"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in-out duration-500"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                </Transition.Child>

                <div className="fixed inset-0 overflow-hidden">
                    <div className="absolute inset-0 overflow-hidden">
                        <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                            <Transition.Child
                                as={Fragment}
                                enter="transform transition ease-in-out duration-500 sm:duration-700"
                                enterFrom="translate-x-full"
                                enterTo="translate-x-0"
                                leave="transform transition ease-in-out duration-500 sm:duration-700"
                                leaveFrom="translate-x-0"
                                leaveTo="translate-x-full"
                            >
                                <Dialog.Panel className="pointer-events-auto relative w-screen max-w-md">
                                    <Transition.Child
                                        as={Fragment}
                                        enter="ease-in-out duration-500"
                                        enterFrom="opacity-0"
                                        enterTo="opacity-100"
                                        leave="ease-in-out duration-500"
                                        leaveFrom="opacity-100"
                                        leaveTo="opacity-0"
                                    >
                                        <div className="absolute top-0 left-0 -ml-8 flex pt-4 pr-2 sm:-ml-10 sm:pr-4">
                                            <button
                                                type="button"
                                                className="rounded-md text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
                                                onClick={() => setOpenCart(false)}
                                            >
                                                <span className="sr-only">Close panel</span>
                                                {/* <XMarkIcon className="h-6 w-6" aria-hidden="true" /> */}
                                                <FontAwesomeIcon icon={faWindowClose} />
                                            </button>
                                        </div>
                                    </Transition.Child>
                                    <div className="flex h-full flex-col overflow-y-scroll bg-white py-6 shadow-xl">
                                        <div className="   px-4 sm:px-6">
                                            <Dialog.Title className=" mx-8  text-lg font-medium text-gray-900">
                                                <FontAwesomeIcon className="h-6 w-6" aria-hidden="true" icon={faShoppingCart} /> Shopping Cart
                                            </Dialog.Title>
                                        </div>
                                        <div className="relative mt-6 flex-1 px-4 sm:px-6">
                                            {/* Replace with your content */} <Cart></Cart>
                                            <div className="my-8">
                                                {noItems ? (
                                                    <div> </div>
                                                ) : (
                                                    <>
                                                        <button
                                                            className=" mx-5   bg-gray-300 hover:bg-gray-700 hover:text-white text-white px-3 py-2 rounded-md text-sm font-medium "
                                                            aria-current="page"
                                                            onClick={() => setOpenCart(false)}
                                                        >
                                                            <NavLink to="checkout">Checkout</NavLink>
                                                        </button>{' '}
                                                        <button
                                                            onClick={() => dispatch(addMembership(user))}
                                                            className="bg-red-300 hover:bg-gray-700 hover:text-white text-white px-3 py-2 rounded-md text-sm font-medium"
                                                        >
                                                            Membership £5.00
                                                        </button>
                                                    </>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
    );
};

export default CartDrawer;
