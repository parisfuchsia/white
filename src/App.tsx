import { useSelector, useDispatch } from 'react-redux'
import './App.css';

import { lazy, Suspense, useEffect, useState } from 'react';
import { Routes, Route, Outlet, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion';
import { CircleLoader } from 'react-spinners';
import { getTheme } from './state/themeSlice.ts'


const Summary = lazy(() => import('./components/summary.tsx'));
const History = lazy(() => import('./components/transactionHistory.tsx'));
const Details = lazy(() => import('./pages/details.tsx'))
const Banner = lazy(() => import("./components/banner.tsx"))

const parentVariant = {
    hidden:{
      opacity:0,
      transition:{
        duration:0.25,
        staggerChildren:0.25,
        staggerDirection:-1,
        when:"afterChildren"
      }
    },
    visible :{
      opacity:1,
      transition:{
        duration:0.25,
        staggerChildren:0.25,
        when:"beforeChildren"
      }
    }
}

  const childVariant = {
    hidden:{ opacity:0 },
    visible :{ opacity:1 }
  }

function App() {
  const dispatch = useDispatch();
  const { theme } = useSelector(state => state.theme);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
     
    dispatch(getTheme())
    
  }, []);
  
  return <div className = {` ${theme === 'dark' && 'dark' }`}>
    <div className = 'dark:bg-gray-800 bg-neutral-100 w-full min-h-screen flex-col items-center flex'>
    <div className = 'w-full'>
    <Banner />
    </div>
    <div className = 'w-11/12 flex flex-col items-center'>
    <Suspense fallback = {
      <div className = 'flex flex-col items-center gap-1 justify-center size-8 w-full'>
        <CircleLoader size = "40" color = "#5eead4"/>
      </div>
    }>
          <Routes>
      <Route path = '/' element = {
      <Summary/>} />
      <Route path = '/transaction/detail/:id' element = {<Details/>} />
    </Routes>
    </Suspense>
    </div>
    </div>
  </div>
}

export default App
