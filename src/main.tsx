import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { Provider } from 'react-redux';
import App from './App.tsx'
import store from './state/store';

import { HashRouter } from 'react-router-dom';

createRoot(document.getElementById('root')!).render(
<Provider store = {store}>
  <HashRouter>
  <StrictMode>
    <App />
  </StrictMode>
  </HashRouter>
  </Provider>

)
