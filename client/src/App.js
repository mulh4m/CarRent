import './App.css';
import Login from './components/Login.js';
import Register from './components/Register.js';
import Home from './components/Home.js';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Container, Row } from 'reactstrap';
import Header from './components/Header.js';
import Footer from './components/Footer.js';
import Admin from './components/Admin.js';
import CarList from './components/CarList.js';
import Payment from './components/Payment.js';
import Thankyou from './components/Thankyou.js';

function AppContent() {
  
  const location = useLocation();
  const isAdminPage = location.pathname === '/admin';

  return (
    <Container fluid>
      <Row>
        <Header/>
      </Row>
      <Row>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/home" element={<Home/>} />
          <Route path="/carlist" element={<CarList />}/>
          <Route path="/payment" element={<Payment />}/>
          <Route path="/thankyou" element={<Thankyou />}/>
          <Route path="/admin" element={<Admin/>} />

        </Routes>
      </Row>
      <Row>
        {!isAdminPage && <Footer/>}
      </Row>
    </Container>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;