import './App.css';
import {Routes, Route} from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { Toaster } from 'react-hot-toast'
import { UserContextProvider } from '../../server/context/userContext';
import axios from 'axios';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import CreateListing from './pages/CreateListing';
import ListingDetail from './components/listingDetail';



axios.defaults.baseURL = 'http://localhost:8000'
axios.defaults.withCredentials = true

function App() {

  return (
    <UserContextProvider>
     <Toaster position='bottom-right' toastOptions={{duration: 2000}} />
     <Routes>
      <Route path ='/' element={<Home />} />
      <Route path='/home' element={<Home />} />
      <Route path ='/register' element={<Register />} />
      <Route path ='/login' element={<Login />} />
      <Route path ='/create' element={<CreateListing />} />
      <Route path='/listing/:id' element={<ListingDetail />} />
     </Routes>
     </UserContextProvider>
  )
}

export default App