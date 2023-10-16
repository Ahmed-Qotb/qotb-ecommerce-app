import './App.css';
import { RouterProvider, createBrowserRouter, createHashRouter } from 'react-router-dom';
import Home from './Components/Home/Home'
import Products from './Components/Products/Products'
import Cart from './Components/Cart/Cart'
import Brands from './Components/Brands/Brands'
import Login from './Components/Login/Login'
import Register from './Components/Register/Register'
import Categories from './Components/Categories/Categories'
import Layout from './Components/Layout/Layout'
import Notfound from './Components/Notfound/Notfound'
import CouterContextProvider, { couterContext } from './context/CounterContext';
import UserContextProvider, { UserContext } from './context/UserContext';
import { useContext } from 'react';
import ProtectedRoute from './Components/ProtectedRoute/ProtectedRoute';
import LogedIn from './Components/LogedIn/LogedIn';
import ProductDetails from './Components/ProductDetails/ProductDetails';
import { CartContextProvider } from './context/CartContext';
import WishList from './Components/WishList/WishList';
import toast, { Toaster } from 'react-hot-toast';
import Address from './Components/Address/Address';
import { WishListContextProvider } from './context/WishListContext';

let routes = createHashRouter([
  {
    path: '/', element: <Layout />, children: [
      { index: true, element: <ProtectedRoute><Home /></ProtectedRoute> },
      { path: 'Home', element: <ProtectedRoute><Home /></ProtectedRoute> },
      { path: 'allorders', element: <ProtectedRoute><Home /></ProtectedRoute> },
      { path: 'Products', element: <ProtectedRoute><Products /></ProtectedRoute> },
      { path: 'ProductDetails/:id', element: <ProtectedRoute><ProductDetails /></ProtectedRoute> },
      { path: 'Cart', element: <ProtectedRoute><Cart /></ProtectedRoute> },
      { path: 'address', element: <ProtectedRoute><Address /></ProtectedRoute> },
      { path: 'wishList', element: <ProtectedRoute><WishList /></ProtectedRoute> },
      { path: 'Categories', element: <ProtectedRoute><Categories /></ProtectedRoute> },
      { path: 'Brands', element: <ProtectedRoute><Brands /></ProtectedRoute> },
      { path: 'Login', element: <LogedIn><Login /></LogedIn> },
      { path: 'Register', element: <LogedIn><Register /></LogedIn> },
    ]
  }
])

function App() {


  return <UserContextProvider>
    <CartContextProvider>
      <WishListContextProvider>
        <RouterProvider router={routes}></RouterProvider>
        <Toaster />
      </WishListContextProvider>
    </CartContextProvider>
  </UserContextProvider>

}

export default App;
