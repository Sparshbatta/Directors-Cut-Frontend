import './index.css';
import Navbar from './components/Navbar';
import Panel from './components/Panel';
import Modal from './components/Modal'
import Details from './components/Details'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Footer from './components/Footer'
import { useState } from 'react';
import axios from 'axios';

function App() {

  const [showModal, setShowModal] = useState(false);
  const [records, setRecords] = useState([])
  const [id, setID] = useState('')
  const [mode, setMode] = useState('')
  const retrieveRecords = async () => {
      const response = await axios.get('http://127.0.0.1:5000/artists')
      setRecords(response.data.data)
  }
  return (
    <Router>
      <div className="App">
        <Navbar setShowModal={setShowModal} mode={mode} setMode={setMode}/>
          <Routes>
            <Route exact path='/' element={<Panel setID={setID} setMode={setMode} setShowModal={setShowModal} records={records} setRecords={setRecords} retrieveRecords={retrieveRecords}/>}/>
            <Route exact path='/director/:id' element={<Details />}/>
          </Routes>
        <Footer />
      </div>
      {showModal && <Modal id={id} mode={mode} records={records} setRecords={setRecords} retrieveRecords={retrieveRecords} setShowModal={setShowModal} entity='director'/>}
    </Router>
  );
}

export default App;