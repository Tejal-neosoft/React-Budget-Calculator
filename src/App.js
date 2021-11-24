import {BrowserRouter,Route,Routes} from 'react-router-dom'
import './App.css';
import Login from './components/Login';
import Registration from './components/Registration';
import Home from './components/Home';

function App() {
  return (
    <div >
     
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login/>}/>
          <Route path="/register" element={<Registration/>}/>
          <Route path="/home" element={<Home/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
