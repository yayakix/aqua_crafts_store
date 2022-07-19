import './App.scss';
import "./categories.styles.scss";
import Home from './components/routes/home';
import NavBar from './components/navbar';
import Signin from './components/routes/signin';
import Shop from './components/shop/shop';
import Checkout from './components/routes/checkout';

import { Routes, Route } from "react-router-dom";




function App() {

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<NavBar />}>
          <Route index element={<Home />} />
          <Route path="shop/*" element={<Shop />} />
          <Route path="checkout" element={<Checkout />} />

          <Route path="signin" element={<Signin />} />
        </Route>
      </Routes>
     
    </div>
  );
}

export default App;
