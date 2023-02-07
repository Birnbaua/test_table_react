import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.js';
import Instruction from './components/instruction/Instruction';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NavigationBar from './components/NavigationBar';
import MatchTable from './components/table/MatchTable';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <NavigationBar/>
        <Routes>
          <Route exact path="/" element={<MatchTable/>}></Route>
          <Route path="/contact" element={<Instruction/>}>  </Route>
          <Route path="/about" element={<MatchTable/>}></Route>
          <Route path="*"></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
