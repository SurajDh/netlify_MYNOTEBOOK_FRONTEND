import './App.css';
import { useState } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import NoteState from './context/notes/NoteState';
import Alert from './components/Alert';
import Login from './components/Login';
import Signup from './components/Signup';
import ViewNote from './components/ViewNote';
import Profile from './components/Profile';


function App() {

  const [alert, setAlert] = useState(null);

  const showAlert = (message, type)=>{
    setAlert({
      msg: message,
      type: type
    })
    setTimeout(() => {
        setAlert(null);
    }, 3000);
}

const [username, setUsername] = useState('');
  return (
    <>
      <NoteState>
        <Router>
          <Navbar username={username} setUsername={setUsername}/>

          <Alert alert={alert}/>
          <div className="container">
            <Routes>
              <Route exact path="/" element={<Home showAlert={showAlert}/>} />
              <Route exact path="/home" element={<Home showAlert={showAlert}/>} />
              <Route exact path="/About" element={<About />}/>
              <Route exact path="/login" element={<Login showAlert={showAlert}/>}/>
              <Route exact path="/signup" element={<Signup showAlert={showAlert}/>}/>
              <Route exact path="/viewnote" element={<ViewNote showAlert={showAlert}/>}/>
              <Route exact path="/profile" element={<Profile showAlert={showAlert} setUsername={setUsername}/>}/>
            </Routes>
          </div>
        </Router>
      </NoteState>
    </>
  );
}

export default App;
