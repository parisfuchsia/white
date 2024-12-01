import { useSelector } from 'react-redux'
import './App.css';
import { lazy, Suspense } from 'react';
import { useState } from 'react';
import { Routes, Route, Outlet } from 'react-router-dom'
import ProceedButton from './buttons/proceedButton.tsx';
import Button from './buttons/button.tsx';
import Loading from './components/Loading.tsx';
import Banner from './components/Banner.tsx';

const Home = lazy(() => import('./pages/Home.tsx'))
const Detail = lazy(() => import('./pages/Detail.tsx'))
const Cart = lazy(() => import('./pages/Cart.tsx'))
const Checkout = lazy(() => import('./pages/Checkout.tsx'))
const TransactionHistory = lazy(() => import('./pages/TransactionHistory.tsx'));
const Transaction = lazy(() => import('./pages/Transaction.tsx'))

function App() {
  const [open, setOpen] = useState(false);
  
  return <div className = 'w-full p-5 flex flex-col items-center gap-5'>
        <Suspense fallback = {<Loading/>}>
    <Banner/>
    <br/>
    <br/>
    <Routes>
      
      <Route path = '/' element = {<Home />} />
      <Route path = '/detail/:id' element = {<Detail />} />
      <Route path = '/cart' element = {<Cart />} />
      <Route path = '/checkout' element = {<Checkout />} />
      <Route path = '/orderplaced' element = {<Transaction/>} />
      <Route path = '/history' element = {<TransactionHistory/>} />
    </Routes>
    </Suspense>
  </div>
}

export default App
