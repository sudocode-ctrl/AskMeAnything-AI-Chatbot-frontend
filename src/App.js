
import './App.css';
import Home from './components/Home/Home';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import About from './components/About/About';
import Login from './components/Login/Login';
import Signup from './components/Signup/Signup';
import ThreadState from './context/threadState';
function App() {
  return (

    <div className="App">
      <ThreadState>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/*" element={<Login />}> </Route>
            <Route path="/signup" element={<Signup />}> </Route>
            <Route path="/home" element={<Home />}> </Route>
            <Route path="/about" element={<About />}></Route>
          </Routes>
        </Router>
      </ThreadState>

    </div>
  );
}

export default App;
