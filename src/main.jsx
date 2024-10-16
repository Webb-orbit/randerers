import { createRoot } from 'react-dom/client';
import './index.css';
import { Provider } from 'react-redux';
import { store } from './store/store.js';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import App from './App.jsx';
import Authlayer from './compos/Authlayer.jsx';
import { Tag } from './utiles/Tag.jsx';
import Dashbord from './pages/Dashbord.jsx';
import { Login } from './compos/Authercompos/Login.jsx';
import Signup from './compos/Authercompos/Signup.jsx';
import { Docunemt } from './pages/Docunemt.jsx';
import Indexdash from './compos/Dashcompos/Indexdash.jsx';
import Indexdoc from './compos/Docucopos/Indexdoc.jsx';
import Aiask from './compos/Docucopos/Optionsboxes/Aiask.jsx';
import { Toast } from './utiles/Toast.jsx';
import Sharepage from './compos/Docucopos/Sharepage.jsx';

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <Toast />
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<App />}>
          <Route path='/' index element={<Tag text={"app home"} />} />
          <Route path='/login' element={<Authlayer autharized={false}><Login /></Authlayer>} />
          <Route path='/signup' element={<Authlayer autharized={false}><Signup /></Authlayer>} />
        </Route>
        <Route path='/test' element={<Aiask />} />

        <Route path='/dashboard' element={<Indexdash />}>
          <Route path='/dashboard' index element={<Dashbord />} />
        </Route>

        <Route path='/doc/:docid' element={<Indexdoc />}>
          <Route path='/doc/:docid' index element={<Docunemt />} />
        </Route>

          <Route path='/share/:shareid'  element={<Sharepage/>} />
      </Routes>
    </BrowserRouter>
  </Provider>,
)
