import logo from './logo.svg';
import './App.css';
import OrderStatus from './Components/OrderStatus/orderstatus';
import LandingPage from './LandingPage';
import { Route,Routes,Navigate } from 'react-router-dom';

function App() {
  return (
    // <div className="App">
      <Routes>
    <Route path="/" element={<LandingPage />} exact />
    <Route path="/:restaurantid" element={<OrderStatus />} exact/>
    </Routes>
    // </div>
  );
}

export default App;
